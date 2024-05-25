import { FC } from "react";

interface DoodleCardProps {
  title: string;
  description: string;
  accentColor: string;
  class: string; // Changed from `class` to `className` to avoid keyword conflict
}

export const DoodleCard: FC<DoodleCardProps> = ({
  title,
  description,
  accentColor,
  class: className,
}) => {
  return (
    <div>
      <div
        className={` ${className} relative flex flex-col gap-1 rounded-md border bg-white p-3 dark:border-gray-700 dark:bg-gray-800`}
      >
        <h1 className="text-xl font-bold">{title}</h1>
        <hr className=" dark:border-gray-700 " />
        <p dangerouslySetInnerHTML={{ __html: description }}></p>{" "}
        {/* Corrected usage */}
        <div
          className={`${accentColor} absolute left-3 top-3 z-[-1] h-full w-full rounded-md dark:bg-opacity-25`}
        ></div>
      </div>
    </div>
  );
};
