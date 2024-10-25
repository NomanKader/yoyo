import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react'
import theme from '../../style/colors';
import rightArrow from '../../assets/icons/rightArrowIcon.png'

const PaymentListComponent = ({icon,title,description,onPress}) => {
  return (
    <TouchableOpacity  style={styles.optionContainer} onPress={onPress}>
      <View style={styles.option}>
        <Image source={{ uri: icon }} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {description &&
            <Text style={styles.description}>{description}</Text>
          }
          
        </View>
        <Text style={styles.arrow}> 
            <Image resizeMode='cover' style={styles.arrowImg} source={rightArrow} />
        </Text> 
      </View>
    </TouchableOpacity>
  )
}

export default PaymentListComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.colors.textLight,
  },
  optionContainer: {
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textLightGray,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.gridColor, // Placeholder for icon background
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.infoText,
  },
  description: {
    fontSize: 14,
    color: theme.colors.infoText,
  },
  arrow: {
    fontSize: 18,
    color: theme.colors.infoText,
    width: 40,
    height: 60,
    // borderRadius: 20,
    // backgroundColor: theme.colors.gridColor, // Placeholder for icon background
    marginRight: 15,
  },
  arrowImg:{
    width:40,
    height:40
  }
});