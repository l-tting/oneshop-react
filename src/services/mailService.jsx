import axios from "axios"

const mail_url = import.meta.env.VITE_MAIL_URL 

export const mail_service = async (mailData) =>{
    try{
        const response = await axios.post(mail_url,mailData,{
            withCredentials:true
        })
        return response.data
    }
    catch(error){
        console.log(error)
        throw error
    }
}
  