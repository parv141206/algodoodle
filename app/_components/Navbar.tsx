"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { CiSun } from "react-icons/ci";
import { RiMenu3Fill } from "react-icons/ri";
import ThemeContext from "../_contexts/Theme";
import { LuMoon } from "react-icons/lu";

export const Navbar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useContext(ThemeContext);
  return (
    <nav className=" sticky top-0 z-[100]  flex  flex-col justify-between gap-3 border-b bg-white p-3 dark:border-gray-700 dark:bg-gray-800 md:flex-row md:bg-white/50  md:px-10 md:backdrop-blur-3xl   md:dark:bg-gray-800/75 ">
      <div className="flex items-center justify-between">
        <Link href={"/"} className="text-xl font-bold">
          AlgoDoodle
        </Link>
        <button
          className="text-xl md:hidden"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          <div
            className={`${isExpanded ? "rotate-90" : ""} transition-transform`}
          >
            <RiMenu3Fill />
          </div>
        </button>
      </div>
      <ul
        className={` transition-[max-height, opacity] flex flex-col gap-3 overflow-hidden text-center duration-500 ease-in-out md:flex md:flex-row md:text-start ${isExpanded ? "max-h-40 opacity-100 md:max-h-max md:opacity-100" : "max-h-0 opacity-0 md:max-h-max md:opacity-100"} items-center`}
      >
        <Link href={"/"}>Home</Link>
        <Link href={"/algorithms"}>Algorithms</Link>
        <Link href={"/about"}>About</Link>
        <button
          className="rounded-md  p-1 text-3xl font-bold dark:text-white"
          onClick={() => {
            theme?.setTheme(theme?.theme === "light" ? "dark" : "light");
          }}
        >
          {theme?.theme === "dark" ? <CiSun /> : <LuMoon />}
        </button>
      </ul>
    </nav>
  );
};
