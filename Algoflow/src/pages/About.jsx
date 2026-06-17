import React from 'react';
import{
  Layers,
  Sparkles,
  Settings,
  Flame,
  Zap,
  Globe
} from 'lucide-react';
export const About=()=>{

  const statsList=[
    { label: 'Algorithms', val: '60+', icon: <Layers className="w-4 h-4 text-brand-primary" /> },
    { label: 'Visualizations', val: '10K+', icon: <Sparkles className="w-4 h-4 text-brand-cyan" /> },
    { label: 'Smooth Animations', val: '60fps', icon: <Zap className="w-4 h-4 text-brand-accent" /> },
    { label: 'MIT License', val: 'Open Source', icon: <Globe className="w-4 h-4 text-indigo-400" /> }
  ];

  const technologies=[
    { name: 'React', desc: 'Library for building visual user interfaces.' },
    { name: 'Vite', desc: 'Next-generation super fast front-end tooling.' },
    { name: 'Tailwind CSS', desc: 'Utility-first framework for glassmorphic styling.' },
    { name: 'Framer Motion', desc: 'Production-ready animations library.' },
    { name: 'JavaScript', desc: 'High-level, dynamic programming language.' }
  ];

  return (
    <div className="w-full py-12 px-6 max-w-7xl mx-auto flex flex-col gap-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">About VisualDSA</h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
            VisualDSA is an interactive algorithm visualizer designed to help students, educators, and developers understand algorithms through beautiful visualizations, real-time analysis, and step-by-step execution.
          </p>


          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {statsList.map((stat,idx)=>(
              <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-slate-500">
                  {stat.icon}
                  <span className="text-[10px] uppercase tracking-wider font-semibold">{stat.label}</span>
                </div>
                <span className="text-base font-extrabold text-white">{stat.val}</span>
              </div>
            ))}
          </div>
        </div>
     


        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-1 bg-gradient-to-tr from-brand-primary to-brand-cyan opacity-20 blur-md rounded-2xl"></div>
          <div className="relative bg-[#0d0f22] border border-white/10 rounded-2xl overflow-hidden shadow-glass flex flex-col h-56 font-mono text-[10px] text-slate-400">
            <div className="bg-[#030712] px-4 py-2 border-b border-white/5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[9px] text-slate-500 ml-2">App.jsx</span>
            </div>
            <div className="p-4 leading-relaxed overflow-hidden">
              <span className="text-brand-accent">import</span> {'{ useVisualizer }'} <span className="text-brand-accent">from</span> <span className="text-emerald-400">"./context/VisualizerContext"</span>; 
              <br />
              <span className="text-brand-accent">const</span> {'VisualDSA = () => {'} 
              <br />
              &nbsp;&nbsp;<span className="text-brand-accent">const</span> {'{ start, speed } = useVisualizer();'} 
              <br />
              &nbsp;&nbsp;<span className="text-slate-500">{'// Initialize 60fps state machine rendering'}</span> 
              <br />
              &nbsp;&nbsp;{'useEffect(() => {'} 
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'start({ type: "dijkstra", speed });'} 
              <br />
              &nbsp;&nbsp;{'}, []);'} 
              <br />
              &nbsp;&nbsp;<span className="text-brand-accent">return</span> {'<VisualizerViewport />'} 
              <br />
              {'};'}
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
    


        <div className="md:col-span-5 glass-panel p-8 rounded-3xl flex flex-col gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-accent shadow-sm">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold">Our Mission</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            We believe that understanding complex computer science structures shouldn't require reading dry textbooks. Our mission is to make algorithm learning visual, interactive, and completely accessible to everyone, empowering developers to master fundamentals and solve real-world problems.
          </p>
        </div>
      

      
        <div className="md:col-span-7 glass-panel p-8 rounded-3xl flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-cyan" />
            <h3 className="text-xl font-bold">Built With</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {technologies.map((tech, idx) => (
              <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-1">
                <span className="text-xs font-bold text-white">{tech.name}</span>
                <span className="text-[10px] text-slate-500 leading-tight">{tech.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
