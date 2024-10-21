import { StyleSheet, Text, View } from 'react-native'
import {useState,useEffect} from 'react'
import { CommonStyles } from '../../../style/CommonStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import CarouselComponent from '../../../components/Caurosel/CauroselComponent'
import DetailAppBarComponent from '../../../components/AppBar/DetailAppBarComponent'
import RoomCategoryListComponent from '../../../components/List/RoomCategoryListComponent'
import DividerComponent from '../../../components/Divider/DividerComponent'
import SeeMoreComponent from '../../../components/screen/SeeMoreComponent'
import CarouselSkeletonComponent from '../../../components/Skeleton/CauroselSkeletonComponent'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import ListSkeletonComponent from '../../../components/Skeleton/ListSkeletonComponent'
import DummyData from '../../../config/DummyData.json'


const RoomCategory = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(true);

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

  const data = DummyData.data;

  const data2 = DummyData.data2;


  if(showLoading){
    return(<BookingSkeletonComponent />)
  }

  return (

    <SafeAreaView style={{flex:1}}>
      <View style={[CommonStyles.scrollViewContainer,{flexGrow:1}]}>
          <DetailAppBarComponent title='' navigation={navigation}  />
          <DividerComponent />
            <View>
              <CarouselComponent data={data} setShowLoading={setShowLoading} navigation={navigation} carouselType='roomList' />
              <Text style={CommonStyles.subTitle}>A Hotels</Text>
              <Text style={CommonStyles.text}>
                  
                  120 Baho Road,Hlaing, Yangon
              </Text>
              
            </View>
            
            <SeeMoreComponent title='Room Categories' onPress={()=> navigation.navigate('RoomCategoryAllScreen')} />
            <RoomCategoryListComponent 
                data={data2}
                navigation={navigation}
                type='category'
                onPress={() => navigation.navigate('AppStack', { screen: 'RoomListScreen' })}
            />
      </View>
      <View>
        
      </View>
    </SafeAreaView>

  )
}

export default RoomCategory

const styles = StyleSheet.create({})