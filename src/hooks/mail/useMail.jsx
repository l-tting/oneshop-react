import { useState } from "react";
import { mail_service } from "../../services/mailService";
import { toast } from "react-hot-toast"; // or any toast lib

const useMail = () => {
  const [mailData, setMailData] = useState({
    sender_name: '',
    sender_email: '',
    sender_phone: '',
    body: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSuccessToast = () => toast.success("Mail sent successfully!");

  const handleMail = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // simulate delay
      const response = await mail_service(mailData);
      handleSuccessToast();
      setMailData({
        sender_name: '',
        sender_email: '',
        sender_phone: '',
        body: ''
      });
      setError('');
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Error sending mail');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return { handleMail, handleInputChange, mailData, loading, error };
};

export default useMail;
