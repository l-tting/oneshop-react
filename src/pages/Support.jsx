import React from 'react';
import ContactForm from '../components/support/ContactForm';
import LocationMap from '../components/support/LocationMap';
import { FiHeadphones, FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import useMail from '../hooks/mail/useMail';
import { toast } from 'react-toastify';

const Support = () => {
  const { handleMail, mailData, handleInputChange, loading,error } = useMail();

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20 pb-12">
      {/* Hero Section with Gradient Background - Further reduced size */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white sm:text-3xl mb-1">
              How Can We Help You?
            </h1>
            <p className="text-base text-indigo-100 max-w-xl mx-auto">
              Our dedicated support team is here to assist you with any questions or concerns you may have.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Contact Cards - Further reduced size */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-3 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center mb-1">
              <div className="bg-indigo-100 p-1.5 rounded-full">
                <FiPhone className="h-4 w-4 text-indigo-600" />
              </div>
              <h3 className="ml-2 text-sm font-semibold text-gray-900">Phone Support</h3>
            </div>
            <p className="text-xs text-gray-600 mb-0.5">Call us directly for immediate assistance</p>
            <a href="tel:+254700000000" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              +254 700 000000
            </a>
          </div>

          <button 
            // onClick={handleQuickEmail}
            // disabled={loading}
            className="bg-white rounded-lg shadow-sm p-3 transform hover:scale-105 transition-transform duration-200 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <div className="flex items-center mb-1">
              <div className="bg-indigo-100 p-1.5 rounded-full">
                <FiMail className="h-4 w-4 text-indigo-600" />
              </div>
              <h3 className="ml-2 text-sm font-semibold text-gray-900">Quick Email Support</h3>
            </div>
            <p className="text-xs text-gray-600 mb-0.5">
              {loading ? 'Sending quick email...' : 'Click to send a quick support request'}
            </p>
            <span className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              support@myduka.com
            </span>
          </button>

          <div className="bg-white rounded-lg shadow-sm p-3 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center mb-1">
              <div className="bg-indigo-100 p-1.5 rounded-full">
                <FiClock className="h-4 w-4 text-indigo-600" />
              </div>
              <h3 className="ml-2 text-sm font-semibold text-gray-900">Business Hours</h3>
            </div>
            <p className="text-xs text-gray-600">
              Monday - Friday: 9:00 AM - 5:00 PM<br />
              Saturday: 10:00 AM - 2:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="transform hover:scale-[1.02] transition-transform duration-200">
            <ContactForm
              handleMail={handleMail}
              handleInputChange={handleInputChange}
              mailData={mailData}
              loading={loading}
              error={error}
            
            />
          </div>
          <div className="transform hover:scale-[1.02] transition-transform duration-200">
            <LocationMap />
          </div>
        </div>

        {/* Additional Support Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I track my order?</h3>
              <p className="text-gray-600">
                You can track your order status in real-time through your account dashboard or by contacting our support team.
              </p>
            </div>
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept various payment methods including M-Pesa, credit cards, and bank transfers.
              </p>
            </div>
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How can I return a product?</h3>
              <p className="text-gray-600">
                Products can be returned within 14 days of purchase. Contact our support team to initiate a return.
              </p>
            </div>
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer technical support?</h3>
              <p className="text-gray-600">
                Yes, our technical support team is available to help with any system-related issues or questions.
              </p>
            </div>
          </div>
        </div>

        {/* Office Location Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-center mb-4">
            <FiMapPin className="h-6 w-6 mr-3" />
            <h2 className="text-2xl font-bold">Visit Our Office</h2>
          </div>
          <p className="text-indigo-100 mb-4">
            Come visit us at our office in Nairobi. Our team is ready to assist you in person.
          </p>
          <address className="not-italic text-indigo-100">
            <p className="mb-1">123 Business Street</p>
            <p className="mb-1">Nairobi, Kenya</p>
            <p>Phone: +254 700 000000</p>
          </address>
        </div>
      </div>
    </div>
  );
};

export default Support;
