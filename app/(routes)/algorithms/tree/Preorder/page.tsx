"use client";
import Algorithm from "@/app/_components/AlgorithmStructure/Algorithm";
import AlgorithmInfo from "@/app/_components/AlgorithmStructure/AlgorithmInfo";
import DoodleTree from "@/app/_components/Doodles/Tree";
import { FC, memo, useEffect, useMemo, useState } from "react";

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

const Page: FC = () => {
  // Create the tree structure
  const tree: TreeNode = {
    value: 15,
    left: {
      value: 10,
      left: {
        value: 5,
      },
      right: {
        value: 12,
      },
    },
    right: {
      value: 20,
      left: {
        value: 18,
      },
      right: {
        value: 25,
        right: {
          value: 28,
        },
      },
    },
  };

  const [highlightNode, setHighlightNode] = useState<TreeNode | undefined>(
    tree,
  );
  const [index, setIndex] = useState(0);

  const preorder = useMemo(() => {
    const result: TreeNode[] = [];
    const findPreorder = (tree: TreeNode) => {
      result.push(tree);
      if (tree.left) {
        findPreorder(tree.left);
      }
      if (tree.right) {
        findPreorder(tree.right);
      }
    };
    findPreorder(tree);
    return result;
  }, [tree]);

  const handleNext = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

  const MemoizedDoodleTree = memo(DoodleTree, (prevProps, nextProps) => {
    return prevProps.highlight === nextProps.highlight;
  });

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
      <MemoizedDoodleTree
        root={tree}
        highlight={preorder[index]}
        pointer={tree}
      />
      <button
        onClick={() => {
          handleNext();
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Page;
