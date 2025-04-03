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
import {GetNotificationList} from '../../api/DataController';
import theme from '../../styles/colors';

export default function NotificationTabScreen({navigation}) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNotificationList();
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

  const getNotificationList = async () => {
    try {
      setLoading(true);
      const response = await GetNotificationList();
      const notificationData = response.data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.message,
        dateLabel: formatDateLabel(item.dateCreated),
        iconColor: getIconColor(item.type.toLowerCase()),
        icon: item.icon,
      }));

      // Group by dateLabel
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
      console.log('Error fetching notification list:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.notificationItem}>
      <View style={styles.iconCircle}>
        <Image
          source={{uri: item.icon}}
          style={[styles.iconImage, 
            {tintColor: item.iconColor}
          ]}
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity>
          <Image
            source={require('../../assets/icons/arrowupdownIcon.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
});
