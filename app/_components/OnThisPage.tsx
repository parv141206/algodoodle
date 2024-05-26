"use client";
import { FC, useEffect, useState } from "react";

const OnThisPage: FC = () => {
  const [sections, setSections] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const updateSections = () => {
      const sectionElements = Array.from(
        document.querySelectorAll("div[id]"),
      ).map((el) => ({
        id: el.id,
        text: el.textContent?.trim().split("\n")[0] || "",
      }));
      setSections(sectionElements);
    };

    // Initial section update
    updateSections();

    // Use MutationObserver to detect changes in the DOM
    const observer = new MutationObserver(() => {
      updateSections();
    });

    // Observe the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  const idToTitleMap: { [key: string]: string } = {
    info: "Information",
    code: "Code",
    steps: "Steps to DIY",
    working: "Working",
  };

  const filteredSections = sections.filter((section) =>
    Object.keys(idToTitleMap).includes(section.id),
  );

  if (filteredSections.length === 0) {
    return null;
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="sticky top-20 hidden h-fit w-fit flex-col gap-1 border-l p-3 md:flex">
      <div className="font-bold">On this page</div>
      <ul className="flex list-inside flex-col gap-1">
        {filteredSections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => handleClick(section.id)}
              className="w-full text-left"
            >
              {idToTitleMap[section.id]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnThisPage;
