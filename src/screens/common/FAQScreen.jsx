import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

// Sample FAQ Data
const faqs = [
  {
    id: "1",
    question: "What are the benefits of using this app to find properties?",
    answer:
      "Our app provides easy access to thousands of properties with advanced search features to ensure you find properties that suit your needs.",
  },
  {
    id: "2",
    question: "How do I search for properties on this app?",
    answer:
      "You can use our search feature to filter properties based on location, price, property type, number of rooms, and more. Use filters to get results that match your preferences.",
  },
  {
    id: "3",
    question: "How do I save my favorite properties?",
    answer:
      'Once logged into your account, you can find the "Save" button on the property detail page. Click this button to save properties to your favorites list.',
  },
  {
    id: "4",
    question: "How do I contact the agent or property owner?",
    answer:
      "You can contact an agent or property owner via the contact details provided on the property listing page.",
  },
  {
    id: "5",
    question: "What are the steps to rent or buy a property?",
    answer:
      "The steps to rent or buy a property include browsing listings, contacting the owner or agent, negotiating the terms, and completing the paperwork.",
  },
  {
    id: "6",
    question: "How can I review an agent or property owner?",
    answer:
      "After a transaction is complete, you can leave a review on the property listing page to share your experience with the agent or property owner.",
  },
];

export default function FAQScreen({ navigation }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Toggle FAQ Item
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Filter FAQs based on search query
  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search using keywords"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery} // Update search state
        />
      </View>

      {/* FAQ List */}
      {filteredFAQs.length > 0 ? (
        filteredFAQs.map((faq, index) => (
          <View key={faq.id} style={styles.faqItem}>
            <TouchableOpacity
              style={styles.faqHeader}
              onPress={() => toggleExpand(index)}
            >
              <Text style={styles.questionText}>{faq.question}</Text>
              <Icon name={expandedIndex === index ? "chevron-up" : "chevron-down"} size={20} color="#000" />
            </TouchableOpacity>
            {expandedIndex === index && <Text style={styles.answerText}>{faq.answer}</Text>}
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    paddingVertical: 12,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  answerText: {
    fontSize: 14,
    color: "#555",
    marginTop: 8,
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
});
