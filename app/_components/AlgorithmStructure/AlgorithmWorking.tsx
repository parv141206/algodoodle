import { FC, ReactNode } from "react";
interface Props {
  children: ReactNode;
}

const AlgorithmWorking: FC<Props> = ({ children }) => {
  return (
    <>
      <br />
      <div className="text-3xl font-bold">Working</div>
      {children}
    </>
  );
};

export default AlgorithmWorking;
