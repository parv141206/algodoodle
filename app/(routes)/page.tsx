"use client";
import React, { useEffect } from "react";
import { DoodleCard } from "../_components/DoodleCards/DoodleCard";
import Image from "next/image";
import { PrimaryButton } from "../_components/PrimaryButton";
import Link from "next/link";
import MockAlgorithmWorking from "../_components/MockAlgorithm/MockAlgorithmWorking";
import MockAlgorithmInfo from "../_components/MockAlgorithm/MockAlgorithmInfo";
import AlgorithmCodeBlock from "../_components/AlgorithmStructure/AlgorithmCodeBlock";
import Card from "../_components/DoodleCards/Card";
import { FaArrowRight } from "react-icons/fa6";
import {motion} from "framer-motion"
const Home: React.FC = () => {
  
  useEffect(() => {
    function hackerlook(message: String, speed: number) {
      let newMessage: Array<String> = [];
      let abcd = "abcdefghijklmnopqrstuvwxyz";
      let messageArray: Array<String> = message.split("");
      let i = 0;
      let j = 0;
      const text: HTMLElement | null = document.getElementById("main-title");
      function updateMessage() {
        newMessage[i] = abcd.charAt(Math.floor(Math.random() * 26));
        if (text) {
          text.innerText = newMessage.join("");
        }
        j++;
        if (j === 5) {
          newMessage[i] = messageArray[i];
          i++;
          j = 0;
        }
        if (i === messageArray.length) {
          clearInterval(interval);
          if (text) {
            text.innerText = newMessage.join("");
          }
        }
      }

      let interval = setInterval(updateMessage, speed);
    }
    hackerlook("AlgoDoodle", 50);
  }, []);
  return (
    <motion.main    initial={{ opacity: 0 }}
      transition={{
        duration: 1.5,
      }}
      animate={{ opacity: 1 }} className="bg-pattern flex flex-col gap-5">
      <section className=" container mx-auto  flex min-h-[90vh] items-center justify-center    p-3 ">
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
          <div className="flex flex-col items-center justify-center gap-5">
            <div
              id="main-title"
              className="text-center text-3xl font-extrabold md:text-start md:text-7xl "
            ></div>
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
          </div>
          <div className="flex flex-col items-center gap-5 md:w-1/2 md:items-end">
            <DoodleCard
              class="w-fit text-balance text-center  md:text-start"
              title="How many pointers???"
              accentColor="bg-green-300"
            >
              <>How many pointers do I use here?</>
            </DoodleCard>
            <DoodleCard
              class="w-fit text-balance text-center  md:text-start"
              title="Recursion??? Loop???"
              accentColor="bg-teal-300"
            >
              <>Does this use recursion or loop?</>
            </DoodleCard>
            <DoodleCard
              class="w-fit text-balance text-center  md:text-start"
              title="Whaaat is the time complexity?"
              accentColor="bg-red-300"
            >
              <>O(n), O(n^2), O(log n), what is it?</>
            </DoodleCard>
            <div className="p-3 text-center text-xl md:text-start">
              All your questioned answered at one place!
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto grid grid-cols-1 content-stretch items-stretch justify-center gap-5 p-5 align-middle  md:w-[80%] md:grid-cols-3">
          <Card>
            <div className="flex h-full flex-col">
              <div className="text-xl">Searching</div>
              <div className="text-md">
                Learn about various searching algorithms, how they work and how
                fast they work!
              </div>
              <Link
                href="/algorithms/searching"
                className="link mt-auto flex items-center gap-1"
              >
                Learn more <FaArrowRight />
              </Link>
            </div>
          </Card>
          <Card>
            <div className="flex h-full flex-col">
              <div className="text-xl">Sorting</div>
              <div className="text-md">
                Sort elements like a pro with various sorting algorithms!
              </div>
              <Link
                href="/algorithms/sorting"
                className="link mt-auto flex items-center gap-1"
              >
                Learn more <FaArrowRight />
              </Link>
            </div>
          </Card>
          <Card>
            <div className="flex h-full flex-col">
              <div className="text-xl">Stack</div>
              <div className="text-md">
                Explore stack data structure and its operations!
              </div>
              <Link
                href="/algorithms/stack"
                className="link mt-auto flex items-center gap-1"
              >
                Learn more <FaArrowRight />
              </Link>
            </div>
          </Card>
          <Card>
            <div className="flex h-full flex-col">
              <div className="text-xl">Queue</div>
              <div className="text-md">All about queue and its operations!</div>
              <Link
                href="/algorithms/queue"
                className="link mt-auto flex items-center gap-1"
              >
                Learn more <FaArrowRight />
              </Link>
            </div>
          </Card>
          <Card>
            <div className="flex h-full flex-col">
              <div className="text-xl">Tree</div>
              <div className="text-md">
                Learn about the tree data structure and its traversal methods!
              </div>
              <Link
                href="/algorithms/tree"
                className="link mt-auto flex items-center gap-1"
              >
                Learn more <FaArrowRight />
              </Link>
            </div>
          </Card>
        </div>
      </section>
      <section className="container mx-auto flex flex-col items-center justify-center text-center md:flex-row md:text-start">
        <div className="flex flex-col gap-3 p-3 md:w-1/2">
          <div className="text-3xl font-bold md:text-7xl">
            You can control everything!
          </div>
          <p className="text-xl">
            The working of each algorithm is interactable!
          </p>
          <p className="text-xl">
            You can also add your own array and see how it works!
          </p>
        </div>
        <div className="md:w-1/2">
          <MockAlgorithmWorking />
        </div>
      </section>
      <section className="container mx-auto flex flex-col items-center justify-center text-center md:w-4/5  md:text-start">
        <div className="flex flex-col gap-3 p-5 ">
          <div className="text-center text-3xl font-bold md:text-5xl">
            Starting from bare bones, to implementing the algorithms yourself!
          </div>
        </div>
        <MockAlgorithmInfo />
      </section>
      <section className="container mx-auto flex items-center justify-center md:w-4/5">
        <div className="flex flex-col items-center justify-center gap-3 p-5">
          <div className="text-center text-3xl font-bold md:text-5xl">
            We also provide code which is ready to be used!
          </div>
        </div>
      </section>
      <div className="container mx-auto p-5">
        <AlgorithmCodeBlock algorithmName="sorting/selectionsort" />
      </div>
      <section className="container mx-auto flex flex-col items-center justify-center gap-7 p-5">
        <div className="text-center text-3xl font-bold md:text-5xl">
          So what are you waiting for?
        </div>
        <Link href="/algorithms">
          <PrimaryButton
            title="Get Started for free!"
            accentColor="bg-blue-200 "
            class=""
          />
        </Link>
      </section>
    </motion.main>
  );
};

export default Home;
