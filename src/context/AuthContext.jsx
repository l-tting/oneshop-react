// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const logOut_url = import.meta.env.VITE_LOGOUT_URL
  const token_url = import.meta.env.VITE_USER_TOKEN_URL

  const fetchUser = async () => {
    try {
      const res = await axios.get(token_url, { withCredentials: true });
      setCurrentUser(res.data);
    } catch {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post(logOut_url, {}, { withCredentials: true });
      setCurrentUser(null);
      // Force a re-render by updating loading state
      setLoading(true);
      setTimeout(() => setLoading(false), 100);
    } catch (error) {
      console.error('Logout error:', error);
      // clear the user state even if request fails
      setCurrentUser(null);
    }
  };

  const login = async (userData) => {
    await fetchUser()
    // setCurrentUser(userData);
   
    // setLoading(true);
    // setTimeout(() => setLoading(false), 100);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
