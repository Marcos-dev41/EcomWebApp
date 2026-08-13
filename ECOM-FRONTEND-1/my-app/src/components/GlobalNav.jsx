import React, { useContext } from 'react'
import user from '../../src/assets/account.png'
import addedtocart from '../../src/assets/grocery-store.png'
import cartimg from '../../src/assets/sell.png'
import bell from '../../src/assets/notification.png'
import store from '../../src/assets/store.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../pages/CartContext'


export default function 
() {
   const {cart} = useCart();
    const jwtToken = localStorage.getItem("token")
        const expiryDate = (() => {
  if (!jwtToken) return null;

  try {
   
    let payloadBase64 = jwtToken.split('.')[1];
    if (!payloadBase64) return null;

    const payload = JSON.parse(atob(payloadBase64));

    return payload.exp ? new Date(payload.exp * 1000).toLocaleString() : null;
  } catch (error) {
    console.error("Invalid JWT token:", error);
    return null;
  }
    })

    

  const currentTime = new Date().toLocaleString();


  // function to handle user logging out

    function logout(){
        localStorage.removeItem("token");
    }

   const [isOpen, setIsOpen] = useState(false);
   const isAuthenticated = jwtToken && expiryDate() >= currentTime;


  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 text-gray-100 backdrop-blur-md shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Brand Name */}
        <Link to="/" className="text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-90">
          MoniMart
        </Link>

        {/* Action Icons (Store, Notifications, Cart) */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Store / Products Link */}
          <Link
            to="/products"
            className="p-2 text-gray-400 transition-colors hover:text-white"
            aria-label="Products Store"
          >
            <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36a.75.75 0 0 1-.75-.75V11.25a.75.75 0 0 1 .225-.53l8.25-8.25a.75.75 0 0 1 1.06 0l8.25 8.25a.75.75 0 0 1 .225.53V20.25a.75.75 0 0 1-.75.75H13.5Z" />
            </svg>
          </Link>

          {/* Notifications Link */}
          <Link
            to="/notifications"
            className="p-2 text-gray-400 transition-colors hover:text-white"
            aria-label="Notifications"
          >
            <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </Link>

          {/* Cart Icon with Absolute Badge */}
          <Link
            to="/cart"
            className="relative p-2 text-gray-400 transition-colors hover:text-white"
            aria-label="Shopping Cart"
          >
            <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-2 ring-gray-900">
                {cart.length > 99 ? "99+" : cart.length}
              </span>
            )}
          </Link>
        </div>

        {/* User Profile / Authentication Menu */}
        <div className="flex items-center">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-full p-1 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <img
                  src={user || "/default-avatar.png"}
                  alt="User Avatar"
                  className="size-8 rounded-full border border-gray-700 object-cover"
                />
                <svg className="size-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-800 bg-gray-900 py-1 text-sm text-gray-300 shadow-xl">
                  <a href="#settings" className="block px-4 py-2 hover:bg-gray-800 hover:text-white">
                    Account settings
                  </a>
                  <a href="#support" className="block px-4 py-2 hover:bg-gray-800 hover:text-white">
                    Support
                  </a>
                  <hr className="my-1 border-gray-800" />
                  <button
                    onClick={logout}
                    className="block w-full px-4 py-2 text-left text-red-400 hover:bg-gray-800 hover:text-red-300"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus:outline-none"
            >
              Log in
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
  