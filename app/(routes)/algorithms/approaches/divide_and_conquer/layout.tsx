"use client";
import { DoodleInfoCard } from "@/app/_components/DoodleCards/DoodleInfoCard";
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <DoodleInfoCard
        title="Divide and Conquer algorithms use recursion!"
        className=""
      >
        <div className="text-sm">
          You can interact with these algorithms step-by-step to see how the problem is broken down into smaller pieces and then recombined. Try customizing the inputs to see different edge cases!
        </div>
      </DoodleInfoCard>
      <br />
      {children}
    </>
  );
}
