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
  const [arr, setArr] = useState<Array<number>>([1, 2, 3, 4, 5]);
  const [numToAdd, setNumToAdd] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleEnqueue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (arr.length >= 10) {
      setIsDialogOpen(true);
      return;
    }

    setArr((prev) => [...prev, numToAdd]);
    setNumToAdd(0);
  };

  const handleDequeue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (arr.length === 0) {
      return;
    }

    setArr((prev) => prev.slice(1));
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
      <AlgorithmInfo title="Dequeue">
        <li>
          The operation of removing an element from a queue is called DEQUEUE ⬆️
          operation.
        </li>
        <li>
          A queue is a First in First out (FIFO) data structure. Elements are
          removed from the front.
        </li>
        <li>Consider it like a line, you remove people from the front.</li>
        <li>Elements can&apos;t be added or removed from middle.</li>
        <br />
        <DoodleCard title="Note" accentColor="bg-blue-400" class="">
          <div>
            First in First out (FIFO)
            <br />
            Elements are removed from the front.
          </div>
        </DoodleCard>
        <br />
        <Link href={"QueueUnderflow"}>
          <DoodleErrorCard mdVisible={true}>
            <>
              Removing more elements than the size of queue can cause QUEUE
              UNDERFLOW error. Click to learn more.
            </>
          </DoodleErrorCard>
        </Link>
      </AlgorithmInfo>
      <AlgorithmWorking>
        <div className="flex flex-col gap-3 ">
          <DoodleInfoCard title="Add elements" className="flex w-fit flex-col ">
            <form onSubmit={handleEnqueue}>
              <div className="flex w-fit flex-col gap-1">
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
                    title="Enqueue"
                    class=""
                    accentColor="bg-blue-400"
                  />
                </button>
              </div>
            </form>
            <form
              className="flex w-fit flex-col gap-1"
              onSubmit={handleDequeue}
            >
              <button type="submit">
                <PrimaryButton
                  title="Dequeue"
                  class=""
                  accentColor="bg-red-400"
                />
              </button>
            </form>
          </DoodleInfoCard>
          {arr.length > 0 ? (
            <DoodleArray
              arr={arr}
              className="flex-row"
              direction="row"
              highlight_1={0}
              highlight_2={arr.length - 1}
              pointer_1={0}
              pointer_2={arr.length - 1}
            />
          ) : (
            <>Queue is empty.</>
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
              <li>if(FRONT = -1) return</li>
              <li>else X = QUEUE[FRONT]</li>
              <li>FRONT++</li>
            </ul>
          </MacWindowMockup>
          <li className="m-3">Where initial value of FRONT is 0.</li>
        </ul>
      </AlgorithmSteps>
      <AlgorithmCodeBlock algorithmName="queue/queue" />
    </Algorithm>
  );
};
export default Page;
