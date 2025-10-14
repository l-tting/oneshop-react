import { useState } from "react"
import { toast } from 'react-toastify';
import { post_products } from "../../services/productService";

const usePostProds = () => {
    const [productInfo, setProductInfo] = useState({
        name: '',
        buying_price: '',
        selling_price: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleProducts = async () => {
        if (!productInfo.name || !productInfo.buying_price || !productInfo.selling_price) {
            setError('All fields are required');
            toast.error('All fields are required');
            return false;
        }

        setLoading(true);
        setError('');

        try {
            // Make the API call immediately
            const response = await post_products(productInfo);
            console.log('Full API Response:', response);

            // Create new product object from the response
            const newProduct = {
                id: response.id || response.product?.id,
                name: productInfo.name,
                buying_price: productInfo.buying_price,
                selling_price: productInfo.selling_price,
            };

            console.log('New Product Object:', newProduct);

            // Add a small delay to show the spinner
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Trigger a custom event to notify the products table
            const event = new CustomEvent('productAdded', { detail: newProduct });
            window.dispatchEvent(event);

            // Also trigger a refresh event to ensure data consistency
            const refreshEvent = new CustomEvent('refreshProducts');
            window.dispatchEvent(refreshEvent);

            toast.success("Product Added Successfully");
            setProductInfo({ name: '', buying_price: '', selling_price: '' });
            return true;
        } catch (error) {
            console.error('Error adding product:', error);
            setError(error.message || 'Error posting products');
            toast.error(error.message || 'Error posting products');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return { handleInputChange, handleProducts, productInfo, error, loading };
}

export default usePostProds;