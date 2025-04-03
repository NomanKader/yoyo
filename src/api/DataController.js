import {GetAPI, PostAPI} from './CommonController';

export const GetPropertyTypes = async () => {
  const res = GetAPI('PropertyType/property-types');
  return res;
};

export const GetExploreList = async () => {
  const res = await GetAPI('CityCountry/cities');
  return res;
};

export const GetPropertyListByCityId = async cityId => {
  const res = await GetAPI('properties/properties-by-cities/' + cityId);
  return res;
};

export const GetRecentProperties = async () => {
  const res = await GetAPI('properties/recent-properties');
  return res;
};

export const GetNotificationList = async () => {
  const res = await GetAPI('properties/notifications');
  return res;
};

export const GetPorpertiesDetailById = async propertyId => {
  const res = await GetAPI('properties/property-detail/' + propertyId);
  return res;
};

export const GetFAQList = async () => {
  const res = await GetAPI('faq/list');
  return res;
};

export const GetProfile = async customerId => {
  const res = await GetAPI(`customers/profile/${customerId}`);
  return res;
};
