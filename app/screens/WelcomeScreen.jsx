import { ScrollView, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { CommonStyles } from "../style/CommonStyles";
import theme from "../style/colors";
import heroImg from '../assets/images/hero1.png'
import DefaultButtonComponent from "../components/Button/DefaultButtonComponent";



export default function WelcomeScreen({navigation}) {

    // useEffect(() => {
    //     const checkAccessToken = async () => {
    //       try {
    //        const isValid=await AccessTokenService._TokenValidation();
    //        console.log("isValud",isValid);
    //        if(isValid){
    //         setIsAuthenticated(true)
    //        }
    //        else{
    //         Alert.alert("","Session Expired");
    //         // navigation.navigate('unauthorized');
    //        }
    //       } catch (error) {
    //         console.log("Keychain couldn't be accessed!", error);
    //         navigation.navigate('Login');
    //       }
    //     };
    
    //     // checkAccessToken();
    //     // _BackHandlerService();
    //   }, [navigation]);

    return (
        <SafeAreaView style={{flex : 1}}>
            <Image source={heroImg} resizeMode="cover" style={{width:'100%',height:433}} alt="Hotel hero image" />
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }} 
                style={CommonStyles.scrollViewContainer}
            >
                
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{fontSize: 35,
                        fontWeight: 'bold',
                        color:theme.colors.textDark,
                        marginTop:30,
                        textAlign: 'center'
                        }}>
                        Find your best comfortable hotel.
                    </Text>
                    <Text style={[CommonStyles.text,{marginTop:30,textAlign:'center',lineHeight:30}]}>Express Your Creativity With Using Our App Using Our Primitive </Text>
                    
                </View>
                

                <View style={{flex:1,alignItems:'center',marginTop:10}}>
                    
                    <DefaultButtonComponent 
                        title='Access Marketplace'
                        backgroundColor={theme.colors.primary}
                        onPress={() => {navigation.navigate('LoginScreen')}}
                        color={theme.colors.textLight}
                        otherStyle={{width:370,height:60,borderRadius:37}}
                        otherTextStyle={{fontSize:22}}
                    />
                </View>
            </ScrollView>
            
        </SafeAreaView>
        
    );
}
