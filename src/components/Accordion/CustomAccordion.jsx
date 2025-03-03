import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../styles/colors';

const CustomAccordion = ({title, content, bgColor = theme.colors.white}) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const contentHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200], // Adjust based on the approximate height needed
  });

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleExpand}
        style={[styles.header, {backgroundColor: bgColor}]}>
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={{transform: [{rotate: rotateInterpolate}]}}>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View
        style={[styles.contentContainer, {maxHeight: expanded ? null : 0}]}>
        <View style={styles.content}>{expanded && content}</View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    padding: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.6,
    borderBottomColor: theme.colors.formBorderColor,
  },
  title: {
    fontSize: 18,
    fontFamily: theme.customfonts.medium,
    color: '#2B2B2B',
  },
  contentContainer: {
    overflow: 'hidden',
    borderBottomWidth: 0.6,
    borderBottomColor: theme.colors.formBorderColor,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
 
export default CustomAccordion;