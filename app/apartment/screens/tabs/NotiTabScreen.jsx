import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import theme from '../../style/colors';

export default function NotiTabScreen({navigation}) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  useEffect(() => {
    getNotificationList(sortOrder);
  }, []);

  const getIconColor = type => {
    switch (type) {
      case 'info':
        return '#2563EB';
      case 'alert':
        return '#F59E0B';
      case 'promo':
        return '#10B981';
      case 'warning':
        return '#DC2626';
      case 'security':
        return '#7C3AED';
      default:
        return '#6B7280';
    }
  };

  const formatDateLabel = isoDateStr => {
    const today = moment();
    const date = moment(isoDateStr);
    if (today.isSame(date, 'day')) return 'Today';
    if (today.clone().subtract(1, 'day').isSame(date, 'day'))
      return 'Yesterday';
    return date.format('MMMM D, YYYY');
  };

  // const getNotificationList = async (order = 'desc') => {
  //   try {
  //     setLoading(true);
  //     setError('');

  //     const response = await GetNotificationList();

  //     let notificationData = response.data.map(item => ({
  //       id: item.id,
  //       title: item.title,
  //       description: item.message,
  //       date: item.dateCreated,
  //       dateLabel: formatDateLabel(item.dateCreated),
  //       iconColor: getIconColor(item.type.toLowerCase()),
  //       icon: item.icon,
  //     }));

  //     // Sort by date
  //     notificationData.sort((a, b) =>
  //       order === 'asc'
  //         ? new Date(a.date) - new Date(b.date)
  //         : new Date(b.date) - new Date(a.date)
  //     );

  //     // Group by dateLabel
  //     const grouped = notificationData.reduce((acc, item) => {
  //       const group = acc.find(g => g.title === item.dateLabel);
  //       if (group) {
  //         group.data.push(item);
  //       } else {
  //         acc.push({ title: item.dateLabel, data: [item] });
  //       }
  //       return acc;
  //     }, []);

  //     setSections(grouped);
  //   } catch (error) {
  //     console.log('Error fetching notification list:', error);
  //     setError('Failed to load notifications. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const getNotificationList = async (order = 'desc') => {
    setLoading(true);
    setError('');

    try {
      const sampleData = [
        {
          id: 1,
          title: 'System Update',
          message: 'The system will undergo maintenance tonight.',
          dateCreated: moment().toISOString(),
          type: 'info',
          icon: 'https://cdn-icons-png.flaticon.com/512/4712/4712027.png',
        },
        {
          id: 2,
          title: 'Promotion Alert',
          message: 'Get 10% cashback on bill payments.',
          dateCreated: moment().subtract(1, 'day').toISOString(),
          type: 'promo',
          icon: 'https://cdn-icons-png.flaticon.com/512/1170/1170627.png',
        },
        {
          id: 3,
          title: 'Security Notice',
          message: 'Unusual login detected from a new device.',
          dateCreated: moment().subtract(2, 'days').toISOString(),
          type: 'security',
          icon: 'https://cdn-icons-png.flaticon.com/512/3064/3064197.png',
        },
      ];

      let notificationData = sampleData.map(item => ({
        id: item.id,
        title: item.title,
        description: item.message,
        date: item.dateCreated,
        dateLabel: formatDateLabel(item.dateCreated),
        iconColor: getIconColor(item.type.toLowerCase()),
        icon: item.icon,
      }));

      notificationData.sort((a, b) =>
        order === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date),
      );

      const grouped = notificationData.reduce((acc, item) => {
        const group = acc.find(g => g.title === item.dateLabel);
        if (group) {
          group.data.push(item);
        } else {
          acc.push({title: item.dateLabel, data: [item]});
        }
        return acc;
      }, []);

      setSections(grouped);
    } catch (error) {
      console.log('Error processing notification data:', error);
      setError('Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    getNotificationList(newOrder);
  };

  const renderItem = ({item}) => (
    <View style={styles.notificationItem}>
      <View style={styles.iconCircle}>
        <Image
          source={{uri: item.icon}}
          resizeMode="stretch"
          style={[styles.iconImage, {tintColor: item.iconColor}]}
        />
      </View>
      <View style={styles.notificationText}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity onPress={toggleSortOrder}>
          <Image
            source={require('../../assets/icons/arrowupdownIcon.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>

      {/* Loading / Error / Content */}
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : sections.length === 0 ? (
        <Text style={styles.emptyText}>No notifications available.</Text>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.sectionTitle}>{title}</Text>
          )}
          contentContainerStyle={{paddingBottom: 20}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 40,
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
    marginTop: 20,
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconImage: {
    width: 23,
    height: 23,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  notificationDescription: {
    fontSize: 12,
    color: '#555',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 14,
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
    marginTop: 20,
  },
});
