import MacWindowMockup from "@/app/_components/MacWindowMockup";
import DoodleGraph, { GraphNode, GraphEdge } from "@/app/_components/Doodles/Graph";
import Image from "next/image";
import { FC } from "react";

const KNOWLEDGE_NODES: GraphNode[] = [
  // ROOT
  { id: "Alg", label: "Algorithms", color: "#fcd34d", x: 2987, y: 100, labelPosition: "bottom" },

  // CATEGORIES
  { id: "DS", label: "Data Structures", color: "#fdba74", x: 1225, y: 300, labelPosition: "bottom" },
  { id: "Para", label: "Paradigms", color: "#fca5a5", x: 3362, y: 300, labelPosition: "bottom" },
  { id: "Basics", label: "Basics", color: "#93c5fd", x: 4750, y: 300, labelPosition: "bottom" },

  // SUBCATEGORIES
  { id: "Graph", label: "Graph", color: "#86efac", x: 475, y: 500, labelPosition: "bottom" },
  { id: "Tree", label: "Tree", color: "#86efac", x: 1150, y: 500, labelPosition: "bottom" },
  { id: "Queue", label: "Queue", color: "#86efac", x: 1525, y: 500, labelPosition: "bottom" },
  { id: "Stack", label: "Stack", color: "#86efac", x: 1975, y: 500, labelPosition: "bottom" },

  { id: "DP", label: "Dynamic Prog", color: "#d8b4fe", x: 2650, y: 500, labelPosition: "bottom" },
  { id: "Greedy", label: "Greedy", color: "#d8b4fe", x: 3325, y: 500, labelPosition: "bottom" },
  { id: "DC", label: "Divide & Conquer", color: "#d8b4fe", x: 4075, y: 500, labelPosition: "bottom" },

  { id: "Searching", label: "Searching", color: "#93c5fd", x: 4600, y: 500, labelPosition: "bottom" },
  { id: "Sorting", label: "Sorting", color: "#93c5fd", x: 4900, y: 500, labelPosition: "bottom" },

  // LEAVES - Graph
  { id: "APSP", label: "APSP", color: "#5eead4", x: 100, y: 700, labelPosition: "bottom", href: "/algorithms/data_structures/graph/APSP" },
  { id: "Dijkstras", label: "Dijkstras", color: "#5eead4", x: 250, y: 700, labelPosition: "bottom", href: "/algorithms/data_structures/graph/Dijkstras" },
  { id: "Kruskals", label: "Kruskals", color: "#5eead4", x: 400, y: 700, labelPosition: "bottom", href: "/algorithms/data_structures/graph/Kruskals" },
  { id: "Prims", label: "Prims", color: "#5eead4", x: 550, y: 700, labelPosition: "bottom", href: "/algorithms/data_structures/graph/Prims" },
  { id: "SCC", label: "SCC", color: "#5eead4", x: 700, y: 700, labelPosition: "bottom", href: "/algorithms/data_structures/graph/SCC" },
  { id: "TopologicalSort", label: "Topo Sort", color: "#5eead4", x: 850, y: 700, labelPosition: "bottom", href: "/algorithms/data_structures/graph/TopologicalSort" },
  
  // LEAVES - Tree
  { id: "Inorder", label: "Inorder", color: "#5eead4", x: 1000, y: 700, labelPosition: "bottom", href: "/algorithms/data_structures/tree/Inorder" },
  { id: "Postorder", label: "Postorder", color: "#5eead4", x: 1150, y: 700, labelPosition: "bottom", href: "/algorithms/data_structures/tree/Postorder" },
  { id: "Preorder", label: "Preorder", color: "#5eead4", x: 1300, y: 700, labelPosition: "bottom", href: "/algorithms/data_structures/tree/Preorder" },

  // LEAVES - Queue
  { id: "QueueDequeue", label: "Dequeue", color: "#5eead4", x: 1450, y: 700, labelPosition: "bottom", href: "/algorithms/data_structures/queue/QueueDequeue" },
  { id: "QueueEnqueue", label: "Enqueue", color: "#5eead4", x: 1600, y: 700, labelPosition: "bottom", href: "/algorithms/data_structures/queue/QueueEnqueue" },

  // LEAVES - Stack
  { id: "StackOverflow", label: "Overflow", color: "#5eead4", x: 1750, y: 700, labelPosition: "bottom", href: "/algorithms/data_structures/stack/StackOverflow" },
  { id: "StackPop", label: "Pop", color: "#5eead4", x: 1900, y: 700, labelPosition: "bottom", href: "/algorithms/data_structures/stack/StackPop" },
  { id: "StackPush", label: "Push", color: "#5eead4", x: 2050, y: 700, labelPosition: "bottom", href: "/algorithms/data_structures/stack/StackPush" },
  { id: "StackUnderflow", label: "Underflow", color: "#5eead4", x: 2200, y: 700, labelPosition: "bottom", href: "/algorithms/data_structures/stack/StackUnderflow" },

  // LEAVES - DP
  { id: "Knapsack", label: "Knapsack", color: "#f9a8d4", x: 2350, y: 700, labelPosition: "bottom", href: "/algorithms/approaches/dp/Knapsack" },
  { id: "LCS", label: "LCS", color: "#f9a8d4", x: 2500, y: 700, labelPosition: "bottom", href: "/algorithms/approaches/dp/LCS" },
  { id: "MakingChange", label: "Making Change", color: "#f9a8d4", x: 2650, y: 700, labelPosition: "bottom", href: "/algorithms/approaches/dp/MakingChange" },
  { id: "MatrixChain", label: "Matrix Chain", color: "#f9a8d4", x: 2800, y: 700, labelPosition: "bottom", href: "/algorithms/approaches/dp/MatrixChain" },
  { id: "SCS", label: "SCS", color: "#f9a8d4", x: 2950, y: 700, labelPosition: "bottom", href: "/algorithms/approaches/dp/SCS" },

  // LEAVES - Greedy
  { id: "ActivitySelection", label: "Activity Select", color: "#f9a8d4", x: 3100, y: 700, labelPosition: "bottom", href: "/algorithms/approaches/greedy/ActivitySelection" },
  { id: "JobScheduling", label: "Job Sched", color: "#f9a8d4", x: 3250, y: 700, labelPosition: "bottom", href: "/algorithms/approaches/greedy/JobScheduling" },
  { id: "KnapsackGreedy", label: "Knapsack Frac", color: "#f9a8d4", x: 3400, y: 700, labelPosition: "bottom", href: "/algorithms/approaches/greedy/KnapsackGreedy" },
  { id: "MakingChangeGreedy", label: "Coin Change", color: "#f9a8d4", x: 3550, y: 700, labelPosition: "bottom", href: "/algorithms/approaches/greedy/MakingChangeGreedy" },

  // LEAVES - DC
  { id: "BinarySearch", label: "Binary Search", color: "#f9a8d4", x: 3700, y: 700, labelPosition: "bottom", href: "/algorithms/approaches/divide_and_conquer/BinarySearch" },
  { id: "Exponential", label: "Exponential", color: "#f9a8d4", x: 3850, y: 700, labelPosition: "bottom", href: "/algorithms/approaches/divide_and_conquer/Exponential" },
  { id: "MergeSort", label: "Merge Sort", color: "#f9a8d4", x: 4000, y: 700, labelPosition: "bottom", href: "/algorithms/approaches/divide_and_conquer/MergeSort" },
  { id: "MinMax", label: "Min/Max", color: "#f9a8d4", x: 4150, y: 700, labelPosition: "bottom", href: "/algorithms/approaches/divide_and_conquer/MinMax" },
  { id: "QuickSort", label: "Quick Sort", color: "#f9a8d4", x: 4300, y: 700, labelPosition: "bottom", href: "/algorithms/approaches/divide_and_conquer/QuickSort" },
  { id: "QuickSortMedian", label: "Quick Sort (Med)", color: "#f9a8d4", x: 4450, y: 700, labelPosition: "bottom", href: "/algorithms/approaches/divide_and_conquer/QuickSortMedian" },

  // LEAVES - Searching
  { id: "LinearSearch", label: "Linear Search", color: "#c4b5fd", x: 4600, y: 700, labelPosition: "bottom", href: "/algorithms/basics/searching/LinearSearch" },

  // LEAVES - Sorting
  { id: "BubbleSort", label: "Bubble Sort", color: "#c4b5fd", x: 4750, y: 700, labelPosition: "bottom", href: "/algorithms/basics/sorting/BubbleSort" },
  { id: "InsertionSort", label: "Insertion Sort", color: "#c4b5fd", x: 4900, y: 700, labelPosition: "bottom", href: "/algorithms/basics/sorting/InsertionSort" },
  { id: "SelectionSort", label: "Selection Sort", color: "#c4b5fd", x: 5050, y: 700, labelPosition: "bottom", href: "/algorithms/basics/sorting/SelectionSort" }
];

const KNOWLEDGE_EDGES: GraphEdge[] = [
  // Root -> Categories
  { source: "Alg", target: "DS" },
  { source: "Alg", target: "Para" },
  { source: "Alg", target: "Basics" },

  // Categories -> Subcategories
  { source: "DS", target: "Graph" },
  { source: "DS", target: "Tree" },
  { source: "DS", target: "Queue" },
  { source: "DS", target: "Stack" },
  { source: "Para", target: "DP" },
  { source: "Para", target: "Greedy" },
  { source: "Para", target: "DC" },
  { source: "Basics", target: "Searching" },
  { source: "Basics", target: "Sorting" },

  // Subcategories -> Leaves (Graph)
  { source: "Graph", target: "APSP" },
  { source: "Graph", target: "Dijkstras" },
  { source: "Graph", target: "Kruskals" },
  { source: "Graph", target: "Prims" },
  { source: "Graph", target: "SCC" },
  { source: "Graph", target: "TopologicalSort" },

  // Tree
  { source: "Tree", target: "Inorder" },
  { source: "Tree", target: "Postorder" },
  { source: "Tree", target: "Preorder" },

  // Queue
  { source: "Queue", target: "QueueDequeue" },
  { source: "Queue", target: "QueueEnqueue" },

  // Stack
  { source: "Stack", target: "StackOverflow" },
  { source: "Stack", target: "StackPop" },
  { source: "Stack", target: "StackPush" },
  { source: "Stack", target: "StackUnderflow" },

  // DP
  { source: "DP", target: "Knapsack" },
  { source: "DP", target: "LCS" },
  { source: "DP", target: "MakingChange" },
  { source: "DP", target: "MatrixChain" },
  { source: "DP", target: "SCS" },

  // Greedy
  { source: "Greedy", target: "ActivitySelection" },
  { source: "Greedy", target: "JobScheduling" },
  { source: "Greedy", target: "KnapsackGreedy" },
  { source: "Greedy", target: "MakingChangeGreedy" },

  // DC
  { source: "DC", target: "BinarySearch" },
  { source: "DC", target: "Exponential" },
  { source: "DC", target: "MergeSort" },
  { source: "DC", target: "MinMax" },
  { source: "DC", target: "QuickSort" },
  { source: "DC", target: "QuickSortMedian" },

  // Searching
  { source: "Searching", target: "LinearSearch" },

  // Sorting
  { source: "Sorting", target: "BubbleSort" },
  { source: "Sorting", target: "InsertionSort" },
  { source: "Sorting", target: "SelectionSort" }
];

const Page: FC = () => {
  return (
    <div className="relative flex flex-col gap-9 overflow-x-hidden p-6 font-sans">
      <Image
        className="absolute -top-[8vh] left-0 z-[2] rotate-[270deg] opacity-25 md:-top-[40vh] md:rotate-[180deg]"
        src={"/assets/doodle-arrow.svg"}
        width={500}
        height={100}
        alt="Doodle Arrow"
      />
      
      <div className="z-10 bg-white/70 dark:bg-[#121212]/70 backdrop-blur rounded p-4">
        <h1 className="text-4xl font-bold mb-4">The AlgoDoodle Universe 🪐</h1>
        <p className="text-xl mb-4">
          Data structures and algorithms are highly interconnected! Notice how specific 
          problems (like the Knapsack problem) can be solved using entirely different paradigms (like DP vs Greedy).
          Use the graph below to intuit these relationships!
        </p>
        
        <div className="w-full flex justify-start py-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-x-auto custom-scrollbar">
            <div className="min-w-[5200px] px-10">
                <DoodleGraph nodes={KNOWLEDGE_NODES} edges={KNOWLEDGE_EDGES} width={5200} height={800} />
            </div>
        </div>
      </div>

      <div className="text-3xl font-bold mt-4">
        You can conveniently select any algorithm from the sidebar!
      </div>
      <div className="text-2xl">
        Each algorithm includes interactive step-by-step visualizers and explanations to help you understand the core concepts.
      </div>
      <div className="text-3xl font-bold mt-4">Terminology Reference</div>
      <MacWindowMockup>
        <ul className="space-y-4 rounded-lg p-4">
          <li className="flex items-center">
            <span className="mr-2 text-2xl">🔄</span>
            <span className="text-lg font-medium">Passes:</span>
            <span className="ml-2">Iterations over data</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-2xl">👉</span>
            <span className="text-lg font-medium">Pointers:</span>
            <span className="ml-2">Variables that store memory addresses</span>
          </li>
          <li className="flex flex-col mt-4">
            <span className="text-lg font-medium">
              <span className="mr-2 text-2xl">⏱️</span>
              BigO Time Complexity:
            </span>
            <span className="ml-2 mt-1 mb-2 text-gray-700 dark:text-gray-300">
              It represents the time, that is, the number of steps taken by an
              algorithm to solve a problem.
            </span>
            <ul className="flex list-disc flex-col gap-2 md:p-5 ml-4">
              <li>
                <b>O(1)</b> Constant time. Resolves in a single go regardless of input size!
              </li>
              <li>
                <b>O(n)</b> Linear time. Steps increase linearly with inputs.
              </li>
              <li>
                <b>O(log n)</b> Logarithmic time. Usually involves splitting problems (e.g., Binary Search).
              </li>
              <li>
                <b>O(n^2)</b> <span className="text-red-500 font-medium">Quadratic time.</span> Often undesirable, indicates nested loops.
              </li>
            </ul>
          </li>
          <li className="flex flex-col mt-4">
            <span className="text-lg font-medium">
              <span className="mr-2 text-2xl">💾</span>
              BigO Space Complexity:
            </span>
            <span className="ml-2 mt-1 mb-2 text-gray-700 dark:text-gray-300">
              It represents the amount of memory space that an algorithm uses to
              solve a problem as the input size grows.
            </span>
            <ul className="flex list-disc flex-col gap-2 md:p-5 ml-4">
              <li>
                <b>O(1)</b> Constant memory base. Most desirable.
              </li>
              <li>
                <b>O(n)</b> Memory scales linearly with inputs.
              </li>
              <li>
                <b>O(log n)</b> Memory scales logarithmically, often via call stack in recursion.
              </li>
              <li>
                <b>O(n^2)</b> <span className="text-red-500 font-medium">Quadratic memory.</span> Matrix/2D DP table requirements.
              </li>
            </ul>
          </li>
        </ul>
      </MacWindowMockup>
    </div>
  );
};

export default Page;
