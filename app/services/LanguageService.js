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

const TranslateAPI=async(language)=>{
  try{
     console.log(constants.translateUrl+language+'/hotel_admin.json');
     const response=await axios.get(constants.translateUrl+language+'/hotel_admin.json')
     console.log("Translate Data",response.data);
      return response.data;
  }
  catch(error){
    console.error("Tranlate Error",error);
  }
}

  export {GetLanguageListAPI,TranslateAPI};