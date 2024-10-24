import { StyleSheet, Text, View } from 'react-native'
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



const CheckInDetail = ({navigation}) => {
    const [showLoading,setShowLoading] = useState(false)
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
        <View style={[CommonStyles.scrollViewContainer,{flexGrow:1}]}>
            <DetailAppBarComponent title='Check in Details' navigation={navigation} />
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
                        </View>
                    </>
                }
                data={details}
                keyExtractor={(item) => item.label}
                renderItem={ ({ item }) => <LeftRightText label={item.label} value={item.value} />}
            />
        </View>
    </SafeAreaView>
  )
}

export default CheckInDetail

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:7
    }
})