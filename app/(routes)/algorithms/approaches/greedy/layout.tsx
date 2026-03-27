"use client";
import { DoodleInfoCard } from "@/app/_components/DoodleCards/DoodleInfoCard";
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <DoodleInfoCard
        title="Greedy algorithms always make the locally optimal choice!"
        className=""
      >
        <div className="text-sm">
          Unlike DP, they do not look back or reconsider their choices. Step through these algorithms to see how they sort data and greedily pick the best "next" option.
        </div>
      </DoodleInfoCard>
      <br />
      {children}
    </>
  );
}
