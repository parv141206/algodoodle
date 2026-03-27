"use client";
import { DoodleInfoCard } from "@/app/_components/DoodleCards/DoodleInfoCard";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import React, { useState } from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <DoodleInfoCard
        title="Dynamic Programming algorithms have custom inputs on each page!"
        className=""
      >
        <div className="text-sm">
          Each algorithm below lets you enter your own values to see how the DP
          table is built step by step.
        </div>
      </DoodleInfoCard>
      <br />
      {children}
    </>
  );
}
