import React, { useState, useEffect } from 'react';
import ProductsTable from '../components/products/ProductsTable';
import AddProductModal from '../components/products/AddProductModal';
import ProductStats from '../components/stats/ProductStats';
import useGetProds from '../hooks/products/useGetProds';
import usePostProds from '../hooks/products/useAddProds';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { productData, loading: productsLoading } = useGetProds();
  const { handleInputChange, handleProducts, productInfo, error, loading } = usePostProds();

  // Update products when productData changes
  useEffect(() => {
    if (productData) {
      setProducts(productData);
    }
  }, [productData]);

  // Listen for new product events
  useEffect(() => {
    const handleProductAdded = (event) => {
      const newProduct = event.detail;
      if (newProduct && newProduct.id) {
        setProducts(prevProducts => [...prevProducts, newProduct]);
      } else {
        // If the new product doesn't have an ID, trigger a refresh
        window.dispatchEvent(new CustomEvent('refreshProducts'));
      }
    };

    window.addEventListener('productAdded', handleProductAdded);

    return () => {
      window.removeEventListener('productAdded', handleProductAdded);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Products Management</h1>
              <p className="text-xl text-purple-100 max-w-3xl">
                Manage your product catalog with ease. Add new products, update inventory, 
                and track stock levels across all categories.
              </p>
            </div>
            <AddProductModal 
              productInfo={productInfo} 
              handleInputChange={handleInputChange}
              handleProducts={handleProducts}
              error={error}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <ProductStats products={products} />

      {/* Products Table */}
      <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Product Catalog</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              View and manage your complete product inventory
            </p>
          </div>
          <ProductsTable products={products} productData={products} />
        </div>
      </div>
    </div>
  );
};

export default Products; 