import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import {CommonStyles} from '../../style/CommonStyles';
import {useEffect, useState} from 'react';
import TextAreaComponent from '../../components/TextInput/TextAreaComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import TextInputComponent from '../../components/TextInput/TextInputComponent';
import uploadIcon from '../../assets/icons/uploadIcon.png'; // Default upload icon
import UploadBottomSheetComponent from '../../components/BottomSheet/UploadBottomSheetComponent';
import CheckBoxComponent from '../../components/Checkbox/CheckboxComponent';
import ChipComponent from '../../components/Chip/ChipComponent';
import {GetRoomList} from '../../services/RoomService';
import ListSkeletonComponent from '../../components/Skeleton/ListSkeletonComponent';
import RadioButtonComponent from '../../components/Radio/RadioButtonComponent';
import DatePickerInputComponent from '../../components/DatePicker/DatePickerComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';

export default function ManageDiscountScreen({navigation}) {
  const [description, setDescription] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false); // Use state for visibility
  const [selectedImage, setSelectedImage] = useState(null); // State to hold selected image URI
  const [data, setData] = useState([]);

  const [startDate, setStartDate] = useState(); // State for start date
  const [endDate, setEndDate] = useState(); // State for end date

  const [showChipsStandard, setShowChipsStandard] = useState(true); // Standard room without breakfast
  const [showChipsKing, setShowChipsKing] = useState(false); // Standard King Room
  const [showChipsExecutive, setShowChipsExecutive] = useState(false); // Executive Room
  const [selectedDiscountType, setSelectedDiscountType] = useState('amount'); // 'amount' or 'percent'
  const discountOptions = [
    { id: 'amount', label: 'Discount Amount' },
    { id: 'percent', label: 'Discount %' },
  ];
  const [discountAmount,setDiscountAmount]=useState();

  useEffect(() => {
    const getRoomList = async () => {
      setTimeout(() => {
        GetRoomList(setData);
      }, 3000);
    };
    getRoomList();
  }, []);

  // Handle image selection (from Camera or Gallery)
  const handleImageSelection = image => {
    if (image && image.assets && image.assets.length > 0) {
      setSelectedImage(image.assets[0].uri); // Set the selected image URI
    }
  };

  const handleRadioPress = (id) => {
    setSelectedDiscountType(id); // Update selected option
  };
  const filteredStandardRooms = data.filter(
    room => room.roomCategory === 'Standard room without breakfast',
  );
  return data.length > 0 ? (
    <View style={CommonStyles.container}>
      <View style={CommonStyles.scrollViewContainer}>
        <DetailAppBarComponent title={'Add Discount'} navigation={navigation} />
        <DividerComponent />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Discount Description */}
          <View style={CommonStyles.dividerView}>
            <Text style={CommonStyles.infoLabel}>
              Voucher Discount Code Description
            </Text>
            <TextAreaComponent
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
              numberOfLines={6}
            />
          </View>

          {/* Discount Code Input */}
          <View style={CommonStyles.dividerView}>
            <TextInputComponent
              label={'Enter discount code'}
              placeholder={'Enter discount voucher code'}
              value={discountCode}
              onChangeText={setDiscountCode}
              keyboardType={'default'}
            />
          </View>

          {/* Discount Banner Upload */}
          <View style={CommonStyles.dividerView}>
            <Text style={CommonStyles.infoLabel}>Discount banner</Text>
            <TouchableOpacity onPress={() => setIsBottomSheetVisible(true)}>
              {selectedImage ? (
                <Image
                  source={{uri: selectedImage}}
                  style={{width: 100, height: 100}}
                />
              ) : (
                <Image source={uploadIcon} style={{width: 25, height: 25}} />
              )}
            </TouchableOpacity>
          </View>
          {/* Room Category Checkboxes */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{marginTop: 25}}>Standard room without breakfast</Text>
            <CheckBoxComponent
              label={''}
              isChecked={showChipsStandard}
              onToggle={() => setShowChipsStandard(!showChipsStandard)}
            />
          </View>
          {/* Room Chip Components */}
          {showChipsStandard && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                gap: 15,
                marginTop: 20,
              }}>
              {filteredStandardRooms.map(room => (
                <ChipComponent key={room.id} label={room.roomNumber} />
              ))}
            </View>
          )}

          {/* Discount Type */}
          <View style={CommonStyles.infoContainer}>
            <Text style={CommonStyles.header}>Choose Discount Type</Text>           
          </View>
          <RadioButtonComponent
            radioButtons={discountOptions}
            selectedId={selectedDiscountType}
            onRadioPress={handleRadioPress}
          />

          {/* Discount Amount or Percentage */}
          <TextInputComponent
            label={selectedDiscountType === 'amount' ? 'Enter discount amount' : 'Enter discount %'}
            placeholder={selectedDiscountType === 'amount' ? 'Enter discount amount' : 'Enter discount %'}
            value={discountAmount}
            onChangeText={setDiscountAmount}
            keyboardType={'number-pad'}
          />
                   {/* Start Date */}
                   <View style={CommonStyles.dividerView}>
            <DatePickerInputComponent
              label="Start Date"
              date={startDate}
              setDate={setStartDate}
            />
          </View>

          {/* End Date */}
          <View style={CommonStyles.dividerView}>
            <DatePickerInputComponent
              label="End Date"
              date={endDate}
              setDate={setEndDate}
            />
          </View>
          <DefaultButtonComponent title={"Confirm"} backgroundColor={theme.colors.primary} color={theme.colors.textLight} onPress={()=>console.log("Continue click")}/>
        </ScrollView>
      </View>

      {/* Display the UploadBottomSheetComponent */}
      {isBottomSheetVisible && (
        <UploadBottomSheetComponent
          isVisible={isBottomSheetVisible}
          onClose={() => setIsBottomSheetVisible(false)}
          title={'Choose Options to upload'}
          onImageSelected={handleImageSelection}
        />
      )}
    </View>
  ) : (
    <View style={CommonStyles.scrollViewContainer}>
      <ListSkeletonComponent />
      <ListSkeletonComponent />
      <ListSkeletonComponent />
    </View>
  );
}
