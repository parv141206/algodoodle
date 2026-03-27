import { DoodleCard } from "@/app/_components/DoodleCards/DoodleCard";
import React from "react";
import Link from 'next/link';

export default function Page() {
  return (
    <div className="space-y-6">
      <DoodleCard title="Welcome to Graph Algorithms!" accentColor="bg-orange-300" class="">
        <>
          <p>Select an algorithm from the sidebar to start visualizing.</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/algorithms/data_structures/graph/Prims">
              <div className="block p-4 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <h3 className="font-bold text-lg">Prim's Algorithm</h3>
                <p className="text-sm">Find the Minimum Spanning Tree of a connected, undirected graph.</p>
              </div>
            </Link>
            <Link href="/algorithms/data_structures/graph/Kruskals">
              <div className="block p-4 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <h3 className="font-bold text-lg">Kruskal's Algorithm</h3>
                <p className="text-sm">Find the Minimum Spanning Tree using a greedy edge-picking strategy.</p>
              </div>
            </Link>
            <Link href="/algorithms/data_structures/graph/SCC">
              <div className="block p-4 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <h3 className="font-bold text-lg">Strongly Connected Components</h3>
                <p className="text-sm">Kosaraju's algorithm for finding all SCCs in a directed graph.</p>
              </div>
            </Link>
            <Link href="/algorithms/data_structures/graph/Dijkstras">
              <div className="block p-4 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <h3 className="font-bold text-lg">Dijkstra's Algorithm</h3>
                <p className="text-sm">Find the shortest path from a single source to all other nodes.</p>
              </div>
            </Link>
            <Link href="/algorithms/data_structures/graph/APSP">
              <div className="block p-4 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <h3 className="font-bold text-lg">All Pairs Shortest Path</h3>
                <p className="text-sm">Floyd-Warshall algorithm to find shortest paths between every pair of nodes.</p>
              </div>
            </Link>
            <Link href="/algorithms/data_structures/graph/TopologicalSort">
              <div className="block p-4 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <h3 className="font-bold text-lg">Topological Sort</h3>
                <p className="text-sm">Linear ordering of vertices such that every directed edge uv, vertex u comes before v.</p>
              </div>
            </Link>
          </div>
        </>
      </DoodleCard>
    </div>
  );
}
