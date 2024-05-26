"use client";
import { useEffect, useState } from "react";
import OnThisPage from "@/app/_components/OnThisPage";
import Sidebar from "@/app/_components/Sidebar";
import { DirectoryStructure } from "@/app/lib/getDirectoryStructure";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [directoryStructure, setDirectoryStructure] =
    useState<DirectoryStructure>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("directoryStructure") !== null) {
      setDirectoryStructure(
        JSON.parse(localStorage.getItem("directoryStructure")!),
      );
      setIsLoading(false);
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
  }, []);

  return (
    <div className="container mx-auto flex flex-col gap-5 md:flex-row  md:p-5">
      <Sidebar directoryStructure={directoryStructure} isLoading={isLoading} />
      <div className="p-3">{children}</div>
      <OnThisPage />
    </div>
  );
}
