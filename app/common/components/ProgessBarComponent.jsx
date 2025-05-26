import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ProgressBar({ currentStep, totalSteps }) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.progressBar}>
      <View style={[styles.progressIndicator, { width: `${percentage}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 20,
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: '#007bff',
  },
});
