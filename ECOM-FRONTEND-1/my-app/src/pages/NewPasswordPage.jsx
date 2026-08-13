import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GlobalNav from '../components/GlobalNav';
import Footer from '../components/Footer';
import api from '../axioxInstance';

export default function NewPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [userPassword, setUserPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid or missing reset token. Please request a new link.");
      return;
    }

    if (userPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (userPassword !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post('/auth/reset-password', {
        token,
        userPassword,
      });

      setSuccess("Password successfully updated! Redirecting to login...");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error("Password reset failed:", err);
      setError(
        err.response?.data?.message || "Failed to reset password. The link may have expired."
      );
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
              Reset Your Password
            </h1>
            <p className="mt-1.5 text-xs text-gray-400">
              Enter your new password below to secure your account.
            </p>
          </div>

          {/* Feedback Banners */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-xs font-medium text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-xs font-medium text-emerald-400">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="pass" className="block text-xs font-medium text-gray-300">
                New Password
              </label>
              <input
                type="password"
                id="pass"
                name="pass"
                value={userPassword}
                placeholder="••••••••"
                required
                minLength={6}
                onChange={(e) => setUserPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="confirmpass" className="block text-xs font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpass"
                name="confirmpass"
                value={confirmPass}
                placeholder="••••••••"
                required
                minLength={6}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || Boolean(success)}
              className="w-full rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {isSubmitting ? "Updating Password..." : "Reset Password"}
            </button>
          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}