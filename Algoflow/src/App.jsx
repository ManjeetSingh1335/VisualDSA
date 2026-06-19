import React,{useState, useEffect} from 'react';
import {VisualizerProvider,useVisualizer} from '@/context/VisualizerContext';
import {Navbar} from '@/components/layout/Navbar';
import {Footer} from '@/components/layout/Footer';
import {Home} from '@/pages/Home';
import {Algorithms} from '@/pages/Algorithms';
import {About} from '@/pages/About';

const AppContent=()=>{
  const [currentPage, setCurrentPage]=useState('home');
  const {setAlgorithm, setCategory}=useVisualizer();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const renderPage=()=>{
    switch(currentPage){
      case 'home':
        return <Home setCurrentPage={setCurrentPage} setAlgorithm={setAlgorithm} setCategory={setCategory}/>;
      case 'algorithms':
        return <Algorithms setCurrentPage={setCurrentPage} setAlgorithm={setAlgorithm}/>;
      case 'about':
        return <About/>;
      default:
        return <Home setCurrentPage={setCurrentPage} setAlgorithm={setAlgorithm}/>;
    }
  };
  return(
    <div className="relative min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-brand-darkBg dark:text-white transition-colors duration-300">
      <div className="absolute top-[-100px] left-[5%] w-[400px] h-[400px] rounded-full bg-brand-primary/10 dark:bg-brand-primary/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[400px] right-[5%] w-[500px] h-[500px] rounded-full bg-brand-cyan/5 dark:bg-brand-cyan/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[200px] left-[10%] w-[350px] h-[350px] rounded-full bg-brand-secondary/5 dark:bg-brand-secondary/5 blur-[120px] pointer-events-none"></div>

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <main className="flex-grow z-10">
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage}/>

    </div>
  );
};

export default function App() {
  return (
    <VisualizerProvider>
      <AppContent />
    </VisualizerProvider>
  );
}
export { App };