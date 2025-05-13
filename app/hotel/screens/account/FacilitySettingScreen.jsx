import {ScrollView, Text, View, StyleSheet, Platform} from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import {CommonStyles} from '../../style/CommonStyles';
import DividerComponent from '../../components/Divider/DividerComponent';
import DropdownPickerComponent from '../../components/Dropdown/DropdownPickerComponent';
import {useState} from 'react';
import TextInputComponent from '../../components/TextInput/TextInputComponent';
import RoundButtonComponent from '../../components/Button/RoundButtonComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';

export default function FacilitySettingScreen({navigation}) {
  const [open, setOpen] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [facilityOptions, setFacilityOptions] = useState([
    {label: 'Wifi', value: 'wifi'},
    {label: 'Wine Bottle', value: 'wine_bottle'},
    {label: 'Gym Access', value: 'gym_access'},
    {label: 'Swimming Pool Access', value: 'swimming_pool_access'},
    {label: 'Extra Bed', value: 'extra_bed'},
  ]);
  const [facilityName, setFacilityName] = useState('');
  return (
    <View style={CommonStyles.scrollViewContainer}>
      {/* Use View with flex and margin instead of ScrollView */}
      <View style={{flex: 1, marginBottom: open ? 200 : 0}}>
        <DetailAppBarComponent
          title={''}
          navigation={navigation}
          onMorePress={null}
        />
        <DividerComponent />
        <Text style={CommonStyles.header}>Add more facility to request</Text>
        <Text style={CommonStyles.subHeader}>
          Please all the advanced request{' '}
        </Text>
        <View style={{marginTop: 30}}>
          <Text style={CommonStyles.infoLabel}>Choose Setting</Text>
          <View style={CommonStyles.room.inputContainer}>
            <DropdownPickerComponent
              open={open}
              value={selectedFacilities}
              items={facilityOptions}
              setOpen={setOpen}
              setValue={setSelectedFacilities}
              setItems={setFacilityOptions}
              multiple={true}
              placeholder="Select facilities"
              style={CommonStyles.picker.input}
              dropDownContainerStyle={[
                CommonStyles.picker.dropdown,
                open ? {height: 200, zIndex: 1000} : {},
              ]}
              zIndex={open ? 1000 : 1} // Adjust zIndex to ensure visibility
            />
          </View>
          <View>
            <TextInputComponent
              label={'Facility name'}
              placeholder={'Enter Facility Name'}
              value={facilityName}
              onChangeText={setFacilityName}
            />            
          </View>
          <View style={{marginTop:30}}>
            <RoundButtonComponent label={"+"} onPress={()=>console.log("")}/>
          </View>
        </View>
      </View>
      <DefaultButtonComponent title={"Request and proceed"} backgroundColor={theme.colors.primary} onPress={()=>console.log("")}/>
    </View>
  );
}
