"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import DoodleArray from "@/app/_components/Doodles/Array";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { FC, useEffect, useState } from "react";
import { CodeBlock, atomOneDark, dracula } from "react-code-blocks";
import { useMediaQuery } from "react-responsive";

const Page: FC = () => {
  const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [step, setStep] = useState(0);
  const [pointer1, setPointer1] = useState(0);
  const [pointer2, setPointer2] = useState(99);
  const [target, setTarget] = useState(5);
  const [targetFound, setTargetFound] = useState(false);
  const [code, setCode] = useState<string>("");
  const isPhone = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch(`/api/code/linearsearch`);
        const data = await response.json();
        if (data.code) {
          setCode(data.code);
        } else {
          setCode("// Code not found");
        }
      } catch (error) {
        console.error("Error fetching code:", error);
        setCode("// Error fetching code");
      }
    };

    fetchCode();
  }, []);

  const handleNext = () => {
    setStep((prevStep) => {
      if (target === arr[pointer1]) {
        setTargetFound(true);
        return pointer1;
      } else {
        if (prevStep === arr.length - 1) {
          return 0;
        } else {
          setPointer1(pointer1 + 1);
          return prevStep + 1;
        }
      }
    });
  };

  return (
    <Algorithm>
      <AlgorithmInfo title="Linear Search">
        <li>Linear Search is the most basic and simple searching algorithm</li>
        <br />
        <li>
          Here, we simply loop through each element in the list and compare it
          with our target.
        </li>
        <br />
        <li>
          We do this till either the target is found or we reach the end of the
          list.
        </li>
        <br />
        <li>It should be noted that the elements may be in any order.</li>
        <br />
        <li>
          The algorithm is simple though its not too efficient. You might want
          to use binary search if the list is sorted.
        </li>
        <br />
        <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
          <>{"Time Complexity: O(n) <br/> Space Complexity: O(1) <br> "}</>
        </DoodleCard>
      </AlgorithmInfo>
      <AlgorithmWorking>
        <DoodleCard
          title="Current Step Values"
          accentColor="bg-emerald-400"
          class=""
        >
          <>{`Pointer at address: ${pointer1} <br/> Target: ${target}`}</>
        </DoodleCard>
        <DoodleArray
          arr={arr}
          pointer_1={pointer1}
          pointer_2={pointer2}
          direction={isPhone ? "column" : "row"}
          highlight_1={pointer1}
          highlight_2={99}
        />
        <p className="flex items-center gap-3">
          {targetFound ? (
            <p className="font-bold ">Target found at index {pointer1}</p>
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
        <li>Its pretty simple, simply loop through the array.</li>
        <li>If target == arr[pointer], then target found.</li>
        <li>Else, increment the pointer.</li>
      </AlgorithmSteps>
      <div>
        <AlgorithmCodeBlock algorithmName="searching/linearsearch"></AlgorithmCodeBlock>
      </div>
    </Algorithm>
  );
};

export default Page;
