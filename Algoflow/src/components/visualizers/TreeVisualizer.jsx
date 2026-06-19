import React, { useState } from 'react';
import { useVisualizer } from '@/context/VisualizerContext';
import { Plus, Trash2, HelpCircle } from 'lucide-react';
export const TreeVisualizer = () => {
  const {
    snapshots,
    currentStep,
    treeNodes,
    treeRootId,
    insertIntoTree,
    clearTree
  } = useVisualizer();
  const [inputValue, setInputValue] = useState('20');
  const currentSnapshot = snapshots[currentStep];
  const nodes = currentSnapshot ? currentSnapshot.nodes : treeNodes;
  const rootId = currentSnapshot ? currentSnapshot.rootId : treeRootId;
  const currentNodeId = currentSnapshot?.currentNodeId;
  const highlightedIds = currentSnapshot?.highlightedIds || [];
  const action = currentSnapshot?.action;
  const renderTreeElements = (
    nodeId,
    x,
    y,
    hSpace,
    depth
  ) => {
    if (!nodeId || !nodes[nodeId]) return [];
    const node = nodes[nodeId];
    const elements = [];
    const vSpace = 65; 
    if (node.leftId && nodes[node.leftId]) {
      const lx = x - hSpace;
      const ly = y + vSpace;
      elements.push(
        <line
          key={`line-l-${node.id}`}
          x1={x}
          y1={y}
          x2={lx}
          y2={ly}
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth={2}
        />
      );
      elements.push(...renderTreeElements(node.leftId, lx, ly, hSpace * 0.5, depth + 1));
    }
    if (node.rightId && nodes[node.rightId]) {
      const rx = x + hSpace;
      const ry = y + vSpace;
      elements.push(
        <line
          key={`line-r-${node.id}`}
          x1={x}
          y1={y}
          x2={rx}
          y2={ry}
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth={2}
        />
      );
      elements.push(...renderTreeElements(node.rightId, rx, ry, hSpace * 0.5, depth + 1));
    }
    const isCurrent = currentNodeId === node.id;
    const isHighlighted = highlightedIds.includes(node.id);
    let circleClass = 'fill-[#1e293b] stroke-slate-500';
    if (isCurrent) circleClass = 'fill-amber-500 stroke-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]';
    else if (isHighlighted) {
      circleClass = action === 'rotate-left' || action === 'rotate-right'
        ? 'fill-brand-cyan stroke-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]'
        : 'fill-brand-primary stroke-brand-accent drop-shadow-[0_0_8px_rgba(124,58,237,0.6)]';
    }
    elements.push(
      <g key={`node-group-${node.id}`} transform={`translate(${x}, ${y})`}>
        {isCurrent && (
          <circle
            r={24}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={1.5}
            className="pulse-ring-active opacity-60"
          />
        )}
        
        <circle r={18} className={`transition-all duration-300 stroke-[2] ${circleClass}`} />
        
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#ffffff"
          fontSize={11}
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          {node.value}
        </text>
        <g transform="translate(24, -8)">
          <rect
            x={-15}
            y={-6}
            width={30}
            height={13}
            rx={3}
            fill="#090b16"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
          />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fill={node.balanceFactor && Math.abs(node.balanceFactor) > 1 ? '#ef4444' : '#10b981'}
            fontSize={8}
            fontFamily="monospace"
            fontWeight="bold"
          >
            BF:{node.balanceFactor ?? 0}
          </text>
        </g>
      </g>
    );
    return elements;
  };
  const handleInsert = (e) => {
    e.preventDefault();
    const val = parseInt(inputValue);
    if (!isNaN(val)) {
      insertIntoTree(val);
      setInputValue('');
    }
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-white/5">
        <form onSubmit={handleInsert} className="flex items-center gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Insert value (e.g. 20)"
            className="w-40 px-3.5 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
            min={1}
            max={999}
          />
          <button
            type="submit"
            className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-xl text-xs font-semibold hover:shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Insert Node
          </button>
        </form>
        <button
          onClick={clearTree}
          className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/5 text-xs text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Reset Tree
        </button>
      </div>

      <div className="relative w-full h-[400px] bg-[#090b16] rounded-2xl border border-white/5 shadow-glass overflow-hidden grid-bg">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/5 text-[10px] text-slate-400">
          <HelpCircle className="w-3.5 h-3.5 text-brand-cyan" />
          <span>Insert elements to observe BST traversal &amp; AVL rotations in real-time</span>
        </div>
        {rootId ? (
          <svg className="w-full h-full select-none">
            <g transform="translate(0, 40)">
              {renderTreeElements(rootId, 400, 30, 150, 1)}
            </g>
          </svg>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-medium">
            Tree is empty. Insert a value to start.
          </div>
        )}
      </div>
    </div>
  );
};
