import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCharts = () => {
  // Sales Data for Line Chart
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales 2024',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Product Categories Data for Bar Chart
  const categoryData = {
    labels: ['Electronics', 'Clothing', 'Groceries', 'Home & Kitchen', 'Beauty'],
    datasets: [
      {
        label: 'Products Sold',
        data: [450, 320, 280, 190, 150],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  // Revenue Distribution Data for Doughnut Chart
  const revenueData = {
    labels: ['Online Sales', 'In-Store', 'Mobile App'],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Daily Sales Comparison Data
  const dailySalesData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'This Week',
        data: [8500, 9200, 7800, 8900, 12000, 15000, 11000],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
      {
        label: 'Last Week',
        data: [7200, 8500, 6900, 8200, 11000, 13500, 9800],
        backgroundColor: 'rgba(99, 102, 241, 0.4)',
      },
    ],
  };

  // Top Selling Products Data
  const topProductsData = {
    labels: ['Smartphone X', 'Laptop Pro', 'Wireless Earbuds', 'Smart Watch', 'Tablet Mini'],
    datasets: [
      {
        label: 'Units Sold',
        data: [320, 280, 250, 220, 180],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  // Customer Growth Data
  const customerGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Customers',
        data: [120, 150, 180, 220, 280, 320],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Returning Customers',
        data: [80, 100, 120, 150, 180, 220],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Sales Trend Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Sales Trend</h3>
        <div className="h-[300px]">
          <Line
            data={salesData}
            options={{
              ...chartOptions,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `$${value.toLocaleString()}`,
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Product Categories Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Products by Category</h3>
        <div className="h-[300px]">
          <Bar
            data={categoryData}
            options={{
              ...chartOptions,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>

      {/* Revenue Distribution Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Revenue Distribution</h3>
        <div className="h-[300px] max-w-[500px] mx-auto">
          <Doughnut
            data={revenueData}
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.label || '';
                      const value = context.raw || 0;
                      return `${label}: ${value}%`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Daily Sales Comparison Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Daily Sales Comparison</h3>
        <div className="h-[300px]">
          <Bar
            data={dailySalesData}
            options={{
              ...chartOptions,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `$${value.toLocaleString()}`,
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Top Selling Products Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Top Selling Products</h3>
        <div className="h-[300px]">
          <Bar
            data={topProductsData}
            options={{
              ...chartOptions,
              indexAxis: 'y',
              scales: {
                x: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>

      {/* Customer Growth Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4 lg:col-span-2">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Customer Growth</h3>
        <div className="h-[300px]">
          <Line
            data={customerGrowthData}
            options={{
              ...chartOptions,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts; 