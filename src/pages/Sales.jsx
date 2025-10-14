import React, { useState } from 'react';
import SalesTable from '../components/sales/SalesTable';
import AddSaleModal from '../components/sales/AddSaleModal';
import SalesStats from '../components/stats/SalesStats';
import useGetSales from '../hooks/sales/useGetSales';

const Sales = () => {
  const [sales, setSales] = useState([
    { id: 1, product: 'Laptop', quantity: 2, total: 1999.98, date: '2024-03-15', customer: 'John Doe' },
    { id: 2, product: 'Smartphone', quantity: 1, total: 699.99, date: '2024-03-14', customer: 'Jane Smith' },
    { id: 3, product: 'Headphones', quantity: 3, total: 599.97, date: '2024-03-13', customer: 'Mike Johnson' },
  ]);
  const {salesData} = useGetSales()

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Sales Management</h1>
              <p className="text-xl text-green-100 max-w-3xl">
                Monitor your business performance with real-time sales tracking. 
                Record transactions, analyze trends, and manage customer relationships.
              </p>
            </div>
            <AddSaleModal sales={sales} setSales={setSales} />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <SalesStats sales={sales} />

      {/* Sales Table */}
      <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Sales History</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              View and manage your complete sales records
            </p>
          </div>
          <SalesTable sales={salesData} />
        </div>
      </div>
    </div>
  );
};

export default Sales; 