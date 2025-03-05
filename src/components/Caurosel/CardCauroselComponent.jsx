// src/components/Carousel/CarouselComponent.jsx

import {useEffect, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import theme from '../../styles/colors';
import {
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

const {width: viewportWidthForStyle, height: viewportHeightForStyle} =
  Dimensions.get('window');
const isLandscapeModeForStyle = viewportWidthForStyle > viewportHeightForStyle;

const CardCarouselComponent = ({
  data,
  showLoading,
  setShowLoading,
  backgroundColor = theme.colors.primary,
  carouselContainerStyle,
  dotStyle,
  inactiveDotStyle,
  onActiveItemChange,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);
  const {width: viewportWidth, height: viewportHeight} =
    Dimensions.get('window');
  const isLandscapeMode = viewportWidth > viewportHeight;
  // console.log(androidInsets.top, 'top inset');
  //   Handle the loading of images
  useEffect(() => {
    if (loadedImages === data.length) {
      console.log('Image load finished');
      setShowLoading(false);
    }
  }, [loadedImages, data.length, setShowLoading]);

  // Check if data is valid
  const renderItem = ({item}) => {
    if (!item || !item.picture) {
      return null;
    }

    return (
      <View style={[styles.slide, {backgroundColor: backgroundColor}]}>
        <Image
          source={{uri: item.picture}}
          style={styles.image}
          onLoadEnd={() => setLoadedImages(prev => prev + 1)}
        />
      </View>
    );
  };

  return (
    <View
      style={
        isLandscapeMode
          ? [styles.carouselContainerLandscape, carouselContainerStyle]
          : [styles.carouselContainer, carouselContainerStyle]
      }>
      {/* Render Loading Spinner if images are still loading */}
      {data.length === 0 ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            animating={showLoading}
            size="large"
            color={theme.colors.white}
          />
        </View>
      ) : (
        <Carousel
          data={data}
          renderItem={renderItem}
          sliderWidth={viewportWidth}
          itemWidth={isLandscapeMode ? viewportWidth * 0.6 : viewportWidth}
          loop
          onSnapToItem={index => {
            setActiveSlide(index); // Update internal state
            onActiveItemChange && onActiveItemChange(index); // Notify parent
          }}
        />
      )}

      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={[styles.dotStyle, dotStyle]}
        inactiveDotStyle={[styles.inactiveDotStyle, inactiveDotStyle]}
        inactiveDotOpacity={0.4}
        inactiveDotScale={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: 230,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  carouselContainerLandscape: {
    width: '100%',
    height: 230,
    backgroundColor: theme.colors.primary,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    backgroundColor: theme.colors.primary,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center', // Center the image horizontally
    overflow: 'hidden', // Center the image horizontally
  },
  image: {
    borderRadius: 12,
    margin: 10,
    width: isLandscapeModeForStyle ? '100%' : '90%',
    height: 180, // Ensure the image takes the correct height
    resizeMode: 'cover', // Ensures the image covers the area without distortion
  },
  paginationContainer: {
    marginVertical: 12,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // bottom: 10,
    // left: 0,
    // right: 0,
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: theme.colors.carousel.activDotColor,
    marginHorizontal: -3,
  },
  inactiveDotStyle: {
    backgroundColor: theme.colors.carousel.inActiveDotColor,
  },
});

export default CardCarouselComponent;
