"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import DoodleArray from "@/app/_components/Doodles/Array";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { FC, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ArrayInputContext from "@/app/_contexts/ArrayInput";

const Page: FC = () => {
  const arrayInput = useContext(ArrayInputContext);
  const [arr, setArr] = useState(arrayInput?.arrayInput || [4, 2, 6, 3, 1, 9]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [message, setMessage] = useState("");
  const isPhone = useMediaQuery({ query: "(max-width: 767px)" });
  useEffect(() => {
    setArr(arrayInput?.arrayInput || [4, 2, 6, 3, 1, 9]);
  }, [arrayInput]);

  const handleNext = () => {
    // Check if the array is already sorted
    if (
      arr.every((val, idx) => idx === arr.length - 1 || val <= arr[idx + 1])
    ) {
      setMessage("Sorted!");
      return;
    }

    const newArr = [...arr];

    if (newArr[j] > newArr[j + 1]) {
      setMessage(
        `Since ${newArr[j]} > ${newArr[j + 1]} we swapped the values!`,
      );
      [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
    } else {
      setMessage(
        `Since ${newArr[j]} <= ${newArr[j + 1]} we didn't swap the values!`,
      );
    }

    setArr(newArr);

    if (j >= newArr.length - i - 2) {
      setI(i + 1);
      setJ(0);
    } else {
      setJ(j + 1);
    }
  };

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Bubble Sort">
          <li>
            Bubble Sort is the simplest sorting algorithm that works by
            repeatedly swapping the adjacent elements if they are in the wrong
            order.
          </li>
          <li>
            This algorithm is not suitable for large data sets as its average
            and worst-case time complexity is quite high.
          </li>
          <li>
            Traverse from left and compare adjacent elements and the higher one
            is placed at right side.
          </li>
          <li>
            In this way, the largest element is moved to the rightmost end at
            first.
          </li>
          <li>
            This process is then continued to find the second largest and place
            it and so on until the data is sorted.
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>{"Time Complexity: O(n^2) <br/> Space Complexity: O(1) <br/> "}</>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Current values" accentColor="bg-blue-400" class="">
            <>
              {`Number of passes: ${i}<br/> Number of swaps: ${j}<br/>${message}`}
            </>
          </DoodleCard>
          <DoodleArray
            arr={arr}
            direction={`${isPhone ? "column" : "row"}`}
            highlight_1={j}
            highlight_2={j + 1}
            pointer_1={j}
            pointer_2={j + 1}
          />
          <div className="flex gap-3    ">
            <button onClick={handleNext} className="">
              <PrimaryButton accentColor="bg-blue-200" class="" title="Next" />
            </button>

            <button
              onClick={() => {
                setArr(arrayInput?.arrayInput || [4, 2, 6, 3, 1, 9]);
                setI(0);
                setJ(0);
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
              🔍 <b>Step 3:</b> <b>Compare and Conquer</b>
              <ul>
                <li>👀 Compare the first number with the second number.</li>
                <li>
                  🔄 If the first number is greater than the second, swap them!
                </li>
                <li>➡️ If not, move to the next pair of numbers.</li>
              </ul>
            </li>
            <li>
              🔄 <b>Step 4:</b> <b>Repeat the Process</b>
              <ul>
                <li>
                  🔁 Continue this process for each pair of numbers in the
                  array.
                </li>
                <li>
                  🏁 When you reach the end of the array, you&apos;ve completed
                  one &quot;pass&quot;.
                </li>
              </ul>
            </li>
            <li>
              🔂 <b>Step 5:</b> <b>Back to the Beginning</b>
              <ul>
                <li>
                  🔄 Go back to the start of the array and repeat the comparison
                  process.
                </li>
                <li>
                  📉 Each pass will move the next largest number to its correct
                  position.
                </li>
              </ul>
            </li>
            <li>
              🔝 <b>Step 6:</b> <b>Shorten Your List</b>
              <ul>
                <li>
                  ✂️ With each pass, you can ignore the last sorted elements
                  (they&apos;re already in place).
                </li>
              </ul>
            </li>
            <li>
              ✅ <b>Step 7:</b> <b>Check Your Work</b>
              <ul>
                <li>🔍 After each pass, check if any swaps were made.</li>
                <li>🏁 If no swaps were made, your array is sorted! 🎉</li>
              </ul>
            </li>
            <li>
              🔁 <b>Step 8:</b> <b>Keep Going</b>
              <ul>
                <li>
                  📉 If swaps were made, go back to Step 2 and repeat until the
                  array is fully sorted.
                </li>
              </ul>
            </li>
            <li>
              🎉 <b>Step 9:</b> <b>Celebrate Your Success</b>
              <ul>
                <li>
                  🎊 Congratulations! You&apos;ve implemented Bubble Sort! 🎊
                </li>
                <li>👑 Now you can sort any list of numbers like a pro!</li>
              </ul>
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="sorting/bubblesort"></AlgorithmCodeBlock>
      </Algorithm>
    </div>
  );
};

export default Page;
