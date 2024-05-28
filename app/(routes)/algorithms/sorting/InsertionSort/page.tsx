"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCard";
import DoodleArray from "@/app/_components/Doodles/Array";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { useMediaQuery } from "react-responsive";

import ArrayInputContext from "@/app/_contexts/ArrayInput";
import { FC, useContext, useState } from "react";
const Page: FC = () => {
  const arrayInput = useContext(ArrayInputContext);
  const [arr, setArr] = useState(arrayInput?.arrayInput || [4, 2, 6, 3, 1, 9]);
  const [i, setI] = useState(1); // Start from the second element
  const [j, setJ] = useState(1);
  const [message, setMessage] = useState("");
  const isPhone = useMediaQuery({ query: "(max-width: 767px)" });

  const handleNext = () => {
    if (i >= arr.length) {
      setMessage("Sorted!");
      return;
    }

    const newArr = [...arr];
    let updated = false;

    if (j > 0 && newArr[j - 1] > newArr[j]) {
      setMessage(`Swapping ${newArr[j - 1]} and ${newArr[j]}`);
      [newArr[j - 1], newArr[j]] = [newArr[j], newArr[j - 1]];
      setArr(newArr);
      setJ(j - 1);
      updated = true;
    } else {
      setMessage(`No swap needed`);
      setI(i + 1);
      setJ(i + 1);
    }

    if (!updated) {
      setArr(newArr);
    }
  };

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Insertion Sort">
          <ul>
            <li>🔄 Insertion Sort is like sorting a hand of playing cards.</li>
            <li>
              🃏 Imagine you have a few cards in your hand, and you pick them
              one by one.
            </li>
            <li>
              👀 You look at each new card and find the right spot for it among
              the cards already in your hand.
            </li>
            <li>
              ➡️ You slide the new card into the correct position, keeping your
              hand sorted.
            </li>
            <li>
              🎉 By the end, all the cards in your hand are sorted perfectly!
            </li>
            <li>
              📚 Insertion Sort does the same thing with an array of numbers.
            </li>
            <li>
              🔢 It takes one number at a time, compares it with the numbers
              before it, and inserts it in the right place.
            </li>
            <li>
              💡 It&apos;s a simple and intuitive way to sort, perfect for small
              datasets and learning the basics of sorting algorithms.
            </li>
          </ul>

          <br />
          <DoodleCard
            title="Stats!"
            description={
              "Time Complexity: O(n^2) <br/> Space Complexity: O(1) <br> "
            }
            accentColor="bg-blue-400"
            class=""
          />
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard
            title="Current values"
            description={`Number of passes: ${i}<br> Current index: ${j}<br>${message}`}
            accentColor="bg-blue-400"
            class=""
          />
          <DoodleArray
            arr={arr}
            direction={`${isPhone ? "column" : "row"}`}
            highlight_1={i}
            highlight_2={j}
            pointer_1={i}
            pointer_2={j}
          />
          <div className="flex gap-3">
            <button onClick={handleNext} className="">
              <PrimaryButton accentColor="bg-blue-200" class="" title="Next" />
            </button>

            <button
              onClick={() => {
                setArr(arrayInput?.arrayInput || [4, 2, 6, 3, 1, 9]);
                setI(1); // Reset to the second element
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
              🔢 <b>Step 1:</b> <b>Start with the First Number</b>
              <ul>
                <li>
                  📚 Take the first number in your array. This is the beginning
                  of your sorted section.
                </li>
              </ul>
            </li>
            <li>
              ➡️ <b>Step 2:</b> <b>Move to the Next Number</b>
              <ul>
                <li>
                  🔢 Pick the next number in the array. This number will be
                  inserted into the sorted section.
                </li>
              </ul>
            </li>
            <li>
              🔍 <b>Step 3:</b> <b>Find the Correct Spot</b>
              <ul>
                <li>
                  👀 Compare this number with the numbers in the sorted section,
                  starting from the end.
                </li>
              </ul>
            </li>
            <li>
              🔄 <b>Step 4:</b> <b>Shift Larger Numbers</b>
              <ul>
                <li>
                  🔄 If the number is smaller than the one in the sorted
                  section, move the larger number one position to the right.
                </li>
              </ul>
            </li>
            <li>
              ⬆️ <b>Step 5:</b> <b>Continue Comparing</b>
              <ul>
                <li>
                  ⬆️ Keep moving left and comparing the number with the sorted
                  section until you find the right spot for it.
                </li>
              </ul>
            </li>
            <li>
              ⬇️ <b>Step 6:</b> <b>Insert the Number</b>
              <ul>
                <li>
                  ⬇️ Insert the number into its correct position in the sorted
                  section.
                </li>
              </ul>
            </li>
            <li>
              ➡️ <b>Step 7:</b> <b>Repeat the Process</b>
              <ul>
                <li>
                  ➡️ Move to the next number in the array and repeat steps 3 to
                  6.
                </li>
              </ul>
            </li>
            <li>
              🔄 <b>Step 8:</b> <b>Continue Until Sorted</b>
              <ul>
                <li>
                  🔄 Continue this process until you&apos;ve moved through the
                  entire array.
                </li>
              </ul>
            </li>
            <li>
              🎉 <b>Step 9:</b> <b>Celebrate Your Success</b>
              <ul>
                <li>
                  🎉 Congratulations! Your array is now sorted using insertion
                  sort!
                </li>
              </ul>
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="sorting/selectionsort" />
      </Algorithm>
    </div>
  );
};

export default Page;
