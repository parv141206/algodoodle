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
  const [edgesInput, setEdgesInput] = useState<string>("A-B, 4 | A-C, 2 | B-C, 5 | B-D, 10 | C-D, 3 | D-E, 11 | C-E, 6 | B-F, 2 | F-E, 1");
  const [startNode, setStartNode] = useState<string>("A");
  const [step, setStep] = useState(0);

  const solve = useMemo(() => {
    const { nodesList, edges: inputEdges } = parseInput(edgesInput);

    const steps: {
      nodes: GraphNode[];
      edges: GraphEdge[];
      message: string;
      distances: Record<string, number>;
    }[] = [];

    const baseNodes: GraphNode[] = nodesList.map(id => ({ id, label: id }));
    const baseEdges: GraphEdge[] = inputEdges.map(e => ({
        source: e.u, target: e.v, label: e.w, isDirected: false
    }));

    if (nodesList.length === 0) {
        return [{ nodes: [], edges: [], message: "Invalid graph input.", distances: {} }];
    }

    const actualStartNode = nodesList.includes(startNode) ? startNode : nodesList[0];
    
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const unvisited = new Set<string>(nodesList);
    
    nodesList.forEach(n => {
        distances[n] = Infinity;
        previous[n] = null;
    });
    distances[actualStartNode] = 0;

    const highlightEdges = new Set<string>();
    const activeNodes = new Set<string>();
    const edgeKey = (u: string, v: string) => [u,v].sort().join("-");

    const captureStep = (msg: string) => {
          const cNodes = baseNodes.map(n => ({ 
              ...n, 
              label: `${n.id} (${distances[n.id] === Infinity ? '∞' : distances[n.id]})`,
              color: activeNodes.has(n.id) ? "#86efac" : undefined 
          }));
        
        // Build path edges
        const pathEdges = new Set<string>();
        nodesList.forEach(n => {
            if (previous[n]) {
                pathEdges.add(edgeKey(n, previous[n]!));
            }
        });

        const cEdges = baseEdges.map(e => ({
            ...e,
            isHighlighted: highlightEdges.has(edgeKey(e.source, e.target)) || pathEdges.has(edgeKey(e.source, e.target))
        }));
        steps.push({ nodes: cNodes, edges: cEdges, message: msg, distances: { ...distances } });
    };

    captureStep(`Initialized all distances to Infinity, except start node ${actualStartNode} which is 0.`);

    // Build adjacency list
    const adj: Record<string, {node: string, weight: number}[]> = {};
    nodesList.forEach(n => adj[n] = []);
    inputEdges.forEach(e => {
        adj[e.u].push({node: e.v, weight: e.w});
        adj[e.v].push({node: e.u, weight: e.w});
    });

    while (unvisited.size > 0) {
        // Extract Min
        let minNode: string | null = null;
        let minDist = Infinity;
        unvisited.forEach(n => {
            if (distances[n] < minDist) {
                minDist = distances[n];
                minNode = n;
            }
        });

        if (minNode === null || minDist === Infinity) {
            captureStep(`Remaining nodes are unreachable. Algorithm terminating.`);
            break;
        }

        unvisited.delete(minNode);
        activeNodes.add(minNode);

        captureStep(`Extract-Min: Selected node ${minNode} with shortest known distance ${minDist}.`);

        // Relax edges
        const neighbors = adj[minNode];
        let relaxed = false;

        for (const neighbor of neighbors) {
            const v = neighbor.node;
            const weight = neighbor.weight;

            if (unvisited.has(v)) {
                const alt = distances[minNode] + weight;
                if (alt < distances[v]) {
                    distances[v] = alt;
                    previous[v] = minNode;
                    relaxed = true;
                    
                    highlightEdges.clear();
                    highlightEdges.add(edgeKey(minNode, v));
                    captureStep(`Relax edge (${minNode}-${v}): New shortest path found to ${v} with distance ${alt}.`);
                }
            }
        }

        if (!relaxed) {
            captureStep(`Finished inspecting neighbors of ${minNode}. No shorter paths found.`);
        }
    }

    highlightEdges.clear();
    captureStep(`Dijkstra's Algorithm Complete! Shortest Path Tree is highlighted.`);

    return steps;
  }, [edgesInput, startNode]);

  const current = solve[Math.min(step, solve.length - 1)];

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Dijkstra's Algorithm">
          <li>
            Dijkstra's Algorithm finds the shortest path from a starting node to all other nodes in a weighted graph.
          </li>
          <li>
            It works by continually selecting the unvisited node with the lowest distance, and calculating the distance through it to each unvisited neighbor.
          </li>
          <li>
            The algorithm guarantees shortest paths as long as all edge weights are non-negative.
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              Paradigm: Greedy <br /> 
              Time Complexity: O((V+E) log V) (with Min-Heap)<br />
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
              {current.message}
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
              📍 <b>Step 1: Initialize</b> Set distance to start node to 0, and all other nodes to Infinity. Mark all nodes unvisited.
            </li>
            <li>
              🧱 <b>Step 2: Extract Min</b> From the unvisited set, select the node with the smallest known distance.
            </li>
            <li>
              🔁 <b>Step 3: Relax Edges</b> For the current node, consider all of its unvisited neighbors. Calculate their tentative distances through the current node. Compare the newly calculated tentative distance to the current assigned value and assign the smaller one.
            </li>
            <li>
              🧩 <b>Step 4: Repeat</b> When we are done considering all of the unvisited neighbors of the current node, mark the current node as visited. The algorithm terminates when the destination node has been visited.
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="data_structures/graph/dijkstras" />
      </Algorithm>
    </div>
  );
};

export default Page;
