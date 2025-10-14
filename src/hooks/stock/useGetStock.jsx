import { useState, useEffect, useCallback } from "react"
import { get_stock } from "../../services/stockService"

const useGetStock = () => {
    const [stockData, setStockData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadStock = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await get_stock()
            console.log('Fetched stock data:', data)
            setStockData(data)
        } catch (error) {
            console.error('Error fetching stock:', error)
            setError(error.message || 'Error fetching stock data')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadStock()

        // Listen for stock updates
        const handleStockAdded = (event) => {
            console.log('Stock added event received:', event.detail)
            const newStock = event.detail
            setStockData(prevData => {
                // Check if the stock item already exists
                const exists = prevData.some(item => item.id === newStock.id)
                if (exists) {
                    // Update existing item
                    return prevData.map(item => 
                        item.id === newStock.id ? { ...item, ...newStock } : item
                    )
                } else {
                    // Add new item
                    return [...prevData, newStock]
                }
            })
        }

        const handleRefreshStock = () => {
            console.log('Refresh stock event received')
            loadStock()
        }

        window.addEventListener('stockAdded', handleStockAdded)
        window.addEventListener('refreshStock', handleRefreshStock)

        return () => {
            window.removeEventListener('stockAdded', handleStockAdded)
            window.removeEventListener('refreshStock', handleRefreshStock)
        }
    }, [loadStock])

    return { stockData, loading, error, refetch: loadStock }
}

export default useGetStock

