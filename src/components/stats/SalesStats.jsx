import React from 'react';
import StatsSection from './StatsSection';

const SalesStats = ({ sales }) => {
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalItems = sales.reduce((sum, sale) => sum + sale.quantity, 0);
  const averageOrderValue = totalRevenue / sales.length;

  const stats = [
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`
    },
    {
      label: 'Total Items Sold',
      value: totalItems
    },
    {
      label: 'Average Order Value',
      value: `$${averageOrderValue.toFixed(2)}`
    }
  ];

  return <StatsSection stats={stats} color="green" />;
};

export default SalesStats; 