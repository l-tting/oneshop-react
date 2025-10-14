import React, { useEffect } from 'react';
import StockTable from '../components/stock/StockTable';
import AddStockModal from '../components/stock/AddStockModal';
import StockStats from '../components/stats/StockStats';
import useGetStock from '../hooks/stock/useGetStock';
import usePostStock from '../hooks/stock/usePostStock';
import { toast } from 'react-toastify';

const Stock = () => {
  const { stockData, loading, error, refetch } = useGetStock();
  const { handleInputChange, handleStock, stockInfo, error: postError, loading: postLoading } = usePostStock();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (postError) {
      toast.error(postError);
    }
  }, [postError]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Stock Management</h1>
              <p className="text-xl text-blue-100 max-w-3xl">
                Keep track of your inventory levels and manage stock efficiently. 
                Monitor low stock items and maintain optimal inventory levels.
              </p>
            </div>
            <AddStockModal 
              stockInfo={stockInfo}
              handleStock={handleStock}
              handleInputChange={handleInputChange}
              error={postError}
              loading={postLoading}
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <StockStats stockItems={stockData} />

      {/* Stock Table */}
      <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Current Inventory</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Monitor stock levels and manage inventory across all products
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <StockTable stockData={stockData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Stock; 