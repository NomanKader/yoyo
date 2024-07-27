// components/AppBarComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../style/colors';

const AppBarComponent = ({ title,navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="search" size={20} color={theme.icon.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={()=>navigation.navigate('AppStack',{screen:'RoomCategoryCreate'})}>
            <Icon name="plus" size={20} color={theme.icon.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {    
    elevation: 4, // Add shadow/elevation to the container
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight:'500'
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
    padding: 10,
    backgroundColor:theme.colors.textLight, // Add background color for better visibility
    borderRadius: 50,
    elevation: 4, // Add shadow/elevation to the icons
  },
});

export default AppBarComponent;
