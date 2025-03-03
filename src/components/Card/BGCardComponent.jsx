// src/components/Card/BGCardComponent.jsx

import {View, StyleSheet, Dimensions} from 'react-native';
import theme from '../../styles/colors';
const screenHeight = Dimensions.get('window').height;

const BGCardComponent = ({children, otherStyle, padding = 8}) => (
  <View style={[styles.surface, otherStyle, {padding: padding}]}>
    <View style={styles.step}>{children}</View>
  </View>
);

export default BGCardComponent;

const styles = StyleSheet.create({
  surface: {
    height: '100%',
    minHeight: screenHeight,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: theme.colors.textLight,
    marginTop: '0%',
    marginBottom: '0%',
    // Adding shadow for elevation effect similar to Surface component
    shadowColor: theme.colors.textDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  step: {
    flex: 1,
    width: '100%',
  },
});
