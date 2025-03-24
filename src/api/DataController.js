import configData from "../constants/configData";

export const GetPropertyTypes = async () => {
    const apiUrl = configData.baseJsonUrl
    try {
      const res = await axios.get(`${apiUrl}PropertyType/property-types`);  
      return {
        status: res.data.success,
        message: res.data.message,
        data:res.data
      };
    } catch (err) {
      console.error("Get Property Type Error:", err?.response?.data);
      return {
        status: err?.response?.data?.success || false,  
        message: err?.response?.data?.message || "An error occurred",
      };
    }
  };