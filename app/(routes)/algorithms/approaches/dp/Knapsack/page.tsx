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
  const [weights, setWeights] = useState([2, 3, 4, 5]);
  const [values, setValues] = useState([3, 4, 5, 6]);
  const [capacity, setCapacity] = useState(8);
  const [weightsInput, setWeightsInput] = useState("2, 3, 4, 5");
  const [valuesInput, setValuesInput] = useState("3, 4, 5, 6");
  const [capacityInput, setCapacityInput] = useState("8");
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("Press Next to start!");

  const solve = useMemo(() => {
    const n = weights.length;
    const dp: number[][] = Array.from({ length: n + 1 }, () =>
      Array(capacity + 1).fill(0),
    );

    const steps: {
      i: number;
      j: number;
      dp: number[][];
      msg: string;
    }[] = [];

    steps.push({
      i: -1,
      j: -1,
      dp: dp.map((r) => [...r]),
      msg: "Initialized DP table with zeros. Base case: 0 items or 0 capacity = 0 value.",
    });

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= capacity; j++) {
        if (weights[i - 1] <= j) {
          const include = values[i - 1] + dp[i - 1][j - weights[i - 1]];
          const exclude = dp[i - 1][j];
          if (include > exclude) {
            dp[i][j] = include;
            steps.push({
              i,
              j,
              dp: dp.map((r) => [...r]),
              msg: `dp[${i}][${j}] = ${dp[i][j]}. Included item ${i} (w=${weights[i - 1]}, v=${values[i - 1]}). ${values[i - 1]} + dp[${i - 1}][${j - weights[i - 1]}] = ${include} > ${exclude}.`,
            });
          } else {
            dp[i][j] = exclude;
            steps.push({
              i,
              j,
              dp: dp.map((r) => [...r]),
              msg: `dp[${i}][${j}] = ${dp[i][j]}. Excluded item ${i}. dp[${i - 1}][${j}] = ${exclude} >= ${include}.`,
            });
          }
        } else {
          dp[i][j] = dp[i - 1][j];
          steps.push({
            i,
            j,
            dp: dp.map((r) => [...r]),
            msg: `dp[${i}][${j}] = ${dp[i][j]}. Item ${i} (w=${weights[i - 1]}) too heavy for capacity ${j}. Carried from above.`,
          });
        }
      }
    }

    const selected: number[] = [];
    let ci = n,
      cj = capacity;
    while (ci > 0 && cj > 0) {
      if (dp[ci][cj] !== dp[ci - 1][cj]) {
        selected.push(ci);
        cj -= weights[ci - 1];
      }
      ci--;
    }
    selected.reverse();

    steps.push({
      i: -1,
      j: -1,
      dp: dp.map((r) => [...r]),
      msg: `Done! Max value = ${dp[n][capacity]}. Items selected: [${selected.join(", ")}].`,
    });

    return { steps, selected, finalDp: dp };
  }, [weights, values, capacity]);

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
    if (!regex.test(weightsInput) || !regex.test(valuesInput)) {
      setMessage("Invalid input! Use comma-separated numbers.");
      return;
    }
    const w = weightsInput.split(",").map((s) => parseInt(s.trim(), 10));
    const v = valuesInput.split(",").map((s) => parseInt(s.trim(), 10));
    const cap = parseInt(capacityInput, 10);
    if (w.length !== v.length) {
      setMessage("Weights and values must have the same length!");
      return;
    }
    if (isNaN(cap) || cap < 0) {
      setMessage("Invalid capacity!");
      return;
    }
    setWeights(w);
    setValues(v);
    setCapacity(cap);
    setStep(0);
    setMessage("Input applied! Press Next to start.");
  };

  const isFinished = step >= solve.steps.length - 1;

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="0/1 Knapsack">
          <li>
            Given items with weights and values, select a subset to maximize
            total value without exceeding a weight capacity.
          </li>
          <li>
            Each item can either be taken (1) or left (0) — hence &ldquo;0/1&rdquo;.
          </li>
          <li>
            We build a DP table where dp[i][j] represents the maximum value
            achievable using the first i items with capacity j.
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              Time Complexity: O(n × W) <br /> Space Complexity: O(n × W){" "}
              <br />
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Custom Input" accentColor="bg-green-400" class="">
            <>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold">
                    Weights (comma separated):
                  </label>
                  <input
                    className="input"
                    type="text"
                    value={weightsInput}
                    onChange={(e) => setWeightsInput(e.target.value)}
                    placeholder="2, 3, 4, 5"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold">
                    Values (comma separated):
                  </label>
                  <input
                    className="input"
                    type="text"
                    value={valuesInput}
                    onChange={(e) => setValuesInput(e.target.value)}
                    placeholder="3, 4, 5, 6"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold">Capacity:</label>
                  <input
                    className="input"
                    type="text"
                    value={capacityInput}
                    onChange={(e) => setCapacityInput(e.target.value)}
                    placeholder="8"
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
          <div className="text-xl font-bold">Items</div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-center text-sm">
              <thead>
                <tr>
                  <th className="border p-2 dark:border-gray-600">Item</th>
                  {weights.map((_, i) => (
                    <th key={i} className="border p-2 dark:border-gray-600">
                      {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-bold dark:border-gray-600">
                    Weight
                  </td>
                  {weights.map((w, i) => (
                    <td key={i} className="border p-2 dark:border-gray-600">
                      {w}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 font-bold dark:border-gray-600">
                    Value
                  </td>
                  {values.map((v, i) => (
                    <td key={i} className="border p-2 dark:border-gray-600">
                      {v}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-xl font-bold">DP Table</div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-center text-sm">
              <thead>
                <tr>
                  <th className="border p-2 dark:border-gray-600">
                    Item \ Cap
                  </th>
                  {Array.from({ length: capacity + 1 }, (_, j) => (
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
                      {i === 0 ? "∅" : `Item ${i}`}
                    </td>
                    {row.map((val, j) => (
                      <td
                        key={j}
                        className={`border p-2 dark:border-gray-600 ${
                          current.i === i && current.j === j
                            ? "bg-red-300 font-bold dark:bg-green-700"
                            : isFinished &&
                                solve.selected.includes(i) &&
                                j === capacity
                              ? "bg-yellow-200 dark:bg-yellow-800"
                              : ""
                        }`}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isFinished && solve.selected.length > 0 && (
            <DoodleCard
              title="Backtracking Result"
              accentColor="bg-yellow-400"
              class=""
            >
              <>
                Items selected: [
                {solve.selected.map((idx) => `Item ${idx}`).join(", ")}]
                <br />
                Total weight:{" "}
                {solve.selected.reduce((s, idx) => s + weights[idx - 1], 0)}
                <br />
                Total value:{" "}
                {solve.selected.reduce((s, idx) => s + values[idx - 1], 0)}
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
              🎒 <b>Step 1:</b> <b>Set Up Your Table</b>
              <ul>
                <li>
                  Create a table with rows for each item (+ one for &ldquo;no
                  items&rdquo;) and columns for each capacity from 0 to W.
                </li>
                <li>Initialize all cells to 0.</li>
              </ul>
            </li>
            <li>
              🔄 <b>Step 2:</b> <b>Fill the Table</b>
              <ul>
                <li>
                  For each item i at capacity j: if weight[i] ≤ j, choose the
                  max of including vs excluding the item.
                </li>
                <li>
                  Include: value[i] + dp[i-1][j - weight[i]]. Exclude:
                  dp[i-1][j].
                </li>
              </ul>
            </li>
            <li>
              🔍 <b>Step 3:</b> <b>Backtrack</b>
              <ul>
                <li>
                  Start at dp[n][W]. If dp[i][j] ≠ dp[i-1][j], item i was
                  included.
                </li>
                <li>Move up and left accordingly to find all selected items.</li>
              </ul>
            </li>
            <li>
              🎉 <b>Step 4:</b> <b>Read the Answer</b>
              <ul>
                <li>dp[n][W] is the maximum value achievable.</li>
                <li>The backtracking gives the exact items to pick.</li>
              </ul>
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="dp/knapsack" />
      </Algorithm>
    </div>
  );
};

export default Page;
