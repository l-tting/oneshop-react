import React, { useState } from 'react'
import { registerService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useRegister = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        full_name: "",
        email: "",
        password: "",
    })
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (companyId) => {
        if (!companyId) {
            setError('Company ID is required');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await registerService(credentials, companyId);
            setLoading(false);
            toast.success('Registration successful! Please sign in.');
            navigate('/signin');
            return response;
        } catch (error) {
            setLoading(false);
            const errorMessage = error.response?.data?.detail || error.message || 'Registration failed';
            setError(errorMessage);
            toast.error(errorMessage);
            throw error;
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value
        }));
    };

    return { credentials, handleInputChange, handleRegister, error, loading }
}

export default useRegister
