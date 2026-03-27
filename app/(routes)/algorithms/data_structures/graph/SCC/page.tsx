"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import DoodleGraph, { GraphNode, GraphEdge } from "@/app/_components/Doodles/Graph";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { FC, useState, useMemo } from "react";

const parseInput = (input: string) => {
    const rawEdges = input.split("|").map(s => s.trim()).filter(Boolean);
    const nodesMap = new Set<string>();
    const edges: {u: string, v: string}[] = [];

    rawEdges.forEach(e => {
        const nodes = e.split(">");
        if (nodes.length === 2) {
            const u = nodes[0].trim().toUpperCase();
            const v = nodes[1].trim().toUpperCase();
            if (u && v) {
                nodesMap.add(u);
                nodesMap.add(v);
                edges.push({u, v});
            }
        }
    });

    const nodesList = Array.from(nodesMap).sort();
    return { nodesList, edges };
};

// Generates distinct colors for different SCCs
const SCC_COLORS = [
    "#fca5a5", // red-300
    "#93c5fd", // blue-300
    "#fcd34d", // amber-300
    "#d8b4fe", // purple-300
    "#86efac", // green-300
    "#fdba74", // orange-300
    "#f9a8d4", // pink-300
    "#5eead4", // teal-300
];

const Page: FC = () => {
  const [edgesInput, setEdgesInput] = useState<string>("A>B | B>C | C>A | B>D | D>E | E>F | F>D | G>F | G>H | H>I | I>J | J>G");
  const [step, setStep] = useState(0);

  const solve = useMemo(() => {
    const { nodesList, edges: inputEdges } = parseInput(edgesInput);

    const steps: {
      nodes: GraphNode[];
      edges: GraphEdge[];
      message: string;
      stack: string[];
      sccs: string[][];
    }[] = [];

    const baseNodes: GraphNode[] = nodesList.map(id => ({ id, label: id }));
    const baseEdges: GraphEdge[] = inputEdges.map(e => ({
        source: e.u, target: e.v, isDirected: true
    }));

    if (nodesList.length === 0) {
        return [{ nodes: [], edges: [], message: "Invalid graph input.", stack: [], sccs: [] }];
    }

    steps.push({
        nodes: JSON.parse(JSON.stringify(baseNodes)),
        edges: JSON.parse(JSON.stringify(baseEdges)),
        message: `Initial Directed Graph. Ready to find Strongly Connected Components (Kosaraju's Algorithm)!`,
        stack: [], sccs: []
    });

    const adj: Record<string, string[]> = {};
    const revAdj: Record<string, string[]> = {};
    nodesList.forEach(n => { adj[n] = []; revAdj[n] = []; });
    
    inputEdges.forEach(e => {
        adj[e.u].push(e.v);
        revAdj[e.v].push(e.u);
    });

    const highlightEdges = new Set<string>();
    const nodeColors: Record<string, string> = {};
    const stack: string[] = [];
    const sccs: string[][] = [];

    const captureStep = (msg: string, isReversed: boolean = false) => {
        const cNodes = baseNodes.map(n => ({ 
            ...n, 
            color: nodeColors[n.id] 
        }));
        
        const currentEdges = isReversed ? 
          inputEdges.map(e => ({ source: e.v, target: e.u, isDirected: true })) : 
          baseEdges;

        const cEdges = currentEdges.map(e => ({
            ...e,
            isHighlighted: highlightEdges.has(`${e.source}-${e.target}`)
        }));
        
        steps.push({ nodes: cNodes, edges: cEdges, message: msg, stack: [...stack], sccs: sccs.map(s => [...s]) });
    };

    // Phase 1: DFS to fill stack
    let visited = new Set<string>();

    const dfs1 = (u: string) => {
        visited.add(u);
        nodeColors[u] = "#cbd5e1"; // slate-300 (visiting)
        captureStep(`Pass 1 DFS: Visiting ${u}.`);

        for (const v of adj[u]) {
            if (!visited.has(v)) {
                highlightEdges.clear();
                highlightEdges.add(`${u}-${v}`);
                captureStep(`Pass 1 DFS: Traversing edge ${u} → ${v}.`);
                dfs1(v);
            }
        }
        
        stack.push(u);
        nodeColors[u] = "#9ca3af"; // gray-400 (finished)
        captureStep(`Pass 1 DFS: Finished exploring ${u}. Pushed to Stack.`);
    };

    captureStep(`Pass 1: Perform Standard DFS to determine finishing times.`);
    for (const node of nodesList) {
        if (!visited.has(node)) {
            dfs1(node);
        }
    }

    // Graph reversal step
    Object.keys(nodeColors).forEach(k => delete nodeColors[k]);
    highlightEdges.clear();
    captureStep(`Pass 2: Transpose the graph (Reverse all edges)! We will now process nodes in order of the Stack (popping from top).`, true);

    // Phase 2: DFS on reversed graph
    visited.clear();

    const dfs2 = (u: string, currentScc: string[], color: string) => {
        visited.add(u);
        currentScc.push(u);
        nodeColors[u] = color;
        captureStep(`Pass 2 DFS: Visiting ${u} on transposed graph. Added to current SCC!`, true);

        for (const v of revAdj[u]) {
            if (!visited.has(v)) {
                highlightEdges.clear();
                highlightEdges.add(`${u}-${v}`);
                captureStep(`Pass 2 DFS: Traversing reversed edge ${u} → ${v}.`, true);
                dfs2(v, currentScc, color);
            }
        }
    };

    let colorIdx = 0;
    while(stack.length > 0) {
        const u = stack.pop()!;
        if (!visited.has(u)) {
            const currentScc: string[] = [];
            const color = SCC_COLORS[colorIdx % SCC_COLORS.length];
            
            captureStep(`Popped ${u} from stack. It's unvisited, so we start a new SCC!`, true);
            dfs2(u, currentScc, color);
            sccs.push([...currentScc]);
            colorIdx++;
            highlightEdges.clear();
            captureStep(`Finished discovering SCC: { ${currentScc.join(", ")} }`, true);
        } else {
            captureStep(`Popped ${u} from stack, but it is already visited (assigned to an SCC).`, true);
        }
    }

    // Final result show original graph with SCC colors
    steps.push({
        nodes: baseNodes.map(n => ({ ...n, color: nodeColors[n.id] })), 
        edges: baseEdges, // back to original edges
        message: `Kosaraju's Algorithm Complete! Found ${sccs.length} Strongly Connected Components based on different colors.`, 
        stack: [], 
        sccs: sccs.map(s => [...s]) 
    });

    return steps;
  }, [edgesInput]);

  const current = solve[Math.min(step, solve.length - 1)];

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Strongly Connected Components (Kosaraju's Algo)">
          <li>
            A directed graph is <b>Strongly Connected</b> if there is a path between all pairs of vertices. An SCC is a maximal subgraph meeting this criteria.
          </li>
          <li>
            Kosaraju's Algorithm efficiently finds all SCCs using two passes of Depth First Search (DFS).
          </li>
          <li>
            It relies on the magic property that if you reverse all edges of a graph, the SCCs remain perfectly identical!
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              Paradigm: Graph Traversal (DFS) <br /> 
              Time Complexity: O(V + E) <br />
              Space Complexity: O(V) <br />{" "}
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Custom Directed Edges" accentColor="bg-yellow-400" class="">
            <div className="flex flex-col gap-3">
              <label className="font-bold text-sm">Edges (Format: U&gt;V | X&gt;Y):</label>
              <input type="text" className="input text-sm" value={edgesInput} onChange={e => {setEdgesInput(e.target.value); setStep(0);}} />
            </div>
          </DoodleCard>
          
          <DoodleCard title="Execution Context" accentColor="bg-emerald-400" class="">
            <>
              Step: {step} / {solve.length - 1} <br />
              {current.stack.length > 0 && <div className="mt-2 text-sm"><b>Stack:</b> [{current.stack.join(", ")}] (Top is Right)</div>}
              {current.sccs.length > 0 && <div className="mt-2 text-sm"><b>Found SCCs:</b> {current.sccs.map(s => `{${s.join(", ")}}`).join(", ")}</div>}
              <div className="font-bold mt-2">{current.message}</div>
            </>
          </DoodleCard>
          
          <DoodleGraph nodes={current.nodes} edges={current.edges} width={600} height={400} />

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => {
                if (step < solve.length - 1) setStep(step + 1);
              }}
              className=""
            >
              <PrimaryButton accentColor="bg-blue-200" class="" title="Next" />
            </button>
            <button
              onClick={() => {
                setStep(0);
              }}
              className=""
            >
              <PrimaryButton accentColor="bg-red-200" class="" title="Reset" />
            </button>
          </div>
        </AlgorithmWorking>
        <AlgorithmSteps>
          <ul>
            <li>
              📍 <b>Step 1: First DFS Pass</b> Perform DFS on the original graph. When a node finishes exploring all its neighbors, push it onto a Stack (tracking completion times).
            </li>
            <li>
              🧱 <b>Step 2: Transpose Graph</b> Reverse the direction of all edges in the graph. This creates the transposed graph.
            </li>
            <li>
              🔁 <b>Step 3: Second DFS Pass</b> Pop nodes from the Stack one by one. If a popped node is unvisited, start a DFS from it on the transposed graph.
            </li>
            <li>
              🧩 <b>Step 4: Grouping SCCs</b> All nodes reached during a single DFS run in Step 3 form one Strongly Connected Component!
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="data_structures/graph/scc" />
      </Algorithm>
    </div>
  );
};

export default Page;
