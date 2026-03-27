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

const Page: FC = () => {
  const [edgesInput, setEdgesInput] = useState<string>("5>0 | 5>2 | 4>0 | 4>1 | 2>3 | 3>1");
  const [step, setStep] = useState(0);

  const solve = useMemo(() => {
    const { nodesList, edges: inputEdges } = parseInput(edgesInput);

    const steps: {
      nodes: GraphNode[];
      edges: GraphEdge[];
      message: string;
      indegrees: Record<string, number>;
      queue: string[];
      sorted: string[];
    }[] = [];

    const baseNodes: GraphNode[] = nodesList.map(id => ({ id, label: id }));
    const baseEdges: GraphEdge[] = inputEdges.map(e => ({
        source: e.u, target: e.v, isDirected: true
    }));

    if (nodesList.length === 0) {
        return [{ nodes: [], edges: [], message: "Invalid graph input.", indegrees: {}, queue: [], sorted: [] }];
    }

    const indegree: Record<string, number> = {};
    const adj: Record<string, string[]> = {};
    
    nodesList.forEach(n => {
        indegree[n] = 0;
        adj[n] = [];
    });

    inputEdges.forEach(e => {
        adj[e.u].push(e.v);
        indegree[e.v]++;
    });

    steps.push({
        nodes: JSON.parse(JSON.stringify(baseNodes)),
        edges: JSON.parse(JSON.stringify(baseEdges)),
        message: `Initial Directed Acyclic Graph (DAG). Calculating indegrees of all vertices.`,
        indegrees: { ...indegree },
        queue: [],
        sorted: []
    });

    const queue: string[] = [];
    nodesList.forEach(n => {
        if (indegree[n] === 0) queue.push(n);
    });

    const activeNodes = new Set<string>();
    const sorted: string[] = [];
    const highlightEdges = new Set<string>();

    const captureStep = (msg: string) => {
          const cNodes = baseNodes.map(n => ({ 
              ...n, 
              label: `${n.id} (In:${indegree[n.id]})`,
              color: sorted.includes(n.id) ? "#93c5fd" : (activeNodes.has(n.id) ? "#fcd34d" : undefined) // blue for sorted, yellow for queue
          }));
        
        const cEdges = baseEdges.map(e => ({
            ...e,
            isHighlighted: highlightEdges.has(`${e.source}-${e.target}`)
        }));
        
        steps.push({ 
            nodes: cNodes, 
            edges: cEdges, 
            message: msg, 
            indegrees: { ...indegree },
            queue: [...queue],
            sorted: [...sorted]
        });
    };

    captureStep(`Enqueued all nodes with indegree exactly 0: [${queue.join(", ")}].`);

    while (queue.length > 0) {
        const u = queue.shift()!;
        activeNodes.clear();
        activeNodes.add(u);
        sorted.push(u);
        
        captureStep(`Dequeued ${u} and added to Topo Sort array. It now has 0 incoming edges!`);

        let relaxedAny = false;
        highlightEdges.clear();

        for (const v of adj[u]) {
            indegree[v]--;
            highlightEdges.add(`${u}-${v}`);
            relaxedAny = true;
            captureStep(`Deleted edge ${u} → ${v}. Indegree of ${v} becomes ${indegree[v]}.`);
            
            if (indegree[v] === 0) {
                queue.push(v);
                captureStep(`Indegree of ${v} reached 0! Pushing ${v} to the queue.`);
            }
        }

        if (!relaxedAny) {
            captureStep(`Node ${u} has no outgoing edges to process.`);
        }
    }

    if (sorted.length !== nodesList.length) {
        captureStep(`Graph contains a CYCLE! Topological Sort is not possible for cyclic graphs.`);
    } else {
        captureStep(`Topological Sort Complete! The valid linear ordering is: [${sorted.join(", ")}].`);
    }

    return steps;
  }, [edgesInput]);

  const current = solve[Math.min(step, solve.length - 1)];

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Topological Sort (Kahn's Algorithm)">
          <li>
            Topological Sort of a Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge U→V, vertex U comes before V in the ordering.
          </li>
          <li>
            It's widely used in scheduling tasks with dependencies, data serialization, and resolving symbol dependencies in linkers.
          </li>
          <li>
            Kahn's Algorithm iteratively removes nodes with an indegree of 0 and updates the indegrees of their neighbors.
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              Paradigm: Graph Traversal / Queue <br /> 
              Time Complexity: O(V + E) <br />
              Space Complexity: O(V) <br />{" "}
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Custom DAG Edges" accentColor="bg-yellow-400" class="">
            <div className="flex flex-col gap-3">
              <label className="font-bold text-sm">Edges (Format: U&gt;V | X&gt;Y):</label>
              <input type="text" className="input text-sm" value={edgesInput} onChange={e => {setEdgesInput(e.target.value); setStep(0);}} />
            </div>
          </DoodleCard>
          
          <DoodleCard title="Execution Context" accentColor="bg-emerald-400" class="">
            <>
              Step: {step} / {solve.length - 1} <br />
              <div className="mt-2 text-sm"><b>Queue:</b> [{current.queue.join(", ")}]</div>
              <div className="mt-2 text-sm"><b>Sorted Order:</b> [{current.sorted.join(", ")}]</div>
              <div className="font-bold mt-2 text-blue-800 dark:text-blue-300">{current.message}</div>
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
              📍 <b>Step 1: Compute Indegrees</b> Calculate the indegree (number of incoming edges) for all vertices.
            </li>
            <li>
              🧱 <b>Step 2: Initialize Queue</b> Enqueue all vertices having an indegree of exactly 0.
            </li>
            <li>
              🔁 <b>Step 3: Remove and Relax</b> Dequeue a vertex and add it to the topological order. For every adjacent vertex, decrease its indegree by 1.
            </li>
            <li>
              🧩 <b>Step 4: Repeat</b> If an adjacent vertex's indegree becomes 0, enqueue it. Repeat until the queue is empty.
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="data_structures/graph/topologicalsort" />
      </Algorithm>
    </div>
  );
};

export default Page;
