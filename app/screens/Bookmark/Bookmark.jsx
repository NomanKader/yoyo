import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import theme from '../../style/colors';
import DividerComponent from '../../components/Divider/DividerComponent';
import {FlatList} from 'react-native-gesture-handler';
import DummyData from '../../config/DummyData.json';
import HotelCard from '../../components/Card/HotelCard';
import {CommonStyles} from '../../style/CommonStyles';

const Bookmark = ({navigation}) => {
  const hotels = DummyData.hotels;

  return (
    <View style={styles.container}>
      <Text style={styles.topTitle}>Bookmark</Text>
      <DividerComponent />
      <FlatList
        data={hotels}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <HotelCard
            hotel={item}
            onPress={() =>
              navigation.navigate('AppStack', {screen: 'RoomCategoryScreen'})
            }
          />
        )}
        numColumns={2}
        contentContainerStyle={[
          CommonStyles.scrollViewContainer,
          {marginTop: 20},
        ]}
      />
    </View>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.textLight,
  },
  topTitle: {
    marginLeft: 20,
    fontSize: 20,
    color: theme.colors.textDark,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
});
