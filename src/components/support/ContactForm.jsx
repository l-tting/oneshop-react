import React from 'react';
import { FiMail, FiPhone, FiUser, FiMessageSquare } from 'react-icons/fi';
import useMail from '../../hooks/mail/useMail';
import { toast } from 'react-toastify';

const ContactForm = ({ mailData, handleInputChange, handleMail, loading,error }) => {


  const validateForm = () => {
    const errors = {};
    if (!mailData.sender_name.trim()) errors.sender_name = 'Name is required';
    if (!mailData.sender_email.trim()) {
      errors.sender_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(mailData.sender_email)) {
      errors.sender_email = 'Email is invalid';
    }
    if (!mailData.sender_phone.trim()) {
      errors.sender_phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(mailData.sender_phone)) {
      errors.sender_phone = 'Phone number is invalid';
    }
    if (!mailData.body.trim()) errors.body = 'Message is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach(error => toast.error(error));
      return;
    }

    try {
      await handleMail();
      toast.success('Message sent successfully! We will get back to you soon.');
    } catch (error) {
      toast.error(error.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sender_name" className="block text-sm font-medium text-gray-700 mb-1">
              <FiUser className="inline-block mr-2" />
              Name
            </label>
            <input
              type="text"
              id="sender_name"
              name="sender_name"
              value={mailData.sender_name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="sender_email" className="block text-sm font-medium text-gray-700 mb-1">
              <FiMail className="inline-block mr-2" />
              Email
            </label>
            <input
              type="email"
              id="sender_email"
              name="sender_email"
              value={mailData.sender_email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="sender_phone" className="block text-sm font-medium text-gray-700 mb-1">
            <FiPhone className="inline-block mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            id="sender_phone"
            name="sender_phone"
            value={mailData.sender_phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="+254 700 000000"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
            <FiMessageSquare className="inline-block mr-2" />
            Message
          </label>
          <textarea
            id="body"
            name="body"
            value={mailData.body}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="How can we help you?"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm; 