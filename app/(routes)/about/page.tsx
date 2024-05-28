import Link from "next/link";
import { FC } from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";

const Page: FC = () => {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-5 text-center">
      <div className="text-5xl">Made with ❤ by Parv Shah</div>
      <ul className="text-3xl">
        <li>
          <Link
            className="flex items-center justify-center gap-5 text-blue-400"
            target="blank"
            href="https://www.instagram.com/calligraphic_parv"
          >
            <FaInstagram /> @calligraphic_parv
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center justify-center gap-5 text-blue-400"
            target="blank"
            href="https://www.github.com/parv141206"
          >
            <FaGithub /> @parv141206
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Page;
