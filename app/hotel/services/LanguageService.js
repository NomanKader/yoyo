import HttpService from '../../common/service/HttpService';
import constants from "../config/constants";
import axios from 'axios';

const GetLanguageListAPI = async (setLanguages, setLoading) => {
  try {
    const response = await HttpService.get(
      '/language/getAllLanguages',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36',
          'Accept': 'application/json',
        },
      }
    );

    console.log('✅ Success:', response.data);
    setLanguages(response.data.data);
  } catch (error) {
    if (error.response) {
      console.error('❌ Server responded with:', error.response.status);
      console.log('📄 Response:', error.response.data);
    } else {
      console.error('❌ Network/Setup error:', error.message);
    }
  } finally {
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