const _handleListService = async (type, setType, navigation, service, setRoomData, nextScreen) => { 
    try {
      setType('list');
      await service.GetRoomList(setRoomData);
      console.log("Next Screen",nextScreen)
      if(type=='list' && nextScreen){
        nextScreen();
      }     
    } catch (error) {
      console.error("Error fetching room list:", error);
    }
    
  }


export default _handleListService;
