import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StepAppBarComponent from "../../../components/AppBar/StepAppBarComponent";
import { CommonStyles } from "../../../style/CommonStyles";
import TextInputComponent from "../../../components/TextInput/TextInputComponent";
import theme from "../../../style/colors";
import DefaultButtonComponent from "../../../components/Button/DefaultButtonComponent";
import FullWidthCheckboxComponent from "../../../components/Checkbox/FullWidthCheckBoxComponent";
import { RoomCreationDataContext } from "../../../context/RoomCreationContext";
import LoadingModalComponent from "../../../../common/components/LoadingModalComponent";
import DropdownPickerComponent from "../../../components/Dropdown/DropdownPickerComponent";
import { useRoomData } from "../../../context/CreatCategoryContext";
import { Switch } from "react-native-gesture-handler";
import TextInputWithDropdown from "../../../../apartment/components/Dropdown/TextInputWithDropdown";
export default function RoomCategoryCreateScreen({ navigation }) {
  // from your new RoomDataContext
  const { roomData, updateRoomData } = useRoomData();

  // still using your existing creation context to fetch lists
  const { isLoading, reset, refresh, roomCreationData } = useContext(
    RoomCreationDataContext
  );

  const [openCategory, setOpenCategory] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [openBedTypeCategory, setOpenBedTypeCategory] = useState(false);
  const [bedTypeOptions, setBedTypeOptions] = useState([])
  const [sizeValue, setSizeValue] = useState("");
  const [sizeUnit, setSizeUnit] = useState("Sqm");

  const onlyNumber = (txt) => txt?.replace(/[^\d.]/g, "") ?? "";

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const types = roomCreationData?.roomTypes ?? [];
    if (Array.isArray(types) && types.length) {
      const options = types.map((rt) => ({
        label: `${rt.roomTypeName}`,
        value: rt.roomTypeId,
      }));
      setCategoryOptions(options);
    }
  }, [roomCreationData?.roomTypes]);
  useEffect(() => {
    console.log("bedtype", roomCreationData.bedTypes)
    const types = roomCreationData?.bedTypes ?? [];
    if (Array.isArray(types) && types.length) {
      const options = types.map((rt) => ({
        label: `${rt.bedTypeName}`,
        value: rt.id,
      }));
      setBedTypeOptions(options);
    }
  }, [roomCreationData?.bedTypes]);

  useEffect(() => {
    const val = onlyNumber(sizeValue).trim();
    const unit = sizeUnit || "Sqm";
    const combined = val ? `${val} ${unit}` : "";

    if (roomData?.roomSize !== combined) {
      updateRoomData({ roomSize: combined });
    }
  }, [sizeValue, sizeUnit, roomData?.roomSize, updateRoomData]);


  // react-native-dropdown-picker style setter: supports callback or value
  const handleSetRoomTypeId = (valOrFn) => {
    const next =
      typeof valOrFn === "function" ? valOrFn(roomData.roomTypeId) : valOrFn;
    updateRoomData({ roomTypeId: next });
  };
  const handleSetRoomBedTypeId = (valOrFn) => {
    const next =
      typeof valOrFn === "function" ? valOrFn(roomData.bedTypeId) : valOrFn;
    updateRoomData({ bedTypeId: next });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingModalComponent visible={isLoading} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={CommonStyles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <StepAppBarComponent
            title="Some Screen"
            currentStep="1"
            navigation={navigation}
            onBackPress={reset}
          />

          <Text style={CommonStyles.header}>Create Room Category</Text>
          <Text style={CommonStyles.subHeader}>
            Add a new room to your category of hotels using this form
          </Text>

          {/* Room Type -> roomTypeId */}
          <View style={CommonStyles.room.inputContainer}>
            <Text style={styles.label}>Room Type</Text>
            <DropdownPickerComponent
              open={openCategory}
              value={roomData.roomTypeId}
              items={categoryOptions}
              setOpen={setOpenCategory}
              setValue={handleSetRoomTypeId}
              setItems={setCategoryOptions}
              multiple={false}
              placeholder="Select room category"
              style={styles.input}
              dropDownContainerStyle={styles.dropdown}
            />
          </View>

          <View>
            <TextInputComponent
              placeholder="Category Name"
              value={roomData.description}
              onChangeText={(v) => updateRoomData({ description: v })}
              label="Category Name"
            />
          </View>

          {/* Price -> pricePerNight */}
          <View>
            <TextInputComponent
              placeholder="Price of room"
              value={roomData.pricePerNight}
              onChangeText={(v) => updateRoomData({ pricePerNight: parseInt(v) })}
              label="Price of Room"
              keyboardType="numeric"
            />
          </View>
          {/* <View>
            <TextInputComponent
              placeholder="Room Size"
              value={roomData.roomSize}
              onChangeText={(v) => updateRoomData({ roomSize: parseInt(v) })}
              label="Room Size"
              keyboardType="numeric"
            />
          </View> */}
          <TextInputWithDropdown
            label="Room Size"
            value={sizeValue}
            onChangeText={setSizeValue}
            dropdownValue={sizeUnit}
            setDropdownValue={setSizeUnit}
            dropdownData={[
              { label: "Sqm", value: "Sqm" },
              { label: "Sqft", value: "Sqft" },
            ]}
          />


          <View>
            <Text style={styles.label}>Bed Type</Text>
            <DropdownPickerComponent
              open={openBedTypeCategory}
              value={roomData.bedTypeId}
              items={bedTypeOptions}
              setOpen={setOpenBedTypeCategory}
              setValue={handleSetRoomBedTypeId}
              setItems={setCategoryOptions}
              multiple={false}
              placeholder="Select bed type"
              style={styles.input}
              dropDownContainerStyle={styles.dropdown}
            />
          </View>
          {roomData.bedTypeId && (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={[styles.label, { marginBottom: 0, marginEnd: 10 }]}>IsExtraBed?</Text>
              <Switch
                value={!!roomData.isExtraBed}
                onValueChange={(val) => {
                  updateRoomData({ isExtraBed: val })
                  updateRoomData({ isExtraBedAllowed: val })
                }}
              />
            </View>
          )}
          <FullWidthCheckboxComponent
            value={roomData.includesBreakfast}
            onChange={(val) => updateRoomData({ includesBreakfast: val })}
          />
        </ScrollView>

        <View style={styles.buttonContainer}>
          <DefaultButtonComponent
            title="Proceed"
            backgroundColor={theme.colors.primary}
            onPress={() => {
              navigation.navigate("RoomFacilityCreateScreen", {
                includesBreakfast: roomData.includesBreakfast, // optional
              })
              console.log("roomdata", roomData)
            }

            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flexGrow: 1,
  },
  buttonContainer: {
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
  },
  dropdown: {
    borderColor: "#ccc",
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#01070F',
  },
});
