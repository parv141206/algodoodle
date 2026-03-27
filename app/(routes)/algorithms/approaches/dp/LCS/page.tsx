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
      msg: "Initialized DP table with zeros. First row and column are base cases (empty string).",
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
            msg: `dp[${i}][${j}] = ${dp[i][j]}. '${strA[i - 1]}' == '${strB[j - 1]}' → diagonal ↖ (dp[${i - 1}][${j - 1}] + 1).`,
          });
        } else if (dp[i - 1][j] >= dp[i][j - 1]) {
          dp[i][j] = dp[i - 1][j];
          arrow[i][j] = "↑";
          steps.push({
            i,
            j,
            dp: dp.map((r) => [...r]),
            arrow: arrow.map((r) => [...r]),
            msg: `dp[${i}][${j}] = ${dp[i][j]}. '${strA[i - 1]}' ≠ '${strB[j - 1]}' → up ↑ (dp[${i - 1}][${j}] = ${dp[i - 1][j]}).`,
          });
        } else {
          dp[i][j] = dp[i][j - 1];
          arrow[i][j] = "←";
          steps.push({
            i,
            j,
            dp: dp.map((r) => [...r]),
            arrow: arrow.map((r) => [...r]),
            msg: `dp[${i}][${j}] = ${dp[i][j]}. '${strA[i - 1]}' ≠ '${strB[j - 1]}' → left ← (dp[${i}][${j - 1}] = ${dp[i][j - 1]}).`,
          });
        }
      }
    }

    let lcs = "";
    let ci = m,
      cj = n;
    const path: [number, number][] = [];
    while (ci > 0 && cj > 0) {
      path.push([ci, cj]);
      if (arrow[ci][cj] === "↖") {
        lcs = strA[ci - 1] + lcs;
        ci--;
        cj--;
      } else if (arrow[ci][cj] === "↑") {
        ci--;
      } else {
        cj--;
      }
    }

    steps.push({
      i: -1,
      j: -1,
      dp: dp.map((r) => [...r]),
      arrow: arrow.map((r) => [...r]),
      msg: `Done! LCS length = ${dp[m][n]}. LCS = "${lcs}".`,
    });

    return { steps, lcs, path };
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
        <AlgorithmInfo title="Longest Common Subsequence (LCS)">
          <li>
            Given two sequences, find the longest subsequence common to both.
          </li>
          <li>
            A subsequence appears in the same relative order but is not
            necessarily contiguous.
          </li>
          <li>
            The DP table stores lengths, and the arrow table records directions
            for backtracking to reconstruct the LCS.
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
                LCS: &ldquo;{solve.lcs}&rdquo;
                <br />
                Length: {solve.lcs.length}
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
              🔤 <b>Step 1:</b> <b>Set Up the Table</b>
              <ul>
                <li>
                  Create a (m+1) × (n+1) table, where m and n are the lengths of
                  the two strings.
                </li>
                <li>
                  First row and column are all zeros (comparing with empty
                  string).
                </li>
              </ul>
            </li>
            <li>
              🔄 <b>Step 2:</b> <b>Fill the Table</b>
              <ul>
                <li>
                  If characters match: dp[i][j] = dp[i-1][j-1] + 1, arrow = ↖.
                </li>
                <li>
                  If not: dp[i][j] = max(dp[i-1][j], dp[i][j-1]), arrow = ↑ or
                  ←.
                </li>
              </ul>
            </li>
            <li>
              🔍 <b>Step 3:</b> <b>Backtrack via Arrows</b>
              <ul>
                <li>
                  Start at dp[m][n]. Follow ↖ arrows to collect matching
                  characters.
                </li>
                <li>↑ means move up, ← means move left.</li>
              </ul>
            </li>
            <li>
              🎉 <b>Step 4:</b> <b>Read the LCS</b>
              <ul>
                <li>
                  The characters collected during backtracking (in reverse) form
                  the LCS.
                </li>
              </ul>
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="dp/lcs" />
      </Algorithm>
    </div>
  );
};

export default Page;
