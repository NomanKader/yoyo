import { StyleSheet, Text, View } from 'react-native'
import {useState,useEffect} from 'react'
import { CommonStyles } from '../../style/CommonStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import CarouselComponent from '../../components/Caurosel/CauroselComponent'
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent'
import RoomCategoryListComponent from '../../components/List/RoomCategoryListComponent'
import DividerComponent from '../../components/Divider/DividerComponent'
import SeeMoreComponent from '../../components/screen/SeeMoreComponent'
import BookingSkeletonComponent from '../../components/Skeleton/BookingSkeletonComponent'
import DummyData from '../../config/DummyData.json'
import { FlatList } from 'react-native-gesture-handler'



const RoomCategory = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(()=>{
    const timer = setTimeout(() => setShowLoading(false), 2000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  })

  const data = DummyData.data;

  const data2 = DummyData.data2;


  if(showLoading){
    return(
    <>
      <DetailAppBarComponent title='' navigation={navigation}  />
      <BookingSkeletonComponent  />
    </>)
  } 

  return (

    <SafeAreaView style={{flex:1}}>
      <View style={[CommonStyles.scrollViewContainer,{flexGrow:1}]}>
        <DetailAppBarComponent title='' navigation={navigation}  />
        <DividerComponent />
        <FlatList 
          ListHeaderComponent={
            <>
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
            </>
          }
        />
      </View>
      <View>
        
      </View>
    </SafeAreaView>

  )
}

export default RoomCategory

const styles = StyleSheet.create({})