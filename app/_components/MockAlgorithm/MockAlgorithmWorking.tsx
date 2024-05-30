import React, { FC, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import DoodleArray from "@/app/_components/Doodles/Array";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import ArrayInputContext from "@/app/_contexts/ArrayInput";
import MacWindowMockup from "../MacWindowMockup";

const MockAlgorithmWorking: FC = () => {
  const arrayInput = useContext(ArrayInputContext);
  const [arr, setArr] = useState(arrayInput?.arrayInput || [4, 2, 6, 3, 1, 9]);
  const [i, setI] = useState(1); // Start from the second element
  const [j, setJ] = useState(1);
  const [message, setMessage] = useState("");
  const isPhone = useMediaQuery({ query: "(max-width: 767px)" });

  const handleNext = () => {
    if (i >= arr.length) {
      setMessage("Sorted!");
      setTimeout(() => {
        setArr(arrayInput?.arrayInput || [4, 2, 6, 3, 1, 9]);
        setI(1); // Reset to the second element
        setJ(1);
        setMessage("");
      }, 3000);
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

  useEffect(() => {
    const interval = setInterval(handleNext, 2000);
    return () => clearInterval(interval);
  }, [i, j, arr]);

  return (
    <div>
      <MacWindowMockup>
        <Algorithm>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <DoodleCard
                title="Current values"
                accentColor="bg-blue-400"
                class=""
              >
                <>{`Number of passes: ${i}<br> Current index: ${j}<br>${message}`}</>
              </DoodleCard>
              <DoodleArray
                arr={arr}
                direction={`column`}
                highlight_1={i}
                highlight_2={j}
                pointer_1={i}
                pointer_2={j}
              />
            </div>
            <div className="flex gap-3">
              <button onClick={handleNext} className="">
                <PrimaryButton
                  accentColor="bg-blue-200"
                  class=""
                  title="Next"
                />
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
                <PrimaryButton
                  accentColor="bg-red-200"
                  class=""
                  title="Reset"
                />
              </button>
            </div>
          </div>
        </Algorithm>
      </MacWindowMockup>
    </div>
  );
};

export default MockAlgorithmWorking;
