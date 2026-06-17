import React from 'react';
import { GraphCanvas } from '../graph-builder/GraphCanvas';
import { useVisualizer } from '@/context/VisualizerContext';
import { List, Route } from 'lucide-react';
export const GraphVisualizer = () => {
  const { snapshots, currentStep, graphNodes } = useVisualizer();
  const currentSnapshot = snapshots[currentStep];
  const queue = currentSnapshot?.queue || [];
  const stack = currentSnapshot?.stack || [];
  const distances = currentSnapshot?.distances || {};
  const shortestPath = currentSnapshot?.shortestPath || [];
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main interactive graph canvas */}
        <div className="lg:col-span-3">
          <GraphCanvas />
        </div>
        {/* Real-time details card */}
        <div className="lg:col-span-1 flex flex-col gap-4 bg-slate-900/40 p-5 rounded-2xl border border-white/5 backdrop-blur-md justify-between">
          <div className="flex flex-col gap-4">
            {/* Playback stack/queue detail */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <List className="w-3.5 h-3.5 text-brand-primary" />
                {stack.length > 0 ? 'DFS Stack' : 'Search Queue'}
              </span>
              <div className="flex flex-wrap gap-1.5 p-3 bg-black/40 rounded-xl border border-white/5 min-h-[50px] max-h-[140px] overflow-y-auto">
                {(stack.length > 0 ? stack : queue).length === 0 ? (
                  <span className="text-[10px] text-slate-600 font-mono">Empty</span>
                ) : (
                  (stack.length > 0 ? stack : queue).map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-accent rounded text-[10px] font-bold font-mono"
                    >
                      {item}
                    </span>
                  ))
                )}
              </div>
            </div>
            {/* Path distances tracking */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Route className="w-3.5 h-3.5 text-brand-cyan" /> Distances
              </span>
              <div className="grid grid-cols-2 gap-1.5 max-h-[150px] overflow-y-auto">
                {graphNodes.map(node => {
                  const dist = distances[node.id];
                  const formattedDist = dist === Infinity ? '∞' : dist;
                  return (
                    <div
                      key={node.id}
                      className="flex items-center justify-between p-2 bg-white/5 border border-white/5 rounded-lg text-[10px]"
                    >
                      <span className="font-bold text-slate-300">{node.label}</span>
                      <span className="font-mono text-slate-400">{formattedDist}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Shortest path reconstruction result */}
          {shortestPath.length > 0 && (
            <div className="p-3 bg-brand-primary/15 border border-brand-primary/20 rounded-xl">
              <span className="text-[10px] text-brand-accent uppercase tracking-wider font-bold">Path Found</span>
              <p className="text-xs font-mono text-white font-semibold mt-1">
                {shortestPath.join(' → ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
