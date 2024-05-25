"use client";
import { DoodleCard } from "@/app/_components/DoodleCard";
import DoodleArray from "@/app/_components/Doodles/Array";
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
    <div className="flex flex-col gap-5">
      <div className="text-3xl font-bold">Binary Search</div>
      <ul className="list-inside list-disc">
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
      </ul>
      <DoodleCard
        title="Stats!"
        description={
          "Time Complexity: O(log n) <br/> Space Complexity: O(1) <br> "
        }
        accentColor="bg-blue-400"
        class=""
      />
      <br />
      <div className="text-3xl font-bold">Working</div>
      <br />
      <DoodleCard
        title="Current Step Values"
        accentColor="bg-emerald-400"
        description={`High: ${high} | Low: ${low} | Pointer: ${Math.floor(
          (low + high) / 2,
        )} | Step: ${step} <br/> Formula: floor (
          ( ${low} + ${high} ) / 2
        )`}
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
            <button
              onClick={handleNext}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Next
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
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          Reset
        </button>
      </p>
      <br />
      <div className="text-3xl font-bold">Steps to solve it yourself!</div>
      <br />
      <ol className="list-inside list-decimal">
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
      </ol>
    </div>
  );
};

export default Page;
