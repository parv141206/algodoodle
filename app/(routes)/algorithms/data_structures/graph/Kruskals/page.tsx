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
    const edges: {u: string, v: string, w: number}[] = [];

    rawEdges.forEach(e => {
        const parts = e.split(",");
        if (parts.length === 2) {
            const nodes = parts[0].split("-");
            if (nodes.length === 2) {
                const u = nodes[0].trim().toUpperCase();
                const v = nodes[1].trim().toUpperCase();
                const w = Number(parts[1].trim());
                if (u && v && !isNaN(w)) {
                    nodesMap.add(u);
                    nodesMap.add(v);
                    edges.push({u, v, w});
                }
            }
        }
    });

    const nodesList = Array.from(nodesMap).sort();
    return { nodesList, edges };
};

const Page: FC = () => {
  const [edgesInput, setEdgesInput] = useState<string>("A-B, 4 | A-H, 8 | B-C, 8 | B-H, 11 | C-I, 2 | C-F, 4 | C-D, 7 | I-H, 7 | I-G, 6 | H-G, 1 | G-F, 2 | F-E, 10 | D-E, 9 | D-F, 14");
  const [step, setStep] = useState(0);

  const solve = useMemo(() => {
    const { nodesList, edges: inputEdges } = parseInput(edgesInput);

    const steps: {
      nodes: GraphNode[];
      edges: GraphEdge[];
      message: string;
      mstWeight: number;
    }[] = [];

    const baseNodes: GraphNode[] = nodesList.map(id => ({ id, label: id }));
    const baseEdges: GraphEdge[] = inputEdges.map(e => ({
        source: e.u, target: e.v, label: e.w, isDirected: false
    }));

    if (nodesList.length === 0) {
        return [{ nodes: [], edges: [], message: "Invalid graph input.", mstWeight: 0 }];
    }

    steps.push({
        nodes: JSON.parse(JSON.stringify(baseNodes)),
        edges: JSON.parse(JSON.stringify(baseEdges)),
        message: `Initial Graph. Sorted edges by weight to prepare for Kruskal's Greedy selection!`,
        mstWeight: 0
    });

    const sortedEdges = [...inputEdges].sort((a,b) => a.w - b.w);
    
    // Disjoint Set (Union-Find)
    const parent: Record<string, string> = {};
    const rank: Record<string, number> = {};
    nodesList.forEach(n => { parent[n] = n; rank[n] = 0; });

    const find = (i: string): string => {
        if (parent[i] === i) return i;
        return find(parent[i]);
    };

    const union = (i: string, j: string) => {
        const rootI = find(i);
        const rootJ = find(j);
        if (rootI !== rootJ) {
            if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
            else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
            else {
                parent[rootJ] = rootI;
                rank[rootI]++;
            }
        }
    };

    let currentWeight = 0;
    const highlightEdges = new Set<string>();
    const edgeKey = (u: string, v: string) => [u,v].sort().join("-");
    const activeNodes = new Set<string>();

    const captureStep = (msg: string) => {
        const cNodes = baseNodes.map(n => ({ 
            ...n, 
            color: activeNodes.has(n.id) ? "#86efac" : undefined 
        }));
        const cEdges = baseEdges.map(e => ({
            ...e,
            isHighlighted: highlightEdges.has(edgeKey(e.source, e.target))
        }));
        steps.push({ nodes: cNodes, edges: cEdges, message: msg, mstWeight: currentWeight });
    };

    let edgesAdded = 0;

    for (const edge of sortedEdges) {
        if (edgesAdded === nodesList.length - 1) break;

        const rootU = find(edge.u);
        const rootV = find(edge.v);

        if (rootU !== rootV) {
            // Include edge
            union(edge.u, edge.v);
            activeNodes.add(edge.u);
            activeNodes.add(edge.v);
            highlightEdges.add(edgeKey(edge.u, edge.v));
            currentWeight += edge.w;
            edgesAdded++;
            
            captureStep(`Selected smallest available edge (${edge.u}-${edge.v}) with weight ${edge.w}. Since it doesn't form a cycle, it's added to the MST!`);
        } else {
            // Edge forms a cycle, ignored in visualization steps to reduce clutter, or we could flash it red
             captureStep(`Skipped smallest available edge (${edge.u}-${edge.v}) with weight ${edge.w} because it forms a CYCLE!`);
        }
    }

    if (edgesAdded < nodesList.length - 1) {
        captureStep(`Algorithm Complete, but Graph is disconnected! Minimum Spanning Forest Weight: ${currentWeight}.`);
    } else {
        captureStep(`Kruskal's Algorithm Complete! Minimum Spanning Tree Weight: ${currentWeight}.`);
    }

    return steps;
  }, [edgesInput]);

  const current = solve[Math.min(step, solve.length - 1)];

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Kruskal's Algorithm">
          <li>
            Kruskal's Algorithm is a Greedy approach to finding the Minimum Spanning Tree (MST).
          </li>
          <li>
            It sorts all edges by weight, and continually adds the smallest edge to the MST, ignoring edges that would form a cycle.
          </li>
          <li>
            Cycle detection is efficiently managed using the Disjoint-Set (Union-Find) data structure.
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              Paradigm: Greedy <br /> 
              Time Complexity: O(E log E) (sorting edges)<br />
              Space Complexity: O(V) (Union-Find) <br />{" "}
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Custom Input" accentColor="bg-yellow-400" class="">
            <div className="flex flex-col gap-3">
              <label className="font-bold text-sm">Edges (Format: U-V, W | X-Y, Z):</label>
              <input type="text" className="input text-sm" value={edgesInput} onChange={e => {setEdgesInput(e.target.value); setStep(0);}} />
            </div>
          </DoodleCard>
          
          <DoodleCard title="Current Execution Context" accentColor="bg-emerald-400" class="">
            <>
              Step: {step} / {solve.length - 1} <br />
              <div className="font-bold text-xl my-2 text-blue-800 dark:text-blue-300">
                MST Weight: {current.mstWeight}
              </div>
              {current.message}
            </>
          </DoodleCard>
          
          <DoodleGraph nodes={current.nodes} edges={current.edges} width={600} height={400} />

          <div className="flex gap-3">
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
              📍 <b>Step 1: Sort Edges</b> Sort all edges in the graph in ascending order of their weight.
            </li>
            <li>
              🧱 <b>Step 2: Pick Edge</b> Pick the smallest edge. Check if it forms a cycle with the spanning tree formed so far.
            </li>
            <li>
              🔁 <b>Step 3: Add or Discard</b> If cycle is not formed, include this edge. Else, discard it.
            </li>
            <li>
              🧩 <b>Step 4: Repeat</b> Repeat until there are V-1 edges in the spanning tree.
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="data_structures/graph/kruskals" />
      </Algorithm>
    </div>
  );
};

export default Page;
