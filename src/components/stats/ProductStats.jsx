import React from 'react';
import StatsSection from './StatsSection';

const ProductStats = ({ products }) => {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const categories = [...new Set(products.map(product => product.category))];

  const stats = [
    {
      label: 'Total Products',
      value: totalProducts
    },
    {
      label: 'Total Inventory Value',
      value: `$${totalValue.toFixed(2)}`
    },
    {
      label: 'Categories',
      value: categories.length
    }
  ];

  return <StatsSection stats={stats} color="purple" />;
};

export default ProductStats; 