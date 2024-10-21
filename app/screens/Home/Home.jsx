import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Hotel from './Hotel';
import Apartment from './Apartment';
import AppBarComponent from '../../components/AppBar/AppBarComponent'
import theme from '../../style/colors';


const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={[styles.tabButton, isFocused ? styles.activeTab : null]}
            >
              <Text style={[styles.tabText, isFocused ? styles.activeText : null]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

const TopBar = () => {
    const TopTab = createMaterialTopTabNavigator();

    return(
        <>
            <AppBarComponent 
                title='Home'
            />
            {/* <Hotel /> */}
            <TopTab.Navigator
                tabBar={props => <CustomTabBar {...props} />}
                screenOptions={{
                    swipeEnabled:false
                }}
            >
                <TopTab.Screen name='Hotel' component={Hotel} />
                <TopTab.Screen name='Apartment' component={Apartment} />
            </TopTab.Navigator>
        </>
        
    )
}


const Home = () => {
    

  return (
    <TopBar />
  )
}

export default Home

const styles = StyleSheet.create({
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: theme.colors.textLight,
      paddingVertical: 10,
      paddingLeft:20,
    //   borderBottomWidth: 1,
    //   borderBottomColor: '#ddd',
    },
    tabButton: {
      paddingVertical: 20,
      paddingHorizontal: 40,
      width:160,
      alignItems:'center',
      
      backgroundColor:theme.colors.textLightGray,
      borderRadius:3
    },
    activeTab: {
    //   borderBottomWidth: 2,
    //   borderBottomColor: 'white',
    backgroundColor:theme.colors.info,
    },
    tabText: {
      fontSize: 16,
      color: theme.colors.textDark,
    },
    activeText: {
      color: theme.colors.textLight,
      fontWeight: 'bold',
    },
  });