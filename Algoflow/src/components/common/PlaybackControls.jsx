import React from 'react';
import { useVisualizer } from '@/context/VisualizerContext';
import {
  SkipBack,
  Play,
  Pause,
  SkipForward,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
export const PlaybackControls = () => {
  const {
    snapshots,
    currentStep,
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    stepForward,
    stepBackward,
    goToStart,
    goToEnd,
    scrubTo
  } = useVisualizer();
  const speedOptions = [0.25, 0.5, 1, 1.5, 2, 4];
  if (snapshots.length === 0) return null;
  return (
    <div className="w-full flex flex-col gap-4 bg-white border border-slate-200/80 dark:bg-slate-900/40 p-5 rounded-2xl dark:border-white/5 backdrop-blur-md transition-colors">
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 w-12 text-right">Step {currentStep + 1}</span>
        <input
          type="range"
          min={0}
          max={snapshots.length - 1}
          value={currentStep}
          onChange={(e) => scrubTo(parseInt(e.target.value))}
          className="flex-1 h-1 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 w-12">{snapshots.length}</span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <button
            onClick={goToStart}
            disabled={currentStep === 0}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/85 text-slate-600 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-slate-100 dark:disabled:hover:bg-white/5 transition-all border border-slate-200/40 dark:border-transparent"
            title="Go to Start"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={stepBackward}
            disabled={currentStep === 0}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/85 text-slate-600 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-slate-100 dark:disabled:hover:bg-white/5 transition-all border border-slate-200/40 dark:border-transparent"
            title="Step Backward"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-glow-primary hover:shadow-brand-primary/60 hover:scale-105 active:scale-95 transition-all"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
          </button>
          <button
            onClick={stepForward}
            disabled={currentStep === snapshots.length - 1}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/85 text-slate-600 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-slate-100 dark:disabled:hover:bg-white/5 transition-all border border-slate-200/40 dark:border-transparent"
            title="Step Forward"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={goToEnd}
            disabled={currentStep === snapshots.length - 1}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/85 text-slate-600 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-slate-100 dark:disabled:hover:bg-white/5 transition-all border border-slate-200/40 dark:border-transparent"
            title="Go to End"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200/60 dark:border-white/5">
          {speedOptions.map(opt => (
            <button
              key={opt}
              onClick={() => setSpeed(opt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                speed === opt
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5'
              }`}
            >
              {opt}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
