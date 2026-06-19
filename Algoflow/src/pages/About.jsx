import React from 'react';
import {
  Layers,
  Sparkles,
  Activity,
  Users,
  Target,
  Eye,
  Compass,
  Check,
  X,
  Lightbulb,
  Code2,
  Rocket,
  Star
} from 'lucide-react';

export const About = () => {
  return (
    <div className="w-full py-12 px-6 max-w-7xl mx-auto flex flex-col gap-20">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        <div className="lg:col-span-7 flex flex-col gap-6 animate-fadeIn">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/20 dark:border-brand-primary/30 text-xs font-semibold text-brand-primary dark:text-brand-accent self-start uppercase tracking-wider animate-pulse">
            <Sparkles className="w-3.5 h-3.5" /> About VisualDSA
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
            Built to Make
            <br />
            <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-cyan bg-clip-text text-transparent">
              Algorithms Click.
            </span>
          </h1>
          
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            VisualDSA is an interactive platform that helps you learn, visualize, and master Data Structures and Algorithms through beautiful animations and real-time insights.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center gap-4 p-4 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary dark:text-brand-accent shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">10+</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Algorithms</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">50+</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Visualizations</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">1K+</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Learners</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="absolute -inset-4 bg-gradient-to-tr from-brand-primary/10 to-brand-cyan/10 blur-xl rounded-full"></div>
          <svg viewBox="0 0 400 400" className="w-full max-w-[360px] animate-spin-slow">
      
            <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" className="text-slate-400/50 dark:text-white/10" strokeWidth="1.5" strokeDasharray="5 5" />
            <circle cx="200" cy="200" r="110" fill="none" stroke="currentColor" className="text-slate-400/50 dark:text-white/10" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="70" fill="none" stroke="currentColor" className="text-slate-400/50 dark:text-white/10" strokeWidth="1" strokeDasharray="3 3" />
            
            <circle cx="200" cy="200" r="35" className="fill-brand-primary/10 dark:fill-brand-primary/20 stroke-brand-primary/30" strokeWidth="1" />
            <circle cx="200" cy="200" r="15" className="fill-brand-primary" />
            
            <circle cx="200" cy="50" r="8" className="fill-brand-cyan" />
            <line x1="200" y1="50" x2="200" y2="200" className="stroke-brand-cyan/25" strokeWidth="1.5" />
            
            <circle cx="90" cy="200" r="6" className="fill-brand-secondary" />
            <line x1="90" y1="200" x2="200" y2="200" className="stroke-brand-secondary/25" strokeWidth="1.5" />

            <circle cx="310" cy="200" r="10" className="fill-brand-primary" />
            <line x1="310" y1="200" x2="200" y2="200" className="stroke-brand-primary/25" strokeWidth="1.5" />
            
            <circle cx="290" cy="290" r="7" className="fill-amber-500" />
            <line x1="290" y1="290" x2="200" y2="200" className="stroke-amber-500/25" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 p-8 rounded-3xl flex flex-col gap-5 shadow-sm dark:shadow-none backdrop-blur-md hover:border-brand-primary/40 transition-colors duration-300">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary dark:text-brand-accent shadow-sm">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            To simplify complex algorithms and data structures through interactive visual learning, making computer science education accessible, engaging, and effective for everyone.
          </p>
        </div>

        <div className="bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 p-8 rounded-3xl flex flex-col gap-5 shadow-sm dark:shadow-none backdrop-blur-md hover:border-brand-cyan/40 transition-colors duration-300">
          <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shadow-sm">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            To become the most loved platform for learning DSA, empowering learners to solve real-world problems with confidence and clarity.
          </p>
        </div>

        <div className="bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 p-8 rounded-3xl flex flex-col gap-5 shadow-sm dark:shadow-none backdrop-blur-md hover:border-brand-secondary/40 transition-colors duration-300">
          <div className="w-12 h-12 rounded-2xl bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary shadow-sm">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Values</h3>
          <div className="flex flex-col gap-2.5">
            {[
              'Clarity over complexity',
              'Learning through visualization',
              'Consistency in innovation',
              'Community-driven growth'
            ].map((val, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="flex flex-col gap-8 bg-white/40 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/5 rounded-3xl p-8 backdrop-blur-md shadow-sm">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why We Built VisualDSA</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-red-500">The Problem</h3>
            <div className="flex flex-col gap-3">
              {[
                'Static diagrams are hard to understand.',
                'Theory without visualization lacks clarity.',
                'Practice without feedback slows progress.'
              ].map((prob, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-red-500/10 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
                    <X className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{prob}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-brand-cyan">Our Solution</h3>
            <div className="flex flex-col gap-3">
              {[
                'Step-by-step animated visualizations.',
                'Live execution with real-time feedback.',
                'Interactive controls to experiment freely.'
              ].map((sol, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{sol}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 relative flex items-center justify-center">
            <div className="absolute -inset-1 bg-gradient-to-tr from-brand-primary to-brand-cyan opacity-20 blur-md rounded-2xl"></div>
            <div className="relative w-full max-w-[320px] bg-[#0d0f22]/95 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 font-mono text-[9px] text-slate-400 shadow-glass">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" /> Live Execution View
                </span>
                <span className="text-[8px] text-slate-500">60fps active</span>
              </div>
              <div className="h-28 flex items-end justify-center gap-1.5 border-b border-white/5 pb-3">
                {[35, 60, 45, 85, 20, 95, 70, 40].map((val, idx) => {
                  const isComparing = idx === 3 || idx === 4;
                  const isSorted = idx > 5;
                  let barClass = 'bg-slate-700/60 border-slate-600/30';
                  if (isComparing) barClass = 'bg-gradient-to-t from-amber-500 to-amber-400 border-amber-300 shadow-glow-cyan';
                  else if (isSorted) barClass = 'bg-gradient-to-t from-emerald-500 to-emerald-400 border-emerald-300';
                  return (
                    <div
                      key={idx}
                      style={{ height: `${val}%` }}
                      className={`flex-1 rounded-t-md border transition-all duration-300 ${barClass}`}
                    />
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-[8px] text-slate-500">
                <span>O(n log n)</span>
                <span>Time: 0.12ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Journey</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto">
            From a single concept to a fully realized interactive platform, here is how we grew.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-[24px] left-12 right-12 h-0.5 bg-gradient-to-r from-brand-primary via-brand-cyan to-brand-secondary opacity-30 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { date: 'May 2024', title: 'The Idea', icon: <Lightbulb className="w-5 h-5" /> },
              { date: 'June 2024', title: 'First Prototype', icon: <Code2 className="w-5 h-5" /> },
              { date: 'Aug 2024', title: 'Expanding', icon: <Rocket className="w-5 h-5" /> },
              { date: 'Today', title: 'Growing Together', icon: <Star className="w-5 h-5" /> }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start gap-4 text-center md:text-left group relative">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 border-2 border-brand-primary dark:border-brand-primary flex items-center justify-center text-brand-primary dark:text-brand-accent shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                  {item.icon}
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-cyan">{item.date}</span>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1 max-w-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
