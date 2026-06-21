import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { products, setProducts } = useContext(ProductContext);
    
    const [product, setproduct] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: ""
    });

    useEffect(() => {
        if (products) {
            const foundProduct = products.find((p) => String(p.id) === String(id));
            if (foundProduct) {
                setproduct(foundProduct);
            }
        }
    }, [id, products]);

    const ChangeHandler = (e) => {
        setproduct({ ...product, [e.target.name]: e.target.value });
    };

    const EditProductHandler = (e) => {
        e.preventDefault();

        
        if (product.title.trim().length < 5) {
            toast.error("Title must be at least 5 characters long");
            return;
        }
        if (!product.image.trim().startsWith("http")) {
            toast.error("Please provide a valid image URL");
            return;
        }
        if (product.category.trim().length < 3) {
            toast.error("Category must be at least 3 characters long");
            return;
        }
        const parsedPrice = parseFloat(product.price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            toast.error("Price must be a valid number greater than 0");
            return;
        }
        if (product.description.trim().length < 10) {
            toast.error("Description must be at least 10 characters long");
            return;
        }

        const productIndex = products.findIndex((p) => String(p.id) === String(id));
        if (productIndex === -1) {
            toast.error("Product not found");
            return;
        }

        const copyData = [...products];
        copyData[productIndex] = {
            ...copyData[productIndex],
            ...product,
            title: product.title.trim(),
            image: product.image.trim(),
            category: product.category.trim().toLowerCase(),
            price: parsedPrice,
            description: product.description.trim()
        };
        
        setProducts(copyData);
        localStorage.setItem("products", JSON.stringify(copyData));
        toast.success("Product updated successfully!");
        navigate(-1);
    };

    
    const existingCategories = products ? [...new Set(products.map(p => p.category))] : [];

    return (
        <div className="w-full min-h-screen py-8 md:py-16 px-4 flex flex-col items-center justify-center gap-4 bg-blue-50/30">
            
            <div className="w-full max-w-xl flex justify-start">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer bg-white px-4 py-2 rounded-xl border border-blue-200 shadow-sm hover:bg-blue-50/50 hover:border-blue-400"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Go Back
                </button>
            </div>

            <div className="w-full max-w-xl bg-white border border-blue-100 rounded-2xl p-8 md:p-10 shadow-md">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-blue-900 tracking-tight">
                        Edit Product
                    </h1>
                    <p className="text-blue-600/70 text-sm mt-1">
                        Modify the fields below to update the product in catalog
                    </p>
                </div>

                <form onSubmit={EditProductHandler} className="flex flex-col gap-6">
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-blue-700/80">Product Image Link</label>
                        <input 
                            type="url" 
                            name="image"
                            placeholder="https://images.unsplash.com/photo-..." 
                            className="w-full px-4 py-3 text-sm border border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100/50 bg-blue-50/20 text-slate-800 transition-all" 
                            value={product.image} 
                            onChange={ChangeHandler} 
                            required
                        />
                    </div>

                    
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-blue-700/80">Product Title</label>
                        <input 
                            type="text" 
                            name="title"
                            placeholder="Enter product title..." 
                            className="w-full px-4 py-3 text-sm border border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100/50 bg-blue-50/20 text-slate-800 transition-all" 
                            value={product.title} 
                            onChange={ChangeHandler} 
                            required
                        />
                    </div>

                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-blue-700/80">Category</label>
                            <input 
                                type="text" 
                                name="category"
                                placeholder="electronics, jewelery, men's clothing..." 
                                className="w-full px-4 py-3 text-sm border border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100/50 bg-blue-50/20 text-slate-800 transition-all" 
                                value={product.category} 
                                onChange={ChangeHandler} 
                                list="categories-list"
                                required
                            />
                            <datalist id="categories-list">
                                {existingCategories.map((cat, idx) => (
                                    <option key={idx} value={cat} />
                                ))}
                            </datalist>
                        </div>

                        
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-blue-700/80">Price ($)</label>
                            <input 
                                type="number" 
                                name="price"
                                step="0.01"
                                min="0.01"
                                placeholder="29.99" 
                                className="w-full px-4 py-3 text-sm border border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100/50 bg-blue-50/20 text-slate-800 transition-all font-mono" 
                                value={product.price} 
                                onChange={ChangeHandler} 
                                required
                            />
                        </div>
                    </div>

                    
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-blue-700/80">Description</label>
                        <textarea 
                            name="description"
                            placeholder="Describe your product specs, materials, features..." 
                            className="w-full px-4 py-3 text-sm h-36 border border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100/50 bg-blue-50/20 text-slate-800 transition-all resize-none" 
                            value={product.description} 
                            onChange={ChangeHandler}
                            required
                        ></textarea>
                    </div>

                    
                    <button className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors duration-200 shadow-md border border-blue-500/10 active:scale-[0.98]">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Edit;