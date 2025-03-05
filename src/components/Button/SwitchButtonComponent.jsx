import {useState} from 'react';
import {Switch, StyleSheet} from 'react-native';
import theme from '../../styles/colors';

const SwitchButtonComponent = ({value, onchange}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <Switch
      trackColor={{
        false: theme.colors.textDarkGray,
        true: theme.colors.switchGreen,
      }}
      thumbColor={isEnabled ? theme.colors.textLight : theme.colors.textLight}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};

export default SwitchButtonComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
