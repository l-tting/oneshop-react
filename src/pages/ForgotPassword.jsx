import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone } from 'react-icons/fi';
import { requestResetCode } from '../services/authService';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [contactMethod, setContactMethod] = useState('email');
  const [contactInfo, setContactInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await requestResetCode(contactInfo, contactMethod);
      setSuccess(true);
      toast.success(`Reset code sent to your ${contactMethod}`);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to request reset code. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Check Your {contactMethod === 'email' ? 'Email' : 'Phone'}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              We've sent a reset code to your {contactMethod}. Please check your {contactMethod} and use the code to reset your password.
            </p>
          </div>
          <div className="text-center">
            <Link
              to="/reset-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Enter Reset Code
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your contact information to receive a reset code
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setContactMethod('email')}
                className={`flex-1 py-2 px-4 border rounded-md text-sm font-medium cursor-pointer ${
                  contactMethod === 'email'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <FiMail className="inline-block mr-2" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setContactMethod('phone')}
                className={`flex-1 py-2 px-4 border rounded-md text-sm font-medium cursor-pointer ${
                  contactMethod === 'phone'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <FiPhone className="inline-block mr-2" />
                Phone
              </button>
            </div>
            <div>
              <label htmlFor="contact" className="sr-only">
                {contactMethod === 'email' ? 'Email address' : 'Phone number'}
              </label>
              <input
                id="contact"
                name="contact"
                type={contactMethod === 'email' ? 'email' : 'tel'}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={contactMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Sending...' : 'Send Reset Code'}
            </button>
          </div>

          
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword; 