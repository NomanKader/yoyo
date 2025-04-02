import { GetAPI, PostAPI } from './CommonController';

export const GetPropertyTypes = async () => {  
  const res = GetAPI('PropertyType/property-types');
  return res;
};

export const GetExploreList = async () => {
  const res = await GetAPI('CityCountry/cities')
  return res;
};

export const GetPropertyListByCityId = async cityId => {
  const res = await GetAPI('properties/properties-by-cities/'+cityId)
  return res;
};


