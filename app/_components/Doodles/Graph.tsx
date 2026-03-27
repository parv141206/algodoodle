"use client";
import { useRouter } from "next/navigation";
import { FC, useMemo } from "react";

export interface GraphNode {
  id: string;
  label: string;
  isHighlighted?: boolean;
  color?: string; // Optional custom color class overriding standard
  x?: number; // Custom X position
  y?: number; // Custom Y position
  labelPosition?: "inside" | "bottom";
  href?: string; // Optional path to navigate on click
}

export interface GraphEdge {
  source: string;
  target: string;
  label?: string | number;
  isHighlighted?: boolean;
  isDirected?: boolean;
}

interface Props {
  nodes: GraphNode[];
  edges: GraphEdge[];
  width?: number;
  height?: number;
}

// Helper to determine node positions using a simple circular layout, or strictly use custom x/y if provided.
const getCircularLayout = (nodes: GraphNode[], centerX: number, centerY: number, radius: number) => {
  const n = nodes.length;
  const positions: Record<string, { x: number; y: number }> = {};
  
  nodes.forEach((node, i) => {
    if (node.x !== undefined && node.y !== undefined) {
      positions[node.id] = { x: node.x, y: node.y };
    } else {
      // Start at top (270 degrees or -Math.PI / 2)
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      positions[node.id] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    }
  });
  
  return positions;
};

const DoodleGraph: FC<Props> = ({ nodes, edges, width = 400, height = 400 }) => {
  const router = useRouter();
  const NODE_RADIUS = 20; // cleaner professional radius
  const radius = Math.min(width, height) / 2 - 40; // 40px padding
  const centerX = width / 2;
  const centerY = height / 2;
  
  const positions = useMemo(() => getCircularLayout(nodes, centerX, centerY, radius), [nodes, centerX, centerY, radius]);

  const handleNodeClick = (href?: string) => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <div className="flex justify-center items-center w-full my-4">
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        style={{ width: "100%", height: "auto", maxWidth: width }}
        className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm"
      >
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" />
          </marker>
          <marker id="arrow-highlighted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
          </marker>
        </defs>

        {/* Draw Edges */}
        {edges.map((edge, idx) => {
          const sourcePos = positions[edge.source];
          const targetPos = positions[edge.target];
          if (!sourcePos || !targetPos) return null;

          // Calculate shortened line so arrow doesn't sit under the node
          const dx = targetPos.x - sourcePos.x;
          const dy = targetPos.y - sourcePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist === 0) return null;

          const ratioX = dx / dist;
          const ratioY = dy / dist;

          const x1 = sourcePos.x + ratioX * NODE_RADIUS;
          const y1 = sourcePos.y + ratioY * NODE_RADIUS;
          const x2 = targetPos.x - ratioX * NODE_RADIUS;
          const y2 = targetPos.y - ratioY * NODE_RADIUS;

          // Midpoint for label
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;

          return (
            <g key={`edge-${idx}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeWidth={edge.isHighlighted ? 4 : 2}
                stroke={edge.isHighlighted ? "#3b82f6" : "#9ca3af"} // blue-500 : gray-400
                markerEnd={edge.isDirected ? (edge.isHighlighted ? "url(#arrow-highlighted)" : "url(#arrow)") : undefined}
                className="transition-all duration-300"
              />
              {edge.label !== undefined && (
                <text
                  x={midX}
                  y={midY - 5}
                  textAnchor="middle"
                  fill={edge.isHighlighted ? "#1d4ed8" : "#4b5563"}
                  fontWeight="bold"
                  fontSize={14}
                  className="bg-white"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Draw Nodes */}
        {nodes.map((node) => {
          const pos = positions[node.id];
          if (!pos) return null;

          return (
            <g 
              key={`node-${node.id}`} 
              onClick={() => handleNodeClick(node.href)}
              className={`transition-all duration-300 ${node.href ? 'cursor-pointer hover:-translate-y-1' : ''}`} 
              style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
            >
              <circle
                cx={0}
                cy={0}
                r={NODE_RADIUS}
                fill={node.color || (node.isHighlighted ? "#bfdbfe" : "#ffffff")} // blue-200 : white
                stroke={node.isHighlighted ? "#3b82f6" : (node.color ? "white" : "#6b7280")}
                strokeWidth={3}
                className="transition-colors duration-300"
                style={node.href ? { filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))" } : {}}
              />
              <text
                x={0}
                y={node.labelPosition === "bottom" ? NODE_RADIUS + 20 : 5}
                textAnchor="middle"
                fontSize={15}
                fontWeight="600"
                fill={node.labelPosition === "bottom" ? "#374151" : (node.color ? "white" : "#1f2937")}
                className={node.labelPosition === "bottom" ? "dark:fill-gray-300" : "dark:fill-white"}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default DoodleGraph;
