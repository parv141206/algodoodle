import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Algorithm: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col gap-5">{children}</div>
    </>
  );
};

export default Algorithm;
