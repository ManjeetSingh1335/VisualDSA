import React, { useState, useRef, useEffect } from 'react';
import { useVisualizer } from '@/context/VisualizerContext';
import { Trash2, HelpCircle } from 'lucide-react';

export const GraphCanvas = () => {
  const {
    snapshots,
    currentStep,
    graphNodes,
    graphEdges,
    graphStartNode,
    graphTargetNode,
    addGraphNode,
    deleteGraphNode,
    addGraphEdge,
    setGraphStartNode,
    setGraphTargetNode,
    setGraphPreset,
    clearGraph
  } = useVisualizer();

  const svgRef = useRef(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [edgeSourceId, setEdgeSourceId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDraggingNode, setIsDraggingNode] = useState(null);

  const currentSnapshot = snapshots[currentStep];
  const visited = currentSnapshot?.visited || [];
  const currentNode = currentSnapshot?.currentNode;
  const shortestPath = currentSnapshot?.shortestPath || [];


  const handleMouseDownNode = (id, e) => {
    e.stopPropagation();
    if (e.shiftKey) {
      setIsDraggingNode(id);
    } else {
      setEdgeSourceId(id);
      const node = graphNodes.find(n => n.id === id);
      if (node) {
        setMousePos({ x: node.x, y: node.y });
      }
    }
    setSelectedNodeId(id);
  };

  const handleMouseMoveCanvas = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (edgeSourceId) {
      setMousePos({ x, y });
    } else if (isDraggingNode) {
      const node = graphNodes.find(n => n.id === isDraggingNode);
      if (node) {
        node.x = Math.round(x);
        node.y = Math.round(y);
      }
    }
  };

  const handleMouseUpCanvas = () => {
    setIsDraggingNode(null);
    setEdgeSourceId(null);
  };

  const handleMouseUpNode = (targetId, e) => {
    e.stopPropagation();
    if (edgeSourceId && edgeSourceId !== targetId) {
      addGraphEdge(edgeSourceId, targetId);
    }
    setEdgeSourceId(null);
  };

  const handleDoubleClickCanvas = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (x > 30 && x < rect.width - 30 && y > 30 && y < rect.height - 30) {
      addGraphNode(Math.round(x), Math.round(y));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId) {
        deleteGraphNode(selectedNodeId);
        setSelectedNodeId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeId, deleteGraphNode]);

  const getNodeColor = (id) => {
    if (currentNode === id) return 'fill-amber-500 stroke-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]';
    if (shortestPath.includes(id)) return 'fill-brand-primary stroke-brand-accent drop-shadow-[0_0_8px_rgba(6, 182, 212, 0.6)]';
    if (visited.includes(id)) return 'fill-brand-cyan stroke-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]';
    if (selectedNodeId === id) return 'fill-brand-secondary stroke-brand-accent';
    return 'fill-[#1e293b] stroke-slate-600';
  };

  const getEdgeStyle = (from, to) => {
    const pathIdxFrom = shortestPath.indexOf(from);
    const pathIdxTo = shortestPath.indexOf(to);

    const isShortest =
      pathIdxFrom !== -1 &&
      pathIdxTo !== -1 &&
      Math.abs(pathIdxFrom - pathIdxTo) === 1;
    if (isShortest) {
      return {
        stroke: '#00DF89',
        strokeWidth: 4,
        opacity: 1,
        filter: 'drop-shadow(0 0 6px #00DF89)'
      };
    }

    const isVisited = visited.includes(from) && visited.includes(to);
    if (isVisited) {
      return {
        stroke: '#06b6d4',
        strokeWidth: 2,
        opacity: 0.8
      };
    }
    return {
      stroke: 'rgba(255, 255, 255, 0.15)',
      strokeWidth: 1.5,
      opacity: 0.5
    };
  };

  const getSourceNodeCoords = () => {
    if (!edgeSourceId) return null;
    const node = graphNodes.find(n => n.id === edgeSourceId);
    return node ? { x: node.x, y: node.y } : null;
  };

  const tempLineCoords = getSourceNodeCoords();

  return (
    <div className="w-full flex flex-col gap-4">
  
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-white/5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setGraphPreset('basic')}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            Preset 1 (Basic)
          </button>
          <button
            onClick={() => setGraphPreset('cycle')}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            Preset 2 (Cycle)
          </button>
          <button
            onClick={() => setGraphPreset('grid')}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            Preset 3 (Grid)
          </button>
        </div>
        <div className="flex items-center gap-2">
          {selectedNodeId && (
            <button
              onClick={() => {
                deleteGraphNode(selectedNodeId);
                setSelectedNodeId(null);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete Selected
            </button>
          )}
          <button
            onClick={clearGraph}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            Clear Canvas
          </button>
        </div>
      </div>

      <div className="relative w-full h-[400px] bg-brand-darkBg rounded-2xl border border-white/5 shadow-glass overflow-hidden grid-bg">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/5 text-[10px] text-slate-400">
          <HelpCircle className="w-3.5 h-3.5 text-brand-primary" />
          <span>Double-click to create node | Drag node to connect | Shift+Drag node to move</span>
        </div>
        {selectedNodeId && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/5">
            <button
              onClick={() => setGraphStartNode(selectedNodeId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                graphStartNode === selectedNodeId
                  ? 'bg-brand-cyan text-slate-900'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              Set Start
            </button>
            <button
              onClick={() => setGraphTargetNode(selectedNodeId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                graphTargetNode === selectedNodeId
                  ? 'bg-brand-primary text-white'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              Set Target
            </button>
          </div>
        )}
        <svg
          ref={svgRef}
          className="w-full h-full select-none cursor-crosshair"
          onMouseMove={handleMouseMoveCanvas}
          onMouseUp={handleMouseUpCanvas}
          onDoubleClick={handleDoubleClickCanvas}
        >

          {graphEdges.map((edge, idx) => {
            const fromNode = graphNodes.find(n => n.id === edge.from);
            const toNode = graphNodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;
            const edgeStyle = getEdgeStyle(edge.from, edge.to);
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;
            return (
              <g key={`edge-${idx}`}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  style={edgeStyle}
                  className="transition-all duration-300"
                />
    
                <g transform={`translate(${midX}, ${midY})`}>
                  <rect
                    x={-12}
                    y={-10}
                    width={24}
                    height={18}
                    rx={4}
                    fill="#0d0f22"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={1}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#cbd5e1"
                    fontSize={10}
                    fontFamily="monospace"
                    fontWeight="bold"
                    className="cursor-pointer"
                    onClick={() => {
                     
                      const val = prompt(`Enter new weight for edge (${edge.from} - ${edge.to}):`, edge.weight.toString());
                      if (val) {
                        const newW = parseInt(val);
                        if (!isNaN(newW)) {
                          edge.weight = newW;
                          setGraphPreset('custom'); 
                        }
                      }
                    }}
                  >
                    {edge.weight}
                  </text>
                </g>
              </g>
            );
          })}

          {tempLineCoords && (
            <line
              x1={tempLineCoords.x}
              y1={tempLineCoords.y}
              x2={mousePos.x}
              y2={mousePos.y}
              stroke="#00DF89"
              strokeDasharray="4 4"
              strokeWidth={2}
            />
          )}

          {graphNodes.map((node) => {
            const isStart = graphStartNode === node.id;
            const isTarget = graphTargetNode === node.id;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onMouseDown={(e) => handleMouseDownNode(node.id, e)}
                onMouseUp={(e) => handleMouseUpNode(node.id, e)}
                className="cursor-pointer"
              >
                {(isStart || isTarget) && (
                  <circle
                    r={28}
                    fill="none"
                    stroke={isStart ? '#00c2cb' : '#00DF89'}
                    strokeWidth={1.5}
                    className="pulse-ring-active opacity-60"
                  />
                )}
                <circle
                  r={20}
                  className={`transition-all duration-300 stroke-[2] ${getNodeColor(node.id)}`}
                />
                
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#ffffff"
                  fontSize={12}
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  {node.label}
                </text>
                {isStart && (
                  <text
                    y={32}
                    textAnchor="middle"
                    fill="#06b6d4"
                    fontSize={9}
                    fontWeight="bold"
                    letterSpacing={0.5}
                  >
                    START
                  </text>
                )}
                {isTarget && (
                  <text
                    y={32}
                    textAnchor="middle"
                    fill="#a78bfa"
                    fontSize={9}
                    fontWeight="bold"
                    letterSpacing={0.5}
                  >
                    TARGET
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};