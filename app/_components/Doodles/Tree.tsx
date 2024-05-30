import { FC } from "react";
import {
  FaArrowRight,
  FaArrowLeft,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

interface Props {
  root: TreeNode;
  pointer?: TreeNode;
  highlight?: TreeNode;
}

const DoodleTree: FC<Props> = ({ root, pointer, highlight }) => {
  const renderNode = (
    node: TreeNode,
    level: number = 0,
    isLeft: boolean | null = null,
  ): JSX.Element => {
    if (!node) return <></>;

    const isPointer = node === pointer;
    const isHighlight = node === highlight;

    return (
      <div className="relative m-4 flex flex-col items-center justify-center">
        <div
          className={`z-[25] flex h-16 w-16 items-center justify-center rounded-full p-4 ${
            isHighlight
              ? "bg-blue-300 dark:bg-blue-800"
              : "bg-yellow-300 dark:bg-gray-700"
          } ${isPointer ? "border-2 border-black dark:border-white" : ""}`}
        >
          {node.value}
        </div>
        {isPointer && (
          <div className="absolute -right-6 rotate-[90deg]">
            <FaArrowDown />
          </div>
        )}
        <div className="flex w-full justify-center">
          {node.left && (
            <div className="relative z-10 w-1/2">
              <div className="absolute -top-5 right-5 -z-[0]    h-12 w-6 border-l-2 border-t-2 border-black"></div>
              {renderNode(node.left, level + 1, true)}
            </div>
          )}
          {node.right && (
            <div className="relative z-10 w-1/2">
              <div className="absolute -top-5 left-5 -z-[2]  h-12 w-6 border-r-2 border-t-2 border-black"></div>
              {renderNode(node.right, level + 1, false)}
            </div>
          )}
        </div>
      </div>
    );
  };

  return <div className="flex justify-center">{renderNode(root)}</div>;
};

export default DoodleTree;
