import React from 'react';
import { Modal, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import theme from '../../apartment/style/colors';

export default function LoadingModalComponent({ visible, status = 'loading', message = 'Please wait...' }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {status === 'loading' && <ActivityIndicator size="large" color={theme.colors.primary} />}
          {status === 'success' && <Text style={styles.icon}>✅</Text>}
          {status === 'error' && <Text style={styles.icon}>❌</Text>}
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 250,
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#333',
  },
});
