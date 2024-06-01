import React, { FC } from "react";
import { FaLinesLeaning } from "react-icons/fa6";

const Page: FC = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-3 text-3xl font-bold">
        Queues and Queue Operations <FaLinesLeaning />
        🔃
      </div>
      <p>
        A queue is a linear data structure that follows the First In, First Out
        (FIFO) principle. It&apos;s like a line of people waiting for a concert
        - the first person in line is the first one to get in!
      </p>
      <p>
        Queues are used in various computer science applications, such as job
        scheduling, network protocols, and print queues.
      </p>
      <h2 className="flex gap-3 text-2xl font-bold">
        Insertion in a Queue <FaLinesLeaning />
      </h2>
      <p>
        When you insert an element into a queue, it goes to the end of the
        existing elements. This operation is called &apos;enqueue.&apos;
        It&apos;s like adding a new person to the end of the line!
      </p>
      <h2 className="flex gap-3 text-2xl font-bold">
        Deletion in a Queue <FaLinesLeaning />
      </h2>
      <p>
        When you remove an element from a queue, you take out the front element.
        This operation is called &apos;dequeue.&apos; It&apos;s like letting the
        first person in line enter the concert!
      </p>
      <p>
        Queues are simple yet powerful data structures that play a crucial role
        in many algorithms and applications. Remember, with queues, it&apos;s
        all about what goes in first comes out first 🔃
      </p>
    </div>
  );
};

export default Page;
