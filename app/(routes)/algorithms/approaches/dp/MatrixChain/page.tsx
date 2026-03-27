"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { FC, useState, useMemo } from "react";

const Page: FC = () => {
  const [dims, setDims] = useState([10, 20, 30, 40, 30]);
  const [dimsInput, setDimsInput] = useState("10, 20, 30, 40, 30");
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("Press Next to start!");

  const solve = useMemo(() => {
    const n = dims.length - 1;
    const dp: number[][] = Array.from({ length: n }, () =>
      Array(n).fill(0),
    );
    const split: number[][] = Array.from({ length: n }, () =>
      Array(n).fill(0),
    );

    const steps: {
      i: number;
      j: number;
      dp: number[][];
      split: number[][];
      msg: string;
    }[] = [];

    steps.push({
      i: -1,
      j: -1,
      dp: dp.map((r) => [...r]),
      split: split.map((r) => [...r]),
      msg: "Initialized DP and Split tables. Diagonal = 0 (single matrix costs nothing).",
    });

    for (let len = 2; len <= n; len++) {
      for (let i = 0; i < n - len + 1; i++) {
        const j = i + len - 1;
        dp[i][j] = Infinity;
        for (let k = i; k < j; k++) {
          const cost =
            dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1];
          if (cost < dp[i][j]) {
            dp[i][j] = cost;
            split[i][j] = k;
          }
        }
        steps.push({
          i,
          j,
          dp: dp.map((r) => [...r]),
          split: split.map((r) => [...r]),
          msg: `dp[${i}][${j}] = ${dp[i][j]}. Best split at k=${split[i][j]}. Multiplying (M${i + 1}..M${split[i][j] + 1}) × (M${split[i][j] + 2}..M${j + 1}).`,
        });
      }
    }

    const buildParens = (i: number, j: number): string => {
      if (i === j) return `M${i + 1}`;
      return `(${buildParens(i, split[i][j])} × ${buildParens(split[i][j] + 1, j)})`;
    };

    const optimalParens = n > 0 ? buildParens(0, n - 1) : "";

    steps.push({
      i: -1,
      j: -1,
      dp: dp.map((r) => [...r]),
      split: split.map((r) => [...r]),
      msg: `Done! Minimum scalar multiplications = ${dp[0][n - 1]}. Optimal: ${optimalParens}.`,
    });

    return { steps, optimalParens, finalDp: dp, finalSplit: split };
  }, [dims]);

  const current = solve.steps[Math.min(step, solve.steps.length - 1)];

  const handleNext = () => {
    if (step >= solve.steps.length - 1) {
      setMessage("Already finished! Press Reset to try again.");
      return;
    }
    const next = step + 1;
    setStep(next);
    setMessage(solve.steps[next].msg);
  };

  const handleReset = () => {
    setStep(0);
    setMessage(solve.steps[0].msg);
  };

  const handleApply = () => {
    const regex = /^(\s*\d+\s*,?)+$/;
    if (!regex.test(dimsInput)) {
      setMessage(
        "Invalid dimensions! Use comma-separated numbers like: 10, 20, 30",
      );
      return;
    }
    const parsed = dimsInput
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => n > 0);
    if (parsed.length < 2) {
      setMessage("Need at least 2 dimensions (1 matrix)!");
      return;
    }
    setDims(parsed);
    setStep(0);
    setMessage("Input applied! Press Next to start.");
  };

  const isFinished = step >= solve.steps.length - 1;
  const n = dims.length - 1;

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Matrix Chain Multiplication">
          <li>
            Given a sequence of matrices, find the most efficient way to
            multiply them. The order of multiplication affects the total number
            of scalar multiplications.
          </li>
          <li>
            Dimensions are given as an array: matrix M_i has dimensions
            dims[i-1] × dims[i].
          </li>
          <li>
            A DP table stores the minimum cost, and a split table records where
            to split for the optimal parenthesization.
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              Time Complexity: O(n³) <br /> Space Complexity: O(n²) <br />
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Custom Input" accentColor="bg-green-400" class="">
            <>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold">
                    Dimensions (comma separated):
                  </label>
                  <div className="text-xs">
                    e.g. &ldquo;10, 20, 30, 40&rdquo; = 3 matrices: 10×20,
                    20×30, 30×40
                  </div>
                  <input
                    className="input"
                    type="text"
                    value={dimsInput}
                    onChange={(e) => setDimsInput(e.target.value)}
                    placeholder="10, 20, 30, 40, 30"
                  />
                </div>
                <button onClick={handleApply}>
                  <PrimaryButton
                    accentColor="bg-green-200"
                    class=""
                    title="Apply"
                  />
                </button>
              </div>
            </>
          </DoodleCard>
          <DoodleCard
            title="Current Status"
            accentColor="bg-blue-400"
            class=""
          >
            <>
              Step: {step} / {solve.steps.length - 1}
              <br />
              {message}
            </>
          </DoodleCard>
          <div className="text-xl font-bold">Matrices</div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: n }, (_, i) => (
              <div
                key={i}
                className="rounded border p-2 text-sm dark:border-gray-600"
              >
                M{i + 1}: {dims[i]}×{dims[i + 1]}
              </div>
            ))}
          </div>
          <div className="text-xl font-bold">DP Table (Min Cost)</div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-center text-sm">
              <thead>
                <tr>
                  <th className="border p-2 dark:border-gray-600">i \ j</th>
                  {Array.from({ length: n }, (_, j) => (
                    <th key={j} className="border p-2 dark:border-gray-600">
                      {j}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.dp.map((row, i) => (
                  <tr key={i}>
                    <td className="border p-2 font-bold dark:border-gray-600">
                      {i}
                    </td>
                    {row.map((val, j) => (
                      <td
                        key={j}
                        className={`border p-2 dark:border-gray-600 ${
                          j < i
                            ? "bg-gray-200 dark:bg-gray-800"
                            : current.i === i && current.j === j
                              ? "bg-red-300 font-bold dark:bg-green-700"
                              : ""
                        }`}
                      >
                        {j < i ? "—" : val === Infinity ? "∞" : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-xl font-bold">Split Table</div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-center text-sm">
              <thead>
                <tr>
                  <th className="border p-2 dark:border-gray-600">i \ j</th>
                  {Array.from({ length: n }, (_, j) => (
                    <th key={j} className="border p-2 dark:border-gray-600">
                      {j}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.split.map((row, i) => (
                  <tr key={i}>
                    <td className="border p-2 font-bold dark:border-gray-600">
                      {i}
                    </td>
                    {row.map((val, j) => (
                      <td
                        key={j}
                        className={`border p-2 dark:border-gray-600 ${
                          j <= i
                            ? "bg-gray-200 dark:bg-gray-800"
                            : current.i === i && current.j === j
                              ? "bg-red-300 font-bold dark:bg-green-700"
                              : ""
                        }`}
                      >
                        {j <= i ? "—" : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isFinished && (
            <DoodleCard
              title="Backtracking Result"
              accentColor="bg-yellow-400"
              class=""
            >
              <>
                Optimal Parenthesization: {solve.optimalParens}
                <br />
                Minimum scalar multiplications:{" "}
                {solve.finalDp[0][n - 1]}
              </>
            </DoodleCard>
          )}
          <div className="flex gap-3">
            <button onClick={handleNext}>
              <PrimaryButton accentColor="bg-blue-200" class="" title="Next" />
            </button>
            <button onClick={handleReset}>
              <PrimaryButton accentColor="bg-red-200" class="" title="Reset" />
            </button>
          </div>
        </AlgorithmWorking>
        <AlgorithmSteps>
          <ul>
            <li>
              📐 <b>Step 1:</b> <b>Understand the Dimensions</b>
              <ul>
                <li>
                  If you have n matrices, you need n+1 dimensions. Matrix M_i
                  has dimensions dims[i-1] × dims[i].
                </li>
              </ul>
            </li>
            <li>
              🔄 <b>Step 2:</b> <b>Fill by Chain Length</b>
              <ul>
                <li>Start with chain length 2 (pairs of matrices).</li>
                <li>
                  For each subchain (i, j), try every possible split point k and
                  pick the one with minimum cost.
                </li>
                <li>
                  Cost = dp[i][k] + dp[k+1][j] + dims[i] × dims[k+1] ×
                  dims[j+1].
                </li>
              </ul>
            </li>
            <li>
              📝 <b>Step 3:</b> <b>Record Splits</b>
              <ul>
                <li>
                  Store the best k in a split table for backtracking.
                </li>
              </ul>
            </li>
            <li>
              🔍 <b>Step 4:</b> <b>Backtrack for Parenthesization</b>
              <ul>
                <li>
                  Recursively read the split table to determine optimal
                  grouping.
                </li>
                <li>dp[0][n-1] gives the minimum total cost.</li>
              </ul>
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="dp/matrixchain" />
      </Algorithm>
    </div>
  );
};

export default Page;
