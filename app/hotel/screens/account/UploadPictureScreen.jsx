import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import { PermissionsAndroid, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import DetailAppBarComponent from "../../components/AppBar/DetailAppBarComponent";
import DividerComponent from "../../components/Divider/DividerComponent";
import BottomSheetComponent from "../../components/BottomSheet/BottomSheetComponent";
import DefaultButtonComponent from "../../components/Button/DefaultButtonComponent";
import theme from "../../style/colors";
import plusIcon from "../../assets/icons/plusIcon.png";
import paymentSuccessIcon from "../../assets/icons/paymentSuccessIcon.png";

const chipLabels = ["Property", "Dining Area", "Gym"];

export default function UploadPictureScreen({ navigation }) {
  const [selectedChip, setSelectedChip] = useState("Property");
  const [imageGroups, setImageGroups] = useState({
    Property: [],
    "Dining Area": [],
    Gym: [],
  });  
  const currentImages = imageGroups[selectedChip];
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openBottomSheet = (index) => {
    setSelectedIndex(index);
    setIsBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const handleImagePick = (response) => {
    if (response.assets && response.assets[0].uri) {
      const updated = [...imageGroups[selectedChip]];
      if (selectedIndex !== null && selectedIndex < updated.length) {
        updated[selectedIndex] = { uri: response.assets[0].uri };
      } else {
        updated.push({ uri: response.assets[0].uri });
      }
  
      setImageGroups({ ...imageGroups, [selectedChip]: updated });
    }
    closeBottomSheet();
  };
  
  // const handleCamera = () => {
  //   launchCamera({ mediaType: "photo" }, handleImagePick);
  // };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs camera access to take pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS handles this via Info.plist
  };
  
  const handleCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.log("Camera permission denied");
      return;
    }
  
    launchCamera({ mediaType: "photo", includeBase64: true }, (response) => {
      if (!response.didCancel && response.assets) {
        const updated = [...imageGroups[selectedChip]];
        if (selectedIndex !== null && selectedIndex < updated.length) {
          updated[selectedIndex] = { uri: response.assets[0].uri };
        } else {
          updated.push({ uri: response.assets[0].uri });
        }
        setImageGroups({ ...imageGroups, [selectedChip]: updated });
      }
      closeBottomSheet();
    });
  };
  

  const handleGallery = () => {
    launchImageLibrary({ mediaType: "photo" }, handleImagePick);
  };

  const handleDeleteImage = (index) => {
    const updated = [...imageGroups[selectedChip]];
    updated.splice(index, 1);
    setImageGroups({ ...imageGroups, [selectedChip]: updated });
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <DetailAppBarComponent title={"Update Pictures"} navigation={navigation} />
        <DividerComponent />

        {/* Chips */}
        <View style={styles.chipContainer}>
          {chipLabels.map((label) => (
            <TouchableOpacity
              key={label}
              style={[
                styles.chip,
                selectedChip === label && styles.chipSelected,
              ]}
              onPress={() => setSelectedChip(label)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedChip === label && styles.chipTextSelected,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Image Grid */}
        <View style={styles.imageGrid}>
        {imageGroups[selectedChip].map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: image.uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => handleDeleteImage(index)}
              >
                <Icon name="delete" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Add Image Block */}
          <TouchableOpacity
            style={styles.addBlock}
            onPress={() => openBottomSheet(currentImages.length)}
          >
            <Icon name="add" size={32} color={theme.colors.primary} />
            <Text style={styles.addText}>Add Image</Text>
            <Text style={styles.sizeText}>( Max. size 5 MB )</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Update Button */}
      <View style={styles.buttonContainer}>
        <DefaultButtonComponent
          title="Update"
          backgroundColor={theme.colors.primary}
          onPress={() =>
            navigation.navigate("SuccessScreen", {
              header: "Hotel is updated Successfully",
              icon: paymentSuccessIcon,
              isShowingIllustration: true,
              buttonText: "Back to home",
              nextScreen: "TabStack",
              color: theme.colors.primary,
            })
          }
        />
      </View>

      {/* Bottom Sheet */}
      <BottomSheetComponent
        isVisible={isBottomSheetVisible}
        onClose={closeBottomSheet}
        title="Choose Options"
      >
        <TouchableOpacity style={styles.option} onPress={handleCamera}>
          <Icon name="photo-camera" size={20} color="#000" />
          <Text style={styles.optionText}>Camera</Text>
        </TouchableOpacity>
        <DividerComponent />
        <TouchableOpacity style={styles.option} onPress={handleGallery}>
          <Icon name="photo-library" size={20} color="#000" />
          <Text style={styles.optionText}>Gallery</Text>
        </TouchableOpacity>
      </BottomSheetComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   marginLeft: 20,
   marginRight: 20

  },
  chipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 20    
  },
  chip: {
    borderWidth: 1,
    borderColor: theme.colors.infoText,
    borderRadius: 20,
    paddingHorizontal: 30,    
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
  },
  chipText: {
    color: "#000",
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#fff",
  },
  imageGrid: {
    gap: 15,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Ensures the full image shows
  },
  
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    borderRadius: 12,
    padding: 4,
  },
  addBlock: {
    height: 180,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  addText: {
    fontWeight: "500",
    fontSize: 16,
    color: "#333",
  },
  sizeText: {
    fontSize: 12,
    color: "gray",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: "#fff",
  },
});
