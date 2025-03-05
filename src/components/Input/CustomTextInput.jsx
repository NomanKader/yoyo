import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import theme from '../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomTextInput = ({
  title,
  bottomColor = theme.colors.textLightGray,
  value,
  onChangeText,
  containerStyle,
  type,
}) => {
  const [secureText, setSecureText] = useState(type === 'password');

  return (
    <View
      style={[
        styles.container,
        {borderBottomColor: bottomColor},
        containerStyle,
      ]}>
      <TextInput
        placeholder={title}
        value={value}
        onChangeText={onChangeText}
        keyboardType={type === 'password' ? 'default' : type}
        secureTextEntry={secureText} // Show/hide password
        style={styles.input}
      />

      {/* Eye Icon for Password Toggle */}
      {type === 'password' && (
        <TouchableOpacity
          onPress={() => setSecureText(!secureText)}
          style={styles.icon}>
          <Icon
            name={secureText ? 'visibility-off' : 'visibility'}
            size={22}
            color="#555"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderBottomWidth: 1,
    paddingVertical: 8,
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
});
