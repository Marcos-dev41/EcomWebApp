import React, { useState } from 'react';
import GlobalNav from '../components/GlobalNav';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import api from "../axioxInstance";
import { PayPalButtons } from '@paypal/react-paypal-js';

export default function CheckoutPage() {
    const { orderId } = useParams();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    // Read payment method from route state OR query param (e.g. /checkout/123?method=paypal)
    const paymentMethod = location.state?.paymentMethod || searchParams.get("method") || "paypal";

    const [phoneNumber, setPhoneNumber] = useState("");
    const [status, setStatus] = useState("");


    async function handleMpesaPayment(e) {
        e.preventDefault();
        setStatus("Sending payment request...");

        try {
        await api.post(`/checkout/pay`,{orderId, phoneNumber});
            setStatus("Check your phone to complete payment.");
        } catch (error) {
            console.error("STK push failed", error);
            setStatus("Something went wrong with M-Pesa payment.");
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
        <div>
            <GlobalNav />
            <div className='flex flex-col p-5 items-center'>
            <div className='flex flex-col m-5 p-4 w-96 border rounded-lg shadow-sm'>
                <div className='rounded bg-orange-500 text-center text-xl p-2 font-semibold text-white'>
                    <h1>Checkout Page</h1>
                </div>

                <br />

                {/* --- M-PESA CHECKOUT --- */}
                {paymentMethod === "mpesa" && (
                    <form className='flex flex-col gap-3' onSubmit={handleMpesaPayment}>
                        <h2 className='font-semibold text-center'>Pay via M-Pesa</h2>
                        <input 
                            type="tel" 
                            placeholder='2547XXXXXXXX' 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className='border-2 p-2 rounded focus:outline-none focus:border-orange-400' 
                            maxLength={12} 
                            required
                        />
                        <button 
                            type="submit" 
                            className='bg-orange-500 hover:scale-y-102 rounded p-2 font-bold text-white transition-colors'
                        >
                            Place Order
                        </button>
                    </form>
                )}

                {/* --- PAYPAL CHECKOUT --- */}
                {paymentMethod === "paypal" && (
                    <div className='flex flex-col gap-2'>
                        <h2 className='font-semibold mb-2 text-center'>Pay with PayPal</h2>
                        <PayPalButtons 
                            style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }}
                            createOrder={handleCreatePayPalOrder}
                            onApprove={handleApprovePayPalOrder}
                            onError={(err) => {
                                console.error("PayPal Error:", err);
                                setStatus("An error occurred with PayPal.");
                            }}
                        />
                    </div>
                )}

                {/* STATUS MESSAGE DISPLAY */}
                {status && (
                    <p className='mt-4 p-2 bg-gray-100 rounded text-center text-sm font-semibold text-gray-800'>
                        {status}
                    </p>
                )}
            </div>
        </div>
    </div>
    );
}