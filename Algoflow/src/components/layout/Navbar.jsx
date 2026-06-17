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
        <nav className="sticky top-0 z-50 w-full px-6 py-4 bg-white/70 backdrop-blur-md border-b border-slate-200/80 dark:bg-brand-darkBg/60 dark:border-white/5 flex items-center justify-between transition-colors duration-300">

            <div
                onClick={()=>setCurrentPage('home')}
                className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
            >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-glow-primary">
                    <Activity className="w-6 h-6 text-white"/>
                </div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-950 to-slate-700 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent">
                    VisualDSA
                </span>

            </div>

            <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-full border border-slate-200/60 dark:border-white/5">
                {navItems.map(item=>{
                    const isActive= currentPage===item.id;
                    return(
                        <button
                            key={item.id}
                            onClick={()=>setCurrentPage(item.id)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                isActive
                                ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-md'
                                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/40 dark:hover:bg-white/5'
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
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    <Sun className="w-5 h-5 hidden dark:block"/>
                    <Moon className="w-5 h-5 block dark:hidden"/> 
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
