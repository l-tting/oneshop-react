import React from 'react';

const BillingTab = ({billingData,handlePayment,handleBillInputChange,bill_loading,bill_error}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Current Plan</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Basic Plan</p>
                <p className="text-sm text-gray-500">$9.99/month</p>
              </div>
              <button className="text-sm text-indigo-600 hover:text-indigo-500">Change Plan</button>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Method</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
                  <p className="text-sm text-gray-500">Expires 12/2024</p>
                </div>
              </div>
              <button className="text-sm text-indigo-600 hover:text-indigo-500">Update</button>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Billing History</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">January 2024</p>
                  <p className="text-sm text-gray-500">Invoice #1234</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">$9.99</p>
                  <p className="text-sm text-green-600">Paid</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">December 2023</p>
                  <p className="text-sm text-gray-500">Invoice #1233</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">$9.99</p>
                  <p className="text-sm text-green-600">Paid</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingTab; 