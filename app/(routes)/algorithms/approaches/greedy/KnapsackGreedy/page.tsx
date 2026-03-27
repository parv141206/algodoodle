"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { FC, useState, useMemo } from "react";

interface Item {
    id: number;
    weight: number;
    value: number;
    ratio: number;
}

const Page: FC = () => {
  const [weightsInput, setWeightsInput] = useState<string>("10, 20, 30");
  const [valuesInput, setValuesInput] = useState<string>("60, 100, 120");
  const [capacityInput, setCapacityInput] = useState<number>(50);
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"Fractional" | "0/1">("Fractional");

  const solve = useMemo(() => {
    const weights = weightsInput.split(",").map(s => Number(s.trim())).filter(n => !isNaN(n));
    const values = valuesInput.split(",").map(s => Number(s.trim())).filter(n => !isNaN(n));
    let W = capacityInput;

    const items: Item[] = weights.map((w, i) => ({
        id: i + 1,
        weight: w,
        value: values[i] || 0,
        ratio: (values[i] || 0) / w
    })).sort((a,b) => b.ratio - a.ratio); // Sort greedy by ratio

    const steps: {
      items: Item[];
      currentIndex: number;
      collectedValue: number;
      remainingCapacity: number;
      log: string;
      fractionSelected: number[]; // e.g. 1 means 100%, 0.5 means 50%
    }[] = [];

    steps.push({
      items,
      currentIndex: -1,
      collectedValue: 0,
      remainingCapacity: W,
      log: `Initial conditions: Capacity W = ${W}. Sorted items descending by value/weight ratio.`,
      fractionSelected: Array(items.length).fill(0),
    });

    let currentVal = 0;
    const fractions = Array(items.length).fill(0);

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        steps.push({
            items,
            currentIndex: i,
            collectedValue: currentVal,
            remainingCapacity: W,
            log: `Considering Item ${item.id}: Weight=${item.weight}, Value=${item.value}, Ratio=${item.ratio.toFixed(2)}. Can we fit it?`,
            fractionSelected: [...fractions],
        });

        if (W >= item.weight) {
            // Full item can fit
            W -= item.weight;
            currentVal += item.value;
            fractions[i] = 1;

            steps.push({
                items,
                currentIndex: i,
                collectedValue: currentVal,
                remainingCapacity: W,
                log: `Yes! Greedily taking entire Item ${item.id}. Remaining Capacity: ${W}, Total Value: ${currentVal.toFixed(2)}.`,
                fractionSelected: [...fractions],
            });
        } else {
            // Can't fit fully
            if (mode === "Fractional") {
                const fraction = W / item.weight;
                const valueGained = item.value * fraction;
                currentVal += valueGained;
                fractions[i] = fraction;
                W = 0; // knapsack full

                steps.push({
                    items,
                    currentIndex: i,
                    collectedValue: currentVal,
                    remainingCapacity: W,
                    log: `Only ${fraction * 100}% of Item ${item.id} fits. Taking fraction for profit ${valueGained.toFixed(2)}. Bag is FULL.`,
                    fractionSelected: [...fractions],
                });
                break; 
            } else {
                // 0/1 Greedy - can't take fractions, must skip
                steps.push({
                    items,
                    currentIndex: i,
                    collectedValue: currentVal,
                    remainingCapacity: W,
                    log: `Item ${item.id} (weight ${item.weight}) doesn't entirely fit in remaining capacity (${W}). Skipping in 0/1 Knapsack Greedy.`,
                    fractionSelected: [...fractions],
                });
            }
        }
    }

    steps.push({
        items,
        currentIndex: -1,
        collectedValue: currentVal,
        remainingCapacity: W,
        log: `Done! ${mode} Knapsack Greedy achieved a Total Value of ${currentVal.toFixed(2)}. Remember: 0/1 Greedy is NOT always optimal, DP is needed!`,
        fractionSelected: [...fractions],
    });

    return steps;
  }, [weightsInput, valuesInput, capacityInput, mode]);

  const current = solve[Math.min(step, solve.length - 1)];

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Knapsack (Greedy - Fractional & 0/1)">
          <li>
            The Greedy approach for Knapsack problems involves sorting all items based on their **Value/Weight Ratio**.
          </li>
          <li>
            In **Fractional Knapsack**, picking items greedily by ratio and breaking the last item into a fraction is mathematically GUARANTEED to give the optimal max profit.
          </li>
          <li>
            In **0/1 Knapsack**, we cannot break items. The Greedy Approach skips items that do not fit. This is SUBOPTIMAL and does not guarantee the max profit (which requires Dynamic Programming).
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              System: Greedy Sorting <br /> 
              Time Complexity: O(n log n) for sorting ratios <br />
              Space Complexity: O(1) <br />{" "}
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Custom Inputs & Controls" accentColor="bg-yellow-400" class="">
            <div className="flex flex-col gap-3">
              <div className="flex gap-4">
                <label className="font-bold">Mode:</label>
                <select className="input rounded w-32" value={mode} onChange={e => {setMode(e.target.value as any); setStep(0);}}>
                    <option value="Fractional">Fractional</option>
                    <option value="0/1">0/1 Knapsack</option>
                </select>
              </div>
              <label className="font-bold text-sm">Weights (comma separated):</label>
              <input type="text" className="input" value={weightsInput} onChange={e => {setWeightsInput(e.target.value); setStep(0);}} />
              <label className="font-bold text-sm">Values (comma separated):</label>
              <input type="text" className="input" value={valuesInput} onChange={e => {setValuesInput(e.target.value); setStep(0);}} />
              <label className="font-bold text-sm">Knapsack Capacity:</label>
              <input type="number" className="input" value={capacityInput} onChange={e => {setCapacityInput(Number(e.target.value) || 0); setStep(0);}} />
            </div>
          </DoodleCard>

          <DoodleCard title="Current Status" accentColor="bg-emerald-400" class="">
            <>
              Step: {step} / {solve.length - 1} <br />
              <div className="text-xl font-bold my-2 text-blue-800 dark:text-blue-300">
                Total Value Collected: {current.collectedValue.toFixed(2)}
              </div>
              Remaining Bag Capacity: {current.remainingCapacity.toFixed(2)} <br/>
              <b>Log:</b> {current.log}
            </>
          </DoodleCard>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full border-collapse text-center text-sm">
                <thead>
                    <tr>
                        <th className="border p-2 dark:border-gray-600">Item ID</th>
                        <th className="border p-2 dark:border-gray-600">Weight</th>
                        <th className="border p-2 dark:border-gray-600">Value</th>
                        <th className="border p-2 dark:border-gray-600">Ratio (Val/Wgt)</th>
                        <th className="border p-2 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-black dark:text-white">Amount Taken</th>
                    </tr>
                </thead>
                <tbody>
                    {current.items.map((item, idx) => (
                        <tr key={idx} className={current.currentIndex === idx ? "bg-red-200 dark:bg-red-800 font-bold" : ""}>
                            <td className="border p-2 dark:border-gray-600">Item {item.id}</td>
                            <td className="border p-2 dark:border-gray-600">{item.weight}</td>
                            <td className="border p-2 dark:border-gray-600">{item.value}</td>
                            <td className="border p-2 dark:border-gray-600">{item.ratio.toFixed(2)}</td>
                            <td className="border p-2 dark:border-gray-600 text-blue-600 dark:text-blue-400 font-bold">
                                {current.fractionSelected[idx] === 0 ? "0%" : `${(current.fractionSelected[idx] * 100).toFixed(0)}%`}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
          
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
              📍 <b>Step 1: Compute Ratios</b> Calculate the Value-to-Weight ratio for all items.
            </li>
            <li>
              🧱 <b>Step 2: Sort</b> Sort items in descending order based on their value/weight ratio. You prioritize items that offer maximum "bang for your buck".
            </li>
            <li>
              🔁 <b>Step 3: Pack Full Items </b> Traverse the sorted item list. If an item completely fits in the knapsack, pack it entirely.
            </li>
            <li>
              🧩 <b>Step 4: Fractions / Skip</b> If an item exceeds remaining capacity: in Fractional knapsack, take just enough to fill remaining capacity. In 0/1 knapsack, skip it entirely and check the next item.
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="approaches/greedy/knapsackgreedy" />
      </Algorithm>
    </div>
  );
};

export default Page;
