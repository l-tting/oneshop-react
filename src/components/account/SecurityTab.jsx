import React from 'react';
import { Link } from 'react-router-dom';

const SecurityTab = ( {resetInfo,handlePassReset,handleInputChange,loading,error}) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    handlePassReset()
  };
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10"
            name='current_password'
            onChange={handleInputChange}
            value={resetInfo.current_password}
          />
          <div className="mt-1 text-right">
            <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
              Forgot Password?
            </Link>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10"
            name='new_password'
            onChange={handleInputChange}
            value={resetInfo.new_password}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10"
            name='confirm_password'
            onChange={handleInputChange}
            value={resetInfo.confirm_password}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecurityTab; 