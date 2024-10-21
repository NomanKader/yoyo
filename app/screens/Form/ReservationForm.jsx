import { StyleSheet, Text, View,TouchableOpacity, Alert } from 'react-native'
import {useState} from 'react'
import theme from "../../style/colors";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import TextInputComponent from '../../components/TextInput/TextInputComponent';
import PhoneInputComponent from '../../components/TextInput/PhoneInputComponent';
import DateInputComponent from '../../components/TextInput/DateInputComponent';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import DefaultButtonComponent from "../../components/Button/DefaultButtonComponent";
import DropdownPickerComponent from '../../components/Dropdown/DropdownPickerComponent';
import { CommonStyles } from '../../style/CommonStyles';

const ReservationForm = ({navigation}) => {
  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [days, setDays] = useState(0);
    const [showLoading, setShowLoading] = useState(false);

    const [rtOpen, setRtOpen] = useState(false);
    const [rtValue, setRtValue] = useState(null);
    const [roomTypes, setRoomTypes] = useState([
      { label: 'Standard Rooms', value: 'standard' },
      { label: 'Deluxe Rooms', value: 'deluxe' },
      { label: 'Executive Rooms', value: 'executive' },
    ]);

    const [rnOpen, setRnOpen] = useState(false);
    const [rnValue, setRnValue] = useState(null);
    const [roomNumber, setRoomNumber] = useState([
      { label: '201', value: '201' },
      { label: '202', value: '202' },
      { label: '203', value: '203' },
      { label: '204', value: '204' },
    ]);
  
    const isButtonDisabled = name === '' || phone === '' || rtValue === '' || rnValue === '';
  
    return (
      <SafeAreaView style={{flex:1}}>
        <FlatList 
          ListHeaderComponentStyle={CommonStyles.container}
          ListHeaderComponent={
            <>
              <DetailAppBarComponent 
                title='Reservation Form'
                navigation={navigation} 
              />
              <DividerComponent />

              <View style={CommonStyles.scrollViewContainer}>
                
                <View style={{width:'100%'}}>

                  <TextInputComponent
                    label='Name'
                    placeholder='Name...'
                    value={name} 
                    onChangeText={setName}
                    keyboardType='' 
                    isSecure={false}
                  />

                  <TextInputComponent
                    label='Email Address'
                    placeholder='Email...'
                    value={email} 
                    onChangeText={setEmail}
                    keyboardType='email-address' 
                    isSecure={false}
                  />
                  <PhoneInputComponent
                    label='Phone Number'
                    value={phone}
                    onChange={setPhone}
                  />
                  

                  <Text style={CommonStyles.formLabel}>Room Type</Text>
                  <DropdownPickerComponent 
                    open={rtOpen}
                    setOpen={setRtOpen}
                    value={rtValue}
                    setValue={setRtValue}
                    items={roomTypes}
                    setItems={setRoomTypes}
                    placeholder="Select a room type"
                  />

                  <Text style={CommonStyles.formLabel}>Room Number</Text>
                  <DropdownPickerComponent 
                    open={rnOpen}
                    setOpen={setRnOpen}
                    value={rnValue}
                    setValue={setRnValue}
                    items={roomNumber}
                    setItems={setRoomNumber}
                    placeholder="Select a room number"
                    containerStyle={{zIndex:4999}}
                  />

                  <TextInputComponent
                    label='Number of days'
                    placeholder='Number of days...'
                    value={days} 
                    onChangeText={setDays}
                    keyboardType='numeric' 
                    isSecure={false}
                  />

                  <DateInputComponent
                    title='Date of arrival'
                  />
                  
                  

                  <DefaultButtonComponent 
                    title='Continue'
                    backgroundColor={theme.colors.primary}
                    onPress={() => {navigation.navigate('AppStack', { screen: 'ReserveMethodScreen' })}}
                    // onPress={() => Alert.alert('hi')}
                    color={theme.colors.textLight}
                    otherStyle={{width:370,height:60,marginBottom:20,marginTop:30}}
                    otherTextStyle={{fontSize:22}}
                    // disable={isButtonDisabled || showLoading}
                  />

                  {showLoading && <ActivityIndicator size='large' />}
                  
                  
                  
                  

                </View>
              </View>
            </>
          }
        />
        {/* <ScrollView style={CommonStyles.container} >
          
        </ScrollView> */}
      </SafeAreaView>
    );
}

export default ReservationForm

const styles = StyleSheet.create({})