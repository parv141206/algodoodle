"use client";
import { DoodleCard } from "@/app/_components/DoodleCard";
import { DoodleInfoCard } from "@/app/_components/DoodleInfoCard";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import ArrayInputContext from "@/app/_contexts/ArrayInput";
import React, { useContext, useState } from "react";
import { FaLightbulb } from "react-icons/fa";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const arrayInput = useContext(ArrayInputContext);
  const [input, setInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const regex = /^(\s*\d+\s*,?)+$/;
    if (regex.test(input)) {
      const arr = input.split(",").map((str) => parseInt(str.trim(), 10));
      arrayInput?.setArrayInput(arr);
      setMessage("Array Input Set!");
    } else {
      setMessage("Invalid Input");
    }
    setIsDialogOpen(true);
  };

  return (
    <>
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xl">
          <dialog open={isDialogOpen} className="rounded-lg bg-white p-4">
            <div>{message}</div>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
            >
              Close
            </button>
          </dialog>
        </div>
      )}
      <DoodleInfoCard
        title={` Hey! You can insert your own array!`}
        className=""
      >
        <div className="flex  gap-3">
          <input
            className="input"
            type="text"
            placeholder="1 , 2 , 3 , 4 "
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSubmit}>
            <PrimaryButton
              accentColor="bg-green-100"
              class=""
              title="Submit"
            ></PrimaryButton>
          </button>
        </div>
      </DoodleInfoCard>
      <br />
      {children}
    </>
  );
}
