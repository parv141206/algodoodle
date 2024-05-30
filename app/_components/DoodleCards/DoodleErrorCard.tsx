import { FC } from "react";
import { FaExclamation } from "react-icons/fa";
interface Props {
  mdVisible: boolean;
  children: React.ReactNode;
}
const DoodleErrorCard: FC<Props> = ({ mdVisible, children }) => {
  return (
    <div
      className={`m-3  flex  items-center justify-center gap-5 rounded-xl bg-red-700 p-3 text-white ${mdVisible ? "" : "md:hidden"}`}
    >
      <FaExclamation className="text-3xl" />
      <div>{children}</div>
    </div>
  );
};

export default DoodleErrorCard;
