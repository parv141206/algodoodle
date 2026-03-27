"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import DoodleArray from "@/app/_components/Doodles/Array";
import RecursionTree, { RecursionNode } from "@/app/_components/Doodles/RecursionTree";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { FC, useState, useMemo, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import ArrayInputContext from "@/app/_contexts/ArrayInput";

const Page: FC = () => {
  const arrayInput = useContext(ArrayInputContext);
  const initialArr = arrayInput?.arrayInput || [1000, 11, 445, 1, 330, 3000];
  const [arr, setArr] = useState(initialArr);
  const [step, setStep] = useState(0);

  const isPhone = useMediaQuery({ query: "(max-width: 767px)" });

  const solve = useMemo(() => {
    const steps: {
      arr: number[];
      low: number;
      high: number;
      pointer1: number;
      pointer2: number;
      min: number;
      max: number;
      message: string;
      tree: RecursionNode;
      activeNodeId: string;
    }[] = [];

    const currentArr = [...arr];

    // Helper to deeply clone the recursion tree at every step
    const cloneTree = (t: RecursionNode): RecursionNode => ({
      ...t,
      children: t.children ? t.children.map(cloneTree) : undefined
    });

    const rootTree: RecursionNode = {
        id: `root-0-${currentArr.length - 1}`,
        label: `MinMax(0, ${currentArr.length - 1})`,
        children: []
    };

    steps.push({
      arr: [...currentArr],
      low: 0,
      high: currentArr.length - 1,
      pointer1: -1,
      pointer2: -1,
      min: Infinity,
      max: -Infinity,
      message: "Ready to find Min and Max using Divide and Conquer!",
      tree: cloneTree(rootTree),
      activeNodeId: rootTree.id
    });

    const getMinMax = (low: number, high: number, node: RecursionNode): { min: number; max: number } => {
      let result = { min: Infinity, max: -Infinity };

      steps.push({
        arr: [...currentArr],
        low,
        high,
        pointer1: low,
        pointer2: high,
        min: Infinity,
        max: -Infinity,
        message: `Analyzing subarray [${low}..${high}].`,
        tree: cloneTree(rootTree),
        activeNodeId: node.id
      });

      // Base case 1: If there is only one element
      if (low === high) {
        result.max = currentArr[low];
        result.min = currentArr[low];
        node.label = `[${currentArr[low]}] => Min:${result.min}, Max:${result.max}`;
        steps.push({
          arr: [...currentArr],
          low,
          high,
          pointer1: low,
          pointer2: -1,
          min: result.min,
          max: result.max,
          message: `Base case (1 element): min = max = ${result.min}.`,
          tree: cloneTree(rootTree),
          activeNodeId: node.id
        });
        return result;
      }

      // Base case 2: If there are two elements
      if (high === low + 1) {
        if (currentArr[low] > currentArr[high]) {
          result.max = currentArr[low];
          result.min = currentArr[high];
        } else {
          result.max = currentArr[high];
          result.min = currentArr[low];
        }
        node.label = `[${currentArr[low]}, ${currentArr[high]}] => Min:${result.min}, Max:${result.max}`;
        steps.push({
          arr: [...currentArr],
          low,
          high,
          pointer1: low,
          pointer2: high,
          min: result.min,
          max: result.max,
          message: `Base case (2 elements): compared ${currentArr[low]} and ${currentArr[high]}. Min=${result.min}, Max=${result.max}.`,
          tree: cloneTree(rootTree),
          activeNodeId: node.id
        });
        return result;
      }

      // Recursive case: more than 2 elements
      const mid = Math.floor((low + high) / 2);
      
      const leftNode: RecursionNode = { id: `L-${low}-${mid}`, label: `MinMax(${low}, ${mid})`, children: [] };
      const rightNode: RecursionNode = { id: `R-${mid + 1}-${high}`, label: `MinMax(${mid + 1}, ${high})`, children: [] };
      node.children = [leftNode, rightNode];

      steps.push({
        arr: [...currentArr],
        low,
        high,
        pointer1: mid,
        pointer2: -1,
        min: Infinity,
        max: -Infinity,
        message: `Dividing at mid = ${mid}. Going left [${low}..${mid}] and right [${mid + 1}..${high}].`,
        tree: cloneTree(rootTree),
        activeNodeId: node.id
      });

      const leftMinMax = getMinMax(low, mid, leftNode);
      const rightMinMax = getMinMax(mid + 1, high, rightNode);

      // Combine
      result.min = Math.min(leftMinMax.min, rightMinMax.min);
      result.max = Math.max(leftMinMax.max, rightMinMax.max);
      
      node.label = `Result: Min=${result.min}, Max=${result.max}`;

      steps.push({
        arr: [...currentArr],
        low,
        high,
        pointer1: low,
        pointer2: high,
        min: result.min,
        max: result.max,
        message: `Combined results for [${low}..${high}]: Left[min=${leftMinMax.min}, max=${leftMinMax.max}] & Right[min=${rightMinMax.min}, max=${rightMinMax.max}] => final Min=${result.min}, Max=${result.max}.`,
        tree: cloneTree(rootTree),
        activeNodeId: node.id
      });

      return result;
    };

    const finalResult = getMinMax(0, currentArr.length - 1, rootTree);
    rootTree.label = `Final: Min=${finalResult.min}, Max=${finalResult.max}`;

    steps.push({
      arr: [...currentArr],
      low: 0,
      high: currentArr.length - 1,
      pointer1: -1,
      pointer2: -1,
      min: finalResult.min,
      max: finalResult.max,
      message: `Finished! The overall Minimum is ${finalResult.min} and Maximum is ${finalResult.max}.`,
      tree: cloneTree(rootTree),
      activeNodeId: ""
    });

    return steps;
  }, [arr]);

  const current = solve[Math.min(step, solve.length - 1)];

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Min / Max (Divide and Conquer)">
          <li>
            This algorithm finds the minimum and maximum elements in an array simultaneously.
          </li>
          <li>
            Instead of simply iterating through the array (which takes 2n-2 comparisons), Divide and Conquer groups the search.
          </li>
          <li>
            By dividing the array into halves and returning two values (min, max) from each recursive call, the algorithm reduces the total number of comparisons to 3n/2 - 2 (faster in practice!).
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              Time Complexity: O(n) (but fewer comparisons!) <br /> 
              Comparisons: 3n/2 - 2 <br />
              Space Complexity: O(log n) <br />{" "}
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Current Step Details" accentColor="bg-emerald-400" class="">
            <>
              Step: {step} / {solve.length - 1} <br />
              Subarray Range: [{current.low}..{current.high}] <br />
              {current.min !== Infinity && <>Min found: {current.min}<br/></>}
              {current.max !== -Infinity && <>Max found: {current.max}<br/></>}
              {current.message}
            </>
          </DoodleCard>
          <DoodleArray
            arr={current.arr}
            pointer_1={current.pointer1}
            pointer_2={current.pointer2}
            direction={isPhone ? "column" : "row"}
            highlight_1={current.low}
            highlight_2={current.high}
          />
          
          <div className="mt-8 mb-4">
             <h3 className="text-xl font-bold mb-4 text-center">Recursion Tree</h3>
             <div className="w-full overflow-x-auto pb-4">
               <RecursionTree node={current.tree} activeNodeId={current.activeNodeId} />
             </div>
          </div>

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
                setArr(arrayInput?.arrayInput || [1000, 11, 445, 1, 330, 3000]);
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
              📍 <b>Step 1: Base Case Check</b> If the array has 1 or 2 elements, directly find their min and max.
            </li>
            <li>
              🧱 <b>Step 2: Divide</b> If the array has more than 2 elements, divide it into a left half and a right half.
            </li>
            <li>
              🔁 <b>Step 3: Conquer</b> Recursively call the search on both the left and right halves.
            </li>
            <li>
              🧩 <b>Step 4: Combine</b> Once returned, the total array's minimum is the smaller of the two returning minimums, and the maximum is the larger of the two returning maximums.
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="approaches/divide_and_conquer/minmax" />
      </Algorithm>
    </div>
  );
};

export default Page;
