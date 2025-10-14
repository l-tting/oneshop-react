import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiArrowLeft, FiCreditCard, FiSmartphone } from 'react-icons/fi';

// Card Payment Form Component
const CardPaymentForm = ({ onSubmit, loading, errors, setErrors,billingData,handlePayment,handleBillInputChange, onLoadingChange }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    // Format expiry date
    else if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .substr(0, 5);
    }
    // Format CVV (only numbers, max 4 digits)
    else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substr(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter the cardholder name';
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form id="card-form" onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          placeholder="1234 5678 9012 3456"
          className={`mt-1 block w-full py-2 px-3 rounded-md border ${
            errors.cardNumber ? 'border-red-300' : 'border-gray-300'
          } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
        />
        {errors.cardNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
        )}
      </div>

      <div>
        <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">
          Cardholder Name
        </label>
        <input
          type="text"
          id="cardholderName"
          name="cardholderName"
          value={formData.cardholderName}
          onChange={handleInputChange}
          placeholder="John Doe"
          className={`mt-1 block w-full py-2 px-3 rounded-md border ${
            errors.cardholderName ? 'border-red-300' : 'border-gray-300'
          } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
        />
        {errors.cardholderName && (
          <p className="mt-1 text-sm text-red-600">{errors.cardholderName}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            placeholder="MM/YY"
            className={`mt-1 block w-full py-2 px-3 rounded-md border ${
              errors.expiryDate ? 'border-red-300' : 'border-gray-300'
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.expiryDate && (
            <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            placeholder="123"
            className={`mt-1 block w-full py-2 px-3 rounded-md border ${
              errors.cvv ? 'border-red-300' : 'border-gray-300'
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.cvv && (
            <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
          )}
        </div>
      </div>
    </form>
  );
};

// M-Pesa Payment Form Component
const MpesaPaymentForm = ({ billingData, handleBillInputChange, handlePayment, loading, errors, setErrors, onLoadingChange }) => {
  const validateForm = () => {
    const newErrors = {};
    if (!billingData.phone_number) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    if (!billingData.amount) {
      newErrors.amount = 'Amount is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        onLoadingChange(true); // Show loading overlay
        await handlePayment();
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          submit: error.message || 'Payment failed. Please try again.'
        }));
      } finally {
        onLoadingChange(false); // Hide loading overlay
      }
    }
  };

  return (
    <form id="mpesa-form" onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          M-Pesa Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phone_number"
          value={billingData.phone_number}
          onChange={handleBillInputChange}
          placeholder="254XXXXXXXXX"
          className={`mt-1 block w-full py-2 px-3 rounded-md border ${
            errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
          } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
        )}
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={billingData.amount}
          onChange={handleBillInputChange}
          placeholder="Enter amount"
          className={`mt-1 block w-full py-2 px-3 rounded-md border ${
            errors.amount ? 'border-red-300' : 'border-gray-300'
          } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
        )}
      </div>

      <p className="text-sm text-gray-500">
        Enter the phone number registered with M-Pesa. You will receive a prompt to confirm the payment.
      </p>
    </form>
  );
};

// Main CompanyPayment Component
const CompanyPayment = ({ companyData, onPaymentComplete, onBack, billingData, handlePayment, handleBillInputChange }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get('plan') || 'basic';
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

  // Get plan details based on URL parameter
  const getPlanDetails = () => {
    switch (selectedPlan) {
      case 'pro':
        return {
          name: 'Pro Plan',
          price: '$16/month',
          yearlyPrice: '$12.80/month (billed yearly)',
          features: [
            'Unlimited products & sales',
            'Advanced inventory management',
            'Real-time analytics & dashboards',
            'Multi-user access',
            'Priority email support'
          ]
        };
      case 'business':
        return {
          name: 'Business Plan',
          price: '$32/user/month',
          yearlyPrice: '$25.60/user/month (billed yearly)',
          features: [
            'Everything in Pro, plus',
            'Team & permissions management',
            'Chain/multi-store support',
            'Integrations (accounting, e-commerce)',
            'Dedicated account manager',
            'Premium support'
          ]
        };
      default:
        return {
          name: 'Basic Plan',
          price: 'Free',
          features: []
        };
    }
  };

  const planDetails = getPlanDetails();

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (paymentMethod === 'mpesa') {
        const response = await handlePayment();
        if (response) {
          await onPaymentComplete({
            method: 'mpesa',
            phoneNumber: billingData.phone_number,
            amount: billingData.amount
          });
        }
      } else {
        await onPaymentComplete({
          method: 'card',
          ...formData
        });
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Payment failed. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            disabled={showLoadingOverlay}
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Back to Company Details
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Complete Your Registration</h1>
          <p className="mt-1 text-sm text-gray-600">
            Add your payment information to activate your {planDetails.name}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Plan Summary</h2>
            <div className="space-y-4">
              <div className="bg-indigo-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-indigo-900">{planDetails.name}</h3>
                <p className="text-2xl font-bold text-indigo-900 mt-2">{planDetails.price}</p>
                {planDetails.yearlyPrice && (
                  <p className="text-sm text-indigo-700 mt-1">{planDetails.yearlyPrice}</p>
                )}
              </div>
              
              <div className="pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Plan Features</h4>
                <ul className="space-y-2">
                  {planDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
            
            {/* Payment Method Selection */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-center p-4 rounded-lg border ${
                    paymentMethod === 'card'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-300 hover:border-indigo-500'
                  }`}
                >
                  <FiCreditCard className="w-5 h-5 mr-2" />
                  <span>Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mpesa')}
                  className={`flex items-center justify-center p-4 rounded-lg border ${
                    paymentMethod === 'mpesa'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-300 hover:border-indigo-500'
                  }`}
                >
                  <FiSmartphone className="w-5 h-5 mr-2" />
                  <span>M-Pesa</span>
                </button>
              </div>
            </div>

            {paymentMethod === 'card' ? (
              <CardPaymentForm
                onSubmit={handleSubmit}
                loading={loading}
                errors={errors}
                setErrors={setErrors}
                billingData={billingData}
                handlePayment={handlePayment}
                handleBillInputChange={handleBillInputChange}
                onLoadingChange={setShowLoadingOverlay}
              />
            ) : (
              <MpesaPaymentForm
                billingData={billingData}
                handleBillInputChange={handleBillInputChange}
                handlePayment={handlePayment}
                loading={loading}
                errors={errors}
                setErrors={setErrors}
                onLoadingChange={setShowLoadingOverlay}
              />
            )}

            {errors.submit && (
              <p className="mt-4 text-sm text-red-600">{errors.submit}</p>
            )}

            <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading || showLoadingOverlay}
              >
                Back
              </button>
              <button
                type="submit"
                form={paymentMethod === 'card' ? 'card-form' : 'mpesa-form'}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] flex items-center justify-center"
                disabled={loading || showLoadingOverlay}
              >
                {showLoadingOverlay && paymentMethod === 'mpesa' ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  paymentMethod === 'mpesa' ? 'Pay with M-Pesa' : 'Pay with Card'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPayment; 