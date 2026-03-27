"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import DoodleArray from "@/app/_components/Doodles/Array";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { useMediaQuery } from "react-responsive";

import ArrayInputContext from "@/app/_contexts/ArrayInput";
import { FC, useContext, useState } from "react";
const Page: FC = () => {
  const arrayInput = useContext(ArrayInputContext);
  const [arr, setArr] = useState(arrayInput?.arrayInput || [4, 2, 6, 3, 1, 9]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(1);
  const [message, setMessage] = useState("");
  const isPhone = useMediaQuery({ query: "(max-width: 767px)" });

  const handleNext = () => {
    if (
      arr.every((val, idx) => idx === arr.length - 1 || val <= arr[idx + 1])
    ) {
      setMessage("Sorted!");
      return;
    }

    const newArr = [...arr];

    if (newArr[i] > newArr[j]) {
      setMessage(`Since ${newArr[i]} > ${newArr[j]} we swapped the values!`);
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    } else {
      setMessage(
        `Since ${newArr[i]} <= ${newArr[j]} we didn't swap the values!`,
      );
    }

    setArr(newArr);

    if (j >= newArr.length - 1) {
      setI(i + 1);
      setJ(i + 1);
    } else {
      setJ(j + 1);
    }
  };

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Selection Sort">
          <li>
            Selection sort is a simple and efficient sorting algorithm that
            works by repeatedly selecting the smallest (or largest) element from
            the unsorted portion of the list and moving it to the sorted portion
            of the list. order.
          </li>
          <li>
            This process is repeated for the remaining unsorted portion until
            the entire list is sorted.
          </li>

          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              Time Complexity: O(n^2) <br /> Space Complexity: O(1) <br />{" "}
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Current values" accentColor="bg-blue-400" class="">
            <>
              Number of passes: {i}
              <br /> Number of swaps: {j}
              <br />
              {message}
            </>
          </DoodleCard>
          <DoodleArray
            arr={arr}
            direction={`${isPhone ? "column" : "row"}`}
            highlight_1={i}
            highlight_2={j}
            pointer_1={i}
            pointer_2={j}
          />
          <div className="flex gap-3    ">
            <button onClick={handleNext} className="">
              <PrimaryButton accentColor="bg-blue-200" class="" title="Next" />
            </button>

            <button
              onClick={() => {
                setArr(arrayInput?.arrayInput || [4, 2, 6, 3, 1, 9]);
                setI(0);
                setJ(1);
                setMessage("");
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
              🎨 <b>Step 1:</b> <b>Gather Your Supplies</b>
              <ul>
                <li>
                  📚 A list of numbers you want to sort (your &quot;array&quot;)
                </li>
                <li>
                  📝 A piece of paper and a pencil for notes (optional but fun!)
                </li>
              </ul>
            </li>
            <li>
              🚀 <b>Step 2:</b> <b>Start Your Engines</b>
              <ul>
                <li>
                  🔢 Look at the first number in your array. This is where the
                  magic begins!
                </li>
              </ul>
            </li>
            <li>
              🔍 <b>Step 3:</b> <b>Find the Smallest Number</b>
              <ul>
                <li>
                  👀 Starting from the first element, find the smallest number
                  in the array.
                </li>
                <li>
                  🔍 Keep track of the index of this smallest number as you go.
                </li>
              </ul>
            </li>
            <li>
              🔄 <b>Step 4:</b> <b>Swap the Smallest</b>
              <ul>
                <li>
                  🔄 Swap the smallest number found with the first element of
                  the unsorted portion.
                </li>
                <li>➡️ Now the first element is in its correct position.</li>
              </ul>
            </li>
            <li>
              🔂 <b>Step 5:</b> <b>Move to the Next Element</b>
              <ul>
                <li>
                  🔄 Move to the next element in the array and repeat the
                  process to find the next smallest number.
                </li>
                <li>📉 Continue this process for each element in the array.</li>
              </ul>
            </li>
            <li>
              ✅ <b>Step 6:</b> <b>Check Your Work</b>
              <ul>
                <li>
                  🔍 After each pass, ensure the sorted portion of the array is
                  in the correct order.
                </li>
                <li>
                  🏁 Once all elements have been sorted, your array is sorted!
                  🎉
                </li>
              </ul>
            </li>
            <li>
              🎉 <b>Step 7:</b> <b>Celebrate Your Success</b>
              <ul>
                <li>
                  🎊 Congratulations! You&apos;ve implemented Selection Sort! 🎊
                </li>
                <li>👑 Now you can sort any list of numbers like a pro!</li>
              </ul>
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="sorting/selectionsort"></AlgorithmCodeBlock>
      </Algorithm>
    </div>
  );
};

export default Page;
