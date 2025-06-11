import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import DividerComponent from './DividerComponent';

export default function HeaderComponent({
  onPress,
  title,
  contentContainerStyle,
  showBackIcon = true,
}) {
  return (
    <View style={[styles.header, contentContainerStyle]}>
      <TouchableOpacity onPress={onPress} style={styles.backButtonWrapper}>
        {showBackIcon && (
          <Image
            source={require('../../assets/icons/backIcon.png')}
            style={styles.backIcon}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{marginTop: 5}} />
      <DividerComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  backButtonWrapper: {
    position: 'absolute',
    left: -15,
    padding: 10,
  },
  backIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
