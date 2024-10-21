import { Image, StyleSheet, Text, View } from 'react-native'
import {useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DetailAppBarComponent from '../../../components/AppBar/DetailAppBarComponent'
import RoomCategoryListComponent from '../../../components/List/RoomCategoryListComponent'
import DividerComponent from '../../../components/Divider/DividerComponent'
import BottomSheetComponent from '../../../components/BottomSheet/BottomSheetComponent'
import { CommonStyles } from '../../../style/CommonStyles'
import discountIcon from '../../../assets/icons/discountIcon.png'
import DefaultButtonComponent from '../../../components/Button/DefaultButtonComponent'
import theme from '../../../style/colors'
import CarouselSkeletonComponent from '../../../components/Skeleton/CauroselSkeletonComponent'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ListSkeletonComponent from '../../../components/Skeleton/ListSkeletonComponent'
import DummyData from '../../../config/DummyData.json'


const RoomListAll = ({navigation}) => {
    const [visible,SetVisible] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(()=>{
      const timer = setTimeout(() => setShowLoading(false), 2000);
  
      // Cleanup timer on unmount
      return () => clearTimeout(timer);
    })
  
    if(showLoading){
      return(
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={[CommonStyles.scrollViewContainer]}>
            <CarouselSkeletonComponent />
            <ListSkeletonComponent />
        </View>
        </GestureHandlerRootView>
      )
    }

    const data2 = DummyData.data2;

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={[CommonStyles.scrollViewContainer,{flexGrow:1}]}>
          <DetailAppBarComponent title='Standard Room' navigation={navigation}  />
          <DividerComponent />
          <RoomCategoryListComponent 
                data={data2}
                navigation={navigation}
                type=''
                onPress={() => SetVisible(true)}
            />
          <BottomSheetComponent
            title='Do you know?'
            isVisible={visible}
            onClose={() => SetVisible(false)}
            snapPoints={['60%','80%']}
          >
            <View style={{flex:1}}>
              <View style={styles.imgContainer}>
                <Image source={discountIcon} style={styles.image} />
              </View>
              <Text style={[CommonStyles.subTitle,{height:110,marginTop:50,marginBottom:20,textAlign:'center',fontSize:24}]}>Booking with an account is 10% discount on reservation.</Text>
              <DefaultButtonComponent 
                title='Book with an account'
                backgroundColor={theme.colors.primary}
                color={theme.colors.textLight}
                otherStyle={{height:60,borderRadius:30}}
                onPress={()=> navigation.navigate('AppStack', { screen: 'ReservationFormScreen' })}
              />
              <DefaultButtonComponent 
                title='Book without account'
                backgroundColor={theme.colors.textLightGray}
                color={theme.colors.textDark}
                otherStyle={{height:60,borderRadius:30}}
                onPress={()=> navigation.navigate('AppStack', { screen: 'ReservationFormScreen' })}
              />

            </View>
          </BottomSheetComponent>
        </View>
    </SafeAreaView>
  )
}

export default RoomListAll

const styles = StyleSheet.create({
  imgContainer :{
    justifyContent:'center',
    alignItems:'center',
    marginTop:20
  },
  image:{
    width:90,
    height:90
  }

})