import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [billing, setBilling] = useState('monthly');

  const scrollToPricing = (e) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    pricingSection.scrollIntoView({ behavior: 'smooth' });
  };

  // Pricing logic
  const proPrice = billing === 'yearly' ? 12.8 : 16;
  const businessPrice = billing === 'yearly' ? 25.6 : 32;
  const proPriceStr = billing === 'yearly' ? `$${proPrice.toFixed(2)}` : `$${proPrice}`;
  const businessPriceStr = billing === 'yearly' ? `$${businessPrice.toFixed(2)}` : `$${businessPrice}`;
  const proSub = billing === 'yearly' ? '/month (billed yearly)' : '/month';
  const businessSub = billing === 'yearly' ? '/user/month (billed yearly)' : '/user/month';

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <header className="relative bg-white shadow-sm">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Modern POS System Interface"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-indigo-900/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Modern POS System
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Streamline your business operations with our powerful point-of-sale solution
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <a 
                  href="#pricing" 
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-indigo-900 bg-white hover:bg-gray-50 transition-all duration-300 group"
                >
                  Get Started
                  <svg 
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-200 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="relative">
                <div className="h-full p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Inventory Management</h3>
                  <p className="text-gray-500">Track stock levels, manage suppliers, and automate reordering with smart inventory alerts and low stock notifications.</p>
                </div>
              </div>

              <div className="relative">
                <div className="h-full p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Sales Analytics</h3>
                  <p className="text-gray-500">Real-time insights and detailed reporting for better decision making with customizable dashboards and trend analysis.</p>
                </div>
              </div>

              <div className="relative">
                <div className="h-full p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Management</h3>
                  <p className="text-gray-500">Build customer loyalty with integrated CRM and loyalty programs, personalized marketing, and customer behavior tracking.</p>
                </div>
              </div>

              <div className="relative">
                <div className="h-full p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Processing</h3>
                  <p className="text-gray-500">Seamless payment processing with support for multiple payment methods, split payments, and automated reconciliation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            {/* Billing Toggle */}
            <div className="flex items-center justify-center mt-4">
              <div className="inline-flex border border-gray-300 rounded-full overflow-hidden">
                <button
                  className={`px-4 py-1.5 text-sm cursor-pointer font-medium transition-colors 
                    ${billing === 'monthly' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'} 
                    rounded-l-full`}
                  onClick={() => setBilling('monthly')}
                  style={{ borderRight: '1px solid #e5e7eb' }}
                >
                  Monthly
                </button>
                <button
                  className={`px-4 py-1.5 text-sm cursor-pointer font-medium transition-colors flex items-center
                    ${billing === 'yearly' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'} 
                    rounded-r-full`}
                  onClick={() => setBilling('yearly')}
                >
                  Yearly
                  <span className="ml-2 px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-semibold">Save 20%</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Hobby (Free) Plan */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col">
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic</h3>
                <div className="text-5xl font-extrabold text-gray-900 mb-1">Free</div>
                <div className="text-gray-500 mb-6">&nbsp;</div>
                <hr className="my-4 border-gray-200" />
                <div className="mb-2 font-bold text-gray-900 text-base">Includes</div>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center text-gray-700 text-sm"><span className="text-green-600 mr-2">✓</span>Pro two-week trial</li>
                  <li className="flex items-center text-gray-700 text-sm"><span className="text-green-600 mr-2">✓</span>Up to 5 products max</li>
                  <li className="flex items-center text-gray-700 text-sm"><span className="text-green-600 mr-2">✓</span>100 sales/month</li>
                  <li className="flex items-center text-gray-700 text-sm"><span className="text-green-600 mr-2">✓</span>Basic sales & inventory reports</li>
                  <li className="flex items-center text-gray-700 text-sm"><span className="text-green-600 mr-2">✓</span>Community support</li>
                </ul>
                <Link
                  to="/company/register?plan=basic"
                  className="mt-auto block w-full text-center px-4 py-2 rounded-lg bg-black text-white font-semibold text-sm hover:bg-gray-800 transition"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col" style={{background: 'linear-gradient(135deg, #fdf6ff 0%, #f3f4f6 100%)'}}>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro</h3>
                <div className="text-5xl font-extrabold text-gray-900 mb-1">{proPriceStr}</div>
                <div className="text-gray-500 mb-6">{proSub}</div>
                <hr className="my-4 border-gray-200" />
                <div className="mb-2 font-bold text-gray-900 text-base">Everything in Hobby, plus</div>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center text-gray-700 text-sm"><span className="text-green-600 mr-2">✓</span>Unlimited products & sales</li>
                  <li className="flex items-center text-gray-700 text-sm"><span className="text-green-600 mr-2">✓</span>Advanced inventory management</li>
                  <li className="flex items-center text-gray-700 text-sm"><span className="text-green-600 mr-2">✓</span>Real-time analytics & dashboards</li>
                  <li className="flex items-center text-gray-700 text-sm"><span className="text-green-600 mr-2">✓</span>Multi-user access</li>
                  <li className="flex items-center text-gray-700 text-sm"><span className="text-green-600 mr-2">✓</span>Priority email support</li>
                </ul>
                <Link 
                  to="/company/register?plan=pro" 
                  className="mt-auto block w-full text-center px-4 py-2 rounded-lg bg-black text-white font-semibold text-sm hover:bg-gray-800 transition"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Business Plan */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col">
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Business</h3>
                <div className="text-5xl font-extrabold text-gray-900 mb-1">{businessPriceStr}</div>
                <div className="text-gray-500 mb-6">{businessSub}</div>
                <hr className="my-4 border-gray-200" />
                <div className="mb-2 font-bold text-gray-900 text-base">Everything in Pro, plus</div>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center text-gray-700 text-sm"><span className="text-green-600 mr-2">✓</span>Team & permissions management</li>
                  <li className="flex items-center text-gray-700 text-sm"><span className="text-green-600 mr-2">✓</span>Chain/multi-store support</li>
                  <li className="flex items-center text-gray-700 text-sm"><span className="text-green-600 mr-2">✓</span>Integrations (accounting, e-commerce)</li>
                  <li className="flex items-center text-gray-700 text-sm"><span className="text-green-600 mr-2">✓</span>Dedicated account manager</li>
                  <li className="flex items-center text-gray-700 text-sm"><span className="text-green-600 mr-2">✓</span>Premium support</li>
                </ul>
                <Link 
                  to="/company/register?plan=business" 
                  className="mt-auto block w-full text-center px-4 py-2 rounded-lg bg-black text-white font-semibold text-sm hover:bg-gray-800 transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Trusted by Industry Leaders
          </h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="flex justify-center items-center h-24">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Naivas_Logo.svg/2560px-Naivas_Logo.svg.png"
                alt="Naivas Supermarket"
                className="h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex justify-center items-center h-24">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Carrefour_logo.svg/2560px-Carrefour_logo.svg.png"
                alt="Carrefour Supermarket"
                className="h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex justify-center items-center h-24">
              <img
                src="https://quickmart.co.ke/wp-content/uploads/2023/03/Quickmart-Logo.png"
                alt="Quickmart Supermarket"
                className="h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex justify-center items-center h-24">
              <img
                src="https://foodplus.co.ke/wp-content/uploads/2023/03/foodplus-logo.png"
                alt="FoodPlus Supermarket"
                className="h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default LandingPage; 