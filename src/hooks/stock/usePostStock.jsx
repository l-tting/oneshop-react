import { useState } from "react"
import { post_stock } from "../../services/stockService"
import { toast } from "react-toastify"

const usePostStock = () => {
    const [stockInfo, setStockInfo] = useState({
        product_id: "",
        stock_count: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleStock = async () => {
        if (!stockInfo.product_id || !stockInfo.stock_count) {
            setError('All fields are required');
            toast.error('All fields are required');
            return false;
        }

        setLoading(true);
        setError('');

        try {
            // Make the API call immediately
            const response = await post_stock(stockInfo);
            console.log('Full API Response:', response);

            // Create new stock object from the response
            const newStock = {
                id: response.id || response.stock?.id,
                product_id: stockInfo.product_id,
                stock_count: stockInfo.stock_count,
            };

            console.log('New Stock Object:', newStock);

            // Add a small delay to show the spinner
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Trigger a custom event to notify the stock table
            const event = new CustomEvent('stockAdded', { detail: newStock });
            window.dispatchEvent(event);

            // Also trigger a refresh event to ensure data consistency
            const refreshEvent = new CustomEvent('refreshStock');
            window.dispatchEvent(refreshEvent);

            toast.success("Stock Added Successfully");
            setStockInfo({ product_id: '', stock_count: '' });
            return true;
        } catch (error) {
            console.error('Error adding stock:', error);
            setError(error.message || 'Error posting stock');
            toast.error(error.message || 'Error posting stock');
            return false;
        } finally {
            setLoading(false);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStockInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return { handleInputChange, handleStock, stockInfo, error, loading };
}

export default usePostStock;