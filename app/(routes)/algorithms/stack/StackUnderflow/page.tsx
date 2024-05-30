import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import { FC } from "react";

const Page: FC = () => {
  return (
    <>
      <Algorithm>
        <AlgorithmInfo title="Stack Underflow">
          <ul className="flex flex-col gap-3">
            <li>
              <b>Stack Underflow: The Silent Party Crash</b> 🎉
            </li>
            <li>
              Imagine you&apos;re hosting the most epic party of the year 🎉.
              You&apos;ve got the music pumping, the snacks are flowing, and the
              guests are having a blast 💃. But, just as the night is getting
              wild, people start leaving 📣. The party space is getting emptier
              and emptier 🤯.
            </li>
            <li>
              That&apos;s basically what happens when you have a{" "}
              <b>Stack Underflow</b> 🤯. It&apos;s like your party has reached
              minimum capacity, and there&apos;s no one left to join in 🎉. In
              programming, this means that your stack (a data structure that
              stores elements in a Last-In-First-Out order) has reached its
              minimum size, and you can&apos;t remove any more elements 🤯.
            </li>
            <li>
              <b>What causes a Stack Underflow?</b> 🤔
              <ul>
                <li>
                  <b>Too few guests</b> 🎉: When you keep removing elements from
                  the stack without checking if it&apos;s empty, you might end
                  up with a stack underflow 🤯.
                </li>
                <li>
                  <b>Poor party planning</b> 🎉: If you don&apos;t manage your
                  stack&apos;s size correctly, you might end up with a stack
                  underflow 🤯.
                </li>
              </ul>
            </li>
            <li>
              <b>How to prevent a Stack Underflow?</b> 🤔
              <ul>
                <li>
                  <b>Check the guest list</b> 🎉: Always check if the stack is
                  empty before removing more elements 🤯.
                </li>
                <li>
                  <b>Plan ahead</b> 🎉: Manage your stack&apos;s size by
                  regularly adding elements or decreasing its capacity 🤯.
                </li>
              </ul>
            </li>
          </ul>
        </AlgorithmInfo>
      </Algorithm>
    </>
  );
};

export default Page;
