import { StyleSheet, Text, View,TouchableOpacity, Alert } from 'react-native'
import {useState} from 'react'
import theme from "../../style/colors";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import TextIconInputComponent from '../../components/TextInput/TextIconInputComponent';
import TextInputComponent from '../../components/TextInput/TextInputComponent';
import DateInputComponent from '../../components/TextInput/DateInputComponent';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import DefaultButtonComponent from "../../components/Button/DefaultButtonComponent";
import { CommonStyles } from '../../style/CommonStyles';
import LeftRightText from '../../components/ConfirmPage/LeftRightText';

const PaymentForm = ({navigation}) => {
  const [name, setName] = useState('');
    const [card, setCard] = useState(0);
    const [CVV, setCVV] = useState(0);
    const [expireDate,setExpireDate] = useState('')
    const [showLoading, setShowLoading] = useState(false);

  
    const isButtonDisabled = name === '' ;
  
    return (
      <SafeAreaView style={{flex:1,position:'relative'}}>
        <FlatList 
          ListHeaderComponentStyle={CommonStyles.container}
          ListHeaderComponent={
            <>
              <DetailAppBarComponent 
                title='Payment'
                navigation={navigation} 
              />
              <DividerComponent />

              <View style={CommonStyles.scrollViewContainer}>
                
                <View style={{width:'100%'}}>

                  <TextInputComponent
                    label='Name on card'
                    placeholder='Enter Name'
                    value={name} 
                    onChangeText={setName}
                    keyboardType='' 
                    isSecure={false}
                  />

                    <TextIconInputComponent
                    label='Card Number'
                    placeholder='xxxx xxxx xxxx xxxx'
                    value={card} 
                    onChangeText={setCard}
                    keyboardType='numeric' 
                    isSecure={false}
                    />

                  {/* <Text style={CommonStyles.formLabel}>Room Number</Text> */}
                  

                  <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <TextInputComponent
                            label='CVV'
                            placeholder='CVV...'
                            value={CVV} 
                            onChangeText={setCVV}
                            keyboardType='numeric' 
                            isSecure={false}
                        />
                    </View>

                    <View style={{flex:1,marginLeft:10}}>
                        <DateInputComponent
                            title='Date of arrival'
                        />
                    </View>
                  </View>
                  
                  

                  

                  {showLoading && <ActivityIndicator size='large' />}
                  
                  
                  
                  

                </View>
                
              </View>
            </>
          }
        />
        <View style={{position:'absolute',bottom:0,alignSelf:'center'}}>
            <LeftRightText label='Amount' value='0.00' />
            <DefaultButtonComponent 
                title='Continue'
                backgroundColor={theme.colors.primary}
                onPress={() => {navigation.navigate('AppStack', { screen: 'ReserveCompleteScreen' })}}
                
                color={theme.colors.textLight}
                otherStyle={{width:370,height:60,marginBottom:20,marginTop:10}}
                otherTextStyle={{fontSize:22}}
                // disable={isButtonDisabled || showLoading}
            />
        </View>
        {/* <ScrollView style={CommonStyles.container} >
          
        </ScrollView> */}
      </SafeAreaView>
    );
}

export default PaymentForm

const styles = StyleSheet.create({})