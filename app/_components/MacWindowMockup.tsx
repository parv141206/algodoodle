import { FC } from "react";
interface Props {
  children?: React.ReactNode;
}
const MacWindowMockup: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col  rounded-lg border bg-transparent  p-3 backdrop-blur-sm dark:bg-[#282a36]">
      <div className="flex w-full flex-row items-center justify-between gap-1 p-5 ">
        <div className="flex gap-1">
          <div className="h-5 w-5 rounded-full bg-red-500"></div>
          <div className="h-5 w-5 rounded-full bg-yellow-500"></div>
          <div className="h-5 w-5 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
};

export default MacWindowMockup;
