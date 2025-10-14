import axios from 'axios'

const stock_url = import.meta.env.VITE_STOCK_URL
export const get_stock =  async () =>{
    try{
        const response = await axios.get(stock_url,{
            withCredentials:true
        })
        console.log(response)
        return response.data.my_stock.stock_data
    }
    catch(error){
        console.log(error)
        throw error
    }
}


export const post_stock = async (stockInfo) => {
    try {
      const response = await axios.post(stock_url, stockInfo, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  