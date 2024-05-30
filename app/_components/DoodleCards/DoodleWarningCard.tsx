import { FC } from "react";
import { FaExclamation } from "react-icons/fa";
interface Props {
  mdVisible: boolean;
  message: String;
}
const DoodleWarningCard: FC<Props> = ({ mdVisible, message }) => {
  return (
    <div
      className={`m-3  flex  items-center justify-center gap-5 rounded-xl bg-yellow-700 p-3 text-white ${mdVisible ? "" : "md:hidden"}`}
    >
      <FaExclamation className="text-3xl" />
      <div>{message}</div>
    </div>
  );
};

export default DoodleWarningCard;
