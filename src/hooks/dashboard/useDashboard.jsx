import { useEffect, useState } from 'react';
import { dashboardService } from '../../services/dashboardService';

const useDashboardData = () => {
  const [data, setData] = useState({
    quickStats: null,
    stockProduct: null,
    profitProduct: null,
    profitTime: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const response = await dashboardService.fetchDashboardData();
        setData(response);
        console.log(response)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return { data, loading, error };
};

export default useDashboardData;
