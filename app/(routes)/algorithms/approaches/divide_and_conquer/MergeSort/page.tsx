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
  const initialArr = arrayInput?.arrayInput || [38, 27, 43, 3, 9, 82, 10];
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
        label: `Sort(0, ${currentArr.length - 1})`,
        children: []
    };

    steps.push({
      arr: [...currentArr],
      low: 0,
      high: currentArr.length - 1,
      pointer1: -1,
      pointer2: -1,
      message: "Initial array. Ready to divide and conquer!",
      tree: cloneTree(rootTree),
      activeNodeId: rootTree.id
    });

    const merge = (low: number, mid: number, high: number, node: RecursionNode) => {
      const n1 = mid - low + 1;
      const n2 = high - mid;

      const L = currentArr.slice(low, mid + 1);
      const R = currentArr.slice(mid + 1, high + 1);

      let i = 0, j = 0, k = low;

      steps.push({
        arr: [...currentArr],
        low,
        high,
        pointer1: low,
        pointer2: high,
        message: `Merging subarrays: L=[${L.join(", ")}] and R=[${R.join(", ")}]`,
        tree: cloneTree(rootTree),
        activeNodeId: node.id
      });

      while (i < n1 && j < n2) {
        steps.push({
          arr: [...currentArr],
          low,
          high,
          pointer1: low + i,
          pointer2: mid + 1 + j,
          message: `Comparing L[${i}]=${L[i]} and R[${j}]=${R[j]}.`,
          tree: cloneTree(rootTree),
          activeNodeId: node.id
        });

        if (L[i] <= R[j]) {
          currentArr[k] = L[i];
          i++;
        } else {
          currentArr[k] = R[j];
          j++;
        }
        steps.push({
          arr: [...currentArr],
          low,
          high,
          pointer1: k,
          pointer2: -1,
          message: `Placed ${currentArr[k]} at index ${k}.`,
          tree: cloneTree(rootTree),
          activeNodeId: node.id
        });
        k++;
      }

      while (i < n1) {
        currentArr[k] = L[i];
        steps.push({
          arr: [...currentArr],
          low,
          high,
          pointer1: k,
          pointer2: -1,
          message: `Remaining from L: placed ${currentArr[k]} at index ${k}.`,
          tree: cloneTree(rootTree),
          activeNodeId: node.id
        });
        i++;
        k++;
      }

      while (j < n2) {
        currentArr[k] = R[j];
        steps.push({
          arr: [...currentArr],
          low,
          high,
          pointer1: k,
          pointer2: -1,
          message: `Remaining from R: placed ${currentArr[k]} at index ${k}.`,
          tree: cloneTree(rootTree),
          activeNodeId: node.id
        });
        j++;
        k++;
      }
      
      node.label = `Merged [${low}..${high}]`;

      steps.push({
        arr: [...currentArr],
        low,
        high,
        pointer1: low,
        pointer2: high,
        message: `Merged range [${low}..${high}] successfully!`,
        tree: cloneTree(rootTree),
        activeNodeId: node.id
      });
    };

    const mergeSort = (low: number, high: number, node: RecursionNode) => {
      steps.push({
        arr: [...currentArr],
        low,
        high,
        pointer1: low,
        pointer2: high,
        message: `Executing ${node.label}...`,
        tree: cloneTree(rootTree),
        activeNodeId: node.id
      });

      if (low < high) {
        const mid = Math.floor((low + high) / 2);
        
        const leftId = `L-${low}-${mid}`;
        const rightId = `R-${mid + 1}-${high}`;
        
        const leftNode: RecursionNode = { id: leftId, label: `Sort(${low}, ${mid})`, children: [] };
        const rightNode: RecursionNode = { id: rightId, label: `Sort(${mid + 1}, ${high})`, children: [] };
        
        node.children = [leftNode, rightNode];

        steps.push({
          arr: [...currentArr],
          low,
          high,
          pointer1: mid,
          pointer2: -1,
          message: `Dividing range [${low}..${high}] at mid = ${mid}. Branching to Left & Right.`,
          tree: cloneTree(rootTree),
          activeNodeId: node.id
        });
        
        mergeSort(low, mid, leftNode);
        mergeSort(mid + 1, high, rightNode);
        merge(low, mid, high, node);
      } else {
        node.label = `Base[${low}]`;
        steps.push({
          arr: [...currentArr],
          low,
          high,
          pointer1: low,
          pointer2: -1,
          message: `Base case reached: single element ${currentArr[low]} at index ${low} is already sorted.`,
          tree: cloneTree(rootTree),
          activeNodeId: node.id
        });
      }
    };

    mergeSort(0, currentArr.length - 1, rootTree);

    steps.push({
      arr: [...currentArr],
      low: 0,
      high: currentArr.length - 1,
      pointer1: -1,
      pointer2: -1,
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
        <AlgorithmInfo title="Merge Sort">
          <li>
            Merge Sort is a typical Divide and Conquer algorithm.
          </li>
          <li>
            It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.
          </li>
          <li>
            The merge() function is used for merging two halves. The merge(arr, l, m, r) is a key process that assumes that arr[l..m] and arr[m+1..r] are sorted and merges the two sorted sub-arrays into one.
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              Time Complexity: O(n log n) <br /> Space Complexity: O(n) <br />{" "}
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Current Step Details" accentColor="bg-emerald-400" class="">
            <>
              Step: {step} / {solve.length - 1} <br />
              Subarray Range: [{current.low}..{current.high}] <br />
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
                setArr(arrayInput?.arrayInput || [38, 27, 43, 3, 9, 82, 10]);
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
              🔪 <b>Step 1: Divide</b> Find the midpoint of the array to divide it into two halves.
            </li>
            <li>
              🔁 <b>Step 2: Conquer</b> Recursively call merge sort on the left half, and then on the right half.
            </li>
            <li>
              🛑 <b>Step 3: Base Case</b> If the array has 1 or 0 elements, it is already sorted! Return.
            </li>
            <li>
              🧩 <b>Step 4: Combine (Merge)</b> Merge the two sorted halves back into a single sorted array by picking the smaller of the two elements from the front of each half.
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="approaches/divide_and_conquer/mergesort" />
      </Algorithm>
    </div>
  );
};

export default Page;
