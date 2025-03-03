import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import theme from '../../styles/colors';

const ListLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     // Simulate an API call or loading process
  //     const timer = setTimeout(() => {
  //       setIsLoading(false); // Stop loading after 5 seconds
  //     }, 5000);

  //     return () => clearTimeout(timer); // Cleanup timer
  //   }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading..</Text>
      </View>
    );
  }

  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.text}>"All data is shown."</Text>
  //     </View>
  //   );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginBottom: 80,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: theme.customfonts.medium,
    color: theme.colors.textLightBrown,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginBottom: 80,
  },
  text: {
    fontSize: 18,
    fontFamily: theme.customfonts.medium,
    color: theme.colors.textLightBrown,
  },
});

export default ListLoading;
