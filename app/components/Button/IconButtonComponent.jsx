import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../style/colors';

const IconButtonComponent = ({ iconName, label, onPress, buttonStyle, textStyle, iconStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Icon name={iconName} size={16} color="#ffffff" style={[styles.icon, iconStyle]} />
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    width: 180,
    height: 44,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
});

export default IconButtonComponent;
