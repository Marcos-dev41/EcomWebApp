import React from 'react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import Product from '../components/ProductComp';
import NavBar from '../components/NavBar';
import api from '../axioxInstance';

export default function ProductList() {
    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    
    useEffect(() => {
      api.get('/products')
        .then(response => {
          setMessage(response.data); 
          setLoading(false);
        })
        .catch(error => {
          setMessage(null); 
          console.error("fetch error", error);
          setLoading(false);
        });
    }, []);
    
    if (loading) { 
      return (
        <> 
          <NavBar search={search} setSearch={setSearch} /> 
          <div className='flex flex-col items-center h-100 p-3 text-center justify-center'>
            <p className='text-green-300 text-center font-semibold text-sm'>Loading products...</p>
          </div>
        </>
      );
    }

    if (message == null) { 
      return (
        <> 
          <NavBar search={search} setSearch={setSearch} /> 
          <div className='flex flex-col items-center h-100 p-3 text-center justify-center'>
            <p className='text-red-300 text-center font-semibold text-sm'>
              <span className='text-red-500'>404 ERROR</span> <br /> Products Not Found!
            </p>
            <p className='text-gray-400 text-center text-sm'>check your internet and try again</p>
          </div>
        </>
      );
    }

    // Filter products safely
    const filteredProducts = Array.isArray(message) 
      ? message.filter((product) =>
          product.prodName.toLowerCase().includes(search.toLowerCase())
        )
      : [];

    return (
      <>
        <NavBar search={search} setSearch={setSearch}/>
        
        {/* Container */}
        <div className='flex flex-wrap justify-around m-2 gap-15'>
          <AnimatePresence mode="sync">
            {filteredProducts.map((item) => (
              <motion.div
                key={item.prodId}
                layout // Smooth position adjustment
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeInOut"
                }}
              >
                <Product product={item} />
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div className='flex flex-col items-center p-6 text-center w-full'>
              <p className='text-gray-400 text-sm font-semibold'>No products match "{search}"</p>
            </div>
          )}
        </div>
      </>
    )
}