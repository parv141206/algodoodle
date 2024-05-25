import { FC } from "react";

interface PrimaryButtonProps {
  title: string;
  accentColor: string;
  class: string;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  title,
  accentColor,
  class: className,
}) => {
  return (
    <button>
      <div
        className={` ${className} group relative flex  flex-col gap-1 rounded-md border dark:border-gray-700 ${accentColor}  p-3 transition-all dark:bg-opacity-25  `}
      >
        <h1 className="text-xl font-bold">{title}</h1>
        <div
          className={` absolute left-2 top-2 z-[-1] h-full w-full rounded-md bg-gray-200 transition-all group-hover:left-1 group-hover:top-1 group-active:left-0 group-active:top-0 dark:bg-gray-700   dark:bg-opacity-25`}
        ></div>
      </div>
    </button>
  );
};
