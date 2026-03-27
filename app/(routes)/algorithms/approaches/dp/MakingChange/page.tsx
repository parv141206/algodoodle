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
  const [coins, setCoins] = useState([1, 5, 10, 25]);
  const [amount, setAmount] = useState(30);
  const [coinInput, setCoinInput] = useState("1, 5, 10, 25");
  const [amountInput, setAmountInput] = useState("30");
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("Press Next to start!");

  const solve = useMemo(() => {
    const n = coins.length;
    const dp: number[][] = Array.from({ length: n + 1 }, () =>
      Array(amount + 1).fill(Infinity),
    );
    const choice: number[][] = Array.from({ length: n + 1 }, () =>
      Array(amount + 1).fill(-1),
    );

    for (let i = 0; i <= n; i++) dp[i][0] = 0;

    const steps: {
      i: number;
      j: number;
      dp: number[][];
      choice: number[][];
      msg: string;
    }[] = [];

    steps.push({
      i: -1,
      j: -1,
      dp: dp.map((r) => [...r]),
      choice: choice.map((r) => [...r]),
      msg: "Initialized DP table. Base case: dp[i][0] = 0 for all i.",
    });

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= amount; j++) {
        dp[i][j] = dp[i - 1][j];
        choice[i][j] = -1;
        if (coins[i - 1] <= j && dp[i][j - coins[i - 1]] + 1 < dp[i][j]) {
          dp[i][j] = dp[i][j - coins[i - 1]] + 1;
          choice[i][j] = i;
        }
        steps.push({
          i,
          j,
          dp: dp.map((r) => [...r]),
          choice: choice.map((r) => [...r]),
          msg:
            dp[i][j] === Infinity
              ? `dp[${i}][${j}]: Cannot make amount ${j} with coins up to ${coins[i - 1]}.`
              : choice[i][j] === i
                ? `dp[${i}][${j}] = ${dp[i][j]}. Used coin ${coins[i - 1]} (from dp[${i}][${j - coins[i - 1]}] + 1).`
                : `dp[${i}][${j}] = ${dp[i][j]}. Carried from row above (not using coin ${coins[i - 1]}).`,
        });
      }
    }

    const result: number[] = [];
    let ci = n,
      cj = amount;
    while (cj > 0 && ci > 0) {
      if (choice[ci][cj] === ci) {
        result.push(coins[ci - 1]);
        cj -= coins[ci - 1];
      } else {
        ci--;
      }
    }

    steps.push({
      i: -1,
      j: -1,
      dp: dp.map((r) => [...r]),
      choice: choice.map((r) => [...r]),
      msg:
        dp[n][amount] === Infinity
          ? `Cannot make amount ${amount} with the given coins.`
          : `Done! Minimum coins = ${dp[n][amount]}. Coins used: [${result.join(", ")}].`,
    });

    return { steps, backtrack: result, finalDp: dp, finalChoice: choice };
  }, [coins, amount]);

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
    if (!regex.test(coinInput)) {
      setMessage("Invalid coins! Use comma-separated numbers like: 1, 5, 10");
      return;
    }
    const parsed = coinInput
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => n > 0);
    const amt = parseInt(amountInput, 10);
    if (isNaN(amt) || amt < 0) {
      setMessage("Invalid amount!");
      return;
    }
    if (parsed.length === 0) {
      setMessage("Provide at least one coin!");
      return;
    }
    setCoins(parsed);
    setAmount(amt);
    setStep(0);
    setMessage("Input applied! Press Next to start.");
  };

  const isFinished = step >= solve.steps.length - 1;

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Making Change">
          <li>
            Given a set of coin denominations and a target amount, find the
            minimum number of coins needed to make that amount.
          </li>
          <li>
            This is a classic DP problem where we build a table bottom-up,
            considering each coin denomination one by one.
          </li>
          <li>
            Backtracking through the choice table reveals which coins were
            actually used.
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              Time Complexity: O(n × amount) <br /> Space Complexity: O(n ×
              amount) <br />
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Custom Input" accentColor="bg-green-400" class="">
            <>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold">
                    Coins (comma separated):
                  </label>
                  <input
                    className="input"
                    type="text"
                    value={coinInput}
                    onChange={(e) => setCoinInput(e.target.value)}
                    placeholder="1, 5, 10, 25"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold">Target Amount:</label>
                  <input
                    className="input"
                    type="text"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    placeholder="30"
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
                  <th className="border p-2 dark:border-gray-600">Coin \ Amt</th>
                  {Array.from({ length: amount + 1 }, (_, j) => (
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
                      {i === 0 ? "∅" : coins[i - 1]}
                    </td>
                    {row.map((val, j) => (
                      <td
                        key={j}
                        className={`border p-2 dark:border-gray-600 ${
                          current.i === i && current.j === j
                            ? "bg-red-300 font-bold dark:bg-green-700"
                            : ""
                        }`}
                      >
                        {val === Infinity ? "∞" : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isFinished && solve.backtrack.length > 0 && (
            <DoodleCard
              title="Backtracking Result"
              accentColor="bg-yellow-400"
              class=""
            >
              <>
                Coins used: [{solve.backtrack.join(", ")}]<br />
                Total coins: {solve.backtrack.length}
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
              🪙 <b>Step 1:</b> <b>Set Up Your Table</b>
              <ul>
                <li>
                  Create a table with rows for each coin denomination and columns
                  for amounts from 0 to target.
                </li>
                <li>
                  Initialize the first column (amount = 0) to 0 — zero coins
                  needed for amount 0.
                </li>
                <li>Initialize all other cells to infinity (∞).</li>
              </ul>
            </li>
            <li>
              🔄 <b>Step 2:</b> <b>Fill the Table</b>
              <ul>
                <li>
                  For each coin, for each amount, decide: skip this coin or use
                  it.
                </li>
                <li>
                  If coin value ≤ current amount, take the min of skipping
                  (dp[i-1][j]) vs using it (dp[i][j-coin] + 1).
                </li>
              </ul>
            </li>
            <li>
              🔍 <b>Step 3:</b> <b>Backtrack</b>
              <ul>
                <li>
                  Start from dp[n][amount] and trace back through the choice
                  table.
                </li>
                <li>
                  If a coin was used at this cell, add it to the result and move
                  left by coin value.
                </li>
                <li>Otherwise, move up to the previous row.</li>
              </ul>
            </li>
            <li>
              🎉 <b>Step 4:</b> <b>Read the Answer</b>
              <ul>
                <li>
                  The value at dp[n][amount] gives the minimum number of coins.
                </li>
                <li>
                  The backtracking gives you the exact coins used.
                </li>
              </ul>
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="dp/makingchange" />
      </Algorithm>
    </div>
  );
};

export default Page;
