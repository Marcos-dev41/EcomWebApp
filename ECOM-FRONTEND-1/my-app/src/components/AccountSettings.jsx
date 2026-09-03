import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../axioxInstance';

export default function AccountSettingsModal({ isOpen, onClose }) {
  // Profile Form State
  const [name, setName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setIsSubmitting(true);

    try {
      await api.put('/user/user-details', { name, phoneNumber });
      setStatus({ type: 'success', message: 'Profile updated successfully!' });
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Failed to update profile.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xs"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <h2 className="text-lg font-bold text-white">Account Settings</h2>
            <button
              onClick={onClose}
              className="rounded-full bg-gray-800 p-1.5 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Feedback Status Alert */}
          {status.message && (
            <div
              className={`mt-4 rounded-xl border p-3 text-center text-xs font-medium ${
                status.type === 'success'
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                  : 'border-red-500/30 bg-red-500/10 text-red-400'
              }`}
            >
              {status.message}
            </div>
          )}

          {/* Profile Form */}
          <form onSubmit={handleProfileUpdate} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-800 bg-gray-950 px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                phoneNumber
              </label>
              <input
                type="tel"
                placeholder="2547XXXXXXXX"
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
                className="w-full rounded-xl border border-gray-800 bg-gray-950 px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white transition-all hover:bg-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}