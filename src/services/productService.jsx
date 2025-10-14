import axios from "axios"

const product_url = import.meta.env.VITE_PRODUCT_URL

export const  fetch_products = async  ()=>{
    try{
        const response = await axios.get(product_url,{
            withCredentials:true
        })
        return response.data.products
    }
    catch(error){
        console.log(error)
        throw error
    }
}

export const post_products = async (productInfo) =>{
    try{
        const response = await axios.post(product_url,productInfo,{
            withCredentials:true
        })
        return response.data

    }catch(error){
        console.log(error)
        throw error

    }
}
