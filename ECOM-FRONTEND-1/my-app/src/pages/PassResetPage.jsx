import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalNav from '../components/GlobalNav';
import Footer from '../components/Footer';
import api from '../axioxInstance';

export default function PassResetPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      const response = await api.post("/auth/forgot-password", { email });

      // Handle boolean or object responses
      if (response.data === true || response.data?.success) {
        setStatus({
          type: "success",
          message: "Reset link sent! Please check your email inbox.",
        });
        setEmail("");
      } else {
        setStatus({
          type: "error",
          message: "No account found associated with this email address.",
        });
      }
    } catch (error) {
      console.error("Forgot password request failed:", error);
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to process request. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <GlobalNav />

      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight text-white">
              Forgot Your Password?
            </h1>
            <p className="mt-1.5 text-xs text-gray-400">
              Enter your registered email address below and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Status Feedback Alerts */}
          {status.message && (
            <div
              className={`mt-6 rounded-xl border p-3 text-center text-xs font-medium ${
                status.type === "success"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-red-500/30 bg-red-500/10 text-red-400"
              }`}
            >
              {status.message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="mt-1.5 w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {isSubmitting ? "Sending Reset Link..." : "Send Reset Link"}
            </button>
          </form>

          {/* Navigation Links */}
          <div className="mt-6 border-t border-gray-800 pt-4 text-center">
            <Link
              to="/login"
              className="text-xs font-semibold text-blue-400 transition-colors hover:text-blue-300"
            >
              ← Back to Sign In
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}