import Link from "next/link";
import { FC } from "react";

const Page: FC = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-3xl font-bold">Searching</div>
      <p>
        Searching is the technique of finding a target value from a given array.
      </p>
      <p>
        There are multiple ways of searching, the key difference in all them is
        the number of iterations it takes to check if the target value exists or
        not.
      </p>
      <p>Searching can be done in two ways:</p>
      <ul className=" p-5">
        <Link href="searching/LinearSearch" className="underline">
          Linear Search
        </Link>
        <ul className="list-disc p-5">
          <li>Works for unsorted array.</li>
          <li>Generally slower than Binary Search.</li>
          <li>Loops through each element.</li>
        </ul>
        <Link href={"searching/BinarySearch"} className="underline">
          Binary Search
        </Link>
        <ul className="list-disc p-5">
          <li>Works for sorted array.</li>
          <li>Generally faster than Linear Search.</li>
          <li>Divide and conquer algorithm.</li>
        </ul>
      </ul>
    </div>
  );
};

export default Page;
