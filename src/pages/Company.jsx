import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CompanyForm from '../components/auth/CompanyForm';
import CompanyPayment from '../components/auth/CompanyPayment';
import useCompany from '../hooks/company/useCompany';
import useBilling from '../hooks/billing/useBilling';

const Company = () => {
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get('plan') || 'basic';
  const [showPayment, setShowPayment] = useState(false);

  const {companyData, handleCompany, handleInputChange, loading, error } = useCompany();
  const {billingData,handlePayment,handleBillInputChange} = useBilling()

  const handlePaymentComplete = async (paymentData) => {
    try {
      // Create company with payment data
      await handleCompany(selectedPlan, paymentData);
    } catch (error) {
      console.error('Registration failed after payment:', error);
    }
  };

  // Show payment form if it's a paid plan
  if (showPayment && (selectedPlan === 'pro' || selectedPlan === 'business')) {
    return (
      <CompanyPayment
        companyData={companyData}
        onPaymentComplete={handlePaymentComplete}
        onBack={() => setShowPayment(false)}
        billingData={billingData}
        handlePayment={handlePayment}
        handleBillInputChange={handleBillInputChange}
      />
    );
  }

  // Show original company registration form
  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyForm 
        companyData={companyData}
        handleCompany={(plan) => {
          if (plan === 'pro' || plan === 'business') {
            setShowPayment(true);
          } else {
            handleCompany(plan);
          }
        }}
        handleInputChange={handleInputChange}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Company; 