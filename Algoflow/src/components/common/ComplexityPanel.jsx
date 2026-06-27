import React from 'react';
import {useVisualizer} from '@/context/VisualizerContext';
import {ALGORITHM_METADATA} from '@/algorithms/metadata';
import {ShieldCheck,Database,Zap} from 'lucide-react';
export const ComplexityPanel=()=>{
    const {algorithm, category}=useVisualizer();
    const meta=ALGORITHM_METADATA[algorithm];
    if(!meta) return null;
    const getComplexityColor=(notation, isWorst)=>{
        const n=notation.toLowerCase().replace(/\s/g, '');
        if(n==='o(1)' || n==='o(logn)') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
        if(n==='o(n)' || n==='o(n+e)') return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
        if(n==='o(nlogn)') return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
        if(n==='o(n²)' || n==='o(n^2)') return 'text-red-500 dark:text-red-400 bg-red-500/10 border-red-500/20';
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    };
    const catColor = category === 'sorting' ? 'text-blue-400' :
                     category === 'graph' ? 'text-cyan-400' :
                     category === 'tree' ? 'text-emerald-400' :
                     category === 'dp' ? 'text-amber-400' : 'text-brand-primary';
    return(
        <div className="w-full flex flex-col gap-4 bg-white border border-slate-200/80 dark:bg-slate-900/40 p-5 rounded-2xl dark:border-white/5 backdrop-blur-md transition-colors">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/5">
                <Zap className={`w-4 h-4 ${catColor}`} />
                <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-700 dark:text-slate-300">Complexity analysis</h3>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                        <ShieldCheck className={`w-3.5 h-3.5 ${catColor}`} /> Time Complexity
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/5 flex flex-col gap-1">
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Best</span>
                                <code className={`text-xs font-bold font-mono px-2 py-0.5 rounded border self-start ${getComplexityColor(meta.timeComplexity.best)}`}> {meta.timeComplexity.best}
                                </code>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/5 flex flex-col gap-1">
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Average</span>
                                <code className={`text-xs font-bold font-mono px-2 py-0.5 rounded border self-start ${getComplexityColor(meta.timeComplexity.average)}`}> {meta.timeComplexity.average}
                                </code>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/5 flex flex-col gap-1">
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Worst</span>
                                <code className={`text-xs font-bold font-mono px-2 py-0.5 rounded border self-start ${getComplexityColor(meta.timeComplexity.worst, true)}`}> {meta.timeComplexity.worst}
                                </code>
                        </div>
                    </div>
                </div>


        <div className="flex flex-col gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <Database className={`w-3.5 h-3.5 ${catColor}`} /> Space Complexity
            </span>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Worst Case</span>
                    <code className={`text-xs font-bold font-mono px-2 py-0.5 rounded border ${getComplexityColor(meta.spaceComplexity)}`}> {meta.spaceComplexity}
                    </code>
            </div>
            </div>
        
      </div>
    </div>
    );
};
