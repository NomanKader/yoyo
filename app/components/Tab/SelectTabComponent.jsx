import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SelectTabComponent = () => {
  const [selectedTab, setSelectedTab] = useState('Ongoing');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'Ongoing' ? styles.selectedTab : styles.unselectedTab,
        ]}
        onPress={() => setSelectedTab('Ongoing')}
      >
        <Text style={[
          styles.tabText,
          selectedTab === 'Ongoing' ? styles.selectedTabText : styles.unselectedTabText,
        ]}>
          Ongoing
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'Completed' ? styles.selectedTab : styles.unselectedTab,
        ]}
        onPress={() => setSelectedTab('Completed')}
      >
        <Text style={[
          styles.tabText,
          selectedTab === 'Completed' ? styles.selectedTabText : styles.unselectedTabText,
        ]}>
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4', // Container background color
    borderRadius: 8,
    padding: 4, // Padding around the tabs
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedTab: {
    backgroundColor: '#ffffff', // Background for selected tab
  },
  unselectedTab: {
    backgroundColor: 'transparent', // Transparent background for unselected tab
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedTabText: {
    color: '#000000', // Text color for selected tab
  },
  unselectedTabText: {
    color: '#888888', // Text color for unselected tab
  },
});

export default SelectTabComponent;
