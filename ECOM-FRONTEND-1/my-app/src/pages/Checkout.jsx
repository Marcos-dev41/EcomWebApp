import React, { useState, useEffect, useRef } from 'react';
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
  const [shippingErrors, setShippingErrors] = useState({});

  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Guards against setting state / navigating after unmount or after
  // the user has switched away from the in-flight payment method.
  const activePollId = useRef(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      console.log("[CheckoutPage] unmounting");
      isMountedRef.current = false;
    };
  }, []);

  const formatPhone = (phone) => {
    let cleaned = String(phone).replace(/\D/g, ''); // strip non-digits

    if (cleaned.startsWith('254') && cleaned.length === 12) {
      return cleaned;
    }
    if (cleaned.startsWith('0') && cleaned.length === 10) {
      return '254' + cleaned.substring(1);
    }
    if (cleaned.length === 9) {
      return '254' + cleaned;
    }
    return null;
  };

  // Helper to handle shipping form input changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Validates required shipping fields before any payment can proceed.
  // Returns true if valid, false (and populates shippingErrors) if not.
  const validateShipping = () => {
    const errors = {};
    if (!shippingInfo.fullName.trim()) errors.fullName = "Full name is required.";
    if (!shippingInfo.streetAddress.trim()) errors.streetAddress = "Street address is required.";
    if (!shippingInfo.city.trim()) errors.city = "City/town is required.";
    // postalCode is optional, matching the original form

    setShippingErrors(errors);

    if (Object.keys(errors).length > 0) {
      console.log("[validateShipping] failed", errors);
      setStatus("Please fill in your shipping details before paying.");
      setPaymentFailed(true);
      return false;
    }
    return true;
  };

  // Prevent the shipping form's native submit behavior (e.g. pressing
  // Enter in a field) from reloading the page.
  const handleShippingFormSubmit = (e) => {
    e.preventDefault();
  };

  // --- POLLING HELPER ---
  // pollId lets a stale poll (from a payment method the user has since
  // abandoned) recognize it's stale and stop touching state.
  // NOTE: backend sends "PENDING" | "PAID" | "FAILED" — mapped to
  // this function's own SUCCESS/FAILED/TIMEOUT/CANCELLED vocabulary.
  async function pollPaymentStatus(correlationId, pollId, { intervalMs = 3000, timeoutMs = 60000 } = {}) {
    console.log("[pollPaymentStatus] started", { correlationId, pollId });
    const startTime = Date.now();
    let tick = 0;

    while (Date.now() - startTime < timeoutMs) {
      tick++;
      console.log("[pollPaymentStatus] tick", tick, {
        isMounted: isMountedRef.current,
        activePollId: activePollId.current,
        pollId,
      });

      if (!isMountedRef.current || activePollId.current !== pollId) {
        console.log("[pollPaymentStatus] cancelled — mismatch or unmounted");
        return "CANCELLED";
      }

      try {
        const res = await api.get(`/order/status/${correlationId}`);
        console.log("[pollPaymentStatus] response", res.data);
        const { status } = res.data;

        if (status === "PAID") return "SUCCESS";
        if (status === "FAILED") return "FAILED";
        // else PENDING — keep polling
      } catch (err) {
        console.error("[pollPaymentStatus] request failed", err.response?.status, err.response?.data || err.message);
      }
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
    console.log("[pollPaymentStatus] timed out");
    return "TIMEOUT";
  }

  // --- M-PESA HANDLER ---
  async function handleMpesaPayment(e) {
    if (e?.preventDefault) {
      e.preventDefault();
    }

    console.log("[handleMpesaPayment] fired");

    if (!validateShipping()) {
      console.log("[handleMpesaPayment] blocked by shipping validation");
      return;
    }

    const formattedPhone = formatPhone(phoneNumber);
    if (!formattedPhone) {
      console.log("[handleMpesaPayment] blocked by invalid phone", phoneNumber);
      setStatus("Please enter a valid phone number (e.g. 7XXXXXXXX).");
      setPaymentFailed(true);
      return;
    }

    const pollId = ++activePollId.current;
    console.log("[handleMpesaPayment] pollId assigned", pollId);

    setIsSubmitting(true);
    setPaymentFailed(false);
    setStatus("Sending M-Pesa STK push request...");

    try {
      const response = await api.post(`/checkout/pay`, {
        orderId,
        phoneNumber: formattedPhone,
        shippingInfo,
      });

      console.log("[handleMpesaPayment] /checkout/pay response", response.data);

      const { correlationId } = response.data;

      if (!correlationId) {
        console.log("[handleMpesaPayment] no correlationId in response — aborting before poll");
        if (isMountedRef.current && activePollId.current === pollId) {
          setStatus("Payment could not be initiated.");
          setPaymentFailed(true);
          setIsSubmitting(false);
        }
        return;
      }

      if (isMountedRef.current && activePollId.current === pollId) {
        setStatus("Check your phone to complete the M-Pesa payment...");
      }

      console.log("[handleMpesaPayment] about to poll", { correlationId, pollId, activePollId: activePollId.current });

      const result = await pollPaymentStatus(correlationId, pollId);

      console.log("[handleMpesaPayment] poll result", result);

      // Stale poll (unmounted, or user switched payment method) — do nothing.
      if (!isMountedRef.current || activePollId.current !== pollId) {
        console.log("[handleMpesaPayment] result discarded — stale/unmounted");
        return;
      }

      if (result === "SUCCESS") {
        setStatus("Payment successful! Redirecting...");
        navigate("/notifications");
      } else if (result === "CANCELLED") {
        // no-op, another action superseded this one
      } else {
        setStatus(result === "TIMEOUT" ? "Payment timed out." : "Payment failed.");
        setPaymentFailed(true);
      }
    } catch (error) {
      console.error("[handleMpesaPayment] STK push request threw", error);
      if (isMountedRef.current && activePollId.current === pollId) {
        setStatus("Something went wrong with the M-Pesa payment.");
        setPaymentFailed(true);
      }
    } finally {
      if (isMountedRef.current && activePollId.current === pollId) {
        setIsSubmitting(false);
      }
    }
  }

  // --- PESAPAL HANDLER ---
  async function handlePesapalPayment() {
    if (!validateShipping()) return;

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
        setPaymentFailed(true);
      }
    } catch (error) {
      console.error("PesaPal initiation failed", error);
      setStatus("Error connecting to PesaPal gateway.");
      setPaymentFailed(true);
    } finally {
      if (isMountedRef.current) {
        setIsSubmitting(false);
      }
    }
  }

  // --- PAYPAL HANDLERS ---
  const handleCreatePayPalOrder = async () => {
    if (!validateShipping()) {
      // Throwing prevents the PayPal SDK from opening its popup.
      throw new Error("Shipping information incomplete.");
    }

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
      setPaymentFailed(true);
      throw error;
    }
  };

  const handleApprovePayPalOrder = async (data) => {
    setStatus("Capturing payment...");
    try {
      const response = await api.post(`/paypal/capture-order/${data.orderID}`);
      if (response.data.status === 'COMPLETED') {
        setStatus("Payment completed successfully! 🎉");
        navigate("/order-confirmation");
      } else {
        setStatus("PayPal payment could not be finalized.");
        setPaymentFailed(true);
      }
    } catch (error) {
      console.error("PayPal capture failed", error);
      setStatus("Error finalizing PayPal payment.");
      setPaymentFailed(true);
    }
  };

  // Switching payment methods invalidates any in-flight M-Pesa poll.
  const handleSelectMethod = (method) => {
    if (isSubmitting) return; // don't allow switching mid-payment
    console.log("[handleSelectMethod] switching to", method, "— bumping activePollId");
    activePollId.current += 1; // invalidate any running poll
    setSelectedMethod(method);
    setStatus('');
    setPaymentFailed(false);
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

            <form className="mt-4 space-y-4" onSubmit={handleShippingFormSubmit}>
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
                {shippingErrors.fullName && (
                  <p className="mt-1 text-[11px] text-red-400">{shippingErrors.fullName}</p>
                )}
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
                {shippingErrors.streetAddress && (
                  <p className="mt-1 text-[11px] text-red-400">{shippingErrors.streetAddress}</p>
                )}
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
                  {shippingErrors.city && (
                    <p className="mt-1 text-[11px] text-red-400">{shippingErrors.city}</p>
                  )}
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
                    onClick={() => handleSelectMethod('mpesa')}
                    disabled={isSubmitting}
                    className={`rounded-xl border py-2 text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedMethod === 'mpesa'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-gray-800 bg-gray-950/50 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    M-Pesa
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectMethod('pesapal')}
                    disabled={isSubmitting}
                    className={`rounded-xl border py-2 text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedMethod === 'pesapal'
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                        : 'border-gray-800 bg-gray-950/50 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    PesaPal
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectMethod('paypal')}
                    disabled={isSubmitting}
                    className={`rounded-xl border py-2 text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
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
                      <div className="flex flex-row items-center justify-between gap-3">
                        <div className="text-center rounded-xl border border-gray-800 bg-gray-950 px-3.5 py-2.5 text-sm text-white">
                          <p>+254</p>
                        </div>
                        <input
                          type="tel"
                          placeholder="7XXXXXXXX"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          maxLength={10}
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
                        setPaymentFailed(true);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Status Message Display */}
            {status && (
              <div className="mt-6 rounded-xl border border-gray-800 bg-gray-950 p-3 text-center text-xs font-medium text-gray-300">
                <p>{status}</p>
                {paymentFailed && selectedMethod === 'mpesa' && (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={(e) => handleMpesaPayment(e)}
                    className="mt-3 block w-full rounded-xl bg-emerald-600 py-2 text-xs font-semibold text-white transition-all hover:bg-emerald-500 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Retrying...' : 'Retry Payment'}
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