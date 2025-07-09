import React from 'react';
import { View, StatusBar, Platform } from 'react-native';

const AppStatusBar = ({ backgroundColor, barStyle = 'light-content' }) => {
  return (
    <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0, backgroundColor }}>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={barStyle}
        translucent={false}
      />
    </View>
  );
};

export default AppStatusBar;
