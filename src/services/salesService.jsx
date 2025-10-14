import axios from "axios";

const sales_url = import.meta.env.VITE_SALES_URL

export const fetch_sales = async () =>{
    try{
        const response = await axios.get(sales_url,{
            withCredentials:true
        })
        return response.data.sales_data
    }catch(error){
        console.log(error)
        throw error
    }
   
}
