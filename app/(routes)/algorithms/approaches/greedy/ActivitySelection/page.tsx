"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { FC, useState, useMemo } from "react";

interface Activity {
    id: number;
    start: number;
    finish: number;
}

const Page: FC = () => {
  const [startInput, setStartInput] = useState<string>("1, 3, 0, 5, 8, 5");
  const [finishInput, setFinishInput] = useState<string>("2, 4, 6, 7, 9, 9");
  const [step, setStep] = useState(0);

  const solve = useMemo(() => {
    const startTimes = startInput.split(",").map(s => Number(s.trim())).filter(n => !isNaN(n));
    const finishTimes = finishInput.split(",").map(s => Number(s.trim())).filter(n => !isNaN(n));

    const activities: Activity[] = startTimes.map((st, i) => ({
        id: i + 1,
        start: st,
        finish: finishTimes[i] || 0
    })).sort((a,b) => a.finish - b.finish); // Greedy choice: sort by finish time

    const steps: {
      activities: Activity[];
      currentIndex: number;
      selected: Activity[];
      message: string;
    }[] = [];

    steps.push({
      activities,
      currentIndex: -1,
      selected: [],
      message: `Initial conditions: Sorted activities primarily by FINISH TIME.`,
    });

    const selected: Activity[] = [];

    if (activities.length > 0) {
        // Greedily select the first one
        selected.push(activities[0]);
        steps.push({
            activities,
            currentIndex: 0,
            selected: [...selected],
            message: `Greedy choice: Activity ${activities[0].id} finishes earliest. Selected!`,
        });

        let previousFinish = activities[0].finish;

        for (let i = 1; i < activities.length; i++) {
            const current = activities[i];

            steps.push({
                activities,
                currentIndex: i,
                selected: [...selected],
                message: `Inspecting Activity ${current.id}. Starts: ${current.start}, Finishes: ${current.finish}. Does it start AFTER previous finish time (${previousFinish})?`,
            });

            if (current.start >= previousFinish) {
                selected.push(current);
                previousFinish = current.finish;

                steps.push({
                    activities,
                    currentIndex: i,
                    selected: [...selected],
                    message: `Yes! Activity ${current.id} starts at ${current.start} >= ${previousFinish}. Selected! Total: ${selected.length} activities.`,
                });
            } else {
                 steps.push({
                    activities,
                    currentIndex: i,
                    selected: [...selected],
                    message: `No! Activity ${current.id}'s start (${current.start}) conflicts with previous finish (${previousFinish}). Skipping.`,
                });
            }
        }
    }

    steps.push({
        activities,
        currentIndex: -1,
        selected: [...selected],
        message: `Done! Selected a maximum of ${selected.length} compatible activities using greedy strategy.`,
    });

    return steps;
  }, [startInput, finishInput]);

  const current = solve[Math.min(step, solve.length - 1)];

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Activity Selection">
          <li>
            You are given 'n' activities with their start and finish times.
          </li>
          <li>
            Select the maximum number of activities that can be performed by a single person, assuming that a person can only work on a single activity at a time.
          </li>
          <li>
            The Greedy approach works perfectly here: consistently choose the activity that finishes earliest and leaves the most available time for future activities!
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              System: Greedy Sorting <br /> 
              Time Complexity: O(n log n) for sorting <br />
              Space Complexity: O(1) <br />{" "}
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
           <DoodleCard title="Custom Inputs" accentColor="bg-yellow-400" class="">
            <div className="flex flex-col gap-3">
              <label className="font-bold text-sm">Start Times (comma separated):</label>
              <input type="text" className="input" value={startInput} onChange={e => {setStartInput(e.target.value); setStep(0);}} />
              <label className="font-bold text-sm">Finish Times (comma separated):</label>
              <input type="text" className="input" value={finishInput} onChange={e => {setFinishInput(e.target.value); setStep(0);}} />
            </div>
          </DoodleCard>

          <DoodleCard title="Current Status" accentColor="bg-emerald-400" class="">
            <>
              Step: {step} / {solve.length - 1} <br />
              <div className="text-xl font-bold my-2 text-blue-800 dark:text-blue-300">
                Number of Activities Selected: {current.selected.length}
              </div>
              <b>Selected IDs:</b> [{current.selected.map(a => a.id).join(", ")}]<br/>
              <b>Log:</b> {current.message}
            </>
          </DoodleCard>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full border-collapse text-center text-sm">
                <thead>
                    <tr>
                        <th className="border p-2 dark:border-gray-600">Activity ID</th>
                        <th className="border p-2 dark:border-gray-600">Start Time</th>
                        <th className="border p-2 dark:border-gray-600">Finish Time</th>
                        <th className="border p-2 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-black dark:text-white">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {current.activities.map((act, idx) => {
                        const isSelected = current.selected.some(s => s.id === act.id);
                        return (
                        <tr key={idx} className={current.currentIndex === idx ? "bg-red-200 dark:bg-red-800 font-bold" : ""}>
                            <td className="border p-2 dark:border-gray-600">Act {act.id}</td>
                            <td className="border p-2 dark:border-gray-600">{act.start}</td>
                            <td className="border p-2 dark:border-gray-600">{act.finish}</td>
                            <td className="border p-2 dark:border-gray-600 text-blue-600 dark:text-blue-400 font-bold">
                                {isSelected ? "SELECTED" : ""}
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
          </div>
          
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => {
                if (step < solve.length - 1) setStep(step + 1);
              }}
              className=""
            >
              <PrimaryButton accentColor="bg-blue-200" class="" title="Next" />
            </button>
            <button
              onClick={() => {
                setStep(0);
              }}
              className=""
            >
              <PrimaryButton accentColor="bg-red-200" class="" title="Reset" />
            </button>
          </div>
        </AlgorithmWorking>
        <AlgorithmSteps>
          <ul>
            <li>
              📍 <b>Step 1: Sort by Finish Time</b> Sort the given activities based on their finish times in ascending order.
            </li>
            <li>
              🧱 <b>Step 2: Initialize</b> Select the first activity from the sorted array and mark it as scheduled. Wait for the next one.
            </li>
            <li>
              🔁 <b>Step 3: Greedily Accumulate</b> For all remaining activities, if the start time is greater than or equal to the finish time of the previously selected activity, then select it.
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="approaches/greedy/activityselection" />
      </Algorithm>
    </div>
  );
};

export default Page;
