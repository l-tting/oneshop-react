import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { currentUser, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Close mobile menu when auth state changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentUser]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const Logo = () => (
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: 'spin 3s linear infinite'
      }}
    >
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <path d="M16 2L4 8V24L16 30L28 24V8L16 2Z" stroke="#fff" strokeWidth="2" fill="none"/>
      <path d="M16 2V30" stroke="#fff" strokeWidth="2"/>
      <path d="M4 8L28 24" stroke="#fff" strokeWidth="2"/>
      <path d="M28 8L4 24" stroke="#fff" strokeWidth="2"/>
      <circle cx="16" cy="16" r="4" fill="#fff"/>
    </svg>
  );

  if (loading) {
    return (
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Logo />
                <span className="text-2xl font-bold text-white">OneShop</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo - Always on the left */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
              <span className="text-2xl font-bold text-white">OneShop</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-purple-700"
            >
              <span className="sr-only">Toggle Menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          {!currentUser ? (
            // Centered navigation for non-logged in users
            <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center space-x-12">
                <Link to="/" className="text-white hover:text-gray-200 text-md py-2">Home</Link>
                <Link to="/signin" className="text-white hover:text-gray-200 text-md py-2">Sign In</Link>
              </div>
            </div>
          ) : (
            // Centered navigation for logged in users
            <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-white hover:text-gray-200 py-2">Home</Link>
                <Link to="/products" className="text-white hover:text-gray-200 py-2">Products</Link>
                <Link to="/stock" className="text-white hover:text-gray-200 py-2">Stock</Link>
                <Link to="/sales" className="text-white hover:text-gray-200 py-2">Sales</Link>
                <Link to="/dashboard" className="text-white hover:text-gray-200 py-2 cursor-pointer">Dashboard</Link>
                <Link to="/support" className="text-white hover:text-gray-200 py-2">Support</Link>
              </div>
            </div>
          )}

          {/* User Menu - Only show when logged in */}
          {currentUser && (
            <div className="hidden md:flex items-center relative user-menu">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center text-white hover:text-gray-200 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <FiUser className="w-5 h-5" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[60]">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {/* User Info Section */}
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {currentUser?.name || currentUser?.email || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {currentUser?.email}
                      </p>
                    </div>
                    <Link
                      to="/account"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <FiUser className="w-4 h-4 mr-2" />
                      Manage Account
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <FiSettings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <FiLogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-purple-700 px-4 pt-2 pb-4 space-y-2">
          <Link to="/" className="block text-white">Home</Link>
          {currentUser && (
            <>
              <Link to="/products" className="block text-white">Products</Link>
              <Link to="/stock" className="block text-white">Stock</Link>
              <Link to="/sales" className="block text-white">Sales</Link>
              <Link to="/dashboard" className="block text-white">Dashboard</Link>
              <Link to="/support" className="block text-white">Support</Link>
              <Link to="/account" className="block text-white">Manage Account</Link>
              <Link to="/settings" className="block text-white">Settings</Link>
              <button onClick={handleLogout} className="block text-white text-left w-full">Logout</button>
            </>
          )}
          {!currentUser && (
            <Link to="/signin" className="block text-white">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
