// CommonStyles.js

import theme from "./colors";

export const CommonStyles = {
    dividerView: {
      marginTop: 20,
    },
    divider: {
      height: 1,
      backgroundColor: '#D3D3D3',
      width: '100%',
    },
    backIcon:{
      width:35,
      height:35,
      marginBottom:20,
      marginTop:30,
      marginLeft:-5
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
    text: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    seeAll: {
      fontSize: 16,
      color: '#007BFF',
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
    }
  };
  