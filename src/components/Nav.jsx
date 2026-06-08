import React, { useContext } from 'react';
import { ProductContext } from '../utils/Context';
import { Link, useSearchParams } from 'react-router-dom';

const Nav = () => {
    const { products } = useContext(ProductContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentCategory = searchParams.get("category");
    const currentSearch = searchParams.get("search") || "";

    const distinct_category = products ? [...new Set(products.map(p => p.category))] : [];

    const categoryColors = {
        "electronics": "bg-blue-500 shadow-blue-500/30",
        "jewelery": "bg-yellow-500 shadow-yellow-500/30",
        "men's clothing": "bg-pink-500 shadow-pink-500/30",
        "women's clothing": "bg-purple-500 shadow-purple-500/30",
    };

    const getCategoryBadgeClass = (cat) => {
        return categoryColors[cat] || "bg-emerald-200 shadow-emerald-400/30";
    };

    const updateFilter = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        setSearchParams(newParams);
    };

    const clearFilters = () => {
        setSearchParams({});
    };

    return (
        <nav className="w-80 h-screen glass-panel border-r border-slate-200/60 p-6 flex flex-col justify-between sticky top-0 shrink-0">
            <div className="flex flex-col gap-6">
                
                <div className="flex items-center gap-3 py-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-display font-extrabold text-white shadow-md shadow-indigo-600/20">
                        S
                    </div>
                    <span className="text-xl font-display font-bold tracking-tight text-slate-800">
                        Sasta<span className="text-blue-500">Bajaar</span>
                    </span>
                </div>

                
                <div className="flex flex-col gap-2">
                    
                    {currentCategory && (
                        <Link
                            to="/"
                            onClick={clearFilters}
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all duration-300 active:scale-[0.98] cursor-pointer bg-white shadow-sm"
                        >
                            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Home
                        </Link>
                    )}

                    
                    <Link
                        to="/create"
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-500 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-200 shadow-sm border border-blue-500/10 active:scale-[0.98]"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Product
                    </Link>
                </div>

                <hr className="border-slate-200/80" />

                
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Search Products</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Type keyword..."
                            value={currentSearch}
                            onChange={(e) => updateFilter("search", e.target.value)}
                            className="w-full glass-input py-2.5 pl-9 pr-4 text-sm focus:ring-1 focus:ring-blue-500"
                        />
                        <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <hr className="border-slate-200/80" />

                
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Categories</label>
                        {currentCategory && (
                            <button onClick={() => updateFilter("category", null)} className="text-xs text-blue-600 hover:text-blue-500 font-medium">
                                Clear
                            </button>
                        )}
                    </div>
                    
                    <div className="flex flex-col gap-1.5 max-h-[35vh] overflow-y-auto pr-1">
                        {distinct_category.map((c, i) => {
                            const isActive = currentCategory === c;
                            return (
                                <button
                                    key={i}
                                    onClick={() => updateFilter("category", isActive ? null : c)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-all duration-200 border ${
                                        isActive 
                                            ? "bg-blue-50 text-blue-700 border-blue-200 font-medium" 
                                            : "hover:bg-slate-100/50 text-slate-600 border-transparent hover:text-slate-800"
                                    }`}
                                >
                                    <span className={`w-2.5 h-2.5 rounded-full shadow-sm shrink-0 ${getCategoryBadgeClass(c)}`}></span>
                                    <span className="truncate capitalize">{c}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            
            <div className="flex flex-col gap-4">
                {(currentCategory || currentSearch) && (
                    <button
                        onClick={clearFilters}
                        className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-800 text-xs font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer"
                    >
                        Reset All Filters
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Nav;