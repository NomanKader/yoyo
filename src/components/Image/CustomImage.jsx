import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const CustomImage = ({ base64String, style }) => {
  if (!base64String) {
    return null; // Handle the case when no base64 string is provided
  }

  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${base64String}` }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150, // Default width
    height: 150, // Default height
  },
});
