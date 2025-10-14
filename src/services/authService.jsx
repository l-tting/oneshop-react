import axios from 'axios'

//login and register urls
const register_url = import.meta.env.VITE_REGISTER_URL
const login_url = import.meta.env.VITE_LOGIN_URL
// const company_url = import.meta.env.VITE_COMPANY_URL
const user_url = import.meta.env.VITE_USER_TOKEN_URL
const pass_reset = import.meta.env.VITE_RESETPASS_URL

// Configure axios defaults
axios.defaults.withCredentials = true;

//register service
export const registerService = async (credentials, companyID) => {
    try {
        const response = await axios.post(`${register_url}?company_id=${companyID}`, credentials, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        throw error;
    }
}

//login service
export const loginService = async (loginInfo) => {
    try {
      const response = await axios.post(login_url, loginInfo, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(login_url)
      // Don't try to access the cookie — it's HttpOnly
      return response.data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }}



// Logout service
export const logoutService = async () => {
    try {
        const response = await axios.post(`${user_url}/logout`, {}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Logout error:", error.response?.data || error.message);
        throw error;
    }
};

//company service
const company_url = import.meta.env.VITE_COMPANY_URL
export const companyService = async (companyInfo,plan) => {
    try {
        const urlWithPlan = `${company_url}?plan=${encodeURIComponent(plan)}`;

        const response = await axios.post(urlWithPlan, companyInfo, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("compant",company_url)
        return response.data;
    } catch (error) {
        console.error("Company service error:", error.response?.data || error.message);
        throw error;
    }
}

// test_token example, call GET /users/token or whatever your route is
export const test_token = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_USER_TOKEN_URL, {
        withCredentials: true,
      });
      console.log("Token response:", response.data); // Should log { access_token: "..." }
      return response.data.access_token;  // return just the token string
    } catch (error) {
      console.log("Error fetching token:", error);
    }
  };
  
// Password reset services
export const requestResetCode = async (contactInfo, method) => {
  try {
    const response = await axios.post(`${user_url}/request-reset`, {
      contact_info: contactInfo,
      method: method
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Reset code request failed:", error.response?.data || error.message);
    throw error;
  }
};

export const verifyResetCode = async (resetCode, newPassword) => {
  try {
    const response = await axios.post(`${user_url}/verify-reset`, {
      reset_code: resetCode,
      new_password: newPassword
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Password reset failed:", error.response?.data || error.message);
    throw error;
  }
};

export const resetPassService = async (resetInfo) =>{
    try{
        const response = await axios.post(pass_reset,resetInfo,{
            withCredentials:true
        })
        return response.data

    }catch(error){
        console.log(error)
        throw error
    }
}
  