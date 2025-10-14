import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiLock, FiBell, FiCreditCard } from 'react-icons/fi';
import ProfileTab from '../components/account/ProfileTab';
import SecurityTab from '../components/account/SecurityTab';
import NotificationsTab from '../components/account/NotificationsTab';
import BillingTab from '../components/account/BillingTab';
import useResetPass from '../hooks/auth/useResetPass';
import useBilling from '../hooks/billing/useBilling';

const Account = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const {resetInfo,handlePassReset,handleInputChange,loading,error} = useResetPass()
  const {billingData,handlePayment,handleBillInputChange,bill_loading,bill_error} = useBilling()


  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FiUser className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <FiLock className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell className="w-5 h-5" /> },
    { id: 'billing', label: 'Billing', icon: <FiCreditCard className="w-5 h-5" /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'security':
        return <SecurityTab
          resetInfo={resetInfo}
          handleInputChange={handleInputChange}
          handlePassReset={handlePassReset}
          loading={loading}
          error={error}
        />;
      case 'notifications':
        return <NotificationsTab />;
      case 'billing':
        return <BillingTab
        billingData={billingData}
        handleBillInputChange={handleBillInputChange}
        handlePayment={handlePayment}
        loading={bill_loading}
        error={bill_error}
        
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your account settings and preferences
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

export default Account; 