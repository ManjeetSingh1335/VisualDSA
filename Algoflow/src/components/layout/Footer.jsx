import React from 'react';
import { Activity,Cpu,Mail } from 'lucide-react';

const GithubIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Footer=({setCurrentPage})=>{
    return(
        <footer className="w-full mt-auto py-10 px-6 border-t border-white/5 bg-brand-darkBg/60 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white"/>
                    </div>
                    <span className="text-base font-bold bg-gradient-to-r from-white to-brand-cyan bg-clip-text text-transparent">
                        VisualDSA
                    </span>
                </div>

                <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
                    <button onClick={()=>setCurrentPage('home')}  className="hover:text-white transition-colors">Home</button>
                    <button onClick={()=>setCurrentPage('algorithms')} className="hover:text-white transition-colors">Algorithms</button>
                    <button onClick={()=>setCurrentPage('visualizer')} className="hover:text-white transition-colors">Visualizer</button>
                    <button onClick={()=>setCurrentPage('features')} className="hover:text-white transition-colors">Features</button>
                    <button onClick={()=>setCurrentPage('about')} className="hover:text-white transition-colors">About</button>
                </div>

                <div className="flex items-center gap-4 text-slate-400">

                    <a href="#" className="hover:text-white transition-colors" title="Github Code">
                        <GithubIcon className="w-5 h-5"/>
                    </a>
                    <a href="#" className="hover:text-white transition-colors" title="Complexity API">
                        <Cpu className="w-5 h-5"/>
                    </a>
                    <a href="#" className="hover:text-white transition-colors" title="Contact Email">
                        <Mail className="w-5 h-5"/>
                    </a>

                </div>

            </div>
                <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span>&copy; {new Date().getFullYear()} VisualDSA Platform. Open Source under MIT License.</span>
                    <span>Built with React, JavaScript, Tailwind CSS, &amp; Framer Motion.</span>
                </div>
        </footer>
    );
};