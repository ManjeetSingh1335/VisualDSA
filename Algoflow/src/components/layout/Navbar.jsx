import React from 'react';
import { Activity,Sun,Sparkles,Moon } from 'lucide-react';
export const Navbar=({currentPage,setCurrentPage})=>{
    const navItems=[
        {id:'home', label:'Home'},
        {id:'algorithms', label:'Algorithms'},
        {id:'visualizer', label:'Visualizer'},
        {id:'features', label:'Features'},
        {id:'about', label:'About'}
    ];
    return(
        <nav className="sticky top-0 z-50 w-full px-6 py-4 glass-panel border-b border-white/5 flex items-center justify-between">

            <div
                onClick={()=>setCurrentPage('home')}
                className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
            >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-glow-primary">
                    <Activity className="w-6 h-6 text-white"/>
                </div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-brand-cyan bg-clip-text text-transparent">
                    VisualDSA
                </span>

            </div>

            <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
                {navItems.map(item=>{
                    const isActive= currentPage===item.id;
                    return(
                        <button
                            key={item.id}
                            onClick={()=>setCurrentPage(item.id)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                isActive
                                ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-md'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {item.label}
                        </button>
                    )
                })}  
            </div>
              
            <div className="flex items-center gap-3">

                <button
                    onClick={()=>{
                        document.documentElement.classList.toggle('dark');
                    }}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <Sun className="w-5 h-5 block dark:hidden"/>
                    <Moon className="w-5 h-5 hidden dark:block"/> 
                </button>

                <button
                    onClick={()=>setCurrentPage('visualizer')}
                    className="relative group px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-medium text-sm shadow-glow-primary hover:shadow-brand-primary/60 transition-all duration-300 overflow-hidden flex items-center gap-1.5"
                >
                    <span className="relative z-10">Manjeet</span>
                    <Sparkles className="w-4 h-4 relative z-10 text-brand-cyan animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary to-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

            </div>

        </nav>
    );
};
