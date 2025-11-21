import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { companyService } from '../../services/authService';
import { toast } from 'react-toastify';

const useCompany = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [companyData, setCompanyData] = useState({
    name: '',
    phone_number: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCompany = async (plan, paymentData = null) => {
    try {
      setLoading(true);
      setError('');

      // Debugging logs
      console.log("VITE_COMPANY_URL (from env):", import.meta.env.VITE_COMPANY_URL);
      console.log("All env variables:", import.meta.env);
      console.log("Company data being sent:", companyData);
      console.log("Plan passed to handleCompany:", plan);

      if (!plan) {
        console.warn("Warning: 'plan' is undefined or empty!");
      }

      // Call backend
      const response = await companyService(companyData, plan);

      console.log("Response from companyService:", response);

      if (!response?.company_id) {
        console.warn("Warning: company_id is missing in response!");
      }

      // Reset form
      setCompanyData({
        name: '',
        phone_number: '',
        email: ''
      });

      // Navigate safely
      const companyId = response?.company_id || 'unknown';
      navigate(`/register?company_id=${companyId}`);

      toast.success("Company Registered");
      return response;

    } catch (error) {
      console.error("Company registration failed:", error);
      const errorMessage = error.response?.data?.detail || error.message || 'Creating company failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    companyData,
    handleCompany,
    handleInputChange,
    loading,
    error
  };
};

export default useCompany;
