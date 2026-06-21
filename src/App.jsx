import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';
import Create from './components/Create';
import Edit from './components/Edit';

const App = () => {
  const { search, pathname } = useLocation();
  
  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 flex flex-col font-sans relative overflow-x-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>

      <div className="flex flex-1 w-full min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;