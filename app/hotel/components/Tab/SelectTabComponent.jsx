import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TAB_ITEMS = [
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'checkin', label: 'Check-in' },
  { key: 'completed', label: 'Completed' },
];

const SelectTabComponent = ({ selectedKey, onSelect }) => {
  const [activeTab, setActiveTab] = useState(selectedKey || 'ongoing');

  useEffect(() => {
    if (selectedKey) {
      setActiveTab(selectedKey);
    }
  }, [selectedKey]);

  const handlePress = (key) => {
    setActiveTab(key);
    if (onSelect) onSelect(key);
  };

  return (
    <View style={styles.container}>
      {TAB_ITEMS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive ? styles.selectedTab : styles.unselectedTab]}
            activeOpacity={0.8}
            onPress={() => handlePress(tab.key)}
          >
            <Text style={[styles.tabText, isActive ? styles.selectedTabText : styles.unselectedTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SelectTabComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedTab: {
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  unselectedTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedTabText: {
    color: '#000',
  },
  unselectedTabText: {
    color: '#888',
  },
});
