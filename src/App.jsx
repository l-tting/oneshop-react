import React from 'react'
import Layout from './components/Layout'
import { ProtectedRoute } from '../utils/Protected'
import LandingPage from './pages/Home'
import Products from './pages/Products'
import Sales from './pages/Sales'
import Stock from './pages/Stock'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Support from './pages/Support'
import Company from './pages/Company'
import Account from './pages/Account'
import Settings from './pages/Settings'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import AddPaymentMethod from './pages/AddPaymentMethod'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path='/products' element={<Products/>}/>
          <Route path='/sales' element={<Sales/>}/>
          <Route path='/stock' element={<Stock/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/support' element={<Support/>}/>
          <Route path='/account' element={<Account/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/add-payment-method' element={<AddPaymentMethod/>}/>
        </Route>
        <Route path='/signin' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/company/register' element={<Company/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>
      <ToastContainer />
    </Layout>
  )
}

export default App