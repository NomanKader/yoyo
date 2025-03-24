import configData from "../constants/configData";
import axios from "axios";

export const GetPropertyTypes = async () => {
    const apiUrl = configData.baseJsonUrl
    try {
      const res = await axios.get('https://828f-212-102-51-93.ngrok-free.app/api/PropertyType/property-types');  
      return {
        status: res.data.success,
        message: res.data.message,
        data:res.data.data
      };
    } catch (err) {
      console.error("Get Property Type Error:", err);
      return {
        status: err?.response?.data?.success || false,  
        message: err?.response?.data?.message || "An error occurred",
      };
    }
  };