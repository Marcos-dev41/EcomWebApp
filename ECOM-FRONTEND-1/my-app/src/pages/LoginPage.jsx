import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../src/assets/logo.png'
import api from '../axioxInstance';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await api.post('/auth/login', {
        email,
        userPassword,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate('/products');
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setIsSubmitting(false);
      setUserPassword("");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 py-12 text-gray-100">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="MoniMart logo" className="h-16 w-auto object-contain" />
          <h2 className="mt-4 text-xl font-bold tracking-tight text-white">
            Welcome back to MoniMart
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            Sign in to access your account and orders
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-xs font-medium text-red-400">
            {error}
          </div>
        )}

        {/* Login Form */}
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
              placeholder="name@example.com"
              required
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="pass" className="block text-xs font-medium text-gray-300">
                Password
              </label>
              <Link
                to="/PassResetPage"
                className="text-xs text-blue-400 transition-colors hover:text-blue-300"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              id="pass"
              name="pass"
              value={userPassword}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              onChange={(e) => setUserPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer Navigation Link */}
        <div className="mt-6 border-t border-gray-800 pt-4 text-center">
          <p className="text-xs text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-400 transition-colors hover:text-blue-300"
            >
              Register here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}