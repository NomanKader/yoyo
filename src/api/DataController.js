import configData from '../constants/configData';
import axios from 'axios';

export const GetPropertyTypes = async () => {
  const apiUrl = configData.baseJsonUrl;
  try {
    const res = await axios.get(`${apiUrl}PropertyType/property-types`);
    return {
      status: res.data.success,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (err) {
    console.error('Get Property Type Error:', err);
    return {
      status: err?.response?.data?.success || false,
      message: err?.response?.data?.message || 'An error occurred',
    };
  }
};

export const GetExploreList = async () => {
  const apiUrl = configData.baseJsonUrl;
  try {
    const res = await axios.get(`${apiUrl}CityCountry/cities`);
    return {
      status: res.data.success,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (err) {
    console.error('Get Explore List Type Error:', err);
    return {
      status: err?.response?.data?.success || false,
      message: err?.response?.data?.message || 'An error occurred',
    };
  }
};

export const GetPropertyListByCityId = async cityId => {
  const apiUrl = configData.baseJsonUrl;
  try {
    const res = await axios.get(
      `${apiUrl}properties/properties-by-cities/${cityId}`,
    );
    return {
      status: res.data.success,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (err) {
    console.error('Get properties list by city id :', err);
    return {
      status: err?.response?.data?.success || false,
      message: err?.response?.data?.message || 'An error occurred',
    };
  }
};

export const AddToFavourite = async (type,postBody) => {
  const apiUrl = configData.baseJsonUrl;
  const toOrFrom = type === 'add' ? 'to' : 'from';
  try {
    const res = await axios.post(
      `${apiUrl}properties/${type}-${toOrFrom}-favorites`,
      postBody,
    );

    return {
      status: res.data.success,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (err) {
    console.error(`${type} to favourite error :`, err);
    return {
      status: err?.response?.data?.success || false,
      message: err?.response?.data?.message || 'An error occurred',
    };
  }
};
