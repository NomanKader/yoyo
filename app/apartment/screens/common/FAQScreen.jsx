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
// import {GetFAQList} from '../../api/DataController';

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
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFAQData();
  }, []);
  const fetchFAQData = async () => {
    try {
      setLoading(true);
      setError('');
      setTimeout(() => {
        setFaqs([
          {
            id: '1',
            question: 'How do I reset my password?',
            answer:
              'To reset your password, go to the login screen and tap on "Forgot PIN". Follow the instructions to reset your password via email.',
          },
          {
            id: '2',
            question: 'How can I update my profile information?',
            answer:
              'You can update your profile from the Edit Profile screen by tapping on your avatar icon from the home screen or menu.',
          },
          {
            id: '3',
            question: 'What should I do if I encounter an error?',
            answer:
              'If you encounter any errors, please try restarting the app or checking your internet connection. You can also contact support.',
          },
          {
            id: '4',
            question: 'Is my personal data safe?',
            answer:
              'Yes, your data is encrypted and stored securely. We follow best practices for data protection and user privacy.',
          },
          {
            id: '5',
            question: 'Can I use this app without internet?',
            answer:
              'Some features may work offline, but most require an internet connection for syncing and real-time updates.',
          },
        ]);
        setLoading(false);
      }, 1000); // simulate delay
    } catch (err) {
      setError('Failed to load FAQs.');
      setLoading(false);
    }
  };
  
//   const fetchFAQData = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       const response = await GetFAQList();
//       if (response?.status) {
//         setFaqs(response.data);
//       } else {
//         setError('Failed to load FAQs. Please try again later.');
//       }
//     } catch (err) {
//       console.error('Error fetching FAQs:', err);
//       setError('An error occurred while fetching FAQs.');
//     } finally {
//       setLoading(false);
//     }
//   };

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
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
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
    borderColor: '#E0E0E0',
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
    borderColor: '#E0E0E0',
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
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginTop: 40,
  },
});
