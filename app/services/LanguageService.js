import axios from "axios";
import constants from "../config/constants";
const GetLanguageListAPI = async (setLanguages,setLoading) => {
    try {
      const response = await axios.get(constants.languageListApiUrl);
      setLanguages(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching languages:', error);
      setLoading(false);
    }
  };
  export {GetLanguageListAPI};