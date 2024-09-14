import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DetailAppBarComponent from "../../components/AppBar/DetailAppBarComponent";
import { CommonStyles } from "../../style/CommonStyles";
import DividerComponent from "../../components/Divider/DividerComponent";
import CheckBoxComponent from "../../components/Checkbox/CheckboxComponent";
import TextInputComponent from "../../components/TextInput/TextInputComponent";
import IconButtonComponent from "../../components/Button/IconButtonComponent"; // Import the IconButtonComponent
import theme from "../../style/colors";

export default function AddOnPriceFeatureSettingScreen({ navigation }) {
  // State for checkboxes and prices
  const [isGymChecked, setIsGymChecked] = useState(false);
  const [gymPrice, setGymPrice] = useState("");

  const [isBreakfastChecked, setIsBreakfastChecked] = useState(false);
  const [breakfastPrice, setBreakfastPrice] = useState("");

  const [isExtraBedChecked, setIsExtraBedChecked] = useState(false);
  const [extraBedPrice, setExtraBedPrice] = useState("");

  // Handlers for each checkbox and price
  const handleGymCheck = () => setIsGymChecked(!isGymChecked);
  const handleBreakfastCheck = () => setIsBreakfastChecked(!isBreakfastChecked);
  const handleExtraBedCheck = () => setIsExtraBedChecked(!isExtraBedChecked);

  // Handler for adding more features
  const handleAddFeature = () => {
    // Logic for adding more features can be added here
    console.log('Add more features button pressed');
  };

  return (
    <View style={CommonStyles.scrollViewContainer}>
      <DetailAppBarComponent title={"Add on price features"} navigation={navigation} />
      <DividerComponent />

      {/* Gym Access */}
      <View style={styles.row}>
        <CheckBoxComponent label={"Gym access"} isChecked={isGymChecked} onToggle={handleGymCheck} isSwap={true} />
        <TextInputComponent
          placeholder={"Price"}
          value={gymPrice}
          onChangeText={setGymPrice}
          keyboardType={'number-pad'}
          editable={isGymChecked} // Only allow editing when checked
          isSecure={false}          
        />
      </View>

      <DividerComponent />

      {/* Breakfast */}
      <View style={styles.row}>
        <CheckBoxComponent label={"Breakfast"} isChecked={isBreakfastChecked} onToggle={handleBreakfastCheck} isSwap={true} />
        <TextInputComponent
          placeholder={"Price"}
          value={breakfastPrice}
          onChangeText={setBreakfastPrice}
          keyboardType={'number-pad'}
          editable={isBreakfastChecked}
          isSecure={false}
          style={styles.textInput}
        />
      </View>

      <DividerComponent />

      {/* Extra Bed */}
      <View style={styles.row}>
        <CheckBoxComponent label={"Extra bed"} isChecked={isExtraBedChecked} onToggle={handleExtraBedCheck} isSwap={true}/>
        <TextInputComponent
          placeholder={"Price"}
          value={extraBedPrice}
          onChangeText={setExtraBedPrice}
          keyboardType={'number-pad'}
          editable={isExtraBedChecked}
          isSecure={false}
          style={styles.textInput}
        />
      </View>

      <DividerComponent />

      {/* Add More Features Button */}
      <View style={styles.addButtonContainer}>
        <IconButtonComponent
          iconName="plus" // FontAwesome icon name for the plus symbol
          label="Add more features"
          onPress={handleAddFeature} // Handler when the button is pressed
          buttonStyle={styles.addButton} // Custom styles for the button
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {    
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  textInput: {
    width: "80%",
  },
  addButtonContainer: {
    marginTop: 20, // Adds spacing at the top
    alignItems: 'center', // Center the button horizontally
  },
  addButton: {
    backgroundColor: theme.colors.primary, // You can change the background color if needed
    width: 200, // Adjust the width of the button
  }
});
