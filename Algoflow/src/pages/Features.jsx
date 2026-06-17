import React from 'react';
import{
  Activity,
  Cpu,
  Layers,
  Sparkles,
  Gamepad2,
  Tv,
  GraduationCap
} from 'lucide-react';
export const Features=()=>{

  const featuresList=[

    {
      icon: <Activity className="w-5 h-5 text-brand-primary" />,
      title: 'Interactive Visualizations',
      desc: 'Step-by-step animations help you understand how algorithms work internally. Observe comparisons, swaps, and traversals in real-time.'
    },

    {
      icon: <Cpu className="w-5 h-5 text-brand-cyan" />,
      title: 'Real-time Analysis',
      desc: 'Get real-time time and space complexity analysis with detailed statistics. Track comparisons, swaps, operation steps, and path costs.'
    },

    {
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      title: 'Multiple Data Structures',
      desc: 'Visualize algorithms on arrays, linked lists, graphs, binary trees, AVL trees, and dynamic programming matrices.'
    },

    {
      icon: <Gamepad2 className="w-5 h-5 text-amber-500" />,
      title: 'Custom Input',
      desc: 'Create your own arrays, double-click to add nodes, drag edges on graphs, or insert custom values to test tree balance factors.'
    },

    {
      icon: <Tv className="w-5 h-5 text-emerald-400" />,
      title: 'Playback Controls',
      desc: 'Control the animation with play, pause, step forward, step backward, and timeline scrubbing. Customize playback speeds from 0.25x to 4x.'
    },

    {
      icon: <Sparkles className="w-5 h-5 text-pink-400" />,
      title: 'Clean & Modern UI',
      desc: 'Beautiful, distraction-free glassmorphic interface built for focused learning. Fully responsive across desktops, tablets, and phones.'
    }

  ];

  return (
    <div className="w-full py-12 px-6 max-w-7xl mx-auto flex flex-col gap-16">
  
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-4xl font-extrabold tracking-tight">Features</h1>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Everything you need to learn and understand algorithms better.
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuresList.map((f,idx)=>(
          <div key={idx} className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shadow-sm">
              {f.icon}
            </div>
            <h3 className="text-base font-bold">{f.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
  

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-primary/20 via-brand-secondary/20 to-brand-cyan/20 border border-white/10 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-80 h-80 rounded-full bg-brand-primary opacity-10 blur-[100px] pointer-events-none"></div>
        
        <div className="flex flex-col gap-4 max-w-xl">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-accent">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Perfect for Learning</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Whether you are a student preparing for coding interviews, a computer science educator explaining algorithms, or a software engineer brushing up on graph traversals, AlgoVision makes learning algorithms interactive, engaging, and highly effective.
          </p>
        </div>
    
    
        <div className="w-48 h-48 shrink-0 flex items-center justify-center bg-white/5 border border-white/5 rounded-2xl relative shadow-glass overflow-hidden">
          <div className="absolute inset-0 bg-glow-gradient opacity-40"></div>
          <svg viewBox="0 0 100 100" className="w-32 h-32 text-brand-primary" fill="none" stroke="currentColor" strokeWidth={1.5}>


            <path d="M50 20 L85 35 L50 50 L15 35 Z" fill="currentColor" fillOpacity={0.1} />
            <path d="M30 43.5 L30 70 C30 75, 70 75, 70 70 L70 43.5" />
            <path d="M85 35 L85 60" strokeDasharray="2 2" />
            <circle cx="85" cy="60" r="2" fill="currentColor" />
            <circle cx="50" cy="35" r="1.5" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
};