import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {GetFAQList} from '../../api/DataController';

// Enable animation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function FAQScreen({navigation}) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQData();
  }, []);

  const fetchFAQData = async () => {
    try {
      setLoading(true);
      const response = await GetFAQList();
      if (response?.status) {
        setFaqs(response.data);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const normalize = text => text.toLowerCase().replace(/\s+/g, '');

  const filteredFAQs = faqs.filter(faq =>
    normalize(faq.question).includes(normalize(searchQuery)) ||
    normalize(faq.answer).includes(normalize(searchQuery))
  ); 

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ</Text>
        <View style={{width: 24}} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search using keywords"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : filteredFAQs.length > 0 ? (
        filteredFAQs.map((faq, index) => (
          <View key={faq.id} style={styles.card}>
            <TouchableOpacity
              onPress={() => toggleExpand(index)}
              style={styles.cardHeader}>
              <Text style={styles.questionText}>{faq.question}</Text>
              <Icon
                name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
            {expandedIndex === index && (
              <Text style={styles.answerText}>{faq.answer}</Text>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noResultsText}>No results found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical:10,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0', // light border instead of shadow
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0', // light border instead of shadow
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  answerText: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
    lineHeight: 20,
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginTop: 40,
  },
});
