import { StyleSheet, Text, View,Dimensions } from 'react-native'
import {useState} from 'react'
import theme from "../../style/colors";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import TextInputComponent from '../../components/TextInput/TextInputComponent';
import PhoneInputComponent from '../../components/TextInput/PhoneInputComponent';
import DateInputComponent from '../../components/TextInput/DateInputComponent';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import DefaultButtonComponent from "../../components/Button/DefaultButtonComponent";
import DropdownPickerComponent from '../../components/Dropdown/DropdownPickerComponent';
import { CommonStyles } from '../../style/CommonStyles';
import TextAreaComponent from '../../components/TextInput/TextAreaComponent';

const {width,height} = Dimensions.get('window')

const RefundForm = ({navigation}) => {
  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description,setDescription] = useState('');
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
                title='Refund Form'
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

                  <Text style={CommonStyles.formLabel}>Refund description</Text>
                  <TextAreaComponent
                    value={description}
                    onChangeText={setDescription}
                    placeholder=''
                    numberOfLines = {4}
                    // backgroundColor = '#F5F5F5'
                    borderRadius = {10}
                  />
                  
                  <DefaultButtonComponent 
                    title='Request refund'
                    backgroundColor={theme.colors.primary}
                    onPress={() => {navigation.navigate('AppStack', { screen: 'RefundRequestCompleteScreen' })}}
                    // onPress={() => Alert.alert('hi')}
                    color={theme.colors.textLight}
                    otherStyle={{width:width*0.9,height:height*0.07,alignSelf:'center',marginTop:25}}
                    otherTextStyle={{fontSize:16}}
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

export default RefundForm

const styles = StyleSheet.create({})