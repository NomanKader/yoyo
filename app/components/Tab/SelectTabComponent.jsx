import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../../style/colors';

const SelectTabComponent = ({tabs, onTabSelect, selectedTab}) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab ? styles.selectedTab : styles.unselectedTab,
            ]}
            onPress={() => onTabSelect(tab)}>
            <Text
              style={[
                styles.tabText,
                selectedTab === tab
                  ? styles.selectedTabText
                  : styles.unselectedTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.backgroundColor,
    borderRadius: 12,
    padding: 4,
    width: '100%',
    justifyContent:'space-between'
  },
  tab: {
    flex: 1,
    height:53,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedTab: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
  },
  unselectedTab: {
    backgroundColor:theme.colors.backgroundColor,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedTabText: {
    color: '#FFFFFF',
  },
  unselectedTabText: {
    color: theme.colors.bottomUnselectedColor,
  },
});

export default SelectTabComponent;
