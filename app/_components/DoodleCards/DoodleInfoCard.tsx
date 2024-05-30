import { FC } from "react";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa";

interface DoodleCardProps {
  title: string;
  className: string; // Changed from `class` to `className` to avoid keyword conflict
  children: React.ReactNode;
}

export const DoodleInfoCard: FC<DoodleCardProps> = ({
  title,
  className,
  children,
}) => {
  return (
    <div>
      <div
        className={` ${className} relative flex flex-col gap-1 rounded-md border bg-blue-100 p-3 dark:border-blue-700 dark:bg-blue-900`}
      >
        <h1 className="flex items-center gap-3 text-xl font-bold">
          <FaRegLightbulb />
          {title}
        </h1>
        <div className="p">{children}</div>
        <div
          className={`absolute left-3 top-3 z-[-1] h-full w-full rounded-md bg-blue-50 dark:bg-blue-800 dark:bg-opacity-25`}
        ></div>
      </div>
    </div>
  );
};
