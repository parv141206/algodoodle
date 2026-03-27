import Link from 'next/link';

export default function GraphLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-8 rounded-xl bg-orange-100 p-6 dark:bg-orange-950">
        <h1 className="mb-2 text-3xl font-bold">Graph Algorithms</h1>
        <p className="text-gray-700 dark:text-gray-300">
          Graphs are powerful non-linear data structures consisting of nodes (vertices) connected by edges. Graph algorithms solve fundamental problems like finding shortest paths, minimizing network costs, or ordering dependent tasks!
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}
