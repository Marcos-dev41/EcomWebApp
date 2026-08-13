import React from 'react';
import cartimg from '../../src/assets/m2.png';
import { useCart } from '../pages/CartContext';

export default function CartComp({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const formatKSh = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  });

  const totalPrice = (item.quantity || 1) * (item.price || 0);

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.prodId, item.quantity - 1);
    } else {
      removeFromCart(item.prodId);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.prodId, item.quantity + 1);
  };

  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-2xl border border-gray-800 bg-gray-900 p-4 shadow-sm transition-colors hover:border-gray-700">
      
      {/* Product Image */}
      <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-950 p-2 border border-gray-800/80">
        <img
          src={item.imageUrl || item.image || cartimg}
          alt={item.prodName || "Cart item"}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Product Details & Title */}
      <div className="flex flex-1 flex-col justify-center min-w-0 px-2">
        <h3 className="truncate text-sm font-semibold text-white">
          {item.prodName || "Product"}
        </h3>
        
        <div className="mt-1">
          {item.available !== false ? (
            <span className="text-[11px] font-medium text-emerald-400">
              In Stock
            </span>
          ) : (
            <span className="text-[11px] font-medium text-red-400">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Quantity Controller (+ / -) */}
      <div className="flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-950 p-1">
        <button
          type="button"
          onClick={handleDecrease}
          className="flex size-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
          aria-label="Decrease quantity"
        >
          <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
          </svg>
        </button>

        <span className="w-6 text-center text-xs font-bold text-white">
          {item.quantity}
        </span>

        <button
          type="button"
          onClick={handleIncrease}
          className="flex size-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
          aria-label="Increase quantity"
        >
          <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Total Price & Delete Button */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="text-right">
          <p className="text-sm font-bold text-white">
            {formatKSh.format(totalPrice)}
          </p>
          {item.quantity > 1 && (
            <p className="text-[10px] text-gray-500">
              {formatKSh.format(item.price)} each
            </p>
          )}
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.prodId)}
          className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400 focus:outline-none"
          title="Remove from cart"
          aria-label="Remove item"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>

    </div>
  );
}