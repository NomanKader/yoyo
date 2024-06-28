// Card.js
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const CardComponent = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={[styles.card,title=='Logout'&&styles.logoutCard]} onPress={onPress}>
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '80%',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutCard: {
    width: '80%',
    padding: 20,
    marginVertical: 10,
    backgroundColor: 'red',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CardComponent;
