"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";

import { FC } from "react";
import MacWindowMockup from "../MacWindowMockup";
const MockAlgorithmInfo: FC = () => {
  return (
    <div>
      <MacWindowMockup>
        <Algorithm>
          <div className="flex flex-col gap-10 p-5 md:flex-row">
            <div>
              <AlgorithmInfo title="Insertion Sort">
                <ul>
                  <li>
                    🔄 Insertion Sort is like sorting a hand of playing cards.
                  </li>
                  <li>
                    🃏 Imagine you have a few cards in your hand, and you pick
                    them one by one.
                  </li>
                  <li>
                    👀 You look at each new card and find the right spot for it
                    among the cards already in your hand.
                  </li>
                  <li>
                    ➡️ You slide the new card into the correct position, keeping
                    your hand sorted.
                  </li>
                  <li>
                    🎉 By the end, all the cards in your hand are sorted
                    perfectly!
                  </li>
                  <li>
                    📚 Insertion Sort does the same thing with an array of
                    numbers.
                  </li>
                  <li>
                    🔢 It takes one number at a time, compares it with the
                    numbers before it, and inserts it in the right place.
                  </li>
                  <li>
                    💡 It&apos;s a simple and intuitive way to sort, perfect for
                    small datasets and learning the basics of sorting
                    algorithms.
                  </li>
                </ul>

                <br />
                <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
                  <>
                    Time Complexity: O(n^2) <br /> Space Complexity: O(1) <br />
                  </>
                </DoodleCard>
              </AlgorithmInfo>
            </div>
            <div>
              <AlgorithmSteps>
                <ul>
                  <li>
                    🔢 <b>Step 1:</b> <b>Start with the First Number</b>
                    <ul>
                      <li>
                        📚 Take the first number in your array. This is the
                        beginning of your sorted section.
                      </li>
                    </ul>
                  </li>
                  <li>
                    ➡️ <b>Step 2:</b> <b>Move to the Next Number</b>
                    <ul>
                      <li>
                        🔢 Pick the next number in the array. This number will
                        be inserted into the sorted section.
                      </li>
                    </ul>
                  </li>
                  <li>
                    🔍 <b>Step 3:</b> <b>Find the Correct Spot</b>
                    <ul>
                      <li>
                        👀 Compare this number with the numbers in the sorted
                        section, starting from the end.
                      </li>
                    </ul>
                  </li>
                  <li>
                    🔄 <b>Step 4:</b> <b>Shift Larger Numbers</b>
                    <ul>
                      <li>
                        🔄 If the number is smaller than the one in the sorted
                        section, move the larger number one position to the
                        right.
                      </li>
                    </ul>
                  </li>
                  <li>
                    ⬆️ <b>Step 5:</b> <b>Continue Comparing</b>
                    <ul>
                      <li>
                        ⬆️ Keep moving left and comparing the number with the
                        sorted section until you find the right spot for it.
                      </li>
                    </ul>
                  </li>
                  <li>
                    ⬇️ <b>Step 6:</b> <b>Insert the Number</b>
                    <ul>
                      <li>
                        ⬇️ Insert the number into its correct position in the
                        sorted section.
                      </li>
                    </ul>
                  </li>
                  <li>
                    ➡️ <b>Step 7:</b> <b>Repeat the Process</b>
                    <ul>
                      <li>
                        ➡️ Move to the next number in the array and repeat steps
                        3 to 6.
                      </li>
                    </ul>
                  </li>
                  <li>
                    🔄 <b>Step 8:</b> <b>Continue Until Sorted</b>
                    <ul>
                      <li>
                        🔄 Continue this process until you&apos;ve moved through
                        the entire array.
                      </li>
                    </ul>
                  </li>
                  <li>
                    🎉 <b>Step 9:</b> <b>Celebrate Your Success</b>
                    <ul>
                      <li>
                        🎉 Congratulations! Your array is now sorted using
                        insertion sort!
                      </li>
                    </ul>
                  </li>
                </ul>
              </AlgorithmSteps>
            </div>
          </div>
        </Algorithm>
      </MacWindowMockup>
    </div>
  );
};

export default MockAlgorithmInfo;
