import { FC, ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

const AlgorithmInfo: FC<Props> = ({ title, children }) => {
  return (
    <>
      <div className="text-3xl font-bold">{title}</div>
      <ul className="list-inside list-disc">{children}</ul>
    </>
  );
};

export default AlgorithmInfo;
