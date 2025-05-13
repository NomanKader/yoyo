import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CarouselSkeletonComponent = () => {
  return (
    <SkeletonPlaceholder>
      {/* Carousel Skeleton */}
      <SkeletonPlaceholder.Item alignItems="center">
        <SkeletonPlaceholder.Item width={400} height={200} borderRadius={10} />
        {/* Dots at the Bottom Center */}
        <View style={styles.dotsContainer}>
          <View style={styles.activeDot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </SkeletonPlaceholder.Item>
      {/* Header Skeleton */}
      <SkeletonPlaceholder.Item marginTop={20} width={150} height={30} borderRadius={4} />
      {/* Paragraph Skeleton */}
      <SkeletonPlaceholder.Item marginTop={10} width="80%" height={20} borderRadius={4} />
      
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'black',
    color:'black',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default CarouselSkeletonComponent;
