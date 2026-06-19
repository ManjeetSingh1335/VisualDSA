import React, { useState } from 'react';
import { useVisualizer } from '@/context/VisualizerContext';
import { Play, Settings, RotateCcw } from 'lucide-react';
export const DPVisualizer = () => {
  const {
    algorithm,
    snapshots,
    currentStep,
    dpS1,
    setDpS1,
    dpS2,
    setDpS2,
    dpCoins,
    setDpCoins,
    dpAmount,
    setDpAmount,
    dpWeights,
    setDpWeights,
    dpValues,
    setDpValues,
    dpCapacity,
    setDpCapacity,
    startVisualization,
    reset
  } = useVisualizer();
  const currentSnapshot = snapshots[currentStep];
  const matrix = currentSnapshot?.matrix || [];
  const currentRow = currentSnapshot?.currentRow ?? -1;
  const currentCol = currentSnapshot?.currentCol ?? -1;
  const dependencies = currentSnapshot?.dependencies || [];
  const [lcs1, setLcs1] = useState(dpS1);
  const [lcs2, setLcs2] = useState(dpS2);
  const [coinsInput, setCoinsInput] = useState(dpCoins.join(','));
  const [amountInput, setAmountInput] = useState(dpAmount.toString());
  const [wtsInput, setWtsInput] = useState(dpWeights.join(','));
  const [valsInput, setValsInput] = useState(dpValues.join(','));
  const [capInput, setCapInput] = useState(dpCapacity.toString());
  const handleApplyParams = (e) => {
    e.preventDefault();
    if (algorithm === 'lcs') {
      setDpS1(lcs1.toUpperCase());
      setDpS2(lcs2.toUpperCase());
    } else if (algorithm === 'coin-change') {
      const parsedCoins = coinsInput.split(',').map(Number).filter(n => !isNaN(n) && n > 0);
      const parsedAmt = parseInt(amountInput);
      if (parsedCoins.length > 0 && !isNaN(parsedAmt)) {
        setDpCoins(parsedCoins);
        setDpAmount(parsedAmt);
      }
    } else if (algorithm === 'knapsack') {
      const parsedWts = wtsInput.split(',').map(Number).filter(n => !isNaN(n) && n > 0);
      const parsedVals = valsInput.split(',').map(Number).filter(n => !isNaN(n) && n > 0);
      const parsedCap = parseInt(capInput);
      if (parsedWts.length > 0 && parsedVals.length === parsedWts.length && !isNaN(parsedCap)) {
        setDpWeights(parsedWts);
        setDpValues(parsedVals);
        setDpCapacity(parsedCap);
      }
    }
    setTimeout(() => {
      startVisualization();
    }, 100);
  };
  const getCellClassName = (r, c) => {
    const isCurrent = r === currentRow && c === currentCol;
    const isDependency = dependencies.some(d => d.r === r && d.c === c);
    
    if (r === 0 || c === 0) {
      return 'bg-slate-800/80 text-slate-300 font-bold border-slate-700 text-center';
    }
    if (isCurrent) {
      return 'bg-amber-500/20 border-amber-400 text-amber-400 font-bold shadow-glow-cyan animate-pulse';
    }
    if (isDependency) {
      return 'bg-brand-primary/20 border-brand-primary text-brand-accent font-bold';
    }
    
    return 'bg-white/5 border-white/5 text-slate-400';
  };
  const renderMatrixCellVal = (val) => {
    if (val === Infinity || val === 'Infinity') return '∞';
    return val;
  };
  return (
    <div className="w-full flex flex-col gap-4">

      <form onSubmit={handleApplyParams} className="bg-slate-900/40 p-4 rounded-2xl border border-white/5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Settings className="w-4 h-4 text-brand-primary" /> Parameters:
          </div>
          {algorithm === 'lcs' && (
            <>
              <input
                type="text"
                value={lcs1}
                onChange={e => setLcs1(e.target.value)}
                placeholder="String 1"
                className="w-28 px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary"
              />
              <input
                type="text"
                value={lcs2}
                onChange={e => setLcs2(e.target.value)}
                placeholder="String 2"
                className="w-28 px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary"
              />
            </>
          )}
          {algorithm === 'coin-change' && (
            <>
              <input
                type="text"
                value={coinsInput}
                onChange={e => setCoinsInput(e.target.value)}
                placeholder="Coins (e.g. 1,3,4)"
                className="w-32 px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary"
              />
              <input
                type="number"
                value={amountInput}
                onChange={e => setAmountInput(e.target.value)}
                placeholder="Amount"
                className="w-20 px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary"
                min={1}
                max={20}
              />
            </>
          )}
          {algorithm === 'knapsack' && (
            <>
              <input
                type="text"
                value={wtsInput}
                onChange={e => setWtsInput(e.target.value)}
                placeholder="Weights (e.g. 1,2,3)"
                className="w-32 px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary"
              />
              <input
                type="text"
                value={valsInput}
                onChange={e => setValsInput(e.target.value)}
                placeholder="Values (e.g. 1,6,10)"
                className="w-32 px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary"
              />
              <input
                type="number"
                value={capInput}
                onChange={e => setCapInput(e.target.value)}
                placeholder="Cap"
                className="w-16 px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary"
                min={1}
                max={15}
              />
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-xl text-xs font-semibold hover:shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" /> Compute
          </button>
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/5 text-xs text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </form>
      <div className="w-full bg-[#090b16] rounded-2xl border border-white/5 p-6 shadow-glass overflow-x-auto min-h-[300px] flex items-center justify-center">
        {matrix.length > 0 ? (
          <table className="border-collapse font-mono text-xs select-none">
            <tbody>
              {matrix.map((row, rIdx) => (
                <tr key={`row-${rIdx}`}>
                  {row.map((cell, cIdx) => (
                    <td
                      key={`cell-${rIdx}-${cIdx}`}
                      className={`w-14 h-14 border text-center transition-all duration-200 ${getCellClassName(rIdx, cIdx)}`}
                    >
                      {renderMatrixCellVal(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-slate-500 text-xs font-medium">
            No matrix computed. Click Compute to begin visualization.
          </div>
        )}
      </div>
      {currentSnapshot?.result !== undefined && (
        <div className="p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl">
          <span className="text-[10px] text-brand-accent uppercase tracking-wider font-bold">Calculation Result</span>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {algorithm === 'lcs' && `Longest Common Subsequence is "${currentSnapshot.result}"`}
            {algorithm === 'coin-change' && (currentSnapshot.result.length > 0
              ? `Minimum coins used: ${currentSnapshot.result.length} (Coins: [${currentSnapshot.result.join(', ')}])`
              : 'No solution possible.')}
            {algorithm === 'knapsack' && `Selected item indices: [${currentSnapshot.result.join(', ')}]`}
          </p>
        </div>
      )}
    </div>
  );
};