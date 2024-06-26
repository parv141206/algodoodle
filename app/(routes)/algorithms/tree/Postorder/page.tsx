"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmCodeBlock from "@/app/_components/AlgorithmStructure/AlgorithmCodeBlock";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import AlgorithmSteps from "@/app/_components/AlgorithmStructure/AlgorithmSteps";
import AlgorithmWorking from "@/app/_components/AlgorithmStructure/AlgorithmWorking";
import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import DoodleTree from "@/app/_components/Doodles/Tree";
import MacWindowMockup from "@/app/_components/MacWindowMockup";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { tree, TreeNode } from "@/app/lib/tree";
import { FC, memo, useEffect, useMemo, useState } from "react";

const Page: FC = () => {
  // Create the tree structure

  const [highlightNode, setHighlightNode] = useState<TreeNode | undefined>(
    tree,
  );
  const [index, setIndex] = useState(0);

  const postorder = useMemo(() => {
    const result: TreeNode[] = [];
    const findPreorder = (tree: TreeNode) => {
      if (tree.left) {
        findPreorder(tree.left);
      }
      if (tree.right) {
        findPreorder(tree.right);
      }
      result.push(tree);
    };
    findPreorder(tree);
    return result;
  }, []);

  const handleNext = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

  const MemoizedDoodleTree = memo(DoodleTree, (prevProps, nextProps) => {
    return prevProps.highlight === nextProps.highlight;
  });

  return (
    <div>
      <Algorithm>
        <AlgorithmInfo title="🚶‍♂️ Postorder Traversal :">
          <ul>
            <li>
              🎯 Visit the <strong>left subtree</strong>.
            </li>

            <li>
              🌱 Visit the <strong>right subtree</strong>.
            </li>
            <li>
              🌿 Visit the <strong>current node</strong>.
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
          <>{`Postorder: ${postorder
            .slice(0, index + 1)
            .map((node) => node.value)
            .join(", ")}`}</>
        </DoodleCard>
        <MemoizedDoodleTree
          root={tree}
          highlight={postorder[index]}
          pointer={undefined}
        />
        <div className="flex gap-3">
          <button onClick={handleNext} className="">
            <PrimaryButton accentColor="bg-blue-200" class="" title="Next" />
          </button>

          <button
            onClick={() => {
              setIndex(0);
              setHighlightNode(tree);
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
            <ul className="flex list-inside flex-col gap-5  p-3">
              <li>POSTORDER(root)</li>
              <li>
                if(root.left)
                <div className="px-3">POSTORDER(root.left)</div>
              </li>
              <li>
                if(root.right)
                <div className="px-3">POSTORDER(root.right)</div>
              </li>
              <li>print(root)</li>
            </ul>
          </MacWindowMockup>
        </ul>
      </AlgorithmSteps>
      <AlgorithmCodeBlock algorithmName="tree/postorder" />
    </div>
  );
};

export default Page;
