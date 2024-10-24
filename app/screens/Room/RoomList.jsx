import {  StyleSheet, Text, View,Image } from 'react-native'
import {useState,useEffect} from 'react'
import { CommonStyles } from '../../style/CommonStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import CarouselComponent from '../../components/Caurosel/CauroselComponent'
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent'
import RoomCategoryListComponent from '../../components/List/RoomCategoryListComponent'
import DividerComponent from '../../components/Divider/DividerComponent'
import Accordion from '../../components/accordion/Accordion'
import AccordionText from '../../components/accordion/AccordionText'
import AccordionIcons from '../../components/accordion/AccordionIcons'
import SeeMoreComponent from '../../components/screen/SeeMoreComponent'
import BookingSkeletonComponent from '../../components/Skeleton/BookingSkeletonComponent'
import BottomSheetComponent from '../../components/BottomSheet/BottomSheetComponent'
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent'
import discountIcon from '../../assets/icons/discountIcon.png'
import theme from '../../style/colors'
import DummyData from '../../config/DummyData.json'

const RoomDetail = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(true);
  const [visible,setVisible] = useState(false);

  useEffect(()=>{
    const timer = setTimeout(() => setShowLoading(false), 2000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  })

  if(showLoading){
    return(
    <>
      <DetailAppBarComponent title='' navigation={navigation}  />
      <BookingSkeletonComponent type ='Standard Rooms' />
    </>)
  } 

  const data = DummyData.data

  const data2 = DummyData.data2

  const amenities = [
    { icon: 'snowflake-o', text: 'Air conditioner' },
    { icon: 'tv', text: 'Flat screen TV' },
    { icon: 'wifi', text: 'Wifi connection' },
    { icon: 'volume-off', text: 'Soundproofing' },
    { icon: 'tint', text: 'Pool view' },
    { icon: 'bath', text: 'Ensuite bathroom' },
    { icon: 'building-o', text: 'City view' },
    { icon: 'snowflake-o', text: 'Refrigerator' },
  ];

  return (

    <SafeAreaView style={{flex:1}}>
      <FlatList 
        ListHeaderComponent={
          <View style={[CommonStyles.scrollViewContainer,{flexGrow:1}]}>
          <DetailAppBarComponent title='Room Details' navigation={navigation}  />
          <DividerComponent />
            <View>
              <CarouselComponent data={data} setShowLoading={setShowLoading} navigation={navigation} carouselType='roomDetail' />
              <Text style={CommonStyles.subTitle}>Standard Rooms</Text>
              <Text style={CommonStyles.text}>
                  
                  <Text style={{fontWeight:'bold'}}>50</Text> rooms,<Text style={{fontWeight:'bold'}}>20</Text> available rooms
              </Text>
            </View>
            
            <Accordion 
              title='Basic'
              content={
                <FlatList
                  data={amenities}
                  keyExtractor={(item) => item.text}
                  numColumns={2}
                  renderItem={({ item }) => (
                    <AccordionIcons icon={item.icon} text={item.text} />
                  )}
                />
              }
            />
            <Accordion 
              title='Bedroom View'
              content={<AccordionText text='Lorem ipsum dolor sit amet consectetur adipisicing elit.' />}
            />
            <Accordion 
              title='Bathroom View'
              content={<AccordionText text='Lorem ipsum dolor sit amet consectetur adipisicing elit.' />}
            />
            <Accordion 
              title='View'
              content={<AccordionText text='Lorem ipsum dolor sit amet consectetur adipisicing elit.' />}
            />


            <SeeMoreComponent title='Avaliable Rooms(5)' onPress={()=> navigation.navigate('RoomListAllScreen')} />

            <RoomCategoryListComponent 
                data={data2}
                navigation={navigation}
                type=''
                onPress={() => setVisible(true)}
            />

          <BottomSheetComponent
            title='Do you know?'
            isVisible={visible}
            onClose={() => setVisible(false)}
            snapPoints={['50%','70%']}
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
        }
      />
      
    </SafeAreaView>

  )
}

export default RoomDetail

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