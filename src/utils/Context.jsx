import axios from '../utils/axios'; 
import React, { createContext, useEffect, useState } from 'react';

export const ProductContext = createContext();

const Context = (props) => {
    const [products, setProducts] = useState(null);

    const getProducts = async () => {
        try {
            const localData = localStorage.getItem("products");
            if (localData && localData !== "undefined" && localData !== "null") {
                setProducts(JSON.parse(localData));
            } else {
                const { data } = await axios("/products"); 
                setProducts(data);
                localStorage.setItem("products", JSON.stringify(data));
            }
        } catch (error) {
            console.error("Error fetching products:", error);
           
            setProducts([]);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {props.children}
        </ProductContext.Provider>
    );
}

export default Context;