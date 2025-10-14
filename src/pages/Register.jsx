import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { useSearchParams } from 'react-router-dom';

const Register = () => {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get('company_id');

  return (
    <div className="min-h-screen bg-gray-50">
      <RegisterForm companyId={companyId} />
    </div>
  );
};

export default Register; 