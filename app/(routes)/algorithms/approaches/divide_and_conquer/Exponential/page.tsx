"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import RecursionTree, { RecursionNode } from "@/app/_components/Doodles/RecursionTree";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { FC, useState, useMemo } from "react";

const Page: FC = () => {
  const [baseInput, setBaseInput] = useState<number>(2);
  const [expInput, setExpInput] = useState<number>(10);
  const [step, setStep] = useState(0);

  const solve = useMemo(() => {
    const steps: {
      n: number;
      val: number;
      message: string;
      tree: RecursionNode;
      activeNodeId: string;
    }[] = [];

    const cloneTree = (t: RecursionNode): RecursionNode => ({
      ...t,
      children: t.children ? t.children.map(cloneTree) : undefined
    });

    const rootTree: RecursionNode = {
        id: `root-${expInput}`,
        label: `Power(${baseInput}, ${expInput})`,
        children: []
    };

    steps.push({
      n: expInput,
      val: 0,
      message: `Ready to compute ${baseInput}^${expInput}!`,
      tree: cloneTree(rootTree),
      activeNodeId: rootTree.id
    });

    const fastPower = (base: number, exp: number, node: RecursionNode): number => {
      steps.push({
        n: exp,
        val: 0,
        message: `Calling fastPower(${base}, ${exp}).`,
        tree: cloneTree(rootTree),
        activeNodeId: node.id
      });

      if (exp === 0) {
        node.label = "Base: 1";
        steps.push({
          n: exp,
          val: 1,
          message: `Base case! Power is 0, returning 1.`,
          tree: cloneTree(rootTree),
          activeNodeId: node.id
        });
        return 1;
      }

      const halfExp = Math.floor(exp / 2);
      const childNode: RecursionNode = { id: `C-${halfExp}`, label: `Power(${base}, ${halfExp})`, children: [] };
      node.children = [childNode];
      
      steps.push({
        n: exp,
        val: 0,
        message: `Power ${exp} > 0. Branching to compute ${base}^${halfExp}...`,
        tree: cloneTree(rootTree),
        activeNodeId: node.id
      });

      const half = fastPower(base, halfExp, childNode);
      let currentVal = half * half;
      
      let msg = `${base}^${halfExp} returned ${half}. Squaring it: ${half} * ${half} = ${currentVal}. `;

      if (exp % 2 !== 0) {
        currentVal *= base;
        msg += `Since current power ${exp} is odd, we multiply by base once more: ${currentVal / base} * ${base} = ${currentVal}.`;
      } else {
        msg += `Since current power ${exp} is even, we return the squared result as is.`;
      }

      node.label = `Result: ${currentVal}`;

      steps.push({
        n: exp,
        val: currentVal,
        message: msg,
        tree: cloneTree(rootTree),
        activeNodeId: node.id
      });

      return currentVal;
    };

    const finalResult = fastPower(baseInput, expInput, rootTree);

    steps.push({
      n: expInput,
      val: finalResult,
      message: `Finished! The final result of ${baseInput}^${expInput} is ${finalResult}.`,
      tree: cloneTree(rootTree),
      activeNodeId: ""
    });

    return steps;
  }, [baseInput, expInput]);

  const current = solve[Math.min(step, solve.length - 1)];

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="Fast Exponentiation (Divide & Conquer)">
          <li>
            Calculating x^n naively by multiplying x by itself n times takes O(n) time.
          </li>
          <li>
            Fast Exponentiation uses Divide and Conquer to compute this in only O(log n) time!
          </li>
          <li>
            The trick: If n is even, x^n = (x^(n/2))^2. If n is odd, x^n = x * (x^(n/2))^2.
          </li>
          <br />
          <DoodleCard title="Stats!" accentColor="bg-blue-400" class="">
            <>
              Time Complexity: O(log n) <br /> 
              Space Complexity: O(log n) (stack frames)<br />{" "}
            </>
          </DoodleCard>
        </AlgorithmInfo>
        <AlgorithmWorking>
          <DoodleCard title="Custom Input" accentColor="bg-yellow-400" class="">
            <div className="flex gap-3 items-center">
              <label className="font-bold">Base (x):</label>
              <input type="number" className="input w-24" value={baseInput} onChange={e => {setBaseInput(Number(e.target.value)); setStep(0);}} />
              <label className="font-bold">Power (n):</label>
              <input type="number" className="input w-24" value={expInput} onChange={e => {setExpInput(Number(e.target.value) || 0); setStep(0);}} />
            </div>
          </DoodleCard>
          
          <DoodleCard title="Current Execution Context" accentColor="bg-emerald-400" class="">
            <>
              Step: {step} / {solve.length - 1} <br />
              <div className="font-bold text-xl my-2">
                Processing n = {current.n}
              </div>
              {current.val !== 0 && <>Returned Value: <span className="text-xl text-blue-800 dark:text-blue-300">{current.val}</span><br/></>}
              {current.message}
            </>
          </DoodleCard>

          <div className="mt-8 mb-4">
             <h3 className="text-xl font-bold mb-4 text-center">Recursion Tree</h3>
             <div className="w-full overflow-x-auto pb-4">
               <RecursionTree node={current.tree} activeNodeId={current.activeNodeId} />
             </div>
          </div>
          
          <div className="flex gap-3">
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
              📍 <b>Step 1: Check Base Case</b> If power n == 0, return 1.
            </li>
            <li>
              🧱 <b>Step 2: Divide</b> Recursively compute the result of base raised to the power of floor(n / 2). Let this be `half`.
            </li>
            <li>
              🔁 <b>Step 3: Combine</b> Square `half` to get `half * half`. This simulates computing base^n for an even power.
            </li>
            <li>
              🧩 <b>Step 4: Odd Adjustment</b> If the current power n is odd, you must multiply the result by the base once more (since floor(n/2) truncates the .5).
            </li>
          </ul>
        </AlgorithmSteps>
        <AlgorithmCodeBlock algorithmName="approaches/divide_and_conquer/exponential" />
      </Algorithm>
    </div>
  );
};

export default Page;
