import { FC } from "react";
import { MdConstruction } from "react-icons/md";

const Page: FC = () => {
  return (
    <div className="relative flex h-[80vh] flex-col  items-center justify-center text-center">
      <div className="absolute z-0 scale-150 opacity-15 md:text-9xl">
        <MdConstruction />
      </div>
      <div className="text-xl">404 | Page Not Found 👀</div>
      <div className="text-balance">
        Probably not your fault, this route is either under construction or
        simply doesnt exist 🤷‍♂️
      </div>
    </div>
  );
};

export default Page;
