"use client";

import { FC } from "react";

export interface RecursionNode {
  id: string;             // Unique identifier for the node
  label: string;          // What to display inside the node
  isHighlighted?: boolean;// Is this node currently active/highlighted?
  children?: RecursionNode[]; // Child nodes
}

interface Props {
  node: RecursionNode;
  activeNodeId?: string;  // Global active node to easily check highlighting
}

const RecursionTree: FC<Props> = ({ node, activeNodeId }) => {
  const isHighlighted = node.isHighlighted || (activeNodeId && node.id === activeNodeId);

  return (
    <div className="flex flex-col items-center">
      <div
        className={`z-10 flex min-h-[2.5rem] min-w-[2.5rem] items-center justify-center rounded border-2 px-3 py-1 text-center text-sm font-bold shadow-sm transition-all duration-300 md:text-base ${
          isHighlighted
            ? "scale-110 border-blue-500 bg-blue-100 text-blue-900 shadow-md dark:border-blue-400 dark:bg-blue-900 dark:text-blue-100"
            : "border-gray-400 bg-white text-gray-800 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-200"
        }`}
      >
        {node.label}
      </div>

      {node.children && node.children.length > 0 && (
        <div className="relative flex w-full items-start justify-center pt-8">
          {/* Central vertical line from the parent down to the horizontal connecting line */}
          <div className="absolute left-1/2 top-0 h-4 w-[2px] -translate-x-1/2 bg-gray-400 dark:bg-gray-500" />
          
          {/* Horizontal line connecting the children. */}
          {node.children.length > 1 && (
            <div 
              className="absolute top-4 h-[2px] bg-gray-400 dark:bg-gray-500" 
              style={{
                 left: `calc(50% / ${node.children.length})`, 
                 right: `calc(50% / ${node.children.length})`
              }} 
            />
          )}

          {node.children.map((child, idx) => (
            <div key={child.id} className="relative flex flex-1 flex-col items-center">
               {/* Vertical line dropping down to each child */}
               <div className="absolute top-[-1rem] h-4 w-[2px] bg-gray-400 dark:bg-gray-500" />
               <RecursionTree node={child} activeNodeId={activeNodeId} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecursionTree;
