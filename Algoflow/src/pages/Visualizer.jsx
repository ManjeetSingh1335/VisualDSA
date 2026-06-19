import React from 'react';
import { useVisualizer } from '@/context/VisualizerContext';
import { ALGORITHM_METADATA } from '@/algorithms/metadata';
import { Play, RotateCcw, Sliders } from 'lucide-react';

import { SortingVisualizer } from '@/components/visualizers/SortingVisualizer';
import { GraphVisualizer } from '@/components/visualizers/GraphVisualizer';
import { TreeVisualizer } from '@/components/visualizers/TreeVisualizer';
import { DPVisualizer } from '@/components/visualizers/DPVisualizer';

import { PlaybackControls } from '@/components/common/PlaybackControls';
import { PseudocodePanel } from '@/components/common/PseudocodePanel';
import { ComplexityPanel } from '@/components/common/ComplexityPanel';

export const Visualizer=()=>{

  const{
    algorithm,
    category,
    setAlgorithm,
    snapshots,
    startVisualization,
    reset,
    arraySize,
    setArraySize,
    arrayInitType,
    setArrayInitType,
    graphNodes,
    graphStartNode,
    graphTargetNode,
    setGraphStartNode,
    setGraphTargetNode
  }=useVisualizer();

  const meta=ALGORITHM_METADATA[algorithm];

  const categoriesMap={
    sorting:'Sorting',
    graph:'Graph Algorithms',
    tree:'Trees & Search Trees',
    dp:'Dynamic Programming'
  };

  return (
    <div className="w-full py-8 px-4 max-w-7xl mx-auto flex flex-col gap-8 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-slate-200/80 dark:bg-slate-900/40 p-6 rounded-2xl dark:border-white/5 backdrop-blur-md transition-all">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-brand-primary/15 border border-brand-primary/20 text-brand-accent">
              {categoriesMap[category] || category}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1 text-slate-900 dark:text-white">
            {meta?.name || 'Algorithm Visualizer'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs max-w-xl leading-relaxed mt-1">
            {meta?.description || 'Visualize execution steps, track variables, and analyze runtime complexity.'}
          </p>
        </div>
      </div>

 
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          <div className="w-full animate-fadeIn">
            {category === 'sorting' && <SortingVisualizer />}
            {category === 'graph' && <GraphVisualizer />}
            {category === 'tree' && <TreeVisualizer />}
            {category === 'dp' && <DPVisualizer />}
          </div>

          <div className="flex flex-col gap-4">
            {snapshots.length === 0 && (category === 'sorting' || category === 'graph') && (
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200/80 dark:bg-slate-900/40 p-5 rounded-2xl dark:border-white/5 backdrop-blur-md transition-colors">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Sliders className="w-4 h-4 text-brand-primary" />
                  <span className="font-semibold uppercase tracking-wider">Configure Parameters</span>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {category === 'sorting' && (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">Size: {arraySize}</span>
                        <input
                          type="range"
                          min={5}
                          max={50}
                          value={arraySize}
                          onChange={(e) => setArraySize(parseInt(e.target.value))}
                          className="h-1 w-24 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">Init:</span>
                        <select
                          value={arrayInitType}
                          onChange={(e) => setArrayInitType(e.target.value)}
                          className="px-2 py-1 bg-slate-100 border border-slate-200 dark:bg-white/5 dark:border-white/10 text-slate-800 dark:text-white rounded-lg text-xs focus:outline-none transition-colors"
                        >
                          <option value="random">Random</option>
                          <option value="sorted">Sorted</option>
                          <option value="reversed">Reversed</option>
                        </select>
                      </div>
                      <button
                        onClick={reset}
                        className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200/60 dark:bg-white/5 dark:border-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 dark:hover:text-white rounded-xl text-xs transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Generate Array
                      </button>
                    </>
                  )}

                  {category === 'graph' && (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">Start:</span>
                        <select
                          value={graphStartNode}
                          onChange={(e) => setGraphStartNode(e.target.value)}
                          className="px-2.5 py-1 bg-slate-100 border border-slate-200 dark:bg-white/5 dark:border-white/10 text-slate-800 dark:text-white rounded-lg text-xs focus:outline-none transition-colors"
                        >
                          <option value="">Select</option>
                          {graphNodes.map(node => (
                            <option key={node.id} value={node.id}>{node.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">Target:</span>
                        <select
                          value={graphTargetNode}
                          onChange={(e) => setGraphTargetNode(e.target.value)}
                          className="px-2.5 py-1 bg-white/5 border border-white/10 text-white rounded-lg text-xs focus:outline-none"
                        >
                          <option value="">Select</option>
                          {graphNodes.map(node => (
                            <option key={node.id} value={node.id}>{node.label}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                  <button
                    onClick={startVisualization}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-xl text-xs font-semibold hover:shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Start Visualization
                  </button>
                </div>
              </div>
            )}

            <PlaybackControls />
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          <ComplexityPanel />
          <PseudocodePanel />
        </div>
      </div>
    </div>
  );
};