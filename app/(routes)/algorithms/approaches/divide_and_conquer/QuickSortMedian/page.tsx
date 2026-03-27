"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import DoodleArray from "@/app/_components/Doodles/Array";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { FC, useState, useMemo, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import ArrayInputContext from "@/app/_contexts/ArrayInput";

const Page: FC = () => {
  const arrayInput = useContext(ArrayInputContext);
  const initialArr = arrayInput?.arrayInput || [8, 1, 4, 9, 6, 3, 5, 2, 7, 0];
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
    }[] = [];

    const currentArr = [...arr];

    steps.push({
      arr: [...currentArr],
      low: 0,
      high: currentArr.length - 1,
      pointer1: -1,
      pointer2: -1,
      pivotIndex: -1,
      message: "Initial array. Ready to Quick Sort (Median of 3)!",
    });

    const medianOf3 = (low: number, high: number) => {
      const mid = Math.floor((low + high) / 2);
      
      steps.push({
        arr: [...currentArr],
        low,
        high,
        pointer1: low,
        pointer2: high,
        pivotIndex: mid,
        message: `Selecting Median of 3 using indices: low=${low}, mid=${mid}, high=${high}. Values: [${currentArr[low]}, ${currentArr[mid]}, ${currentArr[high]}].`,
      });

      if (currentArr[mid] < currentArr[low]) {
        const temp = currentArr[mid]; currentArr[mid] = currentArr[low]; currentArr[low] = temp;
      }
      if (currentArr[high] < currentArr[low]) {
        const temp = currentArr[high]; currentArr[high] = currentArr[low]; currentArr[low] = temp;
      }
      if (currentArr[mid] > currentArr[high]) {
        const temp = currentArr[mid]; currentArr[mid] = currentArr[high]; currentArr[high] = temp;
      }

      // Now low is smallest, mid is median, high is largest. Move median to high-1 position for partitioning.
      const pivot = currentArr[mid];
      const temp = currentArr[mid]; currentArr[mid] = currentArr[high]; currentArr[high] = temp;

      steps.push({
        arr: [...currentArr],
        low,
        high,
        pointer1: low,
        pointer2: high,
        pivotIndex: high,
        message: `Median is ${pivot}. Swapped to the end for partitioning.`,
      });

      return pivot;
    };

    const partition = (low: number, high: number, pivot: number) => {
      let i = low - 1;

      for (let j = low; j <= high - 1; j++) {
        steps.push({
          arr: [...currentArr],
          low,
          high,
          pointer1: i,
          pointer2: j,
          pivotIndex: high,
          message: `Comparing current element ${currentArr[j]} with pivot ${pivot}.`,
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
          });
        }
      }

      const temp = currentArr[i + 1];
      currentArr[i + 1] = currentArr[high];
      currentArr[high] = temp;

      steps.push({
        arr: [...currentArr],
        low,
        high,
        pointer1: i + 1,
        pointer2: high,
        pivotIndex: i + 1,
        message: `Placed pivot ${pivot} at its correct sorted position: index ${i + 1}.`,
      });

      return i + 1;
    };

    const quickSort = (low: number, high: number) => {
      if (low < high) {
        if (high - low < 2) {
          // just two elements, simple partition
          const pi = partition(low, high, currentArr[high]);
          quickSort(low, pi - 1);
          quickSort(pi + 1, high);
        } else {
          const pivot = medianOf3(low, high);
          const pi = partition(low, high, pivot);
          quickSort(low, pi - 1);
          quickSort(pi + 1, high);
        }
      } else if (low === high) {
         steps.push({
          arr: [...currentArr],
          low,
          high,
          pointer1: low,
          pointer2: -1,
          pivotIndex: -1,
          message: `Range [${low}..${high}] has only 1 element, already sorted.`,
        });
      }
    };

    quickSort(0, currentArr.length - 1);

    steps.push({
      arr: [...currentArr],
      low: 0,
      high: currentArr.length - 1,
      pointer1: -1,
      pointer2: -1,
      pivotIndex: -1,
      message: "Array is fully sorted!",
    });

    return steps;
  }, [arr]);

  const current = solve[Math.min(step, solve.length - 1)];

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Quick Sort (Median of 3)">
          <li>
            Standard Quick Sort can degrade to O(n^2) worst-case time complexity if the array is already sorted and we pick the last element as pivot.
          </li>
          <li>
            The Median of 3 optimization overcomes this by picking the first, middle, and last elements, and sorting them. The middle element becomes the true median of those 3.
          </li>
          <li>
            This carefully chosen median is then used as the pivot, ensuring a much more balanced partition on average!
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              Average Time: O(n log n) <br /> 
              Worst Time: O(n log n) (practically) <br />
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
                setArr(arrayInput?.arrayInput || [8, 1, 4, 9, 6, 3, 5, 2, 7, 0]);
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
              📍 <b>Step 1: Inspect Extremes and Middle</b> Compare the elements at the `low`, `mid`, and `high` indices.
            </li>
            <li>
              ⚖️ <b>Step 2: Find Local Median</b> Sort these three elements relative to each other. The element now at `mid` is the median of the 3.
            </li>
            <li>
              🎯 <b>Step 3: Reposition</b> Swap this median with the `high` element so it can be used as the standard pivot for partitioning.
            </li>
            <li>
              🧱 <b>Step 4: Standard Partition</b> Perform the normal Quick Sort partition using this intelligently selected pivot!
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="approaches/divide_and_conquer/quicksortmedian" />
      </Algorithm>
    </div>
  );
};

export default Page;
