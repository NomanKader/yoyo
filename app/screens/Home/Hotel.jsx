import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { CommonStyles } from '../../style/CommonStyles'
import BookingSkeletonComponent from '../../components/Skeleton/BookingSkeletonComponent'
import CarouselComponent from '../../components/Caurosel/CauroselComponent'
import HotelCard from '../../components/Card/HotelCard'
import SeeMoreComponent from '../../components/screen/SeeMoreComponent'
import CarouselSkeletonComponent from '../../components/Skeleton/CauroselSkeletonComponent'
import DummyData from '../../config/DummyData.json'




const Hotel = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(()=>{
    const timer = setTimeout(() => setShowLoading(false), 2000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  })

  

  const data = DummyData.data;


    const hotels = DummyData.hotels;


  if(showLoading){
    return(<BookingSkeletonComponent type='Hotels Nearby' />)
  } 

  return (

    <SafeAreaView style={{flex:1}}>
      <View style={[CommonStyles.scrollViewContainer,{flexGrow:1}]}>
      <FlatList 
        
        ListHeaderComponent={
          <>
            <Text style={[CommonStyles.subTitle,{marginTop:0}]}>Top Hotels</Text>
            <CarouselComponent data={data} setShowLoading={setShowLoading} navigation={navigation} carouselType='home' />
            <SeeMoreComponent title='Hotels Nearby' onPress={()=> {}} />
            <FlatList
              data={hotels}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <HotelCard hotel={item} onPress={() => navigation.navigate('AppStack', { screen: 'RoomCategoryScreen' })} />}
              numColumns={2}
              contentContainerStyle={{marginTop:20}}
            />
          </>
        }
      />
          
           
      </View>
    </SafeAreaView>

  )
}

export default Hotel

const styles = StyleSheet.create({})