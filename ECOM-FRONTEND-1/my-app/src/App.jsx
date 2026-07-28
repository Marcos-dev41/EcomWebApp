import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import ProductList from './pages/ProductPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import PassResetPage from './pages/PassResetPage';
import NewPasswordPage from './pages/NewPasswordPage';
import CheckoutPage from './pages/Checkout';
import NotificationsPage from './pages/NotificationsPage';
import CartProvider  from './pages/CartContext'; 

const clientId=import.meta.env.PAYPAL_CLIENT_ID;
console.log("Client ID:", import.meta.env.VITE_PAYPAL_CLIENT_ID);
// PayPal configuration options
const initialPaypalOptions = {
  "client-id": "AXUcr-feNFM0FksKFfEP_iVu1-BlcJZpMZl0U7T3Q0Fsrz3iOwrV3sbbxsGuqbDx9zKRRqSv3o-i7fMv", // Replace with your actual Sandbox Client ID
  currency: "USD",
  intent: "capture",
};

function App() {
  return (
    <PayPalScriptProvider options={initialPaypalOptions}>
      <CartProvider>     
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/passresetpage" element={<PassResetPage />} />
            <Route path="/newpassword" element={<NewPasswordPage />} />
            <Route path="/checkout/:orderId" element={<CheckoutPage />} />  
            <Route path="/notifications" element={<NotificationsPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </PayPalScriptProvider>
  );
}

export default App;