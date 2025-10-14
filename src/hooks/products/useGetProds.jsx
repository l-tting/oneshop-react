import { useEffect, useState, useCallback } from "react"
import { fetch_products } from "../../services/productService"
import { toast } from 'react-toastify';

const useGetProds = () => {
    const [productData, setProductData] = useState([])
    const [loading, setLoading] = useState(true)

    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            const product_data = await fetch_products()
            setProductData(product_data)
            console.log('Fetched products:', product_data)
        } catch (error) {
            console.error('Error fetching products:', error)
            toast.error('Error fetching products')
            throw error
        } finally {
            setLoading(false)
        }
    }, [])

    // Handle initial load and refresh events
    useEffect(() => {
        // Initial load
        loadProducts()

        // Set up refresh event listener
        const handleRefresh = () => {
            loadProducts()
        }

        window.addEventListener('refreshProducts', handleRefresh)

        return () => {
            window.removeEventListener('refreshProducts', handleRefresh)
        }
    }, [loadProducts])

    return { productData, loading }
}

export default useGetProds
        
