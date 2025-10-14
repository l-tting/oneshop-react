import React from 'react';

const StatsSection = ({ stats, color = 'purple' }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
              <dd className={`mt-1 text-3xl font-semibold text-${color}-600`}>
                {stat.value}
              </dd>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection; 