import React, { useRef, useEffect, useCallback } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import theme from '../../styles/colors';
 
const WheelPicker = ({
  items = [],
  onIndexChange,
  itemHeight,
  initialIndex = 0,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
 
  useEffect(() => {
    // Add a slight delay to ensure FlatList is rendered before scrolling
    const timer = setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: initialIndex * itemHeight,
          animated: false,
        });
      }
    }, 50); // 50ms delay

    return () => clearTimeout(timer); // Cleanup timer
  }, [initialIndex, itemHeight]);
 
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <View style={[styles.animatedContainer, { height: itemHeight }]}>
          <Text style={[styles.pickerItem]}>{item}</Text>
        </View>
      );
    },
    [itemHeight]
  );
 
  const modifiedItems = ['', ...items, ''];
 
  const momentumScrollEnd = event => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    setTimeout(() => onIndexChange(index), 0);
  };
 
  return (
    <View style={[styles.container, { height: itemHeight * 3 }]}>
      <Animated.FlatList
        ref={flatListRef}
        data={modifiedItems}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        onMomentumScrollEnd={momentumScrollEnd}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
      <View style={[styles.indicatorHolder, { top: itemHeight }]}>
        <View style={styles.indicator} />
        <View style={[styles.indicator, { marginTop: itemHeight }]} />
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  pickerItem: {
    width:70,
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textDark,
    textAlign: 'center',
    textAlign: 'center',
  },
  indicatorHolder: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 62,
    height: 2,
    backgroundColor: 'grey',
  },
  animatedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
 
export default WheelPicker;