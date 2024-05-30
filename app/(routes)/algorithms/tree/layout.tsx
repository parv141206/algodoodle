import DoodleErrorCard from "@/app/_components/DoodleCards/DoodleErrorCard";
import { FC } from "react";
import { FaExclamation } from "react-icons/fa";
interface Props {
  children: JSX.Element;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <DoodleErrorCard mdVisible={false}>
        <>
          The tree may not appear properly on a phone, kindly view on bigger
          screen.
        </>
      </DoodleErrorCard>
      {children}
    </div>
  );
};

export default Layout;
