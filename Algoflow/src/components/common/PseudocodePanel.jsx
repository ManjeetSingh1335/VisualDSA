import React from 'react';
import { useVisualizer } from '@/context/VisualizerContext';
import { ALGORITHM_METADATA } from '@/algorithms/metadata';
import { Terminal, Code2 } from 'lucide-react';
export const PseudocodePanel = () => {
  const { algorithm, snapshots, currentStep } = useVisualizer();
  const meta = ALGORITHM_METADATA[algorithm];
  if (!meta) return null;
  const currentSnapshot = snapshots[currentStep];
  const activeLine = currentSnapshot ? currentSnapshot.line : -1;
  const description = currentSnapshot ? currentSnapshot.description : 'Click Start Visualization to begin.';
  return (
    <div className="w-full flex flex-col gap-4 bg-white border border-slate-200/80 dark:bg-slate-900/40 p-5 rounded-2xl dark:border-white/5 backdrop-blur-md transition-colors">
  
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/5">
        <Code2 className="w-4 h-4 text-brand-primary" />
        <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-700 dark:text-slate-300">Pseudocode</h3>
      </div>
     
     
      <div className="bg-slate-100 dark:bg-[#030712] rounded-xl border border-slate-200 dark:border-white/5 p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-700 dark:text-slate-300 select-none">
        {meta.pseudocode.map((line, idx) => {
          const isActive = idx === activeLine;
          return (
            <div
              key={idx}
              className={`flex items-center gap-4 px-2 py-1 rounded transition-colors duration-150 ${
                isActive
                  ? 'bg-brand-primary/20 border-l-2 border-brand-primary text-slate-900 dark:text-white font-semibold'
                  : 'border-l-2 border-transparent'
              }`}
            >
              <span className="text-[10px] text-slate-400 dark:text-slate-600 w-4 text-right">{idx + 1}</span>
              <pre className="whitespace-pre">{line}</pre>
            </div>
          );
        })}
      </div>
  


      <div className="bg-slate-100 border border-slate-200/60 dark:bg-white/5 dark:border-white/5 p-4 rounded-xl flex gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0">
          <Terminal className="w-4 h-4 text-brand-accent" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Step Execution Log</span>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};
