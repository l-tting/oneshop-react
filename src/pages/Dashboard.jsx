import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardCharts from '../components/dashboard/DashboardCharts';
import { FiPackage, FiTrendingUp, FiShoppingCart, FiCreditCard } from 'react-icons/fi';
import useDashboardData from '../hooks/dashboard/useDashboard';
import PaymentMethodModal from '../components/billing/PaymentMethodModal';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentModalMode, setPaymentModalMode] = useState('add');
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  // Mock payment methods data - replace with actual data from your backend
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      cardNumber: '4242 4242 4242 4242',
      cardholderName: 'John Doe',
      expiryDate: '12/24',
      type: 'visa'
    },
    {
      id: 2,
      cardNumber: '8888 8888 8888 8888',
      cardholderName: 'Jane Smith',
      expiryDate: '09/25',
      type: 'mastercard'
    }
  ]);

  const handleAddPaymentMethod = () => {
    navigate('/add-payment-method', { state: { mode: 'add' } });
  };

  const handleUpdatePaymentMethod = (card) => {
    navigate('/add-payment-method', { state: { mode: 'update', card } });
  };

  const handleRemovePaymentMethod = (cardId) => {
    // TODO: Implement actual removal with backend
    setPaymentMethods(prev => prev.filter(card => card.id !== cardId));
  };

  const handlePaymentMethodSubmit = (formData) => {
    if (paymentModalMode === 'add') {
      // TODO: Implement actual addition with backend
      const newCard = {
        id: Date.now(),
        ...formData,
        type: formData.cardNumber.startsWith('4') ? 'visa' : 'mastercard'
      };
      setPaymentMethods(prev => [...prev, newCard]);
    } else {
      // TODO: Implement actual update with backend
      setPaymentMethods(prev =>
        prev.map(card =>
          card.id === selectedCard.id
            ? { ...card, ...formData, type: formData.cardNumber.startsWith('4') ? 'visa' : 'mastercard' }
            : card
        )
      );
    }
    setIsPaymentModalOpen(false);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: null },
    { id: 'products', label: 'Products', className:"", icon: <FiPackage className="w-5 h-5 cursor-pointer" /> },
    { id: 'stock', label: 'Stock', icon: <FiShoppingCart className="w-5 h-5" /> },
    { id: 'sales', label: 'Sales', icon: <FiTrendingUp className="w-5 h-5" /> },
    { id: 'billing', label: 'Billing', icon: <FiCreditCard className="w-5 h-5" /> },
  ];

  const {data} = useDashboardData()
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">$128,000</p>
                <p className="mt-1 text-xs text-green-600">↑ 12% from last month</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">1,280</p>
                <p className="mt-1 text-xs text-green-600">↑ 8% from last month</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">450</p>
                <p className="mt-1 text-xs text-gray-600">No change</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Customers</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">850</p>
                <p className="mt-1 text-xs text-green-600">↑ 15% from last month</p>
              </div>
            </div>

            {/* Charts */}
            <DashboardCharts />

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">#ORD-001</td>
                      <td className="px-4 py-2 text-sm text-gray-900">John Doe</td>
                      <td className="px-4 py-2 text-sm text-gray-900">2024-03-15</td>
                      <td className="px-4 py-2 text-sm text-gray-900">$120.00</td>
                      <td className="px-4 py-2 text-sm">
                        <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">#ORD-002</td>
                      <td className="px-4 py-2 text-sm text-gray-900">Jane Smith</td>
                      <td className="px-4 py-2 text-sm text-gray-900">2024-03-14</td>
                      <td className="px-4 py-2 text-sm text-gray-900">$85.50</td>
                      <td className="px-4 py-2 text-sm">
                        <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">Processing</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">#ORD-003</td>
                      <td className="px-4 py-2 text-sm text-gray-900">Mike Johnson</td>
                      <td className="px-4 py-2 text-sm text-gray-900">2024-03-14</td>
                      <td className="px-4 py-2 text-sm text-gray-900">$210.00</td>
                      <td className="px-4 py-2 text-sm">
                        <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">Shipped</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case 'products':
        return (
          <div className="bg-white rounded-lg shadow-sm p-4 cursor-pointer">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Products Management</h3>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">
                Add New Product
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">Sample Product 1</td>
                    <td className="px-4 py-2 text-sm text-gray-900">Electronics</td>
                    <td className="px-4 py-2 text-sm text-gray-900">$99.99</td>
                    <td className="px-4 py-2 text-sm text-gray-900">50</td>
                    <td className="px-4 py-2 text-sm">
                      <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'stock':
        return (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Stock Management</h3>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">
                Update Stock
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Low Stock Alert</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">Sample Product 1</td>
                    <td className="px-4 py-2 text-sm text-gray-900">50</td>
                    <td className="px-4 py-2 text-sm text-gray-900">10</td>
                    <td className="px-4 py-2 text-sm text-gray-900">2024-03-15</td>
                    <td className="px-4 py-2 text-sm">
                      <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">In Stock</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'sales':
        return (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
              <div className="flex gap-2">
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">
                  Export Report
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">Total Revenue</h4>
                <p className="mt-1 text-2xl font-semibold text-gray-900">$45,231.89</p>
                <p className="mt-1 text-xs text-green-600">↑ 20.1% from last period</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">Average Order Value</h4>
                <p className="mt-1 text-2xl font-semibold text-gray-900">$89.50</p>
                <p className="mt-1 text-xs text-green-600">↑ 4.3% from last period</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Order</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">2024-03-15</td>
                    <td className="px-4 py-2 text-sm text-gray-900">45</td>
                    <td className="px-4 py-2 text-sm text-gray-900">$4,027.50</td>
                    <td className="px-4 py-2 text-sm text-gray-900">$89.50</td>
                    <td className="px-4 py-2 text-sm text-green-600">+12.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Subscription Management</h3>
            </div>
            
            {/* Current Plan */}
            <div className="mb-8">
              <h4 className="text-sm font-medium text-gray-500 mb-4">Current Plan</h4>
              <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="text-lg font-semibold text-indigo-900">Basic Plan</h5>
                    <p className="text-sm text-indigo-700 mt-1">$29/month</p>
                    <p className="text-sm text-gray-600 mt-2">Includes basic features for small businesses</p>
                  </div>
                  <span className="px-3 py-1 text-sm font-medium text-indigo-800 bg-indigo-100 rounded-full">
                    Active
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Next billing date: April 15, 2024</p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <h4 className="text-sm font-medium text-gray-500 mb-4">Payment Methods</h4>
              <div className="bg-white rounded-lg border p-6">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-lg font-medium text-gray-900">Saved Payment Methods</h5>
                  <button 
                    className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 flex items-center gap-2"
                    onClick={handleAddPaymentMethod}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Payment Method
                  </button>
                </div>

                {/* Saved Payment Methods List */}
                <div className="space-y-4">
                  {paymentMethods.map((card) => (
                    <div key={card.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {card.type === 'visa' ? 'Visa' : 'Mastercard'} ending in {card.cardNumber.slice(-4)}
                          </p>
                          <p className="text-sm text-gray-500">Expires {card.expiryDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                          onClick={() => handleUpdatePaymentMethod(card)}
                        >
                          Update
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                          onClick={() => handleRemovePaymentMethod(card.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Method Modal */}
            <PaymentMethodModal
              isOpen={isPaymentModalOpen}
              onClose={() => setIsPaymentModalOpen(false)}
              mode={paymentModalMode}
              existingCard={selectedCard}
              onSubmit={handlePaymentMethodSubmit}
            />

            {/* Subscription Management */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg border p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Manage Subscription</h4>
                
                {/* Upgrade Option */}
                <div className="mb-6 pb-6 border-b">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Upgrade Plan</h5>
                  <p className="text-sm text-gray-600 mb-4">Get access to more features and better support</p>
                  <div className="flex items-center gap-4">
                    <select className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option value="pro">Pro Plan - $79/month</option>
                      <option value="enterprise">Enterprise Plan - $199/month</option>
                    </select>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">
                      Upgrade Now
                    </button>
                  </div>
                </div>

                {/* Downgrade Option */}
                <div className="mb-6 pb-6 border-b">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Downgrade Plan</h5>
                  <p className="text-sm text-gray-600 mb-4">Switch to a more basic plan</p>
                  <div className="flex items-center gap-4">
                    <select className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option value="free">Free Plan - $0/month</option>
                    </select>
                    <button className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md text-sm hover:bg-gray-200">
                      Downgrade
                    </button>
                  </div>
                </div>

                {/* Cancel Subscription */}
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Cancel Subscription</h5>
                  <p className="text-sm text-gray-600 mb-4">Your subscription will end at the end of the current billing period</p>
                  <button className="bg-red-50 text-red-600 px-4 py-2 rounded-md text-sm hover:bg-red-100">
                    Cancel Subscription
                  </button>
                </div>
              </div>

              {/* Payment History */}
              <div className="bg-white rounded-lg border p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Payment History</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900">Mar 15, 2024</td>
                        <td className="px-4 py-2 text-sm text-gray-900">$29.00</td>
                        <td className="px-4 py-2 text-sm">
                          <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">Paid</span>
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <button className="text-indigo-600 hover:text-indigo-900">Download</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900">Feb 15, 2024</td>
                        <td className="px-4 py-2 text-sm text-gray-900">$29.00</td>
                        <td className="px-4 py-2 text-sm">
                          <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">Paid</span>
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <button className="text-indigo-600 hover:text-indigo-900">Download</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome to your MyDuka dashboard. Manage your store's products, stock, and sales.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm cursor-pointer
                  ${activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
