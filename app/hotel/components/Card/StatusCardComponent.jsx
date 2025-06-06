import { View,Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
const StatusCardComponent = ({ color, label, value, icon }) => (
    <View style={[styles.card, { backgroundColor: color }]}>
      <View>
        <Text style={styles.cardLabel}>{label}</Text>
        <Text style={styles.cardValue}>{value}</Text>
      </View>
      <Icon name={icon} size={24} color="#fff" />
    </View>
  );
const styles=StyleSheet.create(({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    marginLeft: 10,
  },
  cardsRow: {
    gap: 10,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  cardLabel: {
    color: '#fff',
    fontSize: 14,
  },
  cardValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  
}))
 export default StatusCardComponent 