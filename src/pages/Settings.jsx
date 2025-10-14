import React, { useState } from 'react';
import { FiShoppingBag, FiLayout, FiLink, FiGlobe } from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('store');

  const tabs = [
    { id: 'store', label: 'Store Settings', icon: <FiShoppingBag className="w-5 h-5" /> },
    { id: 'appearance', label: 'Appearance', icon: <FiLayout className="w-5 h-5" /> },
    { id: 'integrations', label: 'Integrations', icon: <FiLink className="w-5 h-5" /> },
    { id: 'localization', label: 'Localization', icon: <FiGlobe className="w-5 h-5" /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'store':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Settings</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Store Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Store Description</label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Store Address</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Business Hours</label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <input
                    type="time"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <input
                    type="time"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        );
      case 'appearance':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance Settings</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Theme</h4>
                <div className="grid grid-cols-3 gap-4">
                  <button className="p-4 border-2 border-indigo-500 rounded-lg bg-white">
                    <div className="w-full h-24 bg-gray-100 rounded mb-2"></div>
                    <p className="text-sm text-center">Light</p>
                  </button>
                  <button className="p-4 border-2 border-transparent rounded-lg bg-white hover:border-gray-300">
                    <div className="w-full h-24 bg-gray-800 rounded mb-2"></div>
                    <p className="text-sm text-center">Dark</p>
                  </button>
                  <button className="p-4 border-2 border-transparent rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 rounded mb-2"></button>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Primary Color</h4>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-indigo-500"></button>
                  <button className="w-8 h-8 rounded-full bg-blue-600 border-2 border-transparent hover:border-gray-300"></button>
                  <button className="w-8 h-8 rounded-full bg-green-600 border-2 border-transparent hover:border-gray-300"></button>
                  <button className="w-8 h-8 rounded-full bg-red-600 border-2 border-transparent hover:border-gray-300"></button>
                  <button className="w-8 h-8 rounded-full bg-yellow-600 border-2 border-transparent hover:border-gray-300"></button>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Font Size</h4>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'integrations':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrations</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiLink className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Payment Gateway</h4>
                    <p className="text-sm text-gray-500">Connect your payment processor</p>
                  </div>
                </div>
                <button className="text-sm text-indigo-600 hover:text-indigo-500">Connect</button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FiLink className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Shipping Provider</h4>
                    <p className="text-sm text-gray-500">Set up shipping integrations</p>
                  </div>
                </div>
                <button className="text-sm text-indigo-600 hover:text-indigo-500">Connect</button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <FiLink className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Analytics</h4>
                    <p className="text-sm text-gray-500">Connect analytics tools</p>
                  </div>
                </div>
                <button className="text-sm text-indigo-600 hover:text-indigo-500">Connect</button>
              </div>
            </div>
          </div>
        );
      case 'localization':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Localization Settings</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option>English</option>
                  <option>Swahili</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Currency</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option>KES (Kenyan Shilling)</option>
                  <option>USD (US Dollar)</option>
                  <option>EUR (Euro)</option>
                  <option>GBP (British Pound)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time Zone</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option>Africa/Nairobi (GMT+3)</option>
                  <option>UTC (GMT+0)</option>
                  <option>America/New_York (GMT-5)</option>
                  <option>Europe/London (GMT+0)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date Format</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
          <p className="mt-1 text-sm text-gray-600">
            Configure your store settings and preferences
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

export default Settings; 