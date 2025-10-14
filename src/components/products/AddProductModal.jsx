import React, { useState } from 'react';

const AddProductModal = ({ productInfo, handleInputChange, handleProducts, error, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleProducts();

    if (success) {
      setIsOpen(false); // Close modal only if posting is successful
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Add New Product
      </button>

      {isOpen && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Product</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={productInfo.name}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="buying_price">
                  Buying Price (Ksh)
                </label>
                <input
                  type="number"
                  id="buying_price"
                  name="buying_price"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={productInfo.buying_price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selling_price">
                  Selling Price (Ksh)
                </label>
                <input
                  type="number"
                  id="selling_price"
                  name="selling_price"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={productInfo.selling_price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  disabled={loading}
                />
              </div>
              {error && (
                <div className="col-span-2 text-red-500 text-sm mt-2">
                  {error}
                </div>
              )}
              <div className="col-span-2 flex justify-end space-x-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors min-w-[100px] flex items-center justify-center"
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
                    'Add Product'
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

export default AddProductModal; 