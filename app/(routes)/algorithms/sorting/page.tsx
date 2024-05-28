import Link from "next/link";
import { FC } from "react";

const Page: FC = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-3xl font-bold">Sorting</div>
      <p>
        Sorting is the process of arranging elements in a specific order, often
        ascending or descending.
      </p>
      <p>
        There are various algorithms for sorting, each differing in their
        approach and efficiency.
      </p>
      <p>Sorting algorithms can be broadly classified into:</p>
      <ul className=" p-5">
        <li className="underline">Comparison-based Sorting Algorithms</li>
        <ul className="list-disc p-5">
          <li>
            Comparison-based sorting algorithms compare elements to determine
            their relative order.
          </li>
          <li>
            Selection Sort, Insertion Sort, and Bubble Sort are classic examples
            of comparison-based sorting algorithms.
          </li>
          <li>
            They are suitable for small datasets or situations where simplicity
            is prioritized over performance.
          </li>
        </ul>
        <li className="underline">Non-comparison-based Sorting Algorithms</li>
        <ul className="list-disc p-5">
          <li>
            Non-comparison-based sorting algorithms utilize properties of the
            elements being sorted rather than comparing them directly.
          </li>
          <li>Examples include Radix Sort, Counting Sort, and Bucket Sort.</li>
          <li>
            They often have better performance for large datasets or specific
            types of data.
          </li>
        </ul>
      </ul>
      <div className="text-2xl font-bold">Selection Sort</div>
      <p>
        Selection Sort divides the input list into two parts: the sublist of
        elements already sorted and the sublist of elements remaining to be
        sorted.
      </p>
      <p>
        It repeatedly selects the minimum element from the unsorted sublist and
        swaps it with the first element of the unsorted sublist.
      </p>
      <p>
        Although simple, Selection Sort has a time complexity of O(n^2), making
        it inefficient for large lists.
      </p>
      <div className="text-2xl font-bold">Insertion Sort</div>
      <p>
        Insertion Sort builds the final sorted array one element at a time by
        iteratively removing elements from the input data and inserting them
        into their correct position in the sorted array.
      </p>
      <p>
        It is efficient for small datasets or nearly sorted arrays but has an
        average time complexity of O(n^2), making it less suitable for large
        datasets.
      </p>
      <div className="text-2xl font-bold">Bubble Sort</div>
      <p>
        Bubble Sort repeatedly steps through the list, compares adjacent
        elements, and swaps them if they are in the wrong order.
      </p>
      <p>
        It has a time complexity of O(n^2) and is generally less efficient
        compared to other sorting algorithms, particularly for large datasets.
      </p>
    </div>
  );
};

export default Page;
