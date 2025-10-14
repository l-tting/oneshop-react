import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

export const ProtectedRoute = () => {
    const token_url = import.meta.env.VITE_USER_TOKEN_URL
    const [auth, setAuth] = useState(null); 

  useEffect(() => {
    axios
      .get(token_url, { withCredentials: true }) 
      .then((res) => {
        setAuth(true);
      })
      .catch((err) => {
        setAuth(false);
      });
  }, []);

  if (auth === null) return <div>Loading...</div>;

  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};
