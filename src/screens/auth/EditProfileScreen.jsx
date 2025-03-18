import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Picker } from "@react-native-picker/picker";

export default function EditProfileScreen({ navigation }) {
  const [profilePic, setProfilePic] = useState(require("../../assets/images/profileImage.png"));
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("Allex Nail");
  const [email, setEmail] = useState("allexnail@gmail.com");
  const [phone, setPhone] = useState("2615 6125 6125");
  const [country, setCountry] = useState("Indonesia");
  const [userType, setUserType] = useState("Buyer");

  // Function to handle Image Selection
  const handleChoosePhoto = (type) => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };

    const callback = (response) => {
      if (response.didCancel) {
        console.log("User cancelled image selection");
      } else if (response.errorMessage) {
        console.log("Error:", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setProfilePic({ uri: response.assets[0].uri });
        setModalVisible(false);
      }
    };

    if (type === "camera") {
      launchCamera(options, callback);
    } else {
      launchImageLibrary(options, callback);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <Image source={profilePic} style={styles.profileImage} />
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="edit-2" size={14} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileRole}>Buyer</Text>
      </View>

      {/* Form Fields */}
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone</Text>
        <View style={styles.phoneContainer}>
          <Text style={styles.countryCode}>+66</Text>
          <TextInput
            style={styles.phoneInput}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <Text style={styles.label}>Country</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={country}
            onValueChange={(itemValue) => setCountry(itemValue)}
          >
            <Picker.Item label="Indonesia" value="Indonesia" />
            <Picker.Item label="Thailand" value="Thailand" />
            <Picker.Item label="Myanmar" value="Myanmar" />
          </Picker>
        </View>

        <Text style={styles.label}>User Type</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={userType}
            onValueChange={(itemValue) => setUserType(itemValue)}
          >
            <Picker.Item label="Buyer" value="Buyer" />
            <Picker.Item label="Seller" value="Seller" />
          </Picker>
        </View>

        {/* Save Profile Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Image Picker Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose an Option</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleChoosePhoto("camera")}
            >
              <Icon name="camera" size={20} color="#FFF" />
              <Text style={styles.modalButtonText}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleChoosePhoto("gallery")}
            >
              <Icon name="image" size={20} color="#FFF" />
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 20,
    paddingTop: 30,
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
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 50,
    right: 135,
    backgroundColor: "#007BFF",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileRole: {
    fontSize: 14,
    color: "#777",
  },
  form: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F0F0F0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 12,
  },
  dropdown: {
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#0047AB",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay for dimming effect
  },
  modalContent: {
    width: 300,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5, // Shadow for modal
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginVertical: 5,
    justifyContent: "center",
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    marginLeft: 10,
  },
  modalCancel: {
    marginTop: 10,
  },
  modalCancelText: {
    fontSize: 16,
    color: "#FF0000",
  },
});

