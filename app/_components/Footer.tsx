import Link from "next/link";
import { FC } from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";

const Footer: FC = () => {
  return (
    <div className="mt-5 flex w-full flex-col items-center justify-between gap-3 border-t border-gray-200 bg-transparent p-5 backdrop-blur-sm dark:border-gray-600 md:flex-row">
      <div className="text-xl font-bold">Algodoodle</div>
      <ul className="flex flex-col">
        <li>
          <Link
            className="flex items-center justify-center gap-5 text-blue-400 md:justify-start md:text-start"
            target="blank"
            href="https://www.instagram.com/calligraphic_parv"
          >
            <FaInstagram /> @calligraphic_parv
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center justify-center gap-5 text-blue-400 md:justify-start md:text-start"
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

export default Footer;
