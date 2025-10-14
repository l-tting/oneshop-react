import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { loginService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();   // login here should trigger fetchUser in context
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      // Step 1: Login → backend sets cookie
      await loginService(credentials);

      // Step 2: update auth context (which internally fetches user info)
      await login();

      toast.success("Login successful");
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage = error.response?.data?.detail || error.message || 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return {
    credentials,
    handleInputChange,
    error,
    loading,
    handleLogin,
    handleSubmit,
  };
};

export default useLogin;
