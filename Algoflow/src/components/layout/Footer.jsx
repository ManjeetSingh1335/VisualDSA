import React from 'react';
import {Activity,Mail} from 'lucide-react';
import { FaLinkedin } from "react-icons/fa";

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

const Linkedin = (props) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
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
                <div className="flex items-center gap-4 text-slate-400">
                    <a
                        href="https://github.com/ManjeetSingh1335"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                        title="GitHub"
                    >
                    <GithubIcon className="w-5 h-5" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/manjeet-singh-99b791321/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                        title="LinkedIn"
                    >
                    <FaLinkedin className="w-5 h-5" />
                    </a>
                    <a
                        href="mailto:manjeetsingh131813@gmail.com"
                        className="hover:text-white transition-colors"
                        title="Email Me"
                    >
                    <Mail className="w-5 h-5" />
                    </a>
                </div>
            </div>
                <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span>&copy; {new Date().getFullYear()}  VisualDSA. Built for learners and developers.</span>
                </div>
        </footer>
    );
};