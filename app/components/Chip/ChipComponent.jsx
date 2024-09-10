import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import theme from '../../style/colors';

export default function ChipComponent({ label }) {
  // State to track whether the chip is pressed or not
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPress={() => setIsPressed(!isPressed)} // Toggle the pressed state
      style={[
        styles.chipContainer,
        {
          backgroundColor: isPressed
            ? theme.colors.chipBackgroundColor // Pressed state background color
            : theme.colors.textLight,          // Default background color
        },
      ]}
    >
      <Text style={styles.chipLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    width: 124,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 6,
    flexDirection: 'row', // to align items horizontally if needed
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10, // spacing between elements if you add icons etc.
    borderRadius: 5, // top-left corner rounded
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: theme.colors.borderColor,
    borderWidth: 1, // only top border will appear due to the width settings
    opacity: 1, // ensure opacity is set to fully visible
  },
  chipLabel: {
    fontSize: 16,
    color: theme.colors.borderColor,
    fontWeight: 'bold',
  },
});
