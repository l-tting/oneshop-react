import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const CompanyForm = ({companyData,handleCompany,handleInputChange,loading,error}) => {
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get('plan') || 'basic';
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting companyData:", companyData);
    handleCompany(selectedPlan)
  };

  

  return (
    <div className="max-w-md w-full mx-auto space-y-8 py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register Your Company
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Selected Plan: <span className="font-semibold capitalize">{selectedPlan}</span>
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              id="company_name"
              name="name"
              type="text"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your company name"
              value={companyData.name}
              onChange={handleInputChange}
            />
          </div>
          
          {/* <div>
            <label htmlFor="business_type" className="block text-sm font-medium text-gray-700">Business Type</label>
            <select
              id="business_type"
              name="business_type"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={formData.business_type}
              onChange={handleInputChange}
            >
              <option value="">Select business type</option>
              <option value="retail">Retail</option>
              <option value="wholesale">Wholesale</option>
              <option value="restaurant">Restaurant</option>
              <option value="service">Service</option>
              <option value="other">Other</option>
            </select>
          </div> */}

          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="phone_number"
              name="phone_number"
              type="tel"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter phone number"
              value={companyData.phone_number}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter email address"
              value={companyData.email}
              onChange={handleInputChange}
            />
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            

            
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
         Create Company
          </button>
        </div>

        <div className="text-sm text-center">
          <p className="text-gray-600">
            By registering, you agree to our{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm; 