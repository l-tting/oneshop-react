import React, { useState, useEffect } from 'react';
import { fetch_products } from "../../services/productService";
import Select from 'react-select';

const AddStockModal = ({ handleInputChange, handleStock, stockInfo, error, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products for the dropdown
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productData = await fetch_products();
        // Transform product data for react-select
        const formattedProducts = productData.map(product => ({
          value: product.id,
          label: `${product.name} (Ksh.${product.buying_price})`,
          ...product
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    loadProducts();
  }, []);

  const handleProductChange = (selectedOption) => {
    setSelectedProduct(selectedOption);
    // Update the stockInfo with the selected product ID
    handleInputChange({
      target: {
        name: 'product_id',
        value: selectedOption?.value || ''
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleStock();

    if (success) {
      setIsOpen(false);
      setSelectedProduct(null); // Reset the select
    }
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
        Add Stock
      </button>

      {isOpen && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add Stock</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
                disabled={loading}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product_id">
                  Select Product
                </label>
                <Select
                  id="product_id"
                  name="product_id"
                  value={selectedProduct}
                  onChange={handleProductChange}
                  options={products}
                  placeholder="Search for a product..."
                  isClearable
                  isSearchable
                  styles={customStyles}
                  isDisabled={loading}
                  className="text-base"
                  classNamePrefix="select"
                  noOptionsMessage={() => "No products found"}
                  loadingMessage={() => "Loading products..."}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock_count">
                  Quantity to Add
                </label>
                <input
                  type="number"
                  id="stock_count"
                  name="stock_count"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
                  value={stockInfo.stock_count}
                  onChange={handleInputChange}
                  required
                  min="1"
                  disabled={loading}
                  placeholder="Enter quantity"
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-2 bg-red-50 p-3 rounded">
                  {error}
                </div>
              )}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 transition-colors text-base font-medium"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors min-w-[120px] flex items-center justify-center text-base font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    'Add Stock'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStockModal; 