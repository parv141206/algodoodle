import React, { FC } from "react";
import { GoStack } from "react-icons/go";

const Page: FC = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-3 text-3xl font-bold">
        Stacks and Stack Operations <GoStack />
        🔃
      </div>
      <p>
        A stack is a linear data structure that follows the Last In, First Out
        (LIFO) principle. It&apos;s like a stack of dosas - you can only add or
        remove dosas from the top!
      </p>
      <p>
        Stacks are used in various computer science applications, such as
        function call management, expression evaluation, and undo mechanisms.
      </p>
      <h2 className="flex gap-3 text-2xl font-bold">
        Insertion in a Stack <GoStack />
      </h2>
      <p>
        When you insert an element into a stack, it goes on top of the existing
        elements. This operation is called &apos;push.&apos; It&apos;s like
        adding a new dosa to the top of the stack!
      </p>
      <h2 className="flex gap-3 text-2xl font-bold">
        Deletion in a Stack <GoStack />
      </h2>
      <p>
        When you remove an element from a stack, you take out the top element.
        This operation is called &apos;pop.&apos; It&apos;s like eating the top
        dosa from the stack!
      </p>
      <p>
        Stacks are simple yet powerful data structures that play a crucial role
        in many algorithms and applications. Remember, with stacks, it&apos;s
        all about what goes in last comes out first! 🔃
      </p>
    </div>
  );
};

export default Page;
