import { useState } from "react"
import { billingService } from "../../services/billingService";
import { toast } from 'react-toastify';

const useBilling = () =>{
    const [billingData,setBillingData] = useState({
        phone_number:'',
        amount:'',
    })
    const [bill_loading, setLoading] = useState(false);
    const [bill_error, setError] = useState('');

    const handlePayment = async () =>{
        try{
            const response = await billingService(billingData)
            setBillingData({
                phone_number:'',
                amount:''
            });
            setError('');
            setLoading(false);
            toast.success("Payment Successful")
            // navigate(`/register?company_id=${response.company_id}`);
            console.log("res",response)
            return response;
        }catch(error){
            console.error("Payment failed:", error);
            const errorMessage = error.response?.data?.detail || error.message || 'Payment failed';
            setError(errorMessage);
            toast.error(errorMessage);

        }
    }
    const handleBillInputChange = (e) => {
        const { name, value } = e.target;
        //spread prev state and override the property whose key is name with new value
        setBillingData((prevCredentials) => ({
          ...prevCredentials,
          [name]: value
        }));
    };
     return {billingData,handlePayment,handleBillInputChange,bill_loading,bill_error}


}

export default useBilling