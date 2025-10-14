import React from 'react';
import StatsSection from './StatsSection';

const StockStats = ({ stockItems }) => {
  const totalItems = stockItems.reduce((sum, item) => sum + item.currentStock, 0);
  const lowStockItems = stockItems.filter(item => item.currentStock <= item.minStock).length;
  const uniqueSuppliers = new Set(stockItems.map(item => item.supplier)).size;

  const stats = [
    {
      label: 'Total Items in Stock',
      value: totalItems
    },
    {
      label: 'Low Stock Items',
      value: lowStockItems
    },
    {
      label: 'Active Suppliers',
      value: uniqueSuppliers
    }
  ];

  return <StatsSection stats={stats} color="blue" />;
};

export default StockStats; 