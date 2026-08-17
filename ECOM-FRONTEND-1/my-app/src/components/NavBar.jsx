import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import user from '../../src/assets/account.png'
import logo from '../../src/assets/logo.png'
import addedcart from '../../src/assets/grocery-store.png'
import cartimg from '../../src/assets/sell.png'
import bell from '../../src/assets/notification.png'
import { Link } from 'react-router-dom'
import { useCart } from '../pages/CartContext'
import ProductList from '../pages/ProductPage'
import AccountSettings from './AccountSettings';

export default function NavBar({search , setSearch}) {
    const {cart} = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const jwtToken = localStorage.getItem("token")
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

// fixed login state issue 
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
    // 1. Clear stored credentials
    localStorage.removeItem("token");

    // 2. Define routes that require authentication
    const protectedRoutes = ['/cart', '/notifications', '/checkout/:orderId'];

    // 3. If on a protected page, kick to login; otherwise reload or stay put
    const isProtected = protectedRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

    if (isProtected) {
      navigate('/login', { replace: true });
    } else {
      // Force a soft state update or refresh so public headers update immediately
      window.location.reload(); 
    }
  };


    const isAuthenticated = jwtToken && expiryDate() >= currentTime;

  return (
 <>

    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 text-gray-100 backdrop-blur-md shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <img
            src={logo}
            alt="MoniMart Logo"
            className="h-9 w-auto object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-white">
            MoniMart
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link
            to="/"
            className="group relative py-1 transition-colors hover:text-blue-400"
          >
            About us
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-200 group-hover:w-full" />
          </Link>
          <Link
            to="/"
            className="group relative py-1 transition-colors hover:text-blue-400"
          >
            Contact us
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-200 group-hover:w-full" />
          </Link>
        </nav>

        {/* Actions Section (Notifications, Cart, Profile) */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Notifications Button */}
          <Link
            to="/notifications"
            className="relative p-2 text-gray-400 transition-colors hover:text-white"
            aria-label="Notifications"
          >
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </Link>

          {/* Cart Icon with Absolute Badge Position */}
          <Link
            to="/cart"
            className="relative p-2 text-gray-400 transition-colors hover:text-white"
            aria-label="Shopping Cart"
          >
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            {cart.length > 0 && (
              <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-2 ring-gray-900">
                {cart.length > 99 ? "99+" : cart.length}
              </span>
            )}
          </Link>

          <div className="h-5 w-px bg-gray-800" aria-hidden="true" />

          {/* Authentication Dropdown / Login CTA */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 rounded-full p-1 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <img
                    src={user || "/default-avatar.png"}
                    alt="User profile"
                    className="size-8 rounded-full border border-gray-700 object-cover"
                  />
                  <svg
                    className="size-4 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-800 bg-gray-900 py-1 text-sm text-gray-300 shadow-xl">
                    <button onClick={() => {
                  setIsSettingsOpen(true); // Opens Modal
                  setIsDropdownOpen(false); // Closes Dropdown
                }}
                      href="#settings"
                      className="block px-4 py-2 hover:bg-gray-800 hover:text-white"
                    >
                      Account settings
                    </button>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=support@monimart.com&su=MoniMart%20Support%20Request"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 hover:bg-gray-800 hover:text-white"
                    >
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
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>

<AccountSettings
                      isOpen={isSettingsOpen}
                      onClose={() => setIsSettingsOpen(false)}
 />


  <div className="bg-gray-900 p-4 flex m-0 justify-center border-b border-gray-800">
  <div className="relative w-full max-w-md">
    {/* Search Icon */}
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
      <svg className="size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
      </svg>
    </div>

    {/* Input */}
    <input
      type="search"
      value={search}
      placeholder="Search..."
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-xl bg-gray-800 py-2.5 pl-10 pr-10 text-sm text-white placeholder-gray-400 border border-gray-700 transition-all focus:border-blue-500 focus:bg-gray-800/90 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
    />

    {/* Clear Button */}
    {search && (
      <button
        onClick={() => setSearch("")}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
      >
        <svg className="size-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </button>
    )}
  </div>
</div>
</>
  )}

