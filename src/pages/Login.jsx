import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const loginHook = useLogin()
  return (
    <div className="min-h-screen bg-gray-50">
      <LoginForm  {...loginHook}/>
    </div>
  );
};

export default Login; 