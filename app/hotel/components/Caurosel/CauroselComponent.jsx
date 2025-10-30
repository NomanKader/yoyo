import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { BASE_IMAGE_URL } from '../../../common/service/HttpService';

const { width: viewportWidth } = Dimensions.get('window');

const CarouselComponent = ({ data, setShowLoading }) => {
  console.log("datelenght",data.length)
  const [activeSlide, setActiveSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    if (loadedImages === data.length) {
      console.log("Image load finished");
      setShowLoading(false);
    }
  }, [loadedImages, data.length, setShowLoading]);

  const renderItem = ({ item }) => {
    const imageUri = item.url ? item.url : `${BASE_IMAGE_URL}${item.photoName}`;
    return (
      <View style={styles.slide}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          onLoadEnd={() => setLoadedImages(loadedImages + 1)}
        />
      </View>
    );
  };

  return (
    <View>
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
        containerStyle={styles.paginationContainer}
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
    width: viewportWidth,
    height: 200,
    justifyContent: 'center'
  },
  image: {
    width: 330,
    height: 200,

  },
  paginationContainer: {
    paddingVertical: 10
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
  }
});

export default CarouselComponent;
