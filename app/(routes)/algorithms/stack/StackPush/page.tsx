"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import DoodleErrorCard from "@/app/_components/DoodleCards/DoodleErrorCard";
import { DoodleInfoCard } from "@/app/_components/DoodleCards/DoodleInfoCard";
import DoodleArray from "@/app/_components/Doodles/Array";
import MacWindowMockup from "@/app/_components/MacWindowMockup";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import Link from "next/link";
import { FC, useState } from "react";

const Page: FC = () => {
  const [arr, setArr] = useState<Array<number>>([]);
  const [numToAdd, setNumToAdd] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (arr.length >= 10) {
      setIsDialogOpen(true);
      return;
    }

    setArr((prev) => [...prev, numToAdd]);
  };

  return (
    <Algorithm>
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xl">
          <dialog
            open={isDialogOpen}
            className="flex flex-col gap-1 rounded-lg bg-white p-4"
          >
            I think 10 should be enough 😊 <br /> Adding more would clutter the
            website!
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
            >
              Close
            </button>
          </dialog>
        </div>
      )}
      <AlgorithmInfo title="Push">
        <li>
          The operation of adding an element into a stack is called PUSH 🔽
          operation.
        </li>
        <li>
          A stack is a First in Last out (FILO) or a Last in First out (LIFO)
          data structure. Thus, we add elements to it from the top only.
        </li>
        <li>
          Consider it like a container, you can only add elements to it from the
          top.
        </li>
        <li>Elements can&apos;t be added from middle or start.</li>
        <br />
        <DoodleCard title="Note" accentColor="bg-blue-400" class="">
          <div>
            First in Last out (FILO/LIFO)
            <br />
            Elements can only be added from one side, the top.
            <br />
            We maintain a TOP pointer to keep track of number of elements in a
            stack and where to insert new element.
          </div>
        </DoodleCard>
        <br />
        <Link href={"StackOverflow"}>
          <DoodleErrorCard mdVisible={true}>
            <>
              {" "}
              Adding more elements than the size of stack can cause STACK
              OVERFLOW error. Click to learn more.
            </>
          </DoodleErrorCard>
        </Link>
      </AlgorithmInfo>
      <AlgorithmWorking>
        <div className="flex flex-col gap-3 md:flex-row">
          <DoodleInfoCard title="Add elements" className="">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label htmlFor="number">Enter a number</label>
                <input
                  value={numToAdd}
                  onChange={(e) => setNumToAdd(parseInt(e.target.value))}
                  max={10000}
                  type="number"
                  name="number"
                  className="input"
                  required
                />
                <button type="submit">
                  <PrimaryButton
                    title="Add"
                    class=""
                    accentColor="bg-blue-400"
                  />
                </button>

                <button
                  onClick={() => {
                    setArr([]);
                  }}
                >
                  <PrimaryButton
                    title="Reset"
                    class=""
                    accentColor="bg-red-400"
                  />
                </button>
              </div>
            </form>
          </DoodleInfoCard>
          {arr.length > 0 ? (
            <DoodleArray
              arr={arr}
              className="flex-col-reverse"
              direction="column"
              highlight_1={arr.length - 1}
              highlight_2={99}
              pointer_1={arr.length - 1}
              pointer_2={99}
            />
          ) : (
            <>Stack is empty.</>
          )}
        </div>
      </AlgorithmWorking>
      <AlgorithmSteps>
        <ul>
          <li className="my-3">
            You can follow the following algorithm steps to implement it
            yourself!
          </li>
          <MacWindowMockup>
            <ul className="flex list-inside flex-col gap-5 p-3">
              <li>if(TOP = MAX_LENGTH) return</li> <li>else STACK[TOP] = X</li>
              <li>TOP++</li>{" "}
            </ul>
          </MacWindowMockup>
          <li className="m-3">Where initial value of TOP is 0.</li>
        </ul>
      </AlgorithmSteps>
      <AlgorithmCodeBlock algorithmName="stack/stackpush" />
    </Algorithm>
  );
};
export default Page;
