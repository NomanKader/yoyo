import {View, Text, Alert} from 'react-native';
import {CommonStyles} from '../../style/CommonStyles';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import TextInputComponent from '../../components/TextInput/TextInputComponent';
import {useEffect, useState} from 'react';
import PhoneInputComponent from '../../components/TextInput/PhoneInputComponent';
import DropdownPickerComponent from '../../components/Dropdown/DropdownPickerComponent';
import RoomService from '../../services/RoomService';
import DatePickerComponent from '../../components/DatePicker/DatePickerComponent';
import {ScrollView} from 'react-native-gesture-handler';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';
import createIcon from '../../assets/icons/createIcon.png';

export default function CreateBookingScreen({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Room type hooks
  const [showRoomType, setShowRoomType] = useState(false);
  const [roomType, setRoomType] = useState('');
  const [roomTypeList, setRoomTypeList] = useState([]);

  // Room number list hooks
  const [showRoomNumberList, setShowRoomNumberList] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');
  const [roomNumberList, setRoomNumberList] = useState([]);

  const [dateOfArrival, setDateOfArrival] = useState(new Date());
  const [dateOfDeparture,setDateOfDeparture]=useState(new Date());

  useEffect(() => {
    const gettingRoomType = async () => {
      const roomData = await RoomService.GetRoomCategory(setRoomTypeList);
      const formattedRoomData = roomData.map(room => ({
        label: room.roomName,
        value: room.id,
      }));
      console.log('Formatted Room Data', formattedRoomData);
      setRoomTypeList(formattedRoomData);
    };
    gettingRoomType();
  }, []);

  useEffect(() => {
    const gettingRoomNumber = async () => {
      const roomData = await RoomService.GetRoomList(setRoomNumberList);
      const formattedRoomData = roomData.map(room => ({
        label: room.roomNumber,
        value: room.roomNumber, 
      }));
      setRoomNumberList(formattedRoomData);
    };
    gettingRoomNumber();
  }, []);

  return (
    <ScrollView>
      <View style={CommonStyles.scrollViewContainer}>
        <DetailAppBarComponent
          title={'Create Booking'}
          navigation={navigation}
        />

        <TextInputComponent
          label={'Name'}
          placeholder={'Enter your full name'}
          value={name}
          onChangeText={setName}
          keyboardType={'default'}
        />

        <TextInputComponent
          label={'Email'}
          placeholder={'Enter your email'}
          value={email}
          onChangeText={setEmail}
          keyboardType={'default'}
        />

        <PhoneInputComponent
          label={'Phone number'}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <View style={styles.dropdownContainer}>
          <Text style={CommonStyles.infoLabel}>Room Type</Text>
          <DropdownPickerComponent
            open={showRoomType}
            setOpen={setShowRoomType}
            value={roomType}
            setValue={setRoomType}
            items={roomTypeList}
            setItems={setRoomTypeList}
            placeholder={'Select Room Type'}
          />
        </View>

        {roomType && (
          <>
            <View style={styles.dropdownContainer}>
              <Text style={CommonStyles.infoLabel}>Room Number</Text>
              <DropdownPickerComponent
                open={showRoomNumberList}
                setOpen={setShowRoomNumberList}
                value={roomNumber}
                setValue={setRoomNumber}
                items={roomNumberList}
                setItems={setRoomNumberList}
                placeholder={'Select Room Number'}
              />
            </View>

            <Text style={CommonStyles.infoLabel}>Date Of Arrival</Text>
            <DatePickerComponent
              label="Select a date"
              date={dateOfArrival}
              setDate={setDateOfArrival}
            />

            <Text style={CommonStyles.infoLabel}>Date Of Departure</Text>
            <DatePickerComponent
              label="Select a date"
              date={dateOfDeparture}
              setDate={setDateOfDeparture}
            />
          </>
        )}        
        <DefaultButtonComponent
          title={'Continue'}
          backgroundColor={theme.colors.primary}
          onPress={() =>
            navigation.navigate('AppStack', {
              screen: 'SuccessScreen',
              params: {
                header: 'Reservation Successful',
                subheader : `Reservation for ${roomNumber} is successful and the ID is CAL7394748`,
                nextScreen: 'HomeScreen', // Or any other screen you want to navigate to next
                nextScreenParams: {
                  /* any parameters you want to pass to the next screen */
                },
                icon:createIcon
              },
            })
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = {
  scrollViewContainer: {
    padding: 20,
    backgroundColor: theme.colors.textLight,
  },
  dropdownContainer: {
    zIndex: 10, // Ensures the dropdown appears above other components
    marginTop: 10,
  },
};
