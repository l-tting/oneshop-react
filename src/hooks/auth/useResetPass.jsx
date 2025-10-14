import { useState } from "react"
import { resetPassService } from "../../services/authService"
import { toast } from 'react-toastify';

const useResetPass = () =>{
    const [resetInfo,setResetinfo] = useState({
        current_password:'',
        new_password:'',
        confirm_password:''
    })
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')

    const handlePassReset = async () =>{
        try{
            const response = await resetPassService(resetInfo)
            setResetinfo({
                current_password:'',
                new_password:'',
                confirm_password:''  
            });
            setError('');
            setLoading(false);
            toast.success("Password reset successful")
            
            console.log("res",response)
            return response;
        }catch(error){
            console.error("Password reset failed:", error);
            const errorMessage = error.response?.data?.detail || error.message || 'Password reset failed';
            setError(errorMessage);
            toast.error(errorMessage);

        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //spread prev state and override the property whose key is name with new value
        setResetinfo((prevCredentials) => ({
          ...prevCredentials,
          [name]: value
        }));
    };
    return {resetInfo,handlePassReset,handleInputChange,loading,error}

}
export default useResetPass