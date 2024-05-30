import { FC } from "react";

interface DoodleCardProps {
  title: string;
  children: JSX.Element;
  accentColor: string;
  class: string;
}

export const DoodleCard: FC<DoodleCardProps> = ({
  title,
  children,
  accentColor,
  class: className,
}) => {
  return (
    <div>
      <div
        className={` ${className} relative z-[5] flex flex-col gap-1 rounded-md border bg-white p-3 dark:border-gray-700 dark:bg-gray-800`}
      >
        <h1 className="text-xl font-bold">{title}</h1>
        <hr className=" dark:border-gray-700 " />
        {children}
        <div
          className={` absolute left-0 top-0 z-[-1] h-full w-full rounded-md bg-white p-3  dark:bg-gray-800 `}
        ></div>
        <div
          className={`${accentColor} absolute left-3 top-3 z-[-2] h-full w-full rounded-md dark:bg-opacity-75`}
        ></div>
      </div>
    </div>
  );
};
