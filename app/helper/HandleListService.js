const _handleListService = async (type, setType, navigation, service, setRoomData) => {
  if (type === 'category') {
    setType('list');
    try {
      await service.GetRoomList(setRoomData);
    } catch (error) {
      console.error("Error fetching room list:", error);
    }
  } else {
    navigation.navigate('AppStack', { screen: 'RoomDetail' });
  }
}

export default _handleListService;
