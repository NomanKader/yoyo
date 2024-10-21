import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import theme from '../../style/colors';

const Accordion = ({title,content,maxHeight}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Reanimated shared value to track the height of the accordion
  const height = useSharedValue(0);

  // Toggling function for expanding/collapsing the accordion
  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
    height.value = isExpanded ? withTiming(0, { duration: 300 }) : withTiming(maxHeight, { duration: 300 });
  };

  // Animated style that transitions the height of the content
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  return (
    <View style={styles.container}>
      {/* Accordion Header */}
      <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
        {/* Icon that toggles between chevron-down and chevron-left */}
        
        <Text style={styles.headerText}>{title}</Text>
        <FontAwesome
          name={isExpanded ? 'chevron-left' : 'chevron-down'} // Toggle icon based on expanded state
          size={20}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Accordion Content */}
      <Animated.View style={[styles.content, animatedStyle]}>
        {content}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    borderRadius: 5,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.iconBackgroundColor,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderColor,
    justifyContent:'space-between'
  },
  icon: {
    marginRight: 10, // Spacing between icon and text
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    overflow: 'hidden', // Ensures the content stays within bounds during the animation
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: theme.colors.textLight,
  },
});

export default Accordion;
