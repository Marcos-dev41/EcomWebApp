import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../pages/CartContext';
import pic from '../../src/assets/m1.png';

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [buttonText, setButtonText] = useState("Add to Cart");

  if (!product) return null;

  const handleAddToCart = () => {
    if (product.available) {
      setButtonText("Added!");
      addToCart(product.prodId);
      setTimeout(() => setButtonText("Add to Cart"), 1500);
    }
  };
  

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center h-fit p-4">
        
        {/* Backdrop / Dark overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-xs"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-gray-800/80 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
            aria-label="Close modal"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Image Container */}
            <div className="flex aspect-square items-center justify-center rounded-2xl bg-gray-950 p-4 border border-gray-800">
              <img
                src={product.imageUrl || product.image || pic}
                alt={product.prodName}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between h-fit">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  {product.category || "General"}
                </span>
                
                <h2 className="mt-2 text-xl font-bold text-white">
                  {product.prodName}
                </h2>

                <div className="mt-3 flex items-center gap-3">
                  <p className="text-2xl font-bold text-white">
                    Ksh {Number(product.price).toLocaleString()}
                  </p>
                  
                  {product.available ? (
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                      In Stock
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 border border-red-500/20">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mt-4 text-xs leading-relaxed text-gray-200">
                  {product.prodDescription ||
                    "High-quality hardware item available at MoniMart. Designed for durability and reliable daily performance."}
                </p>
                {/* Specifications */}
                <ul className="mt-4 text-xs leading-relaxed text-gray-400 space-y-1">
 {product.category === "Monitors"? (
    <>
      <h3 className='text-gray-200'>Brand: {product.brand}</h3>
      <li>Screen size: {product.screenSize}</li>
      <li>Resolution: {product.resolution}</li>
      <li>Refresh rate: {product.refreshRate}</li>
      <li>Connectivity: {product.connectivity}</li>
    </>
  ) : (
   <>
    <h3 className='text-gray-200'>Brand: {product.brand}</h3>
    </>

  )}
</ul>
              </div>

              {/* Add to Cart CTA */}
              <div className="mt-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.available}
                  className={`w-full rounded-xl py-3 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    product.available
                      ? "bg-blue-600 text-white hover:bg-blue-500 active:scale-[0.98]"
                      : "cursor-not-allowed bg-gray-800 text-gray-500 border border-gray-800"
                  }`}
                >
                  {product.available ? buttonText : "Out of Stock"}
                </button>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}