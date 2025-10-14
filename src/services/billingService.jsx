import axios from "axios";

const billing_url = import.meta.env.VITE_BILLING_URL
export const billingService = async (billingData) =>{
    try{

        const response = await axios.post(billing_url,billingData,{
            withCredentials:true
        })
        return response.data
    }catch(error){
        console.log(error)
        throw error
    }
}