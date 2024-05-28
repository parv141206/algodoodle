"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCard";
import DoodleArray from "@/app/_components/Doodles/Array";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Page: FC = () => {
  const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [step, setStep] = useState(0);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(arr.length - 1);
  const [pointer1, setPointer1] = useState(
    Math.floor((0 + (arr.length - 1)) / 2),
  );
  const [pointer2, setPointer2] = useState(99);
  const [target, setTarget] = useState(5);
  const [targetFound, setTargetFound] = useState(false);

  const isPhone = useMediaQuery({ query: "(max-width: 767px)" });

  const handleNext = () => {
    setStep((prevStep) => {
      if (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) {
          setLow(low);
          setHigh(high);
          setTargetFound(true);
          setPointer1(mid); // Ensure pointer1 is updated
          setPointer2(mid);
        } else if (arr[mid] < target) {
          setLow(mid + 1);
          setHigh(high);
          setPointer1(mid); // Ensure pointer1 is updated
        } else {
          setLow(low);
          setHigh(mid - 1);
          setPointer1(mid); // Ensure pointer1 is updated
        }
        return prevStep + 1;
      }
      return prevStep;
    });
  };

  return (
    <Algorithm>
      <AlgorithmInfo title="Binary Search">
        <li>
          Binary Search is a searching algorithm used in computer science to
          find the position of a target value within a sorted array.
        </li>
        <br />
        <li>
          The binary search algorithm works by repeatedly dividing the search
          range in half until the target value is found or the search range is
          empty.
        </li>
        <br />
        <li>
          Meanwhile, we maintain low and high variables to keep track of the
          search range.
        </li>
        <br />
        <li>
          Through each step, we compare the midpoint value with the target value
          and update the search range accordingly.
        </li>
        <br />
        <li>
          The algorithm continues until the target value is found or the search
          range is empty.
        </li>
        <br />
        <DoodleCard
          title="Stats!"
          description={
            "Time Complexity: O(log n) <br/> Space Complexity: O(1) <br> "
          }
          accentColor="bg-blue-400"
          class=""
        />
      </AlgorithmInfo>
      <AlgorithmWorking>
        <DoodleCard
          title="Current Step Values"
          accentColor="bg-emerald-400"
          description={`High: ${high} | Low: ${low} | Pointer: ${Math.floor(
            (low + high) / 2,
          )} | Step: ${step} <br/>  ${targetFound ? " Target found" : target < arr[Math.floor((low + high) / 2)] ? target + " < " + arr[Math.floor((low + high) / 2)] + " so we move to the left half" : target + " > " + arr[Math.floor((low + high) / 2)] + " so we move to the right half"}  <br/>`}
          class=""
        />
        <DoodleArray
          arr={arr}
          pointer_1={Math.floor((low + high) / 2)}
          pointer_2={pointer2}
          direction={isPhone ? "column" : "row"}
          highlight_1={low}
          highlight_2={high}
        />
        <p className="flex items-center gap-3">
          {targetFound ? (
            <p className="font-bold ">Target found at index {pointer2}</p>
          ) : (
            <>
              <button onClick={handleNext} className="">
                <PrimaryButton
                  accentColor="bg-blue-200"
                  class=""
                  title="Next"
                />
              </button>
            </>
          )}
          <button
            onClick={() => {
              setArr([1, 2, 3, 4, 5, 6, 7]);
              setStep(0);
              setLow(0);
              setHigh(arr.length - 1);
              setPointer1(Math.floor((0 + (arr.length - 1)) / 2));
              setPointer2(99);
              setTarget(5);
              setTargetFound(false);
            }}
            className=""
          >
            <PrimaryButton accentColor="bg-red-200" class="" title="Reset" />
          </button>
        </p>
      </AlgorithmWorking>
      <AlgorithmSteps>
        <li>Start with the middle element of the array.</li>
        <li>
          If the target value is equal to the middle element, then the search is
          complete.
        </li>
        <li>
          If the target value is less than the middle element, then the target
          value must be in the left half of the array.
        </li>
        <li>
          If the target value is greater than the middle element, then the
          target value must be in the right half of the array.
        </li>
        <li>
          Repeat steps 2-4 until the target value is found or the search range
          is empty.
        </li>
      </AlgorithmSteps>
      <AlgorithmCodeBlock algorithmName="searching/binarysearch" />
    </Algorithm>
  );
};

export default Page;
