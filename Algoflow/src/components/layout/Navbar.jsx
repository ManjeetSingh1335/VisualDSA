import React, { useState } from 'react';
import { Activity,Sun,Sparkles,Moon,X } from 'lucide-react';
import { useVisualizer } from '@/context/VisualizerContext';

export const Navbar=({currentPage,setCurrentPage})=>{
    const { setAlgorithm } = useVisualizer();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navItems=[
        {id:'home', label:'Home'},
        {id:'algorithms', label:'Algorithms'},
        {id:'about', label:'About'}
    ];

    const handleLogoClick = () => {
        if (window.innerWidth < 768) {
            setIsSidebarOpen(!isSidebarOpen);
        } else {
            setAlgorithm(null);
            setCurrentPage('home');
        }
    };

    return(
        <>
            <nav className="sticky top-0 z-50 w-full px-6 py-4 bg-white/70 backdrop-blur-md border-b border-slate-200/80 dark:bg-brand-darkBg/60 dark:border-white/5 flex items-center justify-between transition-colors duration-300">

                <div
                    onClick={handleLogoClick}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
                >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-glow-primary">
                        <Activity className="w-6 h-6 text-white"/>
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-950 to-slate-700 dark:from-white dark:to-cyan-200 bg-clip-text text-transparent">
                        VisualDSA
                    </span>

                </div>

                <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-full border border-slate-200/60 dark:border-white/5">
                    {navItems.map(item=>{
                        const isActive= currentPage===item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={()=>{
                                    setAlgorithm(null);
                                    setCurrentPage(item.id);
                                }}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    isActive
                                    ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-md'
                                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/40 dark:hover:bg-white/5'
                                }`}
                            >
                                {item.label}
                            </button>
                        );
                    })}  
                </div>
                  
                <div className="flex items-center gap-3">

                    <button
                        onClick={()=>{
                            const isDark = document.documentElement.classList.toggle('dark');
                            localStorage.theme = isDark ? 'dark' : 'light';
                        }}
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <Sun className="w-5 h-5 hidden dark:block"/>
                        <Moon className="w-5 h-5 block dark:hidden"/> 
                    </button>

                    <div
                        className="relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-medium text-sm shadow-glow-primary overflow-hidden flex items-center gap-1.5"
                    >
                        <span className="relative z-10">Manjeet</span>
                        <Sparkles className="w-4 h-4 relative z-10 text-brand-cyan animate-pulse" />
                    </div>

                </div>

            </nav>

            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    <div 
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 animate-fadeIn"
                    />
                    
                    <div className="relative w-72 max-w-[80vw] h-full bg-slate-900/95 dark:bg-brand-darkBg/95 backdrop-blur-lg border-r border-white/10 p-6 flex flex-col gap-8 shadow-2xl animate-slideInLeft text-white">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-white"/>
                                </div>
                                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                                    VisualDSA
                                </span>
                            </div>
                            <button 
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-2">
                            {navItems.map(item => {
                                const isActive = currentPage === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setAlgorithm(null);
                                            setCurrentPage(item.id);
                                            setIsSidebarOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                            isActive 
                                                ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-sm'
                                                : 'text-slate-300 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-auto border-t border-white/5 pt-4 text-center">
                            <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">VisualDSA Menu</p>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};