import { useEffect, useState } from "react";
import { fetch_sales } from "../../services/salesService";

const useGetSales = () => {
    const [salesData,setSalesData] = useState()
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const loadSales = async () =>{
            try{
                const response = await fetch_sales()
                setSalesData(response)
                console.log(response)
            }catch(error){
                console.log(error)
                throw error
            }finally{
                setLoading(false)
            }
        }
        loadSales()
    },[])
    return {salesData,loading}
}

export default useGetSales

