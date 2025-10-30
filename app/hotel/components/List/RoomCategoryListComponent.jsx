import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import theme from "../../style/colors";
import { BASE_IMAGE_URL } from "../../../common/service/HttpService";

const RoomCategoryListComponent = ({ item,navigation}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("AppStack",{screen:"RoomListScreen",params:{id:item.id}})}>
            <Image
                source={{ uri: `${BASE_IMAGE_URL}${item?.roomCategoryPhotos[0]}` }}
                style={styles.image} />
            <View style={styles.content}>
                <View style={styles.roomInfo}>
                    <Text style={styles.title}>
                        {item.description}
                    </Text>
                    <Text style={styles.subtitle}>
                        {`${item?.pricePerNight?.toLocaleString()} Ks`}
                    </Text>
                </View>
                <View style={styles.statusWrapper}>
                    <Text style={styles.statusText}>
                        {item.maxOccupancy} Rooms
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}
export default RoomCategoryListComponent
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    },
     card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  image: {
    width: 65,
    height: 55,
    borderRadius: 5,
    marginRight: 12,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomInfo: {
    flex: 1,
    gap:5
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 2,
  },
  statusWrapper: {
    paddingVertical:10,
    paddingHorizontal:16,
    borderColor:'#E4E4E4',
    backgroundColor:'#F7F7F7',
    borderWidth:1,
    borderRadius:5,
    alignSelf:'flex-start'
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
  },
})