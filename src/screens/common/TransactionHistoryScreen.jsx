import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {GetTransactionHistory} from '../../api/DataController';
import moment from 'moment';

export default function TransactionHistoryScreen({navigation}) {
  const [last7Days, setLast7Days] = useState([]);
  const [last30Days, setLast30Days] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTransactionHistoryList();
  }, []);

  const getTransactionHistoryList = async () => {
    try {
      setIsLoading(true);
      const res = await GetTransactionHistory(1);
      if (res?.status && res.data?.length > 0) {
        const today = moment();

        const transactions = res.data.map(item => {
          const txDate = moment(item.dateTransaction);
          const daysAgo = today.diff(txDate, 'days');

          return {
            id: item.propertyId.toString(),
            name: item.name,
            price: item.pricePerMonth
              ? `${Number(item.pricePerMonth).toLocaleString()} MMK/month`
              : 'N/A',
            type: 'Condo',
            beds: `${item.bedroom} Bed`,
            bath: `${item.bathroom} Bath`,
            agent: item.agentName,
            date: txDate.format('DD MMMM YYYY'),
            status: item.status,
            statusColor: item.status === 'Completed' ? '#22C55E' : '#1E40AF',
            daysAgo,
          };
        });

        const last7 = transactions.filter(tx => tx.daysAgo <= 7);
        const last30 = transactions.filter(tx => tx.daysAgo <= 30);

        setLast7Days(last7);
        setLast30Days(last30);
      }
    } catch (error) {
      console.error('Error fetching transaction history: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderTransactionItem = ({item}) => (
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
        <View style={[styles.statusBadge, {backgroundColor: item.statusColor}]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <View style={{width: 24}} />
      </View>

      {/* Last 7 Days */}
      <Text style={styles.sectionTitle}>Last 7 Days</Text>
      <FlatList
        data={last7Days}
        keyExtractor={item => item.id}
        renderItem={renderTransactionItem}
        scrollEnabled={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No transactions in the last 7 days.
          </Text>
        }
      />

      {/* Previous 30 Days */}
      <Text style={styles.sectionTitle}>Previous 30 Days</Text>
      <FlatList
        data={last30Days}
        keyExtractor={item => item.id}
        renderItem={renderTransactionItem}
        scrollEnabled={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No transactions in the last 30 days.
          </Text>
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  propertyPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  propertyDetails: {
    fontSize: 14,
    color: '#777',
  },
  separator: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agentText: {
    fontSize: 14,
    color: '#555',
  },
  agentName: {
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#555',
  },
  dateValue: {
    fontWeight: 'bold',
  },
  statusBadge: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
