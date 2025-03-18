import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

// Sample Transaction Data
const transactions = [
  {
    id: "1",
    name: "The Waterford Rama 4",
    price: "$900/month",
    type: "Condo",
    beds: "2 Bed",
    bath: "1 Bath",
    agent: "Lia Fruning",
    date: "12 December 2023",
    status: "On Progress",
    statusColor: "#1E40AF",
    category: "Last 7 Days",
  },
  {
    id: "2",
    name: "The Waterford Rama 4",
    price: "$900/month",
    type: "Condo",
    beds: "2 Bed",
    bath: "1 Bath",
    agent: "Lia Fruning",
    date: "02 December 2023",
    status: "Done",
    statusColor: "#22C55E",
    category: "Last 7 Days",
  },
  {
    id: "3",
    name: "The Waterford Rama 4",
    price: "$900/month",
    type: "Condo",
    beds: "2 Bed",
    bath: "1 Bath",
    agent: "Lia Fruning",
    date: "02 October 2023",
    status: "On Progress",
    statusColor: "#1E40AF",
    category: "Previous 30 Days",
  },
  
];

export default function TransactionHistoryScreen({ navigation }) {
  const renderTransactionItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.propertyName}>{item.name}</Text>
        <Text style={styles.propertyPrice}>{item.price}</Text>
      </View>
      <Text style={styles.propertyDetails}>
        {item.type}, {item.beds}, {item.bath}
      </Text>
      <View style={styles.separator} />
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.agentText}>
            Agent: <Text style={styles.agentName}>{item.agent}</Text>
          </Text>
          <Text style={styles.dateText}>
            Date Transaction: <Text style={styles.dateValue}>{item.date}</Text>
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Last 7 Days Section */}
      <Text style={styles.sectionTitle}>Last 7 Days</Text>
      <FlatList
        data={transactions.filter((item) => item.category === "Last 7 Days")}
        keyExtractor={(item) => item.id}
        renderItem={renderTransactionItem}
        scrollEnabled={false} // ⚡ Prevents nested scrolling issues
      />

      {/* Previous 30 Days Section */}
      <Text style={styles.sectionTitle}>Previous 30 Days</Text>
      <FlatList
        data={transactions.filter((item) => item.category === "Previous 30 Days")}
        keyExtractor={(item) => item.id}
        renderItem={renderTransactionItem}
        scrollEnabled={false} // ⚡ Prevents nested scrolling issues
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  propertyPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  propertyDetails: {
    fontSize: 14,
    color: "#777",
  },
  separator: {
    height: 1,
    backgroundColor: "#EAEAEA",
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  agentText: {
    fontSize: 14,
    color: "#555",
  },
  agentName: {
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "#555",
  },
  dateValue: {
    fontWeight: "bold",
  },
  statusBadge: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFF",
  },
});
