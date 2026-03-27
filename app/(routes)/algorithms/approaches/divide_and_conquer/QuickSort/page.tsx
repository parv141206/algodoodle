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
  const initialArr = arrayInput?.arrayInput || [10, 80, 30, 90, 40, 50, 70];
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
      pivotIndex: number;
      message: string;
      tree: RecursionNode;
      activeNodeId: string;
    }[] = [];

    const currentArr = [...arr];

    const cloneTree = (t: RecursionNode): RecursionNode => ({
      ...t,
      children: t.children ? t.children.map(cloneTree) : undefined
    });

    const rootTree: RecursionNode = {
        id: `root-0-${currentArr.length - 1}`,
        label: `QuickSort(0, ${currentArr.length - 1})`,
        children: []
    };

    steps.push({
      arr: [...currentArr],
      low: 0,
      high: currentArr.length - 1,
      pointer1: -1,
      pointer2: -1,
      pivotIndex: -1,
      message: "Initial array. Ready to Quick Sort!",
      tree: cloneTree(rootTree),
      activeNodeId: rootTree.id
    });

    const partition = (low: number, high: number, node: RecursionNode) => {
      const pivot = currentArr[high];
      let i = low - 1;

      steps.push({
        arr: [...currentArr],
        low,
        high,
        pointer1: low,
        pointer2: high,
        pivotIndex: high,
        message: `Partitioning range [${low}..${high}]. Choosing pivot = ${pivot} at index ${high}.`,
        tree: cloneTree(rootTree),
        activeNodeId: node.id
      });

      for (let j = low; j <= high - 1; j++) {
        steps.push({
          arr: [...currentArr],
          low,
          high,
          pointer1: i,
          pointer2: j,
          pivotIndex: high,
          message: `Comparing current element ${currentArr[j]} with pivot ${pivot}.`,
          tree: cloneTree(rootTree),
          activeNodeId: node.id
        });

        if (currentArr[j] < pivot) {
          i++;
          const temp = currentArr[i];
          currentArr[i] = currentArr[j];
          currentArr[j] = temp;

          steps.push({
            arr: [...currentArr],
            low,
            high,
            pointer1: i,
            pointer2: j,
            pivotIndex: high,
            message: `${currentArr[i]} < pivot (${pivot}). Swapped with element at index ${i}.`,
            tree: cloneTree(rootTree),
            activeNodeId: node.id
          });
        } else {
          steps.push({
            arr: [...currentArr],
            low,
            high,
            pointer1: i,
            pointer2: j,
            pivotIndex: high,
            message: `${currentArr[j]} >= pivot (${pivot}). No swap needed.`,
            tree: cloneTree(rootTree),
            activeNodeId: node.id
          });
        }
      }

      const temp = currentArr[i + 1];
      currentArr[i + 1] = currentArr[high];
      currentArr[high] = temp;

      node.label = `Partitioned via ${pivot}`;

      steps.push({
        arr: [...currentArr],
        low,
        high,
        pointer1: i + 1,
        pointer2: high,
        pivotIndex: i + 1,
        message: `Placed pivot ${pivot} at its correct sorted position: index ${i + 1}.`,
        tree: cloneTree(rootTree),
        activeNodeId: node.id
      });

      return i + 1;
    };

    const quickSort = (low: number, high: number, node: RecursionNode) => {
      steps.push({
        arr: [...currentArr],
        low,
        high,
        pointer1: low,
        pointer2: high,
        pivotIndex: -1,
        message: `Executing ${node.label}...`,
        tree: cloneTree(rootTree),
        activeNodeId: node.id
      });

      if (low < high) {
        const pi = partition(low, high, node);
        
        const leftId = `L-${low}-${pi - 1}`;
        const rightId = `R-${pi + 1}-${high}`;
        
        const leftNode: RecursionNode = { id: leftId, label: `QuickSort(${low}, ${pi - 1})`, children: [] };
        const rightNode: RecursionNode = { id: rightId, label: `QuickSort(${pi + 1}, ${high})`, children: [] };
        
        node.children = [leftNode, rightNode];

        steps.push({
          arr: [...currentArr],
          low,
          high,
          pointer1: pi,
          pointer2: -1,
          pivotIndex: pi,
          message: `Range [${low}..${high}] partitioned. Splitting into Left and Right.`,
          tree: cloneTree(rootTree),
          activeNodeId: node.id
        });

        quickSort(low, pi - 1, leftNode);
        quickSort(pi + 1, high, rightNode);
      } else if (low === high) {
         node.label = `Base[${low}] sorted`;
         steps.push({
          arr: [...currentArr],
          low,
          high,
          pointer1: low,
          pointer2: -1,
          pivotIndex: -1,
          message: `Range [${low}..${high}] has only 1 element, already sorted.`,
          tree: cloneTree(rootTree),
          activeNodeId: node.id
        });
      }
    };

    quickSort(0, currentArr.length - 1, rootTree);

    steps.push({
      arr: [...currentArr],
      low: 0,
      high: currentArr.length - 1,
      pointer1: -1,
      pointer2: -1,
      pivotIndex: -1,
      message: "Array is fully sorted!",
      tree: cloneTree(rootTree),
      activeNodeId: ""
    });

    return steps;
  }, [arr]);

  const current = solve[Math.min(step, solve.length - 1)];

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Quick Sort">
          <li>
            Quick Sort is a Divide and Conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot.
          </li>
          <li>
            There are many different versions of quickSort that pick pivot in different ways: always pick first element, always pick last element, pick a random element, or pick median.
          </li>
          <li>
            This standard version picks the last element as pivot.
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              Average Time: O(n log n) <br /> 
              Worst Time: O(n^2) <br />
              Space Complexity: O(log n) <br />{" "}
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Current Step Details" accentColor="bg-emerald-400" class="">
            <>
              Step: {step} / {solve.length - 1} <br />
              Subarray Range: [{current.low}..{current.high}] <br />
              {current.pivotIndex !== -1 && <>Pivot Index: {current.pivotIndex} ({current.arr[current.pivotIndex]})<br/></>}
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
                setArr(arrayInput?.arrayInput || [10, 80, 30, 90, 40, 50, 70]);
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
              📍 <b>Step 1: Choose Pivot</b> Pick an element to be the pivot (e.g., the last element).
            </li>
            <li>
              🧱 <b>Step 2: Partition</b> Reorder the array so that all elements smaller than the pivot come before it, and all elements greater come after it.
            </li>
            <li>
              🎯 <b>Step 3: Pivot Placement</b> The pivot is now exactly in its correct sorted position.
            </li>
            <li>
              🔁 <b>Step 4: Conquer</b> Recursively apply the above steps to the sub-array of elements with smaller values and the sub-array of elements with greater values.
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="approaches/divide_and_conquer/quicksort" />
      </Algorithm>
    </div>
  );
};

export default Page;
