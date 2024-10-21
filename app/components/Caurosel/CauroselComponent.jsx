import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet, TouchableOpacity,Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import theme from '../../style/colors';
import Icon from 'react-native-vector-icons/FontAwesome'


const { width: viewportWidth } = Dimensions.get('window');

const CarouselComponent = ({ data, setShowLoading,navigation, carouselType }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    if (loadedImages === data.length) {
      console.log("Image load finished");
      setShowLoading(false);
    }
  }, [loadedImages, data.length, setShowLoading]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AppStack', { screen: 'RoomCategoryScreen' })}
          
        >
          <Image 
            source={{ uri: item.url }} 
            style={styles.image} 
            onLoadEnd={() => setLoadedImages(loadedImages + 1)}
          />
          {/* Conditional Rendering for bookmark container  */}
          {carouselType == 'home' && (
            <View style={styles.bookmarkContainer}>
              <View>
                <Text style={{fontSize:17,fontWeight:'bold'}}>
                  A Hotel
                </Text>
                <Text style={{fontSize:14,marginTop:3}}>
                  Calabar
                </Text>
              </View>
              <Icon name='bookmark-o' style={{marginRight:15}} size={25} color='black' />
            </View>
          )}

          {/* Conditional Rendering for bookmark container  */}
          {carouselType == 'roomList' && (
            <View style={styles.heartPlus}>
              <View style={styles.heartPlusChild}>
                <Icon name='heart' style={{marginRight:5}} size={25} color='red' />
                <Text style={{color: theme.colors.textLight}}> 50</Text>
              </View>
              <View style={[styles.heartPlusChild,{marginLeft:3}]}>
                <Icon name='bookmark'  size={25} color='white' />
              </View>
            </View>
          )}


          
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{marginTop:20}}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth}
        onSnapToItem={(index) => setActiveSlide(index)}
        
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={[styles.paginationContainer, carouselType == 'home' || carouselType == 'roomDetail' ? { alignSelf: 'flex-start' } : null]}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: viewportWidth*0.9,
    height: 230,
    justifyContent: 'center',
    borderRadius:13,
    overflow:'hidden',
    position:'relative'
  },
  image: {
    width: '100%',
    height: 230,
    
    // borderRadius:25
  },
  paginationContainer: {
    paddingVertical: 10,

  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'black'
  },
  inactiveDotStyle: {
    backgroundColor: 'gray'
  },
  bookmarkContainer:{
    position: 'absolute',
    bottom: 15,
    alignSelf:'center',
    backgroundColor: theme.colors.textLight,
    width:viewportWidth*0.8,
    height:70,
    borderRadius:13,
    padding:13,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  heartPlus :{
    position:'absolute',
    top:15,
    right:25,
    flexDirection:'row'
  },
  heartPlusChild:{
    backgroundColor:'rgba(3, 52, 100,0.6)',
    padding:10,
    borderRadius:50,
    flexDirection:'row'
  }

});

export default CarouselComponent;
