import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import theme from '../../styles/colors'
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent'
import CustomCheckBox from '../../components/Input/CustomCheckBox'
import CustomTextInput from '../../components/Input/CustomTextInput'

const LoginScreen = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState('')
    const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Welcome Back</Text>
        <Text style={styles.subTitleText}>Welcome Back. please Enter your details</Text>
        </View>
        <CustomTextInput title="Email" value={email} onChangeText={setEmail}/>
        <CustomTextInput title="Password" value={password} onChangeText={setPassword}/>  
        <CustomCheckBox 
        checked={isChecked} 
        onChange={() => setIsChecked(!isChecked)}
        label="Remember Me"
      />
        <DefaultButtonComponent title="Login" />  
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        margin: 10,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 100,
        marginBottom:20
    },
    titleText: {
        fontSize: 20,
        color:theme.colors.textBlack,
        marginBottom: 10,
    },
    subTitleText: {
        fontSize: 14,
        color: theme.colors.textGray,
    }
})