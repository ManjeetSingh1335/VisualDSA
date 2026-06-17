import React from 'react';
import { useVisualizer } from '@/context/VisualizerContext';
import { motion, AnimatePresence } from 'framer-motion';
export const SortingVisualizer = () => {
  const { snapshots, currentStep, sortingArray } = useVisualizer();
  const currentSnapshot = snapshots[currentStep];
  const array = currentSnapshot ? currentSnapshot.array : sortingArray;
  const comparing = currentSnapshot?.comparing || [];
  const swapping = currentSnapshot?.swapping || [];
  const sorted = currentSnapshot?.sorted || [];
  const pivot = currentSnapshot?.pivot;
  // Compute maximum value in array to scale heights relatively
  const maxVal = Math.max(...array, 100);
  const getBarColorClass = (idx) => {
    if (swapping.includes(idx)) {
      return 'bg-gradient-to-t from-red-600 to-red-500 shadow-glow-secondary border border-red-400';
    }
    if (comparing.includes(idx)) {
      return 'bg-gradient-to-t from-amber-500 to-amber-400 shadow-glow-cyan border border-amber-300';
    }
    if (idx === pivot) {
      return 'bg-gradient-to-t from-cyan-500 to-cyan-400 shadow-glow-cyan border border-cyan-300';
    }
    if (sorted.includes(idx)) {
      return 'bg-gradient-to-t from-emerald-600 to-emerald-500 border border-emerald-400/30';
    }
    return 'bg-gradient-to-t from-slate-700 to-slate-600 border border-slate-500/20';
  };
  return (
    <div className="w-full flex flex-col gap-6 bg-[#090b16] rounded-2xl border border-white/5 p-6 shadow-glass justify-end h-[360px]">
      {/* Visualizer bars */}
      <div className="flex items-end justify-center gap-1.5 sm:gap-2 h-full w-full overflow-hidden px-2">
        <AnimatePresence initial={false}>
          {array.map((val, idx) => {
            const heightPct = (val / maxVal) * 85; // cap at 85% of height
            
            return (
              <motion.div
                key={`${idx}-${val}`}
                layout
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ scaleY: 1, originY: 1 }}
                exit={{ scaleY: 0, originY: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ height: `${heightPct}%` }}
                className={`flex-1 flex flex-col items-center justify-end rounded-t-lg min-w-[12px] max-w-[40px] relative group ${getBarColorClass(idx)}`}
              >
                {/* Floating tooltip */}
                <div className="absolute -top-8 bg-slate-900 border border-white/10 text-white text-[10px] px-2 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity font-mono pointer-events-none z-10">
                  {val}
                </div>
                {/* Array Value Text */}
                <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-100 mb-2 leading-none">
                  {val}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {/* Legend bar */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-white/5 text-xs text-slate-400 font-medium select-none">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-md bg-gradient-to-t from-amber-500 to-amber-400 border border-amber-300" />
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-md bg-gradient-to-t from-red-600 to-red-500 border border-red-400" />
          <span>Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-md bg-gradient-to-t from-emerald-600 to-emerald-500 border border-emerald-400/30" />
          <span>Sorted</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-md bg-gradient-to-t from-slate-700 to-slate-600 border border-slate-500/20" />
          <span>Unsorted</span>
        </div>
      </div>
    </div>
  );
};
