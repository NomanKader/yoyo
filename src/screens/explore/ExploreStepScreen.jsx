import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import DefaultButtonComponent from "../../components/Button/DefaultButtonComponent";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import theme from "../../styles/colors";

export default function ExploreStepScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [location, setLocation] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [budget, setBudget] = useState("");

  // Toggle property selection
  const toggleProperty = (property) => {
    setSelectedProperties((prev) =>
      prev.includes(property) ? prev.filter((item) => item !== property) : [...prev, property]
    );
  };

  const propertyOptions = {
    "For Sale": ["Apartments", "Shop-houses", "Condominiums", "Houses", "Warehouses", "Villas", "Land"],
    "For Rent": ["Apartments", "Shop-houses", "Condominiums", "Houses", "Warehouses", "Villas", "Land"],
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style={styles.question}>What is your purpose in searching for a property?</Text>
            <Text style={styles.subtext}>You can choose more than one property goal.</Text>

            {Object.entries(propertyOptions).map(([category, properties]) => (
              <View key={category} style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>{category}</Text>
                <View style={styles.optionContainer}>
                  {properties.map((property) => (
                    <TouchableOpacity
                      key={property}
                      style={[
                        styles.optionButton,
                        selectedProperties.includes(property) && styles.selectedOption,
                      ]}
                      onPress={() => toggleProperty(property)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selectedProperties.includes(property) && styles.selectedOptionText,
                        ]}
                      >
                        {property}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        );

      case 2:
        return (
          <View>
            <Text style={styles.question}>Where are you currently conducting your property search?</Text>
            <View style={styles.searchContainer}>
              <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
              <TextInput
                style={styles.input}
                placeholder="Search for location or area"
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>
        );

      case 3:
        return (
          <View>
            <Text style={styles.question}>What is your estimated budget for the property?</Text>
            <View style={styles.budgetContainer}>
              <Picker
                selectedValue={currency}
                style={styles.currencyPicker}
                onValueChange={(itemValue) => setCurrency(itemValue)}
              >
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="EUR" value="EUR" />
                <Picker.Item label="MMK" value="MMK" />
              </Picker>
              <TextInput
                style={styles.budgetInput}
                keyboardType="numeric"
                placeholder="0"
                value={budget}
                onChangeText={setBudget}
              />
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header with Back Button and Progress Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (step > 1 ? setStep(step - 1) : navigation.goBack())}>
          <Icon name="arrow-back-ios" size={24} color="#000" />
        </TouchableOpacity>
        <Text>{step} of 3</Text>
      </View>

      {/* Fixed Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${(step / 3) * 100}%` }]} />
      </View>

      {/* Dynamic Step Content */}
      <View style={styles.stepContent}>{renderStep()}</View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <DefaultButtonComponent
          title="Continue"
          onPress={() => (step < 3 ? setStep(step + 1) : navigation.navigate("NextScreen"))}
        />
        <TouchableOpacity onPress={() => navigation.navigate("NextScreen")}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 20, // Ensure consistent positioning
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: theme.colors.primary,
  },
  stepContent: {
    flex: 1, // Ensures step content takes up available space
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtext: {
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
  },
  categoryContainer: {
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedOptionText: {
    color: "#FFFFFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    marginTop:30
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16    
  },
  budgetContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 50,
    marginTop:20
  },
  currencyPicker: {    
    width: 120,    
  },
  budgetInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  skipText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    color: "#888",
  },
});


