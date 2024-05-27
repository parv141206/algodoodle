"use client";
import React from "react";
import { DoodleCard } from "../_components/DoodleCard";
import Image from "next/image";
import { PrimaryButton } from "../_components/PrimaryButton";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <main className="bg-pattern">
      <section className=" container mx-auto  flex min-h-[90vh] items-center justify-center    p-3 ">
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="text-center text-3xl font-extrabold md:text-start md:text-7xl ">
              AlgoDoodle
            </div>
            <div className="text-center text-xl md:text-start">
              Learn new algorithms in an interactive and fun way!
            </div>
            <Link href="/algorithms">
              <PrimaryButton
                title="Get Started!"
                accentColor="bg-blue-200 "
                class=""
              />
            </Link>
            {/* <DoodleCard
            class="w-fit text-balance text-center md:w-1/2 md:text-start"
            title="Welcome!"
            description=""
            accentColor="bg-yellow-300"
          /> */}
          </div>
          <div className="flex flex-col items-center gap-5 md:w-1/2 md:items-end">
            <DoodleCard
              class="w-fit text-balance text-center  md:text-start"
              title="How many pointers???"
              description="How many pointers do I use here?"
              accentColor="bg-green-300"
            />
            <DoodleCard
              class="w-fit text-balance text-center  md:text-start"
              title="Recursion??? Loop???"
              description="Does this use recursion or loop?"
              accentColor="bg-teal-300"
            />
            <DoodleCard
              class="w-fit text-balance text-center  md:text-start"
              title="Whaaat is the time complexity?"
              description="O(n), O(n^2), O(log n), what is it?"
              accentColor="bg-red-300"
            />
            <div className="p-3 text-center text-xl md:text-start">
              All your questioned answered at one place!
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
