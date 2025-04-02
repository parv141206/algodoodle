"use client"
import MacWindowMockup from "@/app/_components/MacWindowMockup";
import Image from "next/image";
import { FC } from "react";
import { motion } from "framer-motion";
const Page: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{
        duration: 1.5,
      }}
      animate={{ opacity: 1 }}
      className="relative flex flex-col gap-7 overflow-x-hidden p-6 font-sans"
    >
      <Image
        className="absolute -top-[8vh] left-0 z-[2] rotate-[270deg] opacity-25 md:-top-[40vh] md:rotate-[180deg]"
        src={"/assets/doodle-arrow.svg"}
        width={500}
        height={100}
        alt="Doodle Arrow"
      />
      <div className="text-3xl font-bold">
        You can conveniently select any algorithm from the sidebar!
      </div>
      <div className="text-3xl">
        Each algorithm is represented in an array! <br /> It also includes
        pointers to respective positions in the array.
        <br />
        You can also enter your own array!
      </div>
      <div className="text-3xl font-bold">Terminology</div>
      <MacWindowMockup>
        <ul className="space-y-4 rounded-lg  p-4 ">
          <li className="flex items-center">
            <span className="mr-2 text-2xl">🔄</span>
            <span className="text-lg font-medium">Passes:</span>
            <span className="ml-2 ">Iterations over data</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl">👉</span>
            <span className="text-lg font-medium">Pointers:</span>
            <span className="ml-2 ">Variables that store memory addresses</span>
          </li>
          <li className="flex flex-col">
            <span className="text-lg font-medium">
              <span className="mr-2 text-2xl">⏱️</span>
              BigO Time Complexity:
            </span>
            <span className="ml-2 ">
              It represents the time, that is, the number of steps taken by an
              algorithm to solve a problem.
            </span>
            <ul className="flex list-disc flex-col gap-1 md:p-5">
              <li>
                <b>O(1)</b> It shows that the algorithm can solve the problem in
                constant time. Which means that regardless of number of inputs,
                it can solve the problem in a single go! It is most desirable.
              </li>
              <li>
                <b>O(n)</b> It shows that the algorithm can solve the problem in
                linear time. Thus, the number of steps required to solve the
                problem increases linearly with the number of inputs.
              </li>
              <li>
                <b>O(log n)</b> It shows that the algorithm can solve the
                problem in logarithmic time. This normally shows that the
                problem requires splitting the problem into smaller
                sub-problems.
              </li>
              <li>
                <b>O(n^2)</b>{" "}
                <span className="text-red-400">
                  This is generally not desirable.
                </span>{" "}
                It shows that the algorithm can solve the problem in quadratic
                time. This normally shows that the problem requires two nested
                loops.
              </li>
            </ul>
          </li>
          <li className="flex flex-col">
            <span className="text-lg font-medium">
              <span className="mr-2 text-2xl">💾</span>
              BigO Space Complexity:
            </span>
            <span className="ml-2 ">
              It represents the amount of memory space that an algorithm uses to
              solve a problem as the input size grows.
            </span>
            <ul className="flex list-disc flex-col gap-1 md:p-5">
              <li>
                <b>O(1)</b> It shows that the algorithm uses a constant amount
                of memory space, regardless of the number of inputs. This is
                most desirable.
              </li>
              <li>
                <b>O(n)</b> It shows that the algorithm uses memory space that
                grows linearly with the number of inputs.
              </li>
              <li>
                <b>O(log n)</b> It shows that the algorithm uses memory space
                that grows logarithmically with the number of inputs, often seen
                in algorithms that provide the problem into smaller parts.
              </li>
              <li>
                <b>O(n^2)</b>{" "}
                <span className="text-red-400">
                  This is generally not desirable.
                </span>{" "}
                It shows that the algorithm uses memory space that grows
                quadratically with the number of inputs, typically indicating
                the use of nested data structures or recursion.
              </li>
            </ul>
          </li>
        </ul>
      </MacWindowMockup>
    </motion.div>
  );
};

export default Page;
