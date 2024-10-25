import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import {useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent'
import DividerComponent from '../../components/Divider/DividerComponent'
import DummyData from '../../config/DummyData.json'
import BookingSkeletonComponent from '../../components/Skeleton/BookingSkeletonComponent'
import { CommonStyles } from '../../style/CommonStyles'
import CarouselComponent from '../../components/Caurosel/CauroselComponent'
import { FlatList } from 'react-native-gesture-handler'
import LeftRightText from '../../components/ConfirmPage/LeftRightText'
import qrImg from '../../assets/images/qrCode.png'
import BottomSheetComponent from '../../components/BottomSheet/BottomSheetComponent'
import PaymentListComponent from '../../components/List/PaymentListComponent'
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent'
import theme from '../../style/colors'

const {width,height} = Dimensions.get('window');

const CheckInDetail = ({navigation}) => {
    const [showLoading,setShowLoading] = useState(false)
    const [visible,setVisible] = useState(false);
    const [refundVisible,setRefundVisible]=useState(false)
    const data = DummyData.data;
    const details = DummyData.checkInDetail;

    if(showLoading){
        return(
        <>
          <DetailAppBarComponent title='' navigation={navigation}  />
          <BookingSkeletonComponent  />
        </>)
      } 


  return (
    <SafeAreaView style={{flex:1}}>
        <DetailAppBarComponent title='Check in Details' navigation={navigation} onMorePress={()=>{setVisible(true)}} />
        <View style={[CommonStyles.scrollViewContainer,{flexGrow:1}]}>
            
            <DividerComponent />
            <FlatList 
                ListHeaderComponent={
                    <>
                        <CarouselComponent data={data} setShowLoading={setShowLoading} navigation={navigation} carouselType='roomDetail' />
                        <View style={styles.header}>
                            <View>
                                <Text style={CommonStyles.subTitle}>CAL-782 347</Text>
                                <Text style={CommonStyles.text}>Standard Rooms. Room No-406</Text>
                            </View>
                            <Image source={qrImg} style={styles.qr} />
                        </View>
                    </>
                }
                data={details}
                keyExtractor={(item) => item.label}
                renderItem={ ({ item }) => <LeftRightText label={item.label} value={item.value} />}
            />
        </View>
        <BottomSheetComponent
            title='More'
            isVisible={visible}
            onClose={() => setVisible(false)}
            snapPoints={['50%','70%']}
        >
            <PaymentListComponent
              icon='data:image/png;base64,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'
              title='View Hotel'
            //   description='Make instant payment with ATM Card'
              onPress={() => {navigation.navigate('AppStack', { screen: 'ReserveConfirmScreen' })}}
            />
            <PaymentListComponent
              icon='data:image/png;base64,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'
              title='Read room rules'
            //   description='Make instant payment with ATM Card'
              onPress={() => {navigation.navigate('AppStack', { screen: 'ReserveConfirmScreen' })}}
            />
            <PaymentListComponent
              icon='data:image/png;base64,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'
              title='Request refund'
            //   description='Make instant payment with ATM Card'
              onPress={() => {
                setVisible(false)
                setRefundVisible(true)
            }}
            />
         </BottomSheetComponent>

         <BottomSheetComponent
            title='Request refund'
            isVisible={refundVisible}
            onClose={() => setRefundVisible(false)}
            snapPoints={['35%','50%']}
        >
            <Text style={CommonStyles.formLabel}>You can request refund</Text>
            <DefaultButtonComponent 
            title='Proceed'
            backgroundColor={theme.colors.primary}
            color={theme.colors.textLight}
            otherStyle={{width:width*0.9,height:height*0.07,marginTop:height*0.1,alignSelf:'center'}}
            otherTextStyle={{fontSize:16}}
            onPress={() => {navigation.navigate('AppStack', { screen: 'RefundFormScreen' })}}
            
            />
        </BottomSheetComponent>
    </SafeAreaView>
  )
}

export default CheckInDetail

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:7
    },
    qr:{
        width:70,
        height:70
    }
})