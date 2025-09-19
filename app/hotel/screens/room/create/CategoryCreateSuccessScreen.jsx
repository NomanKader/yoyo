
// src/screens/Room/CategoryCreatedSuccessScreen.jsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import theme from '../../../style/colors';
import { CommonStyles } from '../../../style/CommonStyles';
import DefaultButtonComponent from '../../../components/Button/DefaultButtonComponent';

const CategoryCreateSuccessScreen = ({ navigation, route }) => {
  const roomCategoryId = route?.params?.roomCategoryId;

  const goAddRoom = () => {
    // TODO: change 'CreateRoomScreen' to your actual route
    navigation.navigate('CreateRoomScreen', { roomCategoryId });
  };

  return (
    <SafeAreaView style={[CommonStyles.scrollViewContainer, styles.safe]}>
      <View style={styles.wrap}>
        {/* Cute card + circle illustration */}
        <View style={styles.illustration}>
          <View style={styles.circle} />
          <View style={styles.card}>
            <Text style={styles.face}>☺</Text>
          </View>
        </View>

        <Text style={styles.title}>Category Created</Text>
        <Text style={styles.subtitle}>
          Click on the button below to add a room in{'\n'}this category
        </Text>

        <DefaultButtonComponent
          title="Add Room"
          backgroundColor={theme.colors.primary}
          onPress={goAddRoom}
        />

        {/* Optional: secondary action
        <TouchableOpacity onPress={() => navigation.popToTop()} style={{ marginTop: 16 }}>
          <Text style={styles.linkText}>Back to Home</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const CARD_SIZE = 90;

const styles = StyleSheet.create({
  safe: { backgroundColor: '#fff' },
  wrap: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  illustration: {
    width: 160,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  circle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EEF2FF', // soft blue-ish
  },
  card: {
    position: 'absolute',
    width: CARD_SIZE,
    height: CARD_SIZE * 0.66,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#0F172A',
    backgroundColor: '#fff',
    transform: [{ rotate: '-12deg' }],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  face: {
    fontSize: 28,
    color: '#0F172A',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  linkText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default CategoryCreateSuccessScreen;
