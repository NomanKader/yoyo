import {ScrollView, Text, View, StyleSheet, Platform} from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import {CommonStyles} from '../../style/CommonStyles';
import DividerComponent from '../../components/Divider/DividerComponent';
import TextInputComponent from '../../components/TextInput/TextInputComponent';
import RoundButtonComponent from '../../components/Button/RoundButtonComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import LoadingModalComponent from '../../../common/components/LoadingModalComponent';
import theme from '../../style/colors';
import {useState} from 'react';

export default function FacilitySettingScreen({navigation}) {
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [apiStatus, setApiStatus] = useState('loading'); // loading, success, error
  const [apiMessage, setApiMessage] = useState('Calling API...');
  const [facilities, setFacilities] = useState([{name: '', price: ''}]);

  const handleAddFacility = () => {
    setFacilities([...facilities, {name: '', price: ''}]);
  };

  const handleChangeFacility = (index, field, value) => {
    const updated = [...facilities];
    updated[index][field] = value;
    setFacilities(updated);
  };

  const handleSubmit = async () => {
    setApiStatus('loading');
    setApiMessage('Submitting your request...');
    setModalVisible(true);

    try {
      // await your API call
      await fakeApiCall();
      setApiStatus('success');
      setApiMessage('Request submitted successfully!');
    } catch (error) {
      setApiStatus('error');
      setApiMessage('Failed to submit request. Please try again.');
    }

    // auto close after 2 seconds
    setTimeout(() => setModalVisible(false), 2000);
  };

  return (
    <ScrollView style={CommonStyles.scrollViewContainer}>
      <View style={{flex: 1}}>
        <DetailAppBarComponent
          title={''}
          navigation={navigation}
          onMorePress={null}
        />
        <DividerComponent />
        <Text style={CommonStyles.header}>Add more facility to request</Text>
        <Text style={CommonStyles.subHeader}>
          Please all the advanced request
        </Text>

        <View style={{marginTop: 30}}>
          {facilities.map((item, index) => (
            <View key={index} style={{marginBottom: 20}}>
              <TextInputComponent
                label={'Facility name'}
                placeholder={'Enter Facility Name'}
                value={item.name}
                onChangeText={text => handleChangeFacility(index, 'name', text)}
              />
              <TextInputComponent
                label={'Price'}
                placeholder={'Enter Facility Price'}
                value={item.price}
                onChangeText={text =>
                  handleChangeFacility(index, 'price', text)
                }
              />
            </View>
          ))}
          <View style={{marginTop: 10,marginBottom:20}}>
            <RoundButtonComponent label={'+'} onPress={handleAddFacility} />
          </View>
        </View>
      </View>
      <DefaultButtonComponent
        title={'Request and proceed'}
        backgroundColor={theme.colors.primary}
        onPress={handleSubmit}
      />
    </ScrollView>
  );
}
