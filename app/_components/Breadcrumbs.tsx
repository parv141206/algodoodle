"use client";

import { FC, useEffect, useState } from "react";

const Breadcrumbs: FC = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  useEffect(() => {
    const updateBreadcrumbs = () => {
      if (typeof window !== "undefined") {
        const pathSegments = window.location.pathname
          .split("/")
          .filter(Boolean);
        setBreadcrumbs(pathSegments);
      }
    };

    updateBreadcrumbs();

    const handlePopState = () => {
      updateBreadcrumbs();
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="flex text-xl font-bold">
      <div className="md:hidden">
        {breadcrumbs.map((segment, index) => (
          <span key={index}>
            {index > 0 && " / "}
            <a href={`/${breadcrumbs.slice(0, index + 1).join("/")}`}>
              {segment}
            </a>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs;
