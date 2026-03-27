"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { FC, useState, useMemo } from "react";

const parseInput = (input: string) => {
    const rawEdges = input.split("|").map(s => s.trim()).filter(Boolean);
    const nodesMap = new Set<string>();
    const edges: {u: string, v: string, w: number}[] = [];

    rawEdges.forEach(e => {
        const parts = e.split(",");
        if (parts.length === 2) {
            const nodes = parts[0].split(">");
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
  // Using directed edges format: U>V, W
  const [edgesInput, setEdgesInput] = useState<string>("A>B, 3 | A>D, 5 | B>A, 2 | B>D, 8 | C>B, 1 | D>C, 2");
  const [step, setStep] = useState(0);

  const solve = useMemo(() => {
    const { nodesList, edges: inputEdges } = parseInput(edgesInput);
    const n = nodesList.length;

    const steps: {
      matrix: (number | "∞")[][];
      k: number;
      i: number;
      j: number;
      message: string;
      updated: boolean;
    }[] = [];

    if (n === 0) {
        return { steps: [{ matrix: [], k: -1, i: -1, j: -1, message: "Invalid graph input.", updated: false }], nodesList: [] };
    }

    // Initialize DP Matrix
    const dist: (number | "∞")[][] = Array.from({ length: n }, () => Array(n).fill("∞"));

    for (let i = 0; i < n; i++) {
        dist[i][i] = 0;
    }

    inputEdges.forEach(e => {
        const u = nodesList.indexOf(e.u);
        const v = nodesList.indexOf(e.v);
        dist[u][v] = e.w;
    });

    const cloneMatrix = () => dist.map(row => [...row]);

    steps.push({
        matrix: cloneMatrix(),
        k: -1, i: -1, j: -1,
        message: `Initial Distance Matrix created from the edge list. '∞' means no direct edge.`,
        updated: false
    });

    for (let k = 0; k < n; k++) {
        steps.push({
            matrix: cloneMatrix(),
            k, i: -1, j: -1,
            message: `Starting Phase k=${k} (Considering node ${nodesList[k]} as an intermediate intermediate node).`,
            updated: false
        });

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                // If i==k or j==k, the distance doesn't change since intermediate node is the same as start/end
                if (i === k || j === k || dist[i][k] === "∞" || dist[k][j] === "∞") {
                    // Skip detailed step to save animation frames for trivial cases
                    continue;
                }

                const currentVal = dist[i][j];
                const detourVal = (dist[i][k] as number) + (dist[k][j] as number);

                let updated = false;
                if (currentVal === "∞" || detourVal < currentVal) {
                    dist[i][j] = detourVal;
                    updated = true;
                }

                steps.push({
                    matrix: cloneMatrix(),
                    k, i, j,
                    message: `Checking path ${nodesList[i]} → ${nodesList[j]} via ${nodesList[k]}.
                              Current shortest: ${currentVal === "∞" ? "∞" : currentVal}.
                              Path via ${nodesList[k]}: (${dist[i][k]} + ${dist[k][j]} = ${detourVal}).
                              ${updated ? "New shorter path found! Updating matrix." : "Current path is shorter. No update."}`,
                    updated
                });
            }
        }
    }

    steps.push({
        matrix: cloneMatrix(),
        k: -1, i: -1, j: -1,
        message: "Floyd-Warshall Algorithm Complete! Matrix contains All-Pairs Shortest Paths.",
        updated: false
    });

    return { steps, nodesList };
  }, [edgesInput]);

  const steps = solve.steps;
  const nodesList = solve.nodesList || [];
  const current = steps[Math.min(step, steps.length - 1)];

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="All Pairs Shortest Path (Floyd-Warshall)">
          <li>
            The Floyd-Warshall algorithm finds the shortest paths between <b>all pairs</b> of vertices in a weighted graph.
          </li>
          <li>
            It uses Dynamic Programming, systematically checking if a path between node <code>i</code> and node <code>j</code> can be improved by going through an intermediate node <code>k</code>.
          </li>
          <li>
            It works for directed and undirected graphs and can handle negative weights (but not negative cycles).
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              Paradigm: Dynamic Programming <br /> 
              Time Complexity: O(V³) <br />
              Space Complexity: O(V²) <br />{" "}
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Custom Directed Edges" accentColor="bg-yellow-400" class="">
            <div className="flex flex-col gap-3">
              <label className="font-bold text-sm">Edges (Format: U&gt;V, W):</label>
              <input type="text" className="input text-sm" value={edgesInput} onChange={e => {setEdgesInput(e.target.value); setStep(0);}} />
            </div>
          </DoodleCard>
          
          <DoodleCard title="Current Execution Context" accentColor="bg-emerald-400" class="">
            <>
              Step: {step} / {steps.length - 1} <br />
              {current.k !== -1 && <>Phase (Intermediate Node): <b>{nodesList[current.k]}</b><br/></>}
              <div className="whitespace-pre-line mt-2">{current.message}</div>
            </>
          </DoodleCard>
          
          <div className="overflow-x-auto w-full flex justify-center py-6">
            <table className="border-collapse text-center">
               <thead>
                  <tr>
                     <th className="p-2 border bg-gray-200 dark:bg-gray-800">Dist</th>
                     {nodesList.map(n => <th key={n} className="p-3 border bg-gray-100 dark:bg-gray-700 min-w-[3rem]">{n}</th>)}
                  </tr>
               </thead>
               <tbody>
                  {current.matrix?.map((row: (number | "∞")[], i: number) => (
                     <tr key={i}>
                        <td className="p-3 font-bold border bg-gray-100 dark:bg-gray-700">{nodesList[i]}</td>
                        {row.map((val: number | "∞", j: number) => {
                            let cellClass = "p-3 border transition-colors duration-300 ";
                            
                            // Highlighting Logic
                            if (i === current.i && j === current.j) {
                                cellClass += current.updated ? "bg-green-300 dark:bg-green-700 font-bold" : "bg-blue-200 dark:bg-blue-900";
                            } else if (i === current.i && j === current.k) {
                                cellClass += "bg-yellow-200 dark:bg-yellow-800"; // path i -> k
                            } else if (i === current.k && j === current.j) {
                                cellClass += "bg-yellow-200 dark:bg-yellow-800"; // path k -> j
                            } else {
                                cellClass += "bg-white dark:bg-gray-900";
                            }

                            return (
                                <td key={j} className={cellClass}>
                                    {val}
                                </td>
                            )
                        })}
                     </tr>
                  ))}
               </tbody>
            </table>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                if (step < steps.length - 1) setStep(step + 1);
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
              📍 <b>Step 1: Matrix Initialization</b> Create a V×V matrix where <code>dist[i][j]</code> is the weight of edge i→j. If there is no edge, set it to Infinity.
            </li>
            <li>
              🧱 <b>Step 2: Pivot Selection</b> Iterate a node <code>k</code> from 0 to V-1. This node will act as an intermediate hop.
            </li>
            <li>
              🔁 <b>Step 3: Update Paths</b> For every pair of nodes <code>i</code> and <code>j</code>, check if the path <code>i → k → j</code> is shorter than the known shortest path <code>i → j</code>.
            </li>
            <li>
              🧩 <b>Step 4: Repeat</b> If it is shorter, update <code>dist[i][j] = dist[i][k] + dist[k][j]</code>.
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="data_structures/graph/apsp" />
      </Algorithm>
    </div>
  );
};

export default Page;
