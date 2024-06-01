import { FC } from "react";
interface Props {
  children?: React.ReactNode;
}
const Card: FC<Props> = ({ children }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-transparent p-3 shadow-md shadow-gray-200 backdrop-blur-sm dark:border-gray-700 dark:shadow-gray-800 ">
      {children}
    </div>
  );
};

export default Card;
