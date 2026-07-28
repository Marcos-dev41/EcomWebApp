import React, { createContext, useEffect, useState } from 'react'
import CartComp from '../components/CartComp'
import GlobalNav from '../components/GlobalNav'
import { useCart } from './CartContext'
import api from '../axioxInstance';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cart, clearCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('mpesa'); // Default payment method
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const formatKSh = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  });

  async function handleCheckout() {
    if (cart.length === 0) return;
    
    try {
      setIsSubmitting(true);
      const response = await api.post("/payment/checkout",cart);
      
      console.log("order response:", response.data);
      const order = response.data;
      clearCart(); 
      navigate(`/checkout/${order.orderId}`, {
      state: { paymentMethod } // e.g., 'PAYPAL' or 'MPESA'
    });

    } catch (error) {
      console.error("Checkout Failed", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    api.get("/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Fetch error", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-5 text-center">Loading...</p>;

  const cartWithDetails = cart.map((item) => {
    const productInfo = products.find((p) => p.prodId === item.prodId);
    return { ...item, ...productInfo };
  });

  const total = cartWithDetails.reduce((accumulator, item) => {
    return accumulator + ((item.price || 0) * item.quantity);
  }, 0);

  return (
    <>
      <GlobalNav />
      <div className=' flex  flex-col items-center w-full max-w-2xl p-5 mx-auto mt-2  border-2 rounded-2xl'>
        <div className='w-full rounded-2xl text-center bg-orange-400 p-3  text-white text-xl font-bold mb-4'>
          <h2>Cart</h2>
        </div>

        {cartWithDetails.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Your cart is empty.</p>
        ) : (
          cartWithDetails.map((item) => (
            <CartComp key={item.prodId} item={item} />
          ))
        )}

        <div className='flex flex-col gap-4 p-5 mt-5 w-full  border-2 rounded-2xl bg-white shadow-sm'>
          
          <div className='flex flex-col gap-2 text-left'>
            <label className='font-bold text-gray-700 text-sm'>Select Payment Method:</label>
            <div className='grid grid-cols-3 gap-2'>
              <button
                type='button'
                onClick={() => setPaymentMethod('mpesa')}
                className={`p-2 border-2 rounded-xl text-sm font-semibold transition-all ${
                  paymentMethod === 'mpesa'
                    ? 'border-green-600 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                M-Pesa
              </button>

              <button
                type='button'
                onClick={() => setPaymentMethod('pesapal')}
                className={`p-2 border-2 rounded-xl text-sm font-semibold transition-all ${
                  paymentMethod === 'pesapal'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                PesaPal
              </button>

              <button
                type='button'
                onClick={() => setPaymentMethod('paypal')}
                className={`p-2 border-2 rounded-xl text-sm font-semibold transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                PayPal
              </button>
            </div>
          </div>

          <hr className='my-1 border-gray-200' />

          {/* Price Total & Action Button */}
          <div className='flex flex-row justify-between items-center w-full'>
            <div className='flex flex-col text-left'>
              <span className='text-xs text-gray-500 font-medium'>Total Amount</span>
              <span className='font-bold text-xl text-gray-900'>{formatKSh.format(total)}</span>
            </div>

            <button 
              className='bg-orange-400 hover:scale-102 disabled:opacity-50 text-white font-semibold rounded-2xl px-5 py-2.5 transition-colors' 
              onClick={handleCheckout}
              disabled={isSubmitting || cart.length === 0}
            >
              {isSubmitting ? 'Processing...' : 'Confirm & Checkout'}
            </button>
          </div>

        </div> 
      </div>
    </>
  )
}