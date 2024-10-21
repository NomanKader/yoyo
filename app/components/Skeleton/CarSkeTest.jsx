import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import theme from '../../style/colors';

const CarouselSkeletonComponent = () => {
  return (
    <>
      <SkeletonPlaceholder backgroundColor={theme.colors.textGray} highlightColor={theme.colors.info} enabled={true} >
      {/* Carousel Skeleton */}
      <SkeletonPlaceholder.Item   alignItems="center" backgroundColor={theme.colors.textGray}>
        <SkeletonPlaceholder.Item width={400} height={200} borderRadius={10} backgroundColor='red' />
        {/* Dots at the Bottom Center */}
        <View style={styles.dotsContainer}>
          <View style={styles.activeDot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

      </SkeletonPlaceholder.Item>
      
      {/* Header Skeleton */}
      {/* <SkeletonPlaceholder.Item marginTop={20} width={150} height={30} borderRadius={4} /> */}
      {/* Paragraph Skeleton */}
      {/* <SkeletonPlaceholder.Item marginTop={10} width="80%" height={20} borderRadius={4} /> */}
      
    </SkeletonPlaceholder>
    <View style={styles.dotsContainer}>
      <View style={styles.activeDot} />
      <View style={styles.dot} />
      <View style={styles.dot} />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor:'red'
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d3d3d3',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'white',
    color:'white',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default CarouselSkeletonComponent;
