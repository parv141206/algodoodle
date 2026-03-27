"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import RecursionTree, { RecursionNode } from "@/app/_components/Doodles/RecursionTree";
import MacWindowMockup from "@/app/_components/MacWindowMockup";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { tree, TreeNode } from "@/app/lib/tree";
import { FC, useMemo, useState } from "react";

const convertToRecursionNode = (node: TreeNode | undefined, highlightVal: number | undefined): RecursionNode | undefined => {
  if (!node) return undefined;
  
  const children: RecursionNode[] = [];
  if (node.left) {
      children.push(convertToRecursionNode(node.left, highlightVal)!);
  } else if (node.right) {
      children.push({ id: `${node.value}-dummy-left`, label: "", children: [] });
  }
  
  if (node.right) {
      children.push(convertToRecursionNode(node.right, highlightVal)!);
  } else if (node.left) {
      children.push({ id: `${node.value}-dummy-right`, label: "", children: [] });
  }

  return {
    id: node.value.toString(),
    label: node.value.toString(),
    isHighlighted: node.value === highlightVal,
    children: children.length > 0 ? children : undefined
  };
};

const Page: FC = () => {
  const [index, setIndex] = useState(0);

  const preorder = useMemo(() => {
    const result: TreeNode[] = [];
    const findPreorder = (current: TreeNode) => {
      result.push(current);
      if (current.left) {
        findPreorder(current.left);
      }
      if (current.right) {
        findPreorder(current.right);
      }
    };
    findPreorder(tree);
    return result;
  }, []);

  const handleNext = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

  const currentHighlight = preorder[index]?.value;
  const recursionTreeData = useMemo(() => convertToRecursionNode(tree, currentHighlight), [currentHighlight]);

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="🚶‍♂️ Preorder Traversal :">
          <ul>
            <li>
              🎯 Visit the <strong>root node</strong>.
            </li>
            <li>
              🌿 Recursively traverse the <strong>left subtree</strong>.
            </li>
            <li>
              🌱 Recursively traverse the <strong>right subtree</strong>.
            </li>
          </ul>
        </AlgorithmInfo>
      </Algorithm>
      <AlgorithmWorking>
        <DoodleCard
          title="Current values"
          accentColor="bg-blue-400"
          class="my-3"
        >
          <>{`Preorder: ${preorder
            .slice(0, index + 1)
            .map((node) => node.value)
            .join(", ")}`}</>
        </DoodleCard>
        
        <div className="w-full overflow-x-auto min-h-[400px] flex justify-center py-8">
            {recursionTreeData && <RecursionTree node={recursionTreeData} />}
        </div>

        <div className="flex gap-3">
          <button onClick={handleNext} className="">
            <PrimaryButton accentColor="bg-blue-200" class="" title="Next" />
          </button>

          <button
            onClick={() => {
              setIndex(0);
            }}
            className=""
          >
            <PrimaryButton accentColor="bg-red-200" class="" title="Reset" />
          </button>
        </div>
      </AlgorithmWorking>
      <AlgorithmSteps>
        <ul>
          <li className="my-3">
            You can follow the following algorithm steps to implement it
            yourself!
          </li>
          <MacWindowMockup>
            <ul className="flex list-inside flex-col gap-5 p-3">
              <li>PREORDER(root)</li>
              <li>print(root)</li>
              <li>
                if(root.left)
                <div className="px-3">PREORDER(root.left)</div>
              </li>
              <li>
                if(root.right)
                <div className="px-3">PREORDER(root.right)</div>
              </li>
            </ul>
          </MacWindowMockup>
        </ul>
      </AlgorithmSteps>
      <AlgorithmCodeBlock algorithmName="data_structures/tree/preorder" />
    </div>
  );
};

export default Page;
