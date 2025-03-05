import React, {useState} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import theme from '../../styles/colors';

const CarouselComponent_news = ({data}) => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const isLandscapeMode = screenWidth > screenHeight;

  const [activeIndex, setActiveIndex] = useState(0);

  const renderCarouselItem = ({item}) => (
    <View style={styles.carouselItem}>
      <Image source={{uri: item.picture}} style={styles.carouselImage} />
    </View>
  );

  return (
    <View
      style={
        isLandscapeMode
          ? styles.carouselContanierLandscape
          : styles.carouselContanier
      }>
      <Carousel
        data={data}
        renderItem={renderCarouselItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.8}
        loop
        autoplay
        autoplayDelay={3000}
        autoplayInterval={5000}
        onSnapToItem={index => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        dotStyle={styles.dotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContanier: {
    height: 280,
  },
  carouselContanierLandscape: {
    flex: 1,
    height: 280,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselItem: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: theme.colors.textLight,
    marginTop: 10,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
});

export default CarouselComponent_news;
