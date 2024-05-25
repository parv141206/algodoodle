"use client";

import { useEffect, useState, useMemo } from "react";
import { DirectoryStructure } from "../lib/getDirectoryStructure";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";

const Sidebar = () => {
  const [directoryStructure, setDirectoryStructure] =
    useState<DirectoryStructure>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("directoryStructure") !== null) {
      setDirectoryStructure(
        JSON.parse(localStorage.getItem("directoryStructure")!),
      );
      setIsLoading(false);
      return;
    } else {
      fetch("/api/directory")
        .then((response) => response.json())
        .then((data) => {
          setDirectoryStructure(data);
          setIsLoading(false);
          console.log(data);
          localStorage.setItem("directoryStructure", JSON.stringify(data));
        })
        .catch((error) =>
          console.error("Error fetching directory structure:", error),
        );
    }
    console.log("Fetching directory structure...");
  }, []); // Empty dependency array ensures this effect runs only once, on mount

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderDirectory = (structure: DirectoryStructure) => {
    return (
      <ul className="flex flex-col gap-1  p-3 md:w-fit">
        {structure.map((item) => {
          const itemName = capitalizeFirstLetter(
            item.name === "" ? "root" : item.name,
          );

          if (item.type === "directory") {
            return (
              <Link href={`/algorithms/${item.path}`} key={item.path}>
                <div className="font-bold">{itemName}</div>
                {item.children.length > 0 && renderDirectory(item.children)}
              </Link>
            );
          } else {
            return (
              <Link href={item.path} key={item.path}>
                {itemName}
              </Link>
            );
          }
        })}
      </ul>
    );
  };

  // Memoize the directory structure rendering
  const memoizedDirectory = useMemo(
    () => renderDirectory(directoryStructure),
    [directoryStructure],
  );

  return (
    <aside className="sticky top-16 z-30 flex h-fit w-full flex-col gap-1 border-b bg-gray-100 p-3 dark:border-gray-700 dark:bg-gray-900 md:top-20 md:w-fit md:rounded-lg ">
      <div className="flex justify-between">
        <div className="text-xl font-bold">Algorithms</div>
        <button
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          className={`md:hidden ${isExpanded ? "rotate-90" : ""} transition-transform`}
        >
          <RiMenu3Fill />
        </button>
      </div>

      <div
        className={`transition-all md:block ${isExpanded ? "max-h-40 opacity-100 md:max-h-max md:opacity-100" : "hidden max-h-0 opacity-0 md:max-h-max md:opacity-100"}`}
      >
        {isLoading ? (
          <div className="m-3 flex items-center justify-center">
            <FaSpinner className="animate-spin" />
          </div>
        ) : (
          memoizedDirectory
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
