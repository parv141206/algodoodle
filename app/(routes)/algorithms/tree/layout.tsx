import { FC } from "react";
import { FaExclamation } from "react-icons/fa";
interface Props {
  children: JSX.Element;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <div className="m-3  flex  items-center justify-center gap-5 rounded-xl bg-red-700 p-3 text-white md:hidden">
        <FaExclamation className="text-3xl" />
        <div>
          The tree may not appear properly on a phone, kindly view on bigger
          screen.
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
