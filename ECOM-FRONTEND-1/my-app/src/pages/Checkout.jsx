import React, { useState } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import GlobalNav from '../components/GlobalNav';
import Footer from '../components/Footer';
import api from '../axioxInstance';

export default function CheckoutPage() {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // Read initial payment method from route state or query param
  const [selectedMethod, setSelectedMethod] = useState(
    location.state?.paymentMethod || searchParams.get("method") || "mpesa"
  );

  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- M-PESA HANDLER ---
  async function handleMpesaPayment(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Sending M-Pesa STK push request...");

    try {
      await api.post(`/checkout/pay`, { orderId, phoneNumber });
      setStatus("Check your phone to complete the M-Pesa payment.");
    } catch (error) {
      console.error("STK push failed", error);
      setStatus("Something went wrong with the M-Pesa payment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // --- PESAPAL HANDLER ---
  async function handlePesapalPayment() {
    setIsSubmitting(true);
    setStatus("Redirecting to PesaPal gateway...");

    try {
      const response = await api.post(`/pesapal/initiate`, { orderId });
      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      } else {
        setStatus("Could not retrieve PesaPal checkout URL.");
      }
    } catch (error) {
      console.error("PesaPal initiation failed", error);
      setStatus("Error connecting to PesaPal gateway.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // --- PAYPAL HANDLERS ---
  const handleCreatePayPalOrder = async () => {
    setStatus("Initializing PayPal transaction...");
    try {
      const response = await api.post(`/paypal/create-order`, { orderId });
      return response.data.id;
    } catch (error) {
      console.error("PayPal order creation failed", error);
      setStatus("Failed to create PayPal order.");
      throw error;
    }
  };

  const handleApprovePayPalOrder = async (data) => {
    setStatus("Capturing payment...");
    try {
      const response = await api.post(`/paypal/capture-order/${data.orderID}`);
      if (response.data.status === 'COMPLETED') {
        setStatus("Payment completed successfully! 🎉");
      } else {
        setStatus("PayPal payment could not be finalized.");
      }
    } catch (error) {
      console.error("PayPal capture failed", error);
      setStatus("Error finalizing PayPal payment.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <GlobalNav />

      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
          
          {/* Header & Order ID */}
          <div className="border-b border-gray-800 pb-4 text-center">
            <h1 className="text-xl font-bold text-white">Complete Payment</h1>
            <p className="mt-1 text-xs text-gray-400">
              Order ID: <span className="font-mono text-blue-400">{orderId}</span>
            </p>
          </div>

          {/* Payment Method Selector Tabs */}
          <div className="mt-6">
            <label className="block text-xs font-medium text-gray-400 mb-2">
              Payment Gateway
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => { setSelectedMethod('mpesa'); setStatus(''); }}
                className={`rounded-xl border py-2 text-xs font-semibold transition-all ${
                  selectedMethod === 'mpesa'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-gray-800 bg-gray-950/50 text-gray-400 hover:border-gray-700'
                }`}
              >
                M-Pesa
              </button>

              <button
                type="button"
                onClick={() => { setSelectedMethod('pesapal'); setStatus(''); }}
                className={`rounded-xl border py-2 text-xs font-semibold transition-all ${
                  selectedMethod === 'pesapal'
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                    : 'border-gray-800 bg-gray-950/50 text-gray-400 hover:border-gray-700'
                }`}
              >
                PesaPal
              </button>

              <button
                type="button"
                onClick={() => { setSelectedMethod('paypal'); setStatus(''); }}
                className={`rounded-xl border py-2 text-xs font-semibold transition-all ${
                  selectedMethod === 'paypal'
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                    : 'border-gray-800 bg-gray-950/50 text-gray-400 hover:border-gray-700'
                }`}
              >
                PayPal
              </button>
            </div>
          </div>

          <div className="mt-6">
            {/* --- M-PESA FORM --- */}
            {selectedMethod === "mpesa" && (
              <form onSubmit={handleMpesaPayment} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    M-Pesa Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="2547XXXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    maxLength={12}
                    required
                    className="w-full rounded-xl border border-gray-800 bg-gray-950 px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-emerald-600 py-3 text-xs font-semibold text-white transition-all hover:bg-emerald-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Request...' : 'Pay via M-Pesa'}
                </button>
              </form>
            )}

            {/* --- PESAPAL FORM --- */}
            {selectedMethod === "pesapal" && (
              <div className="flex flex-col gap-4 text-center">
                <p className="text-xs text-gray-400 leading-relaxed">
                  You will be redirected to the secure PesaPal payment portal to complete your order using Card or Mobile Money.
                </p>
                <button
                  type="button"
                  onClick={handlePesapalPayment}
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white transition-all hover:bg-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Connecting...' : 'Proceed to PesaPal Gateway'}
                </button>
              </div>
            )}

            {/* --- PAYPAL FORM --- */}
            {selectedMethod === "paypal" && (
              <div className="flex flex-col gap-2">
                <PayPalButtons
                  style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
                  createOrder={handleCreatePayPalOrder}
                  onApprove={handleApprovePayPalOrder}
                  onError={(err) => {
                    console.error("PayPal Error:", err);
                    setStatus("An error occurred processing PayPal.");
                  }}
                />
              </div>
            )}
          </div>

          {/* Status Message Display */}
          {status && (
            <div className="mt-6 rounded-xl border border-gray-800 bg-gray-950 p-3 text-center text-xs font-medium text-gray-300">
              {status}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}