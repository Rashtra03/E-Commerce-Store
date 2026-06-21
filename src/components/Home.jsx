import { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import Loading from "./Loading";
import { Link, useSearchParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";

const Home = () => {
  const { products } = useContext(ProductContext);
  const [searchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const [filteredProducts, setFilteredProducts] = useState(null);

  useEffect(() => {
    if (!products) return;

    let filtered = [...products];

    
    if (category && category !== "null" && category !== "undefined") {
      filtered = filtered.filter(p => p.category === category);
    }

    
    if (search && search.trim() !== "") {
      const query = search.toLowerCase().trim();
      filtered = filtered.filter(p => 
        (p.title && p.title.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query))
      );
    }

    setFilteredProducts(filtered);
  }, [category, search, products]);

  const categoryBadges = {
    "electronics": "bg-blue-50 text-blue-600 border-blue-100",
    "jewelery": "bg-yellow-50 text-yellow-600 border-yellow-100",
    "men's clothing": "bg-pink-50 text-pink-600 border-pink-100",
    "women's clothing": "bg-purple-50 text-purple-600 border-purple-100",
  };

  const getBadgeClass = (cat) => {
    return categoryBadges[cat] || "bg-emerald-50 text-emerald-600 border-emerald-100";
  };

  return products ? (
    <div className="flex flex-col md:flex-row w-full min-h-screen relative">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 w-full shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-display font-extrabold text-white shadow-md shadow-indigo-600/20">
            S
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-slate-800">
            Sasta<span className="text-blue-500">Bajaar</span>
          </span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 active:scale-[0.98] cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <Nav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 p-6 md:p-8 lg:p-12 md:overflow-y-auto md:max-h-screen">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight text-slate-800 md:text-4xl">
              Discover Products
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {category ? `Browsing ${category}` : "Explore our curated high-quality products"}
            </p>
          </div>
          
          <div className="text-slate-600 font-mono text-sm bg-white px-4 py-2 rounded-xl border border-slate-200/80 shadow-sm">
            Total items: <span className="text-indigo-600 font-bold">{filteredProducts ? filteredProducts.length : 0}</span>
          </div>
        </div>

        
        {filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <Link
                key={p.id}
                to={`/details/${p.id}`}
                className="glass-card flex flex-col justify-between p-5 rounded-2xl h-[420px] group"
              >
                
                <div className="w-full h-44 bg-white rounded-xl p-4 flex items-center justify-center overflow-hidden border border-slate-100/80 relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-indigo-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                
                <div className="flex flex-col flex-1 mt-4 justify-between">
                  <div>
                    
                    <span className={`inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md border ${getBadgeClass(p.category)} mb-2 capitalize`}>
                      {p.category}
                    </span>
                    
                    
                    <h2 className="text-slate-700 font-semibold text-sm line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200 leading-snug">
                      {p.title}
                    </h2>
                  </div>

                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Price</span>
                      <span className="text-lg font-bold text-slate-800 tracking-tight font-mono">
                        ${parseFloat(p.price).toFixed(2)}
                      </span>
                    </div>

                    
                    <div className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-indigo-600 border border-slate-200 hover:border-indigo-500 flex items-center justify-center text-slate-500 hover:text-white transition-all duration-300">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          
          <div className="flex flex-col items-center justify-center py-24 px-6 glass-card rounded-3xl border border-slate-200 max-w-lg mx-auto mt-12">
            <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 text-slate-400">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-700">No products found</h3>
            <p className="text-slate-500 text-sm text-center mt-1">
              Try adjusting your search query, price range, or category filter to find what you are looking for.
            </p>
          </div>
        )}
      </main>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;