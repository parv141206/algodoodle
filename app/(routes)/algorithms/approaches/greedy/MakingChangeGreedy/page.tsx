"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import DoodleArray from "@/app/_components/Doodles/Array";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { FC, useState, useMemo } from "react";
import { useMediaQuery } from "react-responsive";

const Page: FC = () => {
  const [coinsInput, setCoinsInput] = useState<string>("1, 5, 10, 25");
  const [targetInput, setTargetInput] = useState<number>(30);
  const [step, setStep] = useState(0);

  const isPhone = useMediaQuery({ query: "(max-width: 767px)" });

  const solve = useMemo(() => {
    // parse user input into sorted array (descending order for greedy)
    const coins = coinsInput.split(",").map(s => Number(s.trim())).filter(n => !isNaN(n)).sort((a,b) => b - a);
    let amount = targetInput;

    const steps: {
      coinsArr: number[];
      pointerIndex: number;
      remainingAmount: number;
      collected: number[];
      message: string;
    }[] = [];

    steps.push({
      coinsArr: coins,
      pointerIndex: -1,
      remainingAmount: amount,
      collected: [],
      message: `Initial state: Target amount is ${amount}. Sorted coins descending: [${coins.join(', ')}].`,
    });

    const collected: number[] = [];

    for (let i = 0; i < coins.length; i++) {
        const coin = coins[i];

        steps.push({
            coinsArr: coins,
            pointerIndex: i,
            remainingAmount: amount,
            collected: [...collected],
            message: `Inspecting coin: ${coin}. Wait... can we use it?`,
        });

        if (amount === 0) break;

        while (amount >= coin) {
            amount -= coin;
            collected.push(coin);
            
            steps.push({
                coinsArr: coins,
                pointerIndex: i,
                remainingAmount: amount,
                collected: [...collected],
                message: `Yes! Greedily taking one ${coin} coin. Remaining amount: ${amount}.`,
            });
        }

        if (amount > 0 && amount < coin) {
            steps.push({
                coinsArr: coins,
                pointerIndex: i,
                remainingAmount: amount,
                collected: [...collected],
                message: `Remaining amount (${amount}) is less than coin ${coin}. Moving to next smaller coin.`,
            });
        }
    }

    if (amount === 0) {
        steps.push({
            coinsArr: coins,
            pointerIndex: -1,
            remainingAmount: amount,
            collected: [...collected],
            message: `Success! Change made optimally (for standard systems) using ${collected.length} coins: [${collected.join(', ')}].`,
        });
    } else {
        steps.push({
            coinsArr: coins,
            pointerIndex: -1,
            remainingAmount: amount,
            collected: [...collected],
            message: `Failed! Greedy search couldn't make exact change. Amount left: ${amount}. Note: Greedy is not always optimal for non-standard coin systems!`,
        });
    }


    return steps;
  }, [coinsInput, targetInput]);

  const current = solve[Math.min(step, solve.length - 1)];

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Making Change (Greedy)">
          <li>
            The Greedy approach to making change attempts to minimize the number of coins by always taking the highest-value coin possible first.
          </li>
          <li>
            For standard currency systems (like US coins: 1, 5, 10, 25), this greedy approach is perfectly optimal.
          </li>
          <li>
            However, for arbitrary, custom coin systems (e.g. coins: 1, 3, 4 and target: 6), it may fail to find the mathematical minimum (Greedy uses 4+1+1=3 coins, DP uses 3+3=2 coins).
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              System: Greedy Optimization <br /> 
              Time Complexity: O(n log n) to sort, O(Amount/MinCoin) to subtract. <br />
              Space Complexity: O(1) <br />{" "}
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Custom Input" accentColor="bg-yellow-400" class="">
            <div className="flex flex-col gap-3">
              <label className="font-bold">Coins (comma separated):</label>
              <input type="text" className="input" value={coinsInput} onChange={e => {setCoinsInput(e.target.value); setStep(0);}} />
              <label className="font-bold">Target Amount:</label>
              <input type="number" className="input" value={targetInput} onChange={e => {setTargetInput(Number(e.target.value) || 0); setStep(0);}} />
            </div>
          </DoodleCard>
          
          <DoodleCard title="Current Execution Status" accentColor="bg-emerald-400" class="">
            <>
              Step: {step} / {solve.length - 1} <br />
              Target Amount Remaining: {current.remainingAmount} <br />
              <span className="font-bold dark:text-yellow-200">Collected Coins: [ {current.collected.join(", ")} ]</span><br/>
              {current.message}
            </>
          </DoodleCard>

          <b>Sorted Denominations Array:</b>
          <DoodleArray
            arr={current.coinsArr}
            pointer_1={current.pointerIndex}
            pointer_2={-1}
            direction={isPhone ? "column" : "row"}
            highlight_1={current.pointerIndex}
            highlight_2={-1}
          />
          
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
              📍 <b>Step 1: Sort by Value</b> Sort the available coin denominations in descending order.
            </li>
            <li>
              🧱 <b>Step 2: Start Largest</b> Pick the largest coin denominator first.
            </li>
            <li>
              🔁 <b>Step 3: Greedily Accumulate</b> While the remaining target amount is greater than or equal to the selected coin, subtract the coin value and add it to your collection.
            </li>
            <li>
              🧩 <b>Step 4: Shift Smaller</b> Once the current coin is larger than the remaining amount, move to the next smallest coin denomination.
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="approaches/greedy/makingchange" />
      </Algorithm>
    </div>
  );
};

export default Page;
