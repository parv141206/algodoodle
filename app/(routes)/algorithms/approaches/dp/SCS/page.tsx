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
  const [strA, setStrA] = useState("ABCBDAB");
  const [strB, setStrB] = useState("BDCAB");
  const [inputA, setInputA] = useState("ABCBDAB");
  const [inputB, setInputB] = useState("BDCAB");
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("Press Next to start!");

  const solve = useMemo(() => {
    const m = strA.length;
    const n = strB.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () =>
      Array(n + 1).fill(0),
    );
    const arrow: string[][] = Array.from({ length: m + 1 }, () =>
      Array(n + 1).fill(""),
    );

    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
      if (i > 0) arrow[i][0] = "↑";
    }
    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
      if (j > 0) arrow[0][j] = "←";
    }

    const steps: {
      i: number;
      j: number;
      dp: number[][];
      arrow: string[][];
      msg: string;
    }[] = [];

    steps.push({
      i: -1,
      j: -1,
      dp: dp.map((r) => [...r]),
      arrow: arrow.map((r) => [...r]),
      msg: "Initialized DP table. Base cases: dp[i][0] = i, dp[0][j] = j (include all characters from one string).",
    });

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (strA[i - 1] === strB[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          arrow[i][j] = "↖";
          steps.push({
            i,
            j,
            dp: dp.map((r) => [...r]),
            arrow: arrow.map((r) => [...r]),
            msg: `dp[${i}][${j}] = ${dp[i][j]}. '${strA[i - 1]}' == '${strB[j - 1]}' → diagonal ↖ (dp[${i - 1}][${j - 1}] + 1, shared character).`,
          });
        } else if (dp[i - 1][j] <= dp[i][j - 1]) {
          dp[i][j] = dp[i - 1][j] + 1;
          arrow[i][j] = "↑";
          steps.push({
            i,
            j,
            dp: dp.map((r) => [...r]),
            arrow: arrow.map((r) => [...r]),
            msg: `dp[${i}][${j}] = ${dp[i][j]}. '${strA[i - 1]}' ≠ '${strB[j - 1]}' → up ↑ (take '${strA[i - 1]}' from A, dp[${i - 1}][${j}] + 1 = ${dp[i][j]}).`,
          });
        } else {
          dp[i][j] = dp[i][j - 1] + 1;
          arrow[i][j] = "←";
          steps.push({
            i,
            j,
            dp: dp.map((r) => [...r]),
            arrow: arrow.map((r) => [...r]),
            msg: `dp[${i}][${j}] = ${dp[i][j]}. '${strA[i - 1]}' ≠ '${strB[j - 1]}' → left ← (take '${strB[j - 1]}' from B, dp[${i}][${j - 1}] + 1 = ${dp[i][j]}).`,
          });
        }
      }
    }

    let scs = "";
    let ci = m,
      cj = n;
    const path: [number, number][] = [];
    while (ci > 0 && cj > 0) {
      path.push([ci, cj]);
      if (arrow[ci][cj] === "↖") {
        scs = strA[ci - 1] + scs;
        ci--;
        cj--;
      } else if (arrow[ci][cj] === "↑") {
        scs = strA[ci - 1] + scs;
        ci--;
      } else {
        scs = strB[cj - 1] + scs;
        cj--;
      }
    }
    while (ci > 0) {
      path.push([ci, 0]);
      scs = strA[ci - 1] + scs;
      ci--;
    }
    while (cj > 0) {
      path.push([0, cj]);
      scs = strB[cj - 1] + scs;
      cj--;
    }

    steps.push({
      i: -1,
      j: -1,
      dp: dp.map((r) => [...r]),
      arrow: arrow.map((r) => [...r]),
      msg: `Done! SCS length = ${dp[m][n]}. SCS = "${scs}".`,
    });

    return { steps, scs, path };
  }, [strA, strB]);

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
    if (inputA.length === 0 || inputB.length === 0) {
      setMessage("Both strings must be non-empty!");
      return;
    }
    setStrA(inputA.toUpperCase());
    setStrB(inputB.toUpperCase());
    setStep(0);
    setMessage("Input applied! Press Next to start.");
  };

  const isFinished = step >= solve.steps.length - 1;
  const pathSet = new Set(solve.path.map(([i, j]) => `${i},${j}`));

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Shortest Common Supersequence (SCS)">
          <li>
            Given two sequences, find the shortest sequence that contains both
            as subsequences.
          </li>
          <li>
            SCS builds on LCS — the SCS length is m + n - LCS length.
          </li>
          <li>
            The DP table stores SCS lengths, and backtracking via arrows
            reconstructs the actual supersequence.
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              Time Complexity: O(m × n) <br /> Space Complexity: O(m × n){" "}
              <br />
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Custom Input" accentColor="bg-green-400" class="">
            <>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold">String A:</label>
                  <input
                    className="input"
                    type="text"
                    value={inputA}
                    onChange={(e) => setInputA(e.target.value)}
                    placeholder="ABCBDAB"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold">String B:</label>
                  <input
                    className="input"
                    type="text"
                    value={inputB}
                    onChange={(e) => setInputB(e.target.value)}
                    placeholder="BDCAB"
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
          <div className="text-xl font-bold">DP Table</div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-center text-sm">
              <thead>
                <tr>
                  <th className="border p-2 dark:border-gray-600"></th>
                  <th className="border p-2 dark:border-gray-600">∅</th>
                  {strB.split("").map((c, j) => (
                    <th key={j} className="border p-2 dark:border-gray-600">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.dp.map((row, i) => (
                  <tr key={i}>
                    <td className="border p-2 font-bold dark:border-gray-600">
                      {i === 0 ? "∅" : strA[i - 1]}
                    </td>
                    {row.map((val, j) => (
                      <td
                        key={j}
                        className={`border p-2 dark:border-gray-600 ${
                          current.i === i && current.j === j
                            ? "bg-red-300 font-bold dark:bg-green-700"
                            : isFinished && pathSet.has(`${i},${j}`)
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
          <div className="text-xl font-bold">Arrow Table</div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-center text-sm">
              <thead>
                <tr>
                  <th className="border p-2 dark:border-gray-600"></th>
                  <th className="border p-2 dark:border-gray-600">∅</th>
                  {strB.split("").map((c, j) => (
                    <th key={j} className="border p-2 dark:border-gray-600">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.arrow.map((row, i) => (
                  <tr key={i}>
                    <td className="border p-2 font-bold dark:border-gray-600">
                      {i === 0 ? "∅" : strA[i - 1]}
                    </td>
                    {row.map((val, j) => (
                      <td
                        key={j}
                        className={`border p-2 dark:border-gray-600 ${
                          current.i === i && current.j === j
                            ? "bg-red-300 font-bold dark:bg-green-700"
                            : isFinished && pathSet.has(`${i},${j}`)
                              ? "bg-yellow-200 dark:bg-yellow-800"
                              : ""
                        }`}
                      >
                        {val || "—"}
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
                SCS: &ldquo;{solve.scs}&rdquo;
                <br />
                Length: {solve.scs.length}
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
              🔗 <b>Step 1:</b> <b>Set Up the Table</b>
              <ul>
                <li>
                  Create a (m+1) × (n+1) table. dp[i][0] = i and dp[0][j] = j
                  (base cases: the entire other string must be included).
                </li>
              </ul>
            </li>
            <li>
              🔄 <b>Step 2:</b> <b>Fill the Table</b>
              <ul>
                <li>
                  If characters match: dp[i][j] = dp[i-1][j-1] + 1, arrow = ↖
                  (shared character).
                </li>
                <li>
                  If not: take the minimum of dp[i-1][j] + 1 (↑, add from A) or
                  dp[i][j-1] + 1 (←, add from B).
                </li>
              </ul>
            </li>
            <li>
              🔍 <b>Step 3:</b> <b>Backtrack via Arrows</b>
              <ul>
                <li>
                  Start at dp[m][n]. ↖ means add the shared character once. ↑
                  means add from A. ← means add from B.
                </li>
                <li>When one string is exhausted, append the rest of the other.</li>
              </ul>
            </li>
            <li>
              🎉 <b>Step 4:</b> <b>Read the SCS</b>
              <ul>
                <li>
                  The collected characters form the shortest common
                  supersequence.
                </li>
              </ul>
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="dp/scs" />
      </Algorithm>
    </div>
  );
};

export default Page;
