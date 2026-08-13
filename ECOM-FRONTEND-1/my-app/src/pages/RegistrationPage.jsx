import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../src/assets/logo.png'
import Footer from '../components/Footer';
import api from '../axioxInstance';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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
      const response = await api.post('/auth/register', {
        email,
        userPassword,
      });

      console.log("Registered:", response.data);
      navigate('/login');
    } catch (err) {
      console.error("Registration failed:", err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <img src={logo} alt="MoniMart logo" className="h-16 w-auto object-contain" />
            <h1 className="mt-4 text-xl font-bold tracking-tight text-white">
              Welcome to MoniMart
            </h1>
            <p className="mt-1 text-xs text-gray-400">
              Create a new account to get started
            </p>
          </div>

          {/* Error Alert Box */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-xs font-medium text-red-400">
              {error}
            </div>
          )}

          {/* Registration Form */}
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
              <label htmlFor="pass" className="block text-xs font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="pass"
                name="pass"
                value={userPassword}
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete="new-password"
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
                autoComplete="new-password"
                onChange={(e) => setConfirmPass(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Footer Navigation Link */}
          <div className="mt-6 border-t border-gray-800 pt-4 text-center">
            <p className="text-xs text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-400 transition-colors hover:text-blue-300"
              >
                Sign in here
              </Link>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}