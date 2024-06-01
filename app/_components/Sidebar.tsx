"use client";

import { useState, useMemo } from "react";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import Breadcrumbs from "./Breadcrumbs";

type DirectoryStructure = {
  type: "directory" | "file";
  name: string;
  path: string;
  children?: DirectoryStructure[];
};
const Sidebar = ({
  directoryStructure,
  isLoading,
}: {
  directoryStructure: DirectoryStructure[];
  isLoading: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(event.target.value);
  };

  const filterDirectory = (
    structure: DirectoryStructure[],
    query: string,
  ): DirectoryStructure[] => {
    return structure.reduce<DirectoryStructure[]>((acc, item) => {
      if (item.name.toLowerCase().includes(query.toLowerCase())) {
        acc.push(item);
      } else if (item.children) {
        const filteredChildren = filterDirectory(item.children, query);
        if (filteredChildren.length > 0) {
          acc.push({ ...item, children: filteredChildren });
        }
      }
      return acc;
    }, []);
  };

  const filteredStructure = filterDirectory(directoryStructure, searchQuery);

  const renderFilteredDirectory = (structure: DirectoryStructure[]) => {
    return (
      <ul className="flex w-full flex-col gap-1 p-3 md:w-auto">
        {structure.map((item) => {
          const itemName = capitalizeFirstLetter(
            item.name === "" ? "root" : item.name,
          );

          if (item.type === "directory") {
            return (
              <div key={item.path}>
                <Link href={`/algorithms/${item.path}`}>
                  <div className="font-bold">{itemName}</div>
                </Link>
                {item.children &&
                  item.children.length > 0 &&
                  renderFilteredDirectory(item.children)}
              </div>
            );
          } else {
            return (
              <Link href={`/algorithms/${item.path}`} key={item.path}>
                {itemName}
              </Link>
            );
          }
        })}
      </ul>
    );
  };

  const memoizedFilteredDirectory = useMemo(
    () => renderFilteredDirectory(filteredStructure),
    [filteredStructure],
  );

  return (
    <aside className="sticky top-16 z-30 flex flex-col gap-1 border-b bg-gray-100 p-3 dark:border-gray-700 dark:bg-gray-900 md:top-20 md:h-[80vh] md:w-auto md:max-w-xs md:rounded-lg">
      <div className="flex justify-between border-b-2 py-1">
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
        className={`transition-all md:block ${
          isExpanded
            ? "max-h-[40vh] overflow-y-auto opacity-100 md:max-h-[80vh] md:opacity-100"
            : "hidden max-h-0 overflow-y-auto opacity-0 md:max-h-[80vh] md:opacity-100"
        }`}
      >
        {isLoading ? (
          <div className="m-3 flex items-center justify-center">
            <FaSpinner className="animate-spin" />
          </div>
        ) : (
          <div className="w-full md:w-auto">
            <input
              placeholder="Search"
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="input my-3 w-full md:w-[80%]"
            />
            {memoizedFilteredDirectory}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
