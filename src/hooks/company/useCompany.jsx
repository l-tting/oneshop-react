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

      // Create company with plan and payment info if available
      const response = await companyService(companyData, plan);
      
      // Reset form
      setCompanyData({
        name: '',
        phone_number: '',
        email: ''
      });

      toast.success("Company Registered");
      navigate(`/register?company_id=${response.company_id}`);
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