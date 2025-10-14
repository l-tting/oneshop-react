import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_DASHBOARD_URL

// configured axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});

export const dashboardService = {
  async fetchDashboardData() {
    try {
      const [quickStatsRes, stockProductRes, profitProductRes, profitTimeRes] = await Promise.all([
        axiosInstance.get('/quick_stats'),
        axiosInstance.get('/stock_product'),
        axiosInstance.get('/profit_product'),
        axiosInstance.get('/profit_time'),
      ]);

      return {
        quickStats: quickStatsRes.data,
        stockProduct: stockProductRes.data,
        profitProduct: profitProductRes.data,
        profitTime: profitTimeRes.data,
      };
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      throw error;
    }
  },
};

