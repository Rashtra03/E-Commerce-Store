import React, { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

const Create = () => {
    const navigate = useNavigate();
    const { products, setProducts } = useContext(ProductContext);
    
    const [title, settitle] = useState("");
    const [image, setimage] = useState("");
    const [category, setcategory] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");

    const existingCategories = products ? [...new Set(products.map(p => p.category))] : [];

    const AddProductHandler = (e) => {
        e.preventDefault();

        if (title.trim().length < 5) {
            toast.error("Title must be at least 5 characters long");
            return;
        }
        if (!image.trim().startsWith("http")) {
            toast.error("Please provide a valid image URL");
            return;
        }
        if (category.trim().length < 3) {
            toast.error("Category must be at least 3 characters long");
            return;
        }
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            toast.error("Price must be a valid number greater than 0");
            return;
        }
        if (description.trim().length < 10) {
            toast.error("Description must be at least 10 characters long");
            return;
        }

        const product = {
            id: nanoid(),
            title: title.trim(),
            image: image.trim(),
            category: category.trim().toLowerCase(),
            price: parsedPrice,
            description: description.trim()
        };

        const updatedProducts = [...(products || []), product];
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        toast.success("Product added successfully!");
        navigate("/");
    };

    return (
        <div className="w-full min-h-screen py-8 md:py-12 px-4 flex flex-col items-center justify-center gap-4 bg-slate-50">
            
            <div className="w-full max-w-md flex justify-start">
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

            
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                <h1 className="text-xl font-bold text-slate-800 mb-5">
                    Add New Product
                </h1>

                <form onSubmit={AddProductHandler} className="flex flex-col gap-4">
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-500">Image Link</label>
                        <input 
                            type="url" 
                            placeholder="Image URL" 
                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 bg-white text-sm" 
                            value={image} 
                            onChange={(e) => setimage(e.target.value)} 
                            required
                        />
                    </div>

                    
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-500">Title</label>
                        <input 
                            type="text" 
                            placeholder="Product title" 
                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 bg-white text-sm" 
                            value={title} 
                            onChange={(e) => settitle(e.target.value)} 
                            required
                        />
                    </div>

                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-500">Category</label>
                            <input 
                                type="text" 
                                placeholder="Category" 
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 bg-white text-sm" 
                                value={category} 
                                onChange={(e) => setcategory(e.target.value)} 
                                list="categories-list"
                                required
                            />
                            <datalist id="categories-list">
                                {existingCategories.map((cat, idx) => (
                                    <option key={idx} value={cat} />
                                ))}
                            </datalist>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-500">Price ($)</label>
                            <input 
                                type="number" 
                                step="0.01"
                                min="0.01"
                                placeholder="Price" 
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 bg-white text-sm font-mono" 
                                value={price} 
                                onChange={(e) => setprice(e.target.value)} 
                                required
                            />
                        </div>
                    </div>

                    
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-500">Description</label>
                        <textarea 
                            placeholder="Description" 
                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 bg-white text-sm h-24 resize-none" 
                            value={description} 
                            onChange={(e) => setdescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <button className="w-full mt-2 py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors duration-150 cursor-pointer shadow-sm active:scale-[0.98]">
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;