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
  const [startNode, setStartNode] = useState<string>("A");
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
        message: `Initial Graph. Ready to run Prim's Algorithm starting from node ${startNode}!`,
        mstWeight: 0
    });

    const actualStartNode = nodesList.includes(startNode) ? startNode : nodesList[0];
    const visited = new Set<string>([actualStartNode]);
    const mstEdges: {u:string, v:string, w:number}[] = [];
    let currentWeight = 0;

    const getNodeColor = (id: string) => visited.has(id) ? "#86efac" : undefined; // green-300
    const edgeKey = (u: string, v: string) => [u,v].sort().join("-");

    const highlightEdges = new Set<string>();

    const captureStep = (msg: string) => {
        const cNodes = baseNodes.map(n => ({ ...n, color: getNodeColor(n.id) }));
        const cEdges = baseEdges.map(e => ({
            ...e,
            isHighlighted: highlightEdges.has(edgeKey(e.source, e.target))
        }));
        steps.push({ nodes: cNodes, edges: cEdges, message: msg, mstWeight: currentWeight });
    };

    captureStep(`Started at node ${actualStartNode}. Marked as visited (Green).`);

    while (visited.size < nodesList.length) {
        let minEdge: {u: string, v: string, w: number} | null = null;

        // Find minimum weight crossing edge
        for (const e of inputEdges) {
            const uVisited = visited.has(e.u);
            const vVisited = visited.has(e.v);
            if ((uVisited && !vVisited) || (!uVisited && vVisited)) {
                if (!minEdge || e.w < minEdge.w) {
                    minEdge = e;
                }
            }
        }

        if (!minEdge) {
            captureStep(`Graph is disconnected! Cannot reach remaining nodes.`);
            break;
        }

        const newNode = visited.has(minEdge.u) ? minEdge.v : minEdge.u;
        
        highlightEdges.add(edgeKey(minEdge.u, minEdge.v));
        mstEdges.push(minEdge);
        currentWeight += minEdge.w;
        visited.add(newNode);

        captureStep(`Selected smallest edge crossing the cut: (${minEdge.u}-${minEdge.v}) with weight ${minEdge.w}. Added ${newNode} to MST.`);
    }

    captureStep(`Prim's Algorithm Complete! Minimum Spanning Tree Weight: ${currentWeight}.`);

    return steps;
  }, [edgesInput, startNode]);

  const current = solve[Math.min(step, solve.length - 1)];

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Prim's Algorithm">
          <li>
            Prim's Algorithm is a Greedy algorithm used to find the Minimum Spanning Tree (MST) of a weighted, undirected graph.
          </li>
          <li>
            It operates by building this tree one vertex at a time, from an arbitrary starting vertex, at each step adding the cheapest possible connection from the tree to another vertex.
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              Paradigm: Greedy <br /> 
              Time Complexity: O(E log V) (with Min-Heap)<br />
              Space Complexity: O(V) <br />{" "}
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Custom Input" accentColor="bg-yellow-400" class="">
            <div className="flex flex-col gap-3">
              <label className="font-bold text-sm">Edges (Format: U-V, W | X-Y, Z):</label>
              <input type="text" className="input text-sm" value={edgesInput} onChange={e => {setEdgesInput(e.target.value); setStep(0);}} />
              <div className="flex gap-4 items-center mt-2">
                 <label className="font-bold text-sm">Start Node:</label>
                 <input type="text" className="input w-16 text-center" value={startNode} onChange={e => {setStartNode(e.target.value.toUpperCase()); setStep(0);}} maxLength={2} />
              </div>
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
              📍 <b>Step 1: Initialize</b> Start with a tree containing only a single arbitrary vertex.
            </li>
            <li>
              🧱 <b>Step 2: Grow Tree</b> Of all edges that connect the tree to vertices not yet in the tree, find the minimum-weight edge.
            </li>
            <li>
              🔁 <b>Step 3: Absorb</b> Add this minimum-weight edge and its destination node to the tree.
            </li>
            <li>
              🧩 <b>Step 4: Repeat</b> Repeat until all vertices are in the tree.
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="data_structures/graph/prims" />
      </Algorithm>
    </div>
  );
};

export default Page;
