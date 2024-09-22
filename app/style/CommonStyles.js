// CommonStyles.js

import theme from "./colors";

export const CommonStyles = {
    dividerView: {
      marginTop: 20,
    },
    divider: {
      height: 1,
      backgroundColor: '#F1F1F1',
      width: '100%',
    },
    appBarIcon:{
      width:35,
      height:35,
      marginBottom:20,
      marginTop:30,
      marginLeft:-10,      
    },
    defaultButtonContainer:{
      position:'absolute',
      bottom:10,
      right:30,
      left:30
    },
    defaultButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 5,
      minWidth: 100,
      marginVertical: 10,
    },
    defaultButtonText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    scrollViewContainer:{
      flex:1,
      display:'flex',
      paddingLeft:30,
      paddingRight:30,
      marginTop:0,
      backgroundColor:theme.colors.textLight
    },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
    },
    header:{
      fontSize: 25,
      fontWeight: 'bold',
      color:theme.colors.textDark,
      marginTop:20
    },
    subHeader:{
      fontSize: 15,
      marginTop: 5,
      color:theme.colors.iconTextColor,
      lineHeight:21
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    seeAll: {
      fontSize: 16,
      color: '#007BFF',
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
    },
    infoLabel: {
      fontSize: 16,
      color: theme.colors.textDark,
      fontWeight: '500',
      marginBottom:10
    },
    
    component:{
      marginTop:20
    },
    container:{
      flexGrow:1,
      backgroundColor:theme.colors.textLight
    },
    list:{
      card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
      },
      thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#ccc',
      },
      qrCode:{
        width:200,
        height:200,
        marginTop:20
      },
      details: {
        marginLeft: 20,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      subtitle: {
        marginTop: 6,
        fontSize: 14,
        color: '#666',
      },
    },
    room:{
      container:{
        flex:1,
        backgroundColor:theme.colors.textLight
      },
      step: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        paddingHorizontal: 16,
      },
      stepContainer: {
        backgroundColor: theme.colors.iconBackgroundColor,
        borderRadius: 100,
        paddingHorizontal: 16,
        paddingVertical: 8,
      },
      stepText: {
        color: theme.colors.iconTextColor,
        fontSize: 14,
        fontWeight: 'bold',
      },
      inputContainer: {
        marginTop: 10,
      },
      breakfastContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      breakfastLabel: {
        fontSize: 16,
        color: theme.colors.textDark,
        fontWeight: '500',
      },
    },
    bottomSheet:{
      contentContainer: {
        flex: 1,
        padding: 16,
        height: 300 
      },
      bottomSheetContent: {
        padding: 20,
      },
      bottomSheet: {
        zIndex: 2, // Ensure BottomSheet appears above the overlay
      },
      bottomSheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      },
      bottomSheetTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10,
        marginBottom: 5,
        color:theme.colors.textDark
      },
      icon: {
        width: 30,
        height: 30,
        marginBottom: 5
      },
      arrowIcon: {
        width: 7,
        height: 12,
        marginLeft: 'auto',
      },
      bottomSheetItem: {
        paddingVertical: 16,
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',    
      },
      bottomSheetItemText: {
        fontSize: 16,
        marginLeft: 10, 
        marginBottom: 5,
        color:'#000'
      },
    },
    picker:{      
        input: {
          fontSize: 16,
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 4,
          color: 'black',
          marginBottom: 20,
        },
        dropdown: {
          borderColor: '#ccc',
        },      
    }
  };
  