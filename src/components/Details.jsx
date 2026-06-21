import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
import Loading from './Loading';
import { toast } from 'react-toastify';

const Details = () => {
    const navigate = useNavigate();
    const { products, setProducts } = useContext(ProductContext);
    const [product, setproduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (products) {
            const foundProduct = products.find((p) => String(p.id) === String(id));
            setproduct(foundProduct || null);
        }
    }, [id, products]);

    const ProductDeleteHandler = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const filteredProducts = products.filter((p) => String(p.id) !== String(productId));
            setProducts(filteredProducts);
            localStorage.setItem("products", JSON.stringify(filteredProducts));
            toast.success("Product deleted successfully!");
            navigate("/");
        }
    };

    const categoryBadges = {
        "electronics": "bg-blue-50 text-blue-600 border-blue-100",
        "jewelery": "bg-yellow-50 text-yellow-600 border-yellow-100",
        "men's clothing": "bg-pink-50 text-pink-600 border-pink-100",
        "women's clothing": "bg-purple-50 text-purple-600 border-purple-100",
    };

    const getBadgeClass = (cat) => {
        return categoryBadges[cat] || "bg-emerald-20 text-emerald-300 border-emerald-90";
    };

    return product ? (
        <div className="w-full min-h-screen py-8 md:py-16 px-4 md:px-8 flex flex-col items-center justify-center gap-4">
            
            <div className="w-full max-w-5xl flex justify-start">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition-colors duration-200 cursor-pointer bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Go Back
                </button>
            </div>

            <div className="w-full max-w-5xl glass-card rounded-3xl overflow-hidden flex flex-col md:flex-row p-6 md:p-10 gap-8 md:gap-12">
                
                <div className="w-full md:w-[45%] h-[350px] md:h-[450px] bg-white rounded-2xl p-8 flex items-center justify-center border border-slate-100 shadow-sm relative group shrink-0">
                    <img 
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" 
                        src={product.image} 
                        alt={product.title} 
                    />
                    
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-slate-200/55"></div>
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-slate-200/55"></div>
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-slate-200/55"></div>
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-slate-200/55"></div>
                </div>

                
                <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="flex flex-col gap-4">
                        
                        <div>
                            <span className={`inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-lg border ${getBadgeClass(product.category)} capitalize`}>
                                {product.category}
                            </span>
                        </div>

                        
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-800 tracking-tight leading-tight">
                            {product.title}
                        </h1>

                        
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-slate-400 font-mono text-xs font-semibold uppercase tracking-wider">Price:</span>
                            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-800 font-mono">
                                ${parseFloat(product.price).toFixed(2)}
                            </span>
                        </div>

                        <hr className="border-slate-200/80 my-2" />

                        
                        <div>
                            <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">Description</h3>
                            <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    
                    <div className="flex items-center gap-4 mt-8 md:mt-12 pt-6 border-t border-slate-200/80">
                        <Link 
                            to={`/edit/${product.id}`}
                            className="flex-1 py-3 px-6 rounded-xl bg-slate-50 border border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-blue-600 text-center font-medium text-sm transition-all duration-300 cursor-pointer active:scale-[0.98]"
                        >
                            Edit Product
                        </Link>
                        
                        <button 
                            onClick={() => ProductDeleteHandler(product.id)} 
                            className="flex-1 py-3 px-6 rounded-xl bg-slate-50 border border-red-200 hover:border-red-400 hover:bg-red-50 text-red-600 text-center font-medium text-sm transition-all duration-300 cursor-pointer active:scale-[0.98]"
                        >
                            Delete Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        
        products ? (
            <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold text-slate-700">Product not found</h1>
                <button onClick={() => navigate("/")} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">
                    Back to Store
                </button>
            </div>
        ) : (
            <Loading />
        )
    );
};

export default Details;