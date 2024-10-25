import { ScrollView, View } from "react-native";
import DetailAppBarComponent from "../../components/AppBar/DetailAppBarComponent";
import { CommonStyles } from "../../style/CommonStyles";
import DividerComponent from "../../components/Divider/DividerComponent";
import TextInputComponent from "../../components/TextInput/TextInputComponent";
import DefaultButtonComponent from "../../components/Button/DefaultButtonComponent";
import theme from "../../style/colors";

export default function UpdatePasswordScreen({ navigation }) {
  return (
    <View style={CommonStyles.container}>       
      <ScrollView contentContainerStyle={CommonStyles.container}>
        {/* Content within the scroll view */}
        <View style={CommonStyles.scrollViewContainer}>
        <DetailAppBarComponent title={"Update Password"} navigation={navigation} />
        <DividerComponent />
          <TextInputComponent
            label={"Old password"}
            placeholder={"Enter old pin"}
            isSecure={true}            
          />
          <TextInputComponent
            label={"New password"}
            placeholder={"Enter new pin"}
            isSecure={true}
          />
          <TextInputComponent
            label={"Verify new password"}
            placeholder={"Re-Enter new pin"}
            isSecure={true}
          />
        </View>
      </ScrollView>
      {/* Button at the bottom */}
      <View style={{ padding: 20, backgroundColor: theme.colors.textLight }}>
        <DefaultButtonComponent
          title={"Update"}
          backgroundColor={theme.colors.primary}
        />
      </View>
    </View>
  );
}
