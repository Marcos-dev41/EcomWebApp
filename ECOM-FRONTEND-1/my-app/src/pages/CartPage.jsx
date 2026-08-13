import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CartComp from '../components/CartComp';
import GlobalNav from '../components/GlobalNav';
import Footer from '../components/Footer';
import { useCart } from './CartContext';
import api from '../axioxInstance';

export default function CartPage() {
  const { cart, clearCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const formatKSh = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    api.get('/products')
      .then((response) => {
        setProducts(response.data || []);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Fetch error", error);
        setLoading(false);
      });
  }, []);

  async function handleCheckout() {
    if (cart.length === 0) return;
    
    try {
      setIsSubmitting(true);
      const response = await api.post("/payment/checkout", cart);
      
      const order = response.data;
      clearCart(); 
      navigate(`/checkout/${order.orderId}`, {
        state: { paymentMethod }
      });
    } catch (error) {
      console.error("Checkout Failed", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Combine cart items with product details fetched from API
  const cartWithDetails = cart.map((item) => {
    const productInfo = products.find((p) => p.prodId === item.prodId);
    return { ...item, ...productInfo };
  });

  const total = cartWithDetails.reduce((accumulator, item) => {
    return accumulator + ((item.price || 0) * item.quantity);
  }, 0);

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <GlobalNav />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 border-b border-gray-800 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">Your Shopping Cart</h1>
          <p className="text-xs text-gray-400 mt-1">
            Review your selected items and select a payment gateway to proceed.
          </p>
        </div>

        {loading ? (
          /* Skeleton Loader */
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-24 w-full animate-pulse rounded-2xl bg-gray-900 border border-gray-800" />
              ))}
            </div>
            <div className="h-72 w-full animate-pulse rounded-2xl bg-gray-900 border border-gray-800" />
          </div>
        ) : cartWithDetails.length === 0 ? (
          /* Empty Cart State */
          <div className="my-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-800 bg-gray-900/40 p-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-gray-800/80 text-gray-400 mb-4">
              <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Your cart is empty</h3>
            <p className="mt-1 text-sm text-gray-400">Looks like you haven't added any products to your cart yet.</p>
            <Link
              to="/products"
              className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart Content Layout */
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            
            {/* Left: Cart Items List */}
            <div className="space-y-4 lg:col-span-2">
              {cartWithDetails.map((item) => (
                <CartComp key={item.prodId} item={item} />
              ))}
            </div>

            {/* Right: Order & Payment Summary */}
            <div className="h-fit rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
              <h2 className="text-base font-semibold text-white">Order Summary</h2>

              {/* Payment Method Selector */}
              <div className="mt-6">
                <label className="block text-xs font-medium text-gray-400 mb-3">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`rounded-xl border py-2.5 text-xs font-semibold transition-all ${
                      paymentMethod === 'mpesa'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-gray-800 bg-gray-950/50 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                    }`}
                  >
                    M-Pesa
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pesapal')}
                    className={`rounded-xl border py-2.5 text-xs font-semibold transition-all ${
                      paymentMethod === 'pesapal'
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                        : 'border-gray-800 bg-gray-950/50 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                    }`}
                  >
                    PesaPal
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`rounded-xl border py-2.5 text-xs font-semibold transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-gray-800 bg-gray-950/50 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                    }`}
                  >
                    PayPal
                  </button>
                </div>
              </div>

              <hr className="my-6 border-gray-800" />

              {/* Pricing Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>{formatKSh.format(total)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-emerald-400 font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-3 text-base font-bold text-white">
                  <span>Total Amount</span>
                  <span>{formatKSh.format(total)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isSubmitting || cart.length === 0}
                className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {isSubmitting ? 'Processing Order...' : 'Confirm & Checkout'}
              </button>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}