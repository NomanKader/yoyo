import { View, TextInput, StyleSheet } from 'react-native';

const TextAreaComponent = ({ backgroundColor = '#EEEEEE', placeholder, value, onChange }) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TextInput
        style={styles.textArea}
        placeholder={placeholder}
        placeholderTextColor="#888888"
        value={value}
        onChangeText={onChange}
        multiline={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 300,
    textAlignVertical: 'top', // Ensures text starts at the top
    fontSize: 16,
    color: '#333333',
  },
});

export default TextAreaComponent;
