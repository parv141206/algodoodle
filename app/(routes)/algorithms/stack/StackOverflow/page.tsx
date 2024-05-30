import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import { FC } from "react";

const Page: FC = () => {
  return (
    <>
      <Algorithm>
        <AlgorithmInfo title="Stack Overflow">
          <ul className="flex flex-col gap-3">
            <li>
              <b>Stack Overflow: The Ultimate Party Crasher</b> 🎉
            </li>
            <li>
              Imagine you&apos;re hosting the most epic party of the year 🎉.
              You&apos;ve got the music pumping, the snacks are flowing, and the
              guests are having a blast 💃. But, just as the night is getting
              wild, the doorbell starts ringing nonstop 📣. More and more people
              keep showing up, and your party space is getting packed to the
              brim 🤯.
            </li>
            <li>
              That&apos;s basically what happens when you have a{" "}
              <b>Stack Overflow</b> 🤯. It&apos;s like your party has reached
              maximum capacity, and there&apos;s no more room for anyone else to
              join in 🎉. In programming, this means that your stack (a data
              structure that stores elements in a Last-In-First-Out order) has
              reached its maximum size, and you can&apos;t add any more elements
              🤯.
            </li>
            <li>
              <b>What causes a Stack Overflow?</b> 🤔
              <ul>
                <li>
                  <b>Too many guests</b> 🎉: When you keep pushing elements onto
                  the stack without checking if it&apos;s full, you might end up
                  with a stack overflow 🤯.
                </li>
                <li>
                  <b>Poor party planning</b> 🎉: If you don&apos;t manage your
                  stack&apos;s size correctly, you might run out of space and
                  cause a stack overflow 🤯.
                </li>
              </ul>
            </li>
            <li>
              <b>How to prevent a Stack Overflow?</b> 🤔
              <ul>
                <li>
                  <b>Check the guest list</b> 🎉: Always check if the stack is
                  full before adding more elements 🤯.
                </li>
                <li>
                  <b>Plan ahead</b> 🎉: Manage your stack&apos;s size by
                  regularly removing elements or increasing its capacity 🤯.
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
