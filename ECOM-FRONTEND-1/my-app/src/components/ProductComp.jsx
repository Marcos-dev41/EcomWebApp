import React, { useState } from 'react';
import pic from '../../src/assets/m1.png';
import { useCart } from '../pages/CartContext';

export default function ProductComp({ product }) {
  const { addToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);
  const [buttonText, setButtonText] = useState("Add to Cart");

  function handleAddToCart() {
    if (product.available) {
      setButtonText("Added!");
      addToCart(product.prodId);
      setShowAlert(true);

      setTimeout(() => {
        setButtonText("Add to Cart");
        setShowAlert(false);
      }, 1500);
    }
  }

  return (
    <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-4 text-left transition-all duration-200 hover:border-gray-700 hover:shadow-lg hover:shadow-black/40">
      
      {/* Toast Alert Notification */}
      {showAlert && (
        <div className="absolute right-3 top-3 z-10 rounded-lg bg-emerald-500/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-md animate-fade-in">
          ✓ Added to cart
        </div>
      )}

      {/* Image Container */}
      <div className="relative mb-3 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-gray-950/60 p-4">
        <img
          src={product.imageUrl || product.image || pic}
          alt={product.prodName || "Product image"}
          className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
        />
        {!product.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-950/70 backdrop-blur-[1px]">
            <span className="rounded-md bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400 border border-red-500/30">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">
            {product.category || "General"}
          </span>
          <h2 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-100 min-h-[2.5rem]">
            {product.prodName}
          </h2>
        </div>

        {/* Pricing & Stock Status */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Price</p>
            <p className="text-base font-bold text-white">
              Ksh {Number(product.price).toLocaleString()}
            </p>
          </div>

          <div className="text-right">
            {product.available ? (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-red-400">
                <span className="size-1.5 rounded-full bg-red-400" />
                Unavailable
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.available}
          className={`mt-4 w-full rounded-xl py-2.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
            product.available
              ? "bg-blue-600 text-white hover:bg-blue-500 active:scale-[0.98]"
              : "cursor-not-allowed bg-gray-800 text-gray-500 border border-gray-800"
          }`}
        >
          {product.available ? buttonText : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}