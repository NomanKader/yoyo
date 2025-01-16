import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import theme from '../../style/colors';
import Icon from 'react-native-vector-icons/Feather';
import rightArrow from '../../assets/icons/rightArrowIcon.png';
import DividerComponent from '../Divider/DividerComponent';

// const PaymentListComponent = ({icon, title, description, onPress}) => {
//   return (
//     <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
//       <View style={styles.option}>
//         <Image source={{uri: icon}} style={styles.icon} />
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>{title}</Text>
//           {description && <Text style={styles.description}>{description}</Text>}
//         </View>
//         <Text style={styles.arrow}>
//           <Image
//             resizeMode="contain"
//             style={styles.arrowImg}
//             source={rightArrow}
//           />
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default PaymentListComponent;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: theme.colors.textLight,
//   },
//   optionContainer: {
//     marginBottom: 20,
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.colors.textLightGray,
//   },
//   icon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: theme.colors.gridColor, // Placeholder for icon background
//     marginRight: 15,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: theme.colors.infoText,
//   },
//   description: {
//     fontSize: 14,
//     color: theme.colors.infoText,
//   },
//   arrow: {
//     fontSize: 18,
//     color: theme.colors.infoText,
//     marginRight: 15,
//     textAlign: 'right',
//     paddingVertical: 20,
//   },
//   arrowImg: {
//     width: 20,
//     height: 20,
//   },
// });

const PaymentListComponent = ({
  icon,
  title,
  description,
  onPress,
  arrowShown = true,
  dividerShown = true,
}) => {
  return (
    <>
      <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        {icon && (
          <View style={styles.iconContainer}>
            <Icon name={icon} size={20} color="#000" />
          </View>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.menuTitle}>{title}</Text>
          <Text style={styles.menuDescription}>{description}</Text>
        </View>
        {arrowShown && <Icon name="arrow-right" size={20} color="#ccc" />}
        {/* <View style={styles.arrow}>
        <Image
          resizeMode="contain"
          style={styles.arrowImg}
          source={rightArrow}
        />
      </View> */}
      </TouchableOpacity>
      {dividerShown && <DividerComponent />}
    </>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: theme.colors.textLightGray,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  menuDescription: {
    fontSize: 12,
    color: '#666',
  },
  arrow: {
    color: theme.colors.infoText,
    marginRight: 15,
    textAlign: 'right',
    paddingVertical: 20,
  },
  arrowImg: {
    width: 20,
    height: 20,
  },
});

export default PaymentListComponent;
