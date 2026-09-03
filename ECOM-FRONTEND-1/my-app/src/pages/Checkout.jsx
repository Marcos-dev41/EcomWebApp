import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import GlobalNav from '../components/GlobalNav';
import Footer from '../components/Footer';
import api from '../axioxInstance';

export default function CheckoutPage() {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentFailed, setPaymentFailed] = useState(false);
  const location = useLocation();

  // Read initial payment method from route state or query param
  const [selectedMethod, setSelectedMethod] = useState(
    location.state?.paymentMethod || searchParams.get("method") || "mpesa"
  );

  // --- SHIPPING INFORMATION STATE ---
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    postalCode: "",
  });

  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPhone = (phone) => {
    let cleaned = String(phone).replace(/\D/g, ''); // strip non-digits (spaces, +, dashes)

    if (cleaned.length === 9) {
      return '254' + cleaned;
    }
  };

  // Helper to handle shipping form input changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // --- POLLING HELPER ---
  async function pollPaymentStatus(correlationId, { intervalMs = 3000, timeoutMs = 60000 } = {}) {
    const startTime = Date.now();

    while (Date.now() - startTime < timeoutMs) {
      try {
        const res = await api.get(`/order/status/${correlationId}`);
        const { status } = res.data;

        if (status === "SUCCESS") return "SUCCESS";
        if (status === "FAILED") return "FAILED";
        // else PENDING — keep polling
      } catch (err) {
        console.error("Status poll failed", err);
      }
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
    return "TIMEOUT";
  }

  // --- M-PESA HANDLER ---
  async function handleMpesaPayment(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setPaymentFailed(false);
    setStatus("Sending M-Pesa STK push request...");

    try {
      const response = await api.post(`/checkout/pay`, {
        orderId,
        phoneNumber: formatPhone(phoneNumber),
        shippingInfo,
      });

      const { correlationId } = response.data;

      if (!correlationId) {
        setStatus("Payment could not be initiated.");
        setPaymentFailed(true);
        setIsSubmitting(false);
        return;
      }

      setStatus("Check your phone to complete the M-Pesa payment...");
      const result = await pollPaymentStatus(correlationId);

      if (result === "SUCCESS") {
        setStatus("Payment successful! Redirecting...");
        navigate("/order-confirmation");
      } else {
        setStatus(result === "TIMEOUT" ? "Payment timed out." : "Payment failed.");
        setPaymentFailed(true);
      }
    } catch (error) {
      console.error("STK push failed", error);
      setStatus("Something went wrong with the M-Pesa payment.");
      setPaymentFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  // --- PESAPAL HANDLER ---
  async function handlePesapalPayment() {
    setIsSubmitting(true);
    setStatus("Redirecting to PesaPal gateway...");

    try {
      const response = await api.post(`/pesapal/initiate`, {
        orderId,
        shippingInfo
      });
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
      const response = await api.post(`/paypal/create-order`, {
        orderId,
        shippingInfo
      });
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

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header & Order ID */}
        <div className="mb-8 border-b border-gray-800 pb-4 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-white">Complete Checkout</h1>
          <p className="mt-1 text-xs text-gray-400">
            Order ID: <span className="font-mono text-blue-400">{orderId}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* SECTION 1: SHIPPING INFORMATION */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
            <h2 className="text-base font-semibold text-white border-b border-gray-800 pb-3">
              Shipping Address
            </h2>

            <form className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={shippingInfo.fullName}
                  onChange={handleShippingChange}
                  required
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  placeholder="123 Kimathi Street, Apt 4B"
                  value={shippingInfo.streetAddress}
                  onChange={handleShippingChange}
                  required
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Nairobi"
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                    required
                    className="w-full rounded-xl border border-gray-800 bg-gray-950 px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="00100"
                    value={shippingInfo.postalCode}
                    onChange={handleShippingChange}
                    className="w-full rounded-xl border border-gray-800 bg-gray-950 px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* SECTION 2: PAYMENT METHOD & GATEWAY */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-base font-semibold text-white border-b border-gray-800 pb-3">
                Payment Option
              </h2>

              {/* Payment Method Selector Tabs */}
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Select Gateway
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => { setSelectedMethod('mpesa'); setStatus(''); setPaymentFailed(false); }}
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
                    onClick={() => { setSelectedMethod('pesapal'); setStatus(''); setPaymentFailed(false); }}
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
                    onClick={() => { setSelectedMethod('paypal'); setStatus(''); setPaymentFailed(false); }}
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

              {/* Forms per Payment Method */}
              <div className="mt-6">
                {/* --- M-PESA FORM --- */}
                {selectedMethod === "mpesa" && (
                  <form onSubmit={handleMpesaPayment} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">
                        M-Pesa Phone Number
                      </label>
                      <div className='flex flex-row items-center justify-between gap-3'>
                        <div className='text-center rounded-xl border border-gray-800 bg-gray-950 px-3.5 py-2.5 text-sm text-white '><p>+254</p></div>
                        <input
                          type="tel"
                          placeholder="7XXXXXXXX"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          maxLength={9}
                          required
                          className="w-full rounded-xl border border-gray-800 bg-gray-950 px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
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
            </div>

            {/* Status Message Display */}
            {status && (
              <div className="mt-6 rounded-xl border border-gray-800 bg-gray-950 p-3 text-center text-xs font-medium text-gray-300">
                {status}
                {paymentFailed && (
                  <button
                    type="button"
                    onClick={handleMpesaPayment}
                    className="mt-3 block w-full rounded-xl bg-emerald-600 py-2 text-xs font-semibold text-white hover:bg-emerald-500"
                  >
                    Retry Payment
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}