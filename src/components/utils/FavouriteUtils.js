import { Alert } from 'react-native';
import {AddOrRemoveController} from '../../api/Favourite/FavouriteController';

export const toggleFavorite = async (
  propertyId,
  favorites,
  setFavorites,
  customerId = 1,
) => {
  const postBody = {
    customerId,
    propertyId,
  };

  const isFavorite = favorites[propertyId];
  const action = isFavorite ? 'remove' : 'add';

  try {
    const response = await AddOrRemoveController(action, postBody);

    if (!response.status) {
      Alert.alert('Error', response.message);
    } else {
      setFavorites(prev => ({
        ...prev,
        [propertyId]: !isFavorite,
      }));
    }
  } catch (error) {
    console.error(`Failed to ${action} favorite:`, error);
    Alert.alert('Error', `Failed to ${action} favorite`);
  }
};
