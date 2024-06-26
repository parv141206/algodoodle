import { FC } from "react";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa";

interface Props {
  arr: number[];
  pointer_1: number;
  pointer_2: number;
  direction: "row" | "column";
  highlight_1: number;
  highlight_2: number;
  className?: string; // Add a default value of undefined
}

const DoodleArray: FC<Props> = ({
  arr,
  pointer_1,
  pointer_2,
  direction,
  highlight_1,
  highlight_2,
  className = "", // Use the default value if not provided
}) => {
  const isRow = direction === "row";
  const isReverse = className.includes("flex-col-reverse");

  return (
    <div
      className={`m-7 flex w-fit md:m-20 ${isRow ? "flex-row" : isReverse ? "flex-col-reverse" : "flex-col"} ${className}`}
    >
      {arr.map((num, index) => (
        <div
          key={index}
          className={` ${index === highlight_1 ? "bg-red-300 dark:bg-green-700" : index === highlight_2 ? "bg-blue-300 dark:bg-blue-800" : "bg-yellow-300 dark:bg-gray-700"} ${index === highlight_2 ? "bg-blue-300 dark:bg-blue-800" : ""} relative flex h-20 w-20 items-center justify-center ${
            isRow
              ? index !== arr.length - 1
                ? "border-r-2 border-black"
                : ""
              : index !== arr.length - 1
                ? "border-b-2 border-black"
                : ""
          }`}
        >
          <div className="m-3 flex  flex-col items-center justify-center">
            <div className={``}>{num}</div>
            <div className="text-sm">@ {index}</div>
          </div>
          {index === pointer_1 && (
            <div
              className={`absolute ${isRow ? "left-[40%] top-[-45%]" : "left-[-45%] top-[40%]"}`}
            >
              {isRow ? <FaArrowDown /> : <FaArrowRight />}
            </div>
          )}
          {index === pointer_2 && (
            <div
              className={`absolute ${isRow ? "bottom-[-45%] left-[40%]" : "right-[-45%] top-[40%]"}`}
            >
              {isRow ? <FaArrowUp /> : <FaArrowLeft />}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DoodleArray;
