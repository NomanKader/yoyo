import { GetAPI, PostAPI } from "../CommonController";

export const AddOrRemoveController = async (type,postBody) => {
  const toOrFrom = type === 'add' ? 'to' : 'from';
  const res = await PostAPI(
    `properties/${type}-${toOrFrom}-favorites`,
    postBody,
  );
  return res;
};

export const GetFavoriteList = async (customerId) => {
  const res = await GetAPI(`properties/favorites/${customerId}`);
  return res;
}