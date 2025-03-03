import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import theme from '../../styles/colors';

const CustomBulletText = ({text}) => {
  // Split the text into bullet points
  const bulletPoints = text.split('•').filter(point => point.trim() !== '');

  return (
    <View style={styles.container}>
      {bulletPoints.map((point, index) => (
        <Text key={index} style={styles.bullet}>
          • {point.trim()}
        </Text>
      ))}
    </View>
  );
};

export default CustomBulletText;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  bullet: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
    fontFamily: theme.customfonts.regular,
  },
});
