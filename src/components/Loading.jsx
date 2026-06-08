import React from 'react';

const Loading = () => {
    return (
        <div className="w-screen h-screen bg-slate-50 flex flex-col justify-center items-center gap-4 relative overflow-hidden">
            
            <div className="absolute top-[30%] left-[30%] w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-[30%] right-[30%] w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full"></div>

            
            <div className="relative w-20 h-20 flex items-center justify-center">
                
                <div className="absolute inset-0 border-[3px] border-indigo-600/10 border-t-indigo-600 rounded-full animate-spin"></div>
                
                <div className="absolute w-12 h-12 border-[3px] border-purple-600/10 border-b-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
            </div>

            
            <h2 className="text-slate-400 text-xs font-mono tracking-[0.25em] uppercase animate-pulse mt-4">
                Loading Catalog...
            </h2>
        </div>
    );
}

export default Loading;