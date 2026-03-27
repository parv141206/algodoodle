"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { FC, useState, useMemo } from "react";

interface Job {
    id: string;
    deadline: number;
    profit: number;
}

const Page: FC = () => {
  const [deadlinesInput, setDeadlinesInput] = useState<string>("4, 1, 1, 1");
  const [profitsInput, setProfitsInput] = useState<string>("20, 10, 40, 30");
  const [step, setStep] = useState(0);

  const solve = useMemo(() => {
    const deadlines = deadlinesInput.split(",").map(s => Number(s.trim())).filter(n => !isNaN(n));
    const profits = profitsInput.split(",").map(s => Number(s.trim())).filter(n => !isNaN(n));

    const jobs: Job[] = deadlines.map((d, i) => ({
        id: String.fromCharCode(65 + i), // A, B, C...
        deadline: d,
        profit: profits[i] || 0
    })).sort((a,b) => b.profit - a.profit); // Greedy choice: sort by profit descending

    const maxDeadline = jobs.length > 0 ? Math.max(...jobs.map(j => j.deadline)) : 0;

    const steps: {
      jobs: Job[];
      currentIndex: number;
      slots: string[]; // represents timeline slots
      message: string;
      profit: number;
    }[] = [];

    steps.push({
      jobs,
      currentIndex: -1,
      slots: Array(maxDeadline + 1).fill(""), 
      message: `Initial conditions: Sorted jobs primarily by PROFIT DESCENDING. Max deadline is ${maxDeadline}.`,
      profit: 0
    });

    const slots: string[] = Array(maxDeadline + 1).fill(""); // 1-indexed, empty timeline
    let totalProfit = 0;

    for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];

        steps.push({
            jobs,
            currentIndex: i,
            slots: [...slots],
            message: `Inspecting Job ${job.id}: Profit=${job.profit}, Deadline=${job.deadline}. Scanning timeline backwards from slot ${job.deadline} to 1...`,
            profit: totalProfit
        });

        // Scan backwards from deadline
        let scheduled = false;
        for (let j = Math.min(maxDeadline, job.deadline); j > 0; j--) {
            if (slots[j] === "") {
                slots[j] = job.id;
                totalProfit += job.profit;
                scheduled = true;
                
                steps.push({
                    jobs,
                    currentIndex: i,
                    slots: [...slots],
                    message: `Found an empty slot at t=${j}! Scheduled Job ${job.id} for Profit ${job.profit}.`,
                    profit: totalProfit
                });
                break;
            }
        }

        if (!scheduled) {
             steps.push({
                jobs,
                currentIndex: i,
                slots: [...slots],
                message: `Failed to schedule Job ${job.id}. All slots before its deadline (${job.deadline}) are already taken by higher-profit jobs.`,
                profit: totalProfit
            });
        }
    }

    steps.push({
        jobs,
        currentIndex: -1,
        slots: [...slots],
        message: `Done! Scheduled exactly ${slots.filter(s => s !== "").length} jobs for a Total Profit of ${totalProfit}.`,
        profit: totalProfit
    });

    return steps;
  }, [deadlinesInput, profitsInput]);

  const current = solve[Math.min(step, solve.length - 1)];

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Job Scheduling with Deadlines">
          <li>
            You are given a set of jobs where each job has a deadline and profit associated with it if the job is finished before the deadline.
          </li>
          <li>
            It is also given that every job takes the single unit of time, so the minimum possible deadline for any job is 1.
          </li>
          <li>
            The Greedy approach works perfectly here: select higher-profit jobs first, and schedule them as late as possible (closest to their deadline)!
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              System: Greedy Sorting <br /> 
              Time Complexity: O(n^2) (scanning arrays) or O(n log n) with Disjoint Sets <br />
              Space Complexity: O(n) <br />{" "}
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
           <DoodleCard title="Custom Inputs" accentColor="bg-yellow-400" class="">
            <div className="flex flex-col gap-3">
              <label className="font-bold text-sm">Deadlines (comma separated):</label>
              <input type="text" className="input" value={deadlinesInput} onChange={e => {setDeadlinesInput(e.target.value); setStep(0);}} />
              <label className="font-bold text-sm">Profits (comma separated):</label>
              <input type="text" className="input" value={profitsInput} onChange={e => {setProfitsInput(e.target.value); setStep(0);}} />
            </div>
          </DoodleCard>

          <DoodleCard title="Current Status" accentColor="bg-emerald-400" class="">
            <>
              Step: {step} / {solve.length - 1} <br />
              <div className="text-xl font-bold my-2 text-blue-800 dark:text-blue-300">
                Total Profit So Far: {current.profit}
              </div>
              <b>Log:</b> {current.message}
            </>
          </DoodleCard>

          <b>Timeline Sequence (1 unit per slot):</b>
          <div className="flex gap-2 my-2 overflow-x-auto p-2">
            {current.slots.map((slot, idx) => {
              if (idx === 0) return null; // 1-indexed timeline
              return (
              <div key={idx} className={`min-w-16 h-16 border-2 flex flex-col justify-center items-center rounded-lg ${slot ? "bg-green-200 dark:bg-green-800 font-bold" : "bg-gray-100 dark:bg-gray-800"}`}>
                <span className="text-xs text-gray-500">t={idx}</span>
                <span className="text-xl">{slot || "-"}</span>
              </div>
            )})}
          </div>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full border-collapse text-center text-sm">
                <thead>
                    <tr>
                        <th className="border p-2 dark:border-gray-600">Job ID</th>
                        <th className="border p-2 dark:border-gray-600">Profit</th>
                        <th className="border p-2 dark:border-gray-600">Deadline</th>
                        <th className="border p-2 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-black dark:text-white">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {current.jobs.map((job, idx) => {
                        const isSelected = current.slots.includes(job.id);
                        return (
                        <tr key={idx} className={current.currentIndex === idx ? "bg-red-200 dark:bg-red-800 font-bold" : ""}>
                            <td className="border p-2 dark:border-gray-600">Job {job.id}</td>
                            <td className="border p-2 dark:border-gray-600 text-green-700 dark:text-green-400 font-bold">{job.profit}</td>
                            <td className="border p-2 dark:border-gray-600">{job.deadline}</td>
                            <td className="border p-2 dark:border-gray-600 text-blue-600 dark:text-blue-400 font-bold">
                                {isSelected ? "SCHEDULED" : ""}
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
              📍 <b>Step 1: Sort by Profit</b> Sort all jobs in decreasing order of their generated profit.
            </li>
            <li>
              🧱 <b>Step 2: Start Timeline</b> Keep track of the maximum capacity timeline of "free time slots".
            </li>
            <li>
              🔁 <b>Step 3: Schedule Backwards</b> For each sorted job, linearly search the timeline from the job's deadline slot backwards to slot 1.
            </li>
            <li>
              🧩 <b>Step 4: Block Slot</b> If a free slot is found, mark it with the job and add its profit. If no slot exists before the deadline, discard the job.
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="approaches/greedy/jobscheduling" />
      </Algorithm>
    </div>
  );
};

export default Page;
