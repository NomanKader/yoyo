import {Alert} from 'react-native';
import {AddOrRemoveController} from '../../api/Favourite/FavouriteController';
import Toast from 'react-native-toast-message';

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
      Alert.alert('Error', response.message || `Failed to ${action} favorite`);
      return;
    }

    setFavorites(prev => ({
      ...prev,
      [propertyId]: !isFavorite,
    }));

    Toast.show({
      type: isFavorite ? 'info' : 'success',
      text1: isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
      position: 'bottom',
      visibilityTime: 500,
    });
  } catch (error) {
    console.error(`Failed to ${action} favorite:`, error);
    Alert.alert('Error', `Failed to ${action} favorite`);
  }
};
