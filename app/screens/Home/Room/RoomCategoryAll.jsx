import { StyleSheet, Text, View } from 'react-native'
import {useEffect,useState} from 'react'
import RommCategoryListComponent from '../../../components/List/RoomCategoryListComponent'
import { SafeAreaView } from 'react-native-safe-area-context'
import DetailAppBarComponent from '../../../components/AppBar/DetailAppBarComponent'
import DividerComponent from '../../../components/Divider/DividerComponent'
import { CommonStyles } from '../../../style/CommonStyles'
import CarouselSkeletonComponent from '../../../components/Skeleton/CauroselSkeletonComponent'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import ListSkeletonComponent from '../../../components/Skeleton/ListSkeletonComponent'
import DummyData from '../../../config/DummyData.json'

const RoomCategoryAll = ({navigation}) => {
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

    const data2 = DummyData.data2;

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={[CommonStyles.scrollViewContainer,{flexGrow:1}]}>
          <DetailAppBarComponent title='Room Type' navigation={navigation}  />
          <DividerComponent />
          <RommCategoryListComponent 
                data={data2}
                navigation={navigation}
                type='category'
                onPress={() => navigation.navigate('AppStack', { screen: 'RoomListScreen' })}
          />
        </View>
    </SafeAreaView>
    
  )
}

export default RoomCategoryAll

const styles = StyleSheet.create({})