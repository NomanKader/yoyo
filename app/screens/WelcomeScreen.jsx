import { ScrollView, Text, View, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { CommonStyles } from "../style/CommonStyles";
import theme from "../style/colors";
import heroImg from '../assets/images/hero1.png'
import DefaultButtonComponent from "../components/Button/DefaultButtonComponent";

const {width,height} = Dimensions.get('window');

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
            
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }} 
                style={CommonStyles.container}
            >
                <Image source={heroImg} resizeMode="cover" style={{width:width*1,height:height*0.55}} alt="Hotel hero image" />
                <View style={CommonStyles.scrollViewContainer}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{fontSize: 25,
                            lineHeight:30,
                            fontWeight: 'bold',
                            color:theme.colors.textDark,
                            marginTop:30,
                            textAlign: 'center'
                            }}>
                            Find your best {'\n'}
                            comfortable hotel.
                        </Text>
                        <Text style={[CommonStyles.text,{marginTop:30,textAlign:'center',fontSize:15,lineHeight:25}]}>Express Your Creativity With Using Our {'\n'} App, Using Our Primitive </Text>
                        
                    </View>
                    

                    <View style={{flex:1,alignItems:'center',marginTop:height*0.03}}>
                        
                        <DefaultButtonComponent 
                            title='Access Marketplace'
                            backgroundColor={theme.colors.primary}
                            onPress={() => {navigation.navigate('LoginScreen')}}
                            color={theme.colors.textLight}
                            otherStyle={{width:width*0.9,height:height*0.08,borderRadius:37}}
                            otherTextStyle={{fontSize:14}}
                        />
                    </View>
                </View>
            </ScrollView>
            
        </SafeAreaView>
        
    );
}
