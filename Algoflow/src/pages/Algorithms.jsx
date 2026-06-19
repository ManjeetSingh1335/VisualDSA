import React, { useState, useEffect } from 'react';
import { ALGORITHM_METADATA } from '@/algorithms/metadata';
import {Search,Layers,Network,GitBranch,TableProperties,ArrowRight,Sparkles,ArrowLeft} from 'lucide-react';
import { useVisualizer } from '@/context/VisualizerContext';
import { Visualizer } from '@/pages/Visualizer';

export const Algorithms = ({ setCurrentPage, setAlgorithm }) => {
  const { algorithm, setAlgorithm: setAlgorithmContext, category, setCategory } = useVisualizer();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [algorithm]);
  
  const activeTab = category || 'all';
  const setActiveTab = (tabId) => {
    if (tabId === 'all') {
      setCategory(null);
    } else {
      setCategory(tabId);
    }
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'sorting', label: 'Sorting' },
    { id: 'graph', label: 'Graph' },
    { id: 'tree', label: 'Trees' },
    { id: 'dp', label: 'Dynamic Programming' }
  ];

  const handleSelectAlgo = (algoKey) => {
    setAlgorithm(algoKey);
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'sorting':
        return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'graph':
        return <Network className="w-5 h-5 text-brand-cyan" />;
      case 'tree':
        return <GitBranch className="w-5 h-5 text-brand-accent" />;
      case 'dp':
        return <TableProperties className="w-5 h-5 text-amber-500" />;
    }
  };

  const filteredAlgos = Object.entries(ALGORITHM_METADATA).filter(([, meta]) => {
    const matchesSearch =
      meta.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meta.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || meta.category === activeTab;
    return matchesSearch && matchesTab;
  });

  if (algorithm) {
    return (
      <div className="w-full flex flex-col gap-4 animate-fadeIn">
        <div className="max-w-7xl mx-auto w-full px-6 pt-6 flex items-center">
          <button
            onClick={() => setAlgorithmContext(null)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-200/40 hover:bg-slate-200/60 dark:bg-slate-800/40 dark:hover:bg-slate-800/60 border border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all duration-300 hover:shadow-sm hover:translate-x-[-2px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Algorithms
          </button>
        </div>
        <Visualizer />
      </div>
    );
  }

  return (
    <div className="w-full py-12 px-6 max-w-7xl mx-auto flex flex-col gap-10 ">
      

        <div className="relative py-16 md:py-20 text-center overflow-hidden">
          <div className="absolute -left-10 top-6 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl" />
            <div className="absolute -right-10 top-6 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl" />
              <Sparkles className="absolute left-1/4 top-8 w-5 h-5 text-purple-300 opacity-70 rotate-12" />
              <Sparkles className="absolute right-1/4 top-12 w-5 h-5 text-cyan-300 opacity-70 -rotate-12" />
                <div className="absolute left-10 top-14 grid grid-cols-3 gap-2 opacity-30">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-purple-300"
                    />
                  ))}
                </div>
                <div className="absolute right-10 top-14 grid grid-cols-3 gap-2 opacity-30">
                  {[...Array(9)].map((_, i) => (
                    <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-cyan-300"
                    />
                  ))}
                </div>
                
                <h1 className="text-5xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 via-purple-500 to-sky-500 bg-clip-text text-transparent">
                  ALGORITHMS
                </h1>
                <p className="mt-5 text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
                  Explore and visualize algorithms across various categories.
                </p>
        </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-800/40 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-100" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search algorithms..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 text-white placeholder:text-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5 w-full md:w-auto">
          {categories.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>


      {filteredAlgos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlgos.map(([key, meta]) => (
            <div
              key={key}
              className="glass-panel glass-card-hover p-6 rounded-2xl flex flex-col justify-between gap-6 group "
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/30 flex items-center justify-center">
                    {getCategoryIcon(meta.category)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/30 text-slate-100">
                    {meta.category}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-brand-accent transition-colors">
                    {meta.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2 min-h-[40px]">
                    {meta.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-white/5 pt-4">
                <div className="flex flex-col gap-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold uppercase">Time Complexity</span>
                    <code className="text-slate-200 font-mono font-semibold">
                      {meta.timeComplexity.average}
                    </code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold uppercase">Space Complexity</span>
                    <code className="text-slate-200 font-mono font-semibold">
                      {meta.spaceComplexity}
                    </code>
                  </div>
                </div>
                <button
                  onClick={() => handleSelectAlgo(key)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-white/5 border border-white/5 hover:bg-brand-primary hover:border-brand-primary hover:text-white rounded-xl text-xs font-bold text-slate-300 transition-all group-hover:shadow-glow-primary"
                >
                  Visualize <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full py-20 text-center text-slate-500 text-sm font-semibold">
          No algorithms match your criteria.
        </div>
      )}
    </div>
  );
};