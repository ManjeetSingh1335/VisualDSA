import React,{useEffect,useState} from 'react';
import{
  Activity,
  Play,
  ArrowRight,
  Code2,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight,
  GitBranch,
  Network
} from 'lucide-react';
export const Home=({setCurrentPage,setAlgorithm})=>{

  const [array,setArray]=useState([45,85,20,95,60,30,75,10]);
  const [activeIndices,setActiveIndices]=useState([]);
  const [sortedIndices,setSortedIndices]=useState([]);
  
  useEffect(() =>{
    let active=true;
    const runDemo=async()=>{
      while(active){
        const demoArray=[45,85,20,95,60,30,75,10];
        setArray([...demoArray]);
        setSortedIndices([]);
        await new Promise(r=>setTimeout(r,1200));
        for(let i=0;i<demoArray.length;i++){
          for(let j=0;j<demoArray.length-i-1;j++){
            if(!active) return;
            setActiveIndices([j,j+1]);
            await new Promise(r=>setTimeout(r,400));
            if(demoArray[j]>demoArray[j+1]){
              const temp=demoArray[j];
              demoArray[j] = demoArray[j+1];
              demoArray[j+1]=temp;
              setArray([...demoArray]);
              await new Promise(r=>setTimeout(r,300));
            }
          }
          setSortedIndices(prev=>[...prev,demoArray.length-1-i]);
          setActiveIndices([]);
        }
        await new Promise(r=>setTimeout(r,2000));
      }
    };
    runDemo();
    return()=>{
      active=false;
    };
  },[]);


  const handleSelectCategoryAlgo=(algo)=>{
    setAlgorithm(algo);
    setCurrentPage('visualizer');
  };


  return (
    <div className="w-full flex flex-col gap-20 py-12 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-xs font-semibold text-brand-accent self-start">
            <Activity className="w-3.5 h-3.5" /> Visualize. Understand. Master.
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            See Algorithms. <br/>
            <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-cyan bg-clip-text text-transparent">
              Understand Deeply.
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            Interactive visualizations, real-time execution, and complexity analysis to help you master computer science fundamentals.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={()=>setCurrentPage('visualizer')}
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-xl shadow-glow-primary hover:shadow-brand-primary/60 hover:scale-105 active:scale-95 transition-all text-sm"
            >
              Start Exploring <ArrowRight className="w-4 h-4"/>
            </button>
            <button
              onClick={()=>setCurrentPage('algorithms')}
              className="px-6 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-xl text-sm transition-all"
            >
              View All Algorithms
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-brand-primary to-brand-cyan opacity-25 blur-lg rounded-2xl"></div>
          <div className="relative bg-[#0d0f22]/90 border border-white/10 p-6 rounded-2xl shadow-glass flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> Live Preview: Bubble Sort
              </span>
              <span className="text-[10px] font-mono text-slate-500">Step 2 of 309</span>
            </div>



            <div className="h-44 flex items-end justify-center gap-2 border-b border-white/5 pb-4">
              {array.map((val,idx)=>{
                const heightPct=(val/100)*85;
                const isComparing=activeIndices.includes(idx);
                const isSorted=sortedIndices.includes(idx);
                
                let barClass='bg-slate-700/60 border-slate-600/30';
                if(isComparing) barClass='bg-gradient-to-t from-amber-500 to-amber-400 border-amber-300 shadow-glow-cyan';
                else if(isSorted) barClass='bg-gradient-to-t from-emerald-500 to-emerald-400 border-emerald-300';
                return(
                  <div
                    key={idx}
                    style={{height:`${heightPct}%`}}
                    className={`flex-1 rounded-t-md relative flex items-end justify-center transition-all duration-300 border ${barClass}`}
                  >
                    <span className="text-[9px] font-mono font-bold text-white mb-1">{val}</span>
                  </div>
                );
              })}
            </div>



            <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-amber-500" /> Comparing
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-emerald-500" /> Sorted
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-slate-700" /> Unsorted
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900/30 border border-white/5 rounded-3xl p-6 backdrop-blur-md">
        <div className="flex flex-col items-center justify-center text-center p-4">
          <span className="text-3xl font-extrabold bg-gradient-to-r from-white to-brand-primary bg-clip-text text-transparent">60+</span>
          <span className="text-xs text-slate-400 font-semibold uppercase mt-1">Algorithms</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center p-4 border-l border-white/5">
          <span className="text-3xl font-extrabold bg-gradient-to-r from-white to-brand-cyan bg-clip-text text-transparent">10K+</span>
          <span className="text-xs text-slate-400 font-semibold uppercase mt-1">Visualizations</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center p-4 border-l border-white/5">
          <span className="text-3xl font-extrabold bg-gradient-to-r from-white to-brand-secondary bg-clip-text text-transparent">60fps</span>
          <span className="text-xs text-slate-400 font-semibold uppercase mt-1">Smooth Animations</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center p-4 border-l border-white/5">
          <span className="text-3xl font-extrabold bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">MIT</span>
          <span className="text-xs text-slate-400 font-semibold uppercase mt-1">Open Source License</span>
        </div>
      </div>



      <div className="flex flex-col gap-12">
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-3xl font-bold">Why VisualDSA?</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">Everything you need to visualize, code, and master data structures and algorithms.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-accent shadow-sm">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold">Smooth Animations</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Watch algorithms execute with fluid 60fps animations. Perfect representation of comparison, swaps, and recursive splits.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shadow-sm">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold">Real-time Analysis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Get instant time &amp; space complexity details. Observe operation metrics and memory footprints dynamically.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-sm">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold">Code &amp; Pseudocode</h3>
            <p className="text-xs text-slate-400 leading-relaxed">View clean, syntax-highlighted code. Watch the active line update dynamically synchronized with execution states.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-sm">
              <Play className="w-5 h-5 fill-amber-500/25" />
            </div>
            <h3 className="text-base font-bold">Interactive Controls</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Play, pause, step forward, step backward, or scrub timelines. Adjust speed and customize inputs on the fly.</p>
          </div>
        </div>
      </div>


      <div className="flex flex-col gap-12">
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-3xl font-bold">Explore Algorithm Categories</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">Choose a category and start your interactive learning journey.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">



          <div className="glass-panel glass-card-hover p-6 rounded-2xl flex flex-col gap-6 justify-between group">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold group-hover:text-brand-accent transition-colors">Sorting Algorithms</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">Explore bubble, selection, insertion, merge, and quick sorting with animated bars.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-1.5">
                {['bubble','merge','quick'].map(a=>(
                  <button
                    key={a}
                    onClick={()=>handleSelectCategoryAlgo(a)}
                    className="px-2.5 py-1 bg-white/5 border border-white/5 hover:bg-white/10 rounded-lg text-[10px] text-slate-300 font-semibold tracking-wide transition-colors uppercase"
                  >
                    {a}
                  </button>
                ))}
              </div>
              <button 
                onClick={()=>handleSelectCategoryAlgo('bubble')}
                className="flex items-center justify-between text-xs font-bold text-indigo-400 hover:text-white mt-2 transition-colors"
              >
                Launch Category <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
       


       
          <div className="glass-panel glass-card-hover p-6 rounded-2xl flex flex-col gap-6 justify-between group">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-brand-cyan">
                <Network className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold group-hover:text-brand-cyan transition-colors">Graph Algorithms</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">Create nodes and edges on a custom builder and watch BFS, DFS, and Dijkstra traverse.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-1.5">
                {['bfs','dfs','dijkstra','astar'].map(a=>(
                  <button
                    key={a}
                    onClick={()=>handleSelectCategoryAlgo(a)}
                    className="px-2.5 py-1 bg-white/5 border border-white/5 hover:bg-white/10 rounded-lg text-[10px] text-slate-300 font-semibold tracking-wide transition-colors uppercase"
                  >
                    {a==='astar'? 'A*':a}
                  </button>
                ))}
              </div>
              <button 
                onClick={()=>handleSelectCategoryAlgo('bfs')}
                className="flex items-center justify-between text-xs font-bold text-brand-cyan hover:text-white mt-2 transition-colors"
              >
                Launch Category <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
   


          <div className="glass-panel glass-card-hover p-6 rounded-2xl flex flex-col gap-6 justify-between group">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-accent">
                <GitBranch className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold group-hover:text-brand-accent transition-colors">Tree Structures</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">Interact with Binary Search Trees (BST) and self-balancing AVL trees with automatic rotations.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-1.5">
                {['bst','avl'].map(a=>(
                  <button
                    key={a}
                    onClick={()=>handleSelectCategoryAlgo(a)}
                    className="px-2.5 py-1 bg-white/5 border border-white/5 hover:bg-white/10 rounded-lg text-[10px] text-slate-300 font-semibold tracking-wide transition-colors uppercase"
                  >
                    {a}
                  </button>
                ))}
              </div>
              <button 
                onClick={()=>handleSelectCategoryAlgo('avl')}
                className="flex items-center justify-between text-xs font-bold text-brand-accent hover:text-white mt-2 transition-colors"
              >
                Launch Category <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="glass-panel glass-card-hover p-6 rounded-2xl flex flex-col gap-6 justify-between group">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold group-hover:text-amber-500 transition-colors">Dynamic Programming</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">Solve LCS, Knapsack, and Coin Change. Watch dependency cells highlight during computation.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-1.5">
                {['lcs','knapsack','coin-change'].map(a=>(
                  <button
                    key={a}
                    onClick={()=>handleSelectCategoryAlgo(a)}
                    className="px-2.5 py-1 bg-white/5 border border-white/5 hover:bg-white/10 rounded-lg text-[10px] text-slate-300 font-semibold tracking-wide transition-colors uppercase"
                  >
                    {a==='coin-change'? 'coins':a}
                  </button>
                ))}
              </div>
              <button 
                onClick={()=>handleSelectCategoryAlgo('lcs')}
                className="flex items-center justify-between text-xs font-bold text-amber-500 hover:text-white mt-2 transition-colors"
              >
                Launch Category <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
