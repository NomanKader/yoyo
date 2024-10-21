import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import SearchAppBarComponent from '../../components/AppBar/SearchAppBarComponent';
import RoomListComponent from '../../components/List/RoomListComponent';
import theme from '../../style/colors';
import { CommonStyles } from '../../style/CommonStyles';
import DividerComponent from '../Divider/DividerComponent';
import noDataImage from '../../assets/icons/noData.png'; // Import the image
import _handleListService from '../../helper/HandleListService';
import RoomService from '../../services/RoomService';

const SearchScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState([]);  
  const [type, setType] = useState('');

  useEffect(() => {
    if (route.params?.searchData) {
      setSearchData(route.params.searchData);
    }
    if (route.params?.type) {
      setType(route.params.type);
    }
  }, [route.params?.searchData, route.params?.type]);

  const filteredData = searchData.filter(item => {
    if (type === 'category') {
      return item?.roomName?.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return item?.roomNumber?.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  return (
    <>
      <ScrollView>
        <View style={CommonStyles.scrollViewContainer}>
        <SearchAppBarComponent
          navigation={navigation}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        </View>
        {searchQuery === '' ? (
          <RoomListComponent data={searchData} navigation={navigation} type={type} onPress={()=>_handleListService(type,setType,navigation,RoomService,setSearchData,() => navigation.navigate('AppStack', { screen: 'RoomListScreen' }))} />
        ) : (
          filteredData.length > 0 ? (
            <RoomListComponent data={filteredData} navigation={navigation} type={type} onPress={()=>_handleListService(type,setType,navigation,RoomService,setSearchData,() => navigation.navigate('AppStack', { screen: 'RoomListScreen' }))}/>
          ) : (
            <View style={styles.noDataContainer}>
              <Image source={noDataImage} style={styles.noDataImage} />
              <Text style={styles.noDataText}>No data available</Text>
            </View>
          )
        )}
      </ScrollView>
      <View style={CommonStyles.dividerView}>
        <DividerComponent />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.textLight,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50, // Adjust as needed for spacing
  },
  noDataImage: {
    width: 200,
    height: 200, // Adjust the size as needed
    resizeMode: 'contain',
  },
  noDataText: {
    marginTop: 20,
    fontSize: 18,
    color: theme.colors.textDark,
  },
});

export default SearchScreen;
