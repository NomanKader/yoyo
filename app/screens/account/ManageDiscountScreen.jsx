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
import { GetRoomList } from '../../services/RoomService';
import ListSkeletonComponent from '../../components/Skeleton/ListSkeletonComponent';
import BookingSkeletonComponent from '../../components/Skeleton/BookingSkeletonComponent';

export default function ManageDiscountScreen({navigation}) {
  const [description, setDescription] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false); // Use state for visibility
  const [selectedImage, setSelectedImage] = useState(null); // State to hold selected image URI
  const [data,setData]=useState([]);
  useEffect(()=>{    
    const getRoomList=async()=>{
      setTimeout(()=>{
         GetRoomList(setData)
      },3000)      
    }
    getRoomList();
  },[])
  // Handle image selection (from Camera or Gallery)
  const handleImageSelection = image => {
    if (image && image.assets && image.assets.length > 0) {
      setSelectedImage(image.assets[0].uri); // Set the selected image URI
    }
  };

  return (
    data.length>0?(
    <ScrollView style={CommonStyles.container}>
      <View style={CommonStyles.scrollViewContainer}>
        <DetailAppBarComponent title={'Add Discount'} navigation={navigation} />
        <DividerComponent />

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
            {/* If an image is selected, display it; otherwise, show the upload icon */}
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{marginTop: 25}}>Standard room without breakfast.</Text>
          <CheckBoxComponent
            label={''}
            isChecked={true}
            onToggle={() => console.log('')}
          />
        </View>
        <View style={CommonStyles.infoContainer}>
          
        </View>
      </View>

      {/* Display the UploadBottomSheetComponent */}
      {isBottomSheetVisible && (
        <UploadBottomSheetComponent
          isVisible={isBottomSheetVisible}
          onClose={() => setIsBottomSheetVisible(false)} // Close the bottom sheet on user action
          title={'Choose Options to upload'}
          onImageSelected={handleImageSelection} // Pass the handler to handle image selection
        />
      )}
    </ScrollView>):(
      <View style={CommonStyles.scrollViewContainer}>
      <BookingSkeletonComponent/>
      <BookingSkeletonComponent/>
      <BookingSkeletonComponent/>
      </View>
    )
  );
}
