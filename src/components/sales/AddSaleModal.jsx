import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import SaleCart from './SaleCart';
import { fetch_products } from '../../services/productService';

const AddSaleModal = ({ sales, setSales }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [customer, setCustomer] = useState('');
  const [date] = useState(new Date().toISOString().split('T')[0]);

  // Fetch products for the dropdown
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productData = await fetch_products();
        // Transform product data for react-select
        const formattedProducts = productData.map(product => ({
          value: product.id,
          label: `${product.name} (Ksh.${product.selling_price})`,
          ...product
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const existingItem = cartItems.find(item => item.id === selectedProduct.value);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === selectedProduct.value
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: selectedProduct.value,
        name: selectedProduct.name,
        price: selectedProduct.selling_price,
        quantity: 1
      }]);
    }
    setSelectedProduct(null);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0 || !customer) return;

    const newSales = cartItems.map(item => ({
      id: sales.length + 1,
      product: item.name,
      quantity: item.quantity,
      total: item.price * item.quantity,
      date,
      customer
    }));

    setSales([...sales, ...newSales]);
    setCartItems([]);
    setCustomer('');
    setIsOpen(false);
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: '42px',
      border: '1px solid #e2e8f0',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #cbd5e0'
      }
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#e2e8f0' : 'white',
      color: '#1a202c',
      '&:active': {
        backgroundColor: '#cbd5e0'
      }
    })
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
       New Sale
      </button>

      {isOpen && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">New Sale</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left side - Product Selection */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Select Product
                  </label>
                  <Select
                    value={selectedProduct}
                    onChange={setSelectedProduct}
                    options={products}
                    placeholder="Search for a product..."
                    isClearable
                    isSearchable
                    styles={customStyles}
                    className="text-base"
                    classNamePrefix="select"
                    noOptionsMessage={() => "No products found"}
                  />
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!selectedProduct}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customer">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    id="customer"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    required
                    placeholder="Enter customer name"
                  />
                </div>
              </div>

              {/* Right side - Cart */}
              <div>
                <SaleCart
                  cartItems={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onClearCart={handleClearCart}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={cartItems.length === 0 || !customer}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Sale
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddSaleModal; 