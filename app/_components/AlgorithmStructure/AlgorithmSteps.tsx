import { FC, ReactNode } from "react";
interface Props {
  children: ReactNode;
}

const AlgorithmSteps: FC<Props> = ({ children }) => {
  return (
    <>
      <div id="steps"></div>
      <br />
      <div className="text-3xl font-bold">Steps to solve it yourself!</div>
      <ol className="list-inside list-decimal">{children}</ol>
      <br />
    </>
  );
};

export default AlgorithmSteps;
