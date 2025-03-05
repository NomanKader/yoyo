import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import theme from "../../styles/colors";

export default function CustomTab({
  firstTabName,
  secondTabName,
  firstTabContent,
  secondTabContent,
  tabContainerStyle,
  contentContainerStyle,
  underlineTab = false, // Default to false if not passed
}) {
  const [activeTab, setActiveTab] = useState('Tab1');

  const handleTabPress = tab => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* Custom Tabs */}
      <View
        style={[
          styles.tabContainer,
          tabContainerStyle,
          {backgroundColor: underlineTab ? '#F5F9FD' : '#FFFFFF'},
        ]}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            styles.tab1,
            underlineTab
              ? {
                  backgroundColor: '#F5F9FD',
                  borderBottomWidth: activeTab === 'Tab1' ? 4 : 0,
                  borderBottomColor: theme.colors.primary,
                  marginLeft: 21,
                }
              : activeTab === 'Tab1'
              ? styles.activeTabButton
              : styles.inactiveTabButton,
          ]}
          onPress={() => handleTabPress('Tab1')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Tab1'
                ? styles.activeTabText
                : underlineTab
                ? styles.inactiveTabTextWithUnderline
                : styles.inactiveTabText,
            ]}>
            {firstTabName}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            styles.tab2,
            underlineTab
              ? {
                  backgroundColor: '#F5F9FD',
                  borderBottomWidth: activeTab === 'Tab2' ? 4 : 0,
                  borderBottomColor: theme.colors.primary,
                  marginRight: 21,
                }
              : activeTab === 'Tab2'
              ? styles.activeTabButton
              : styles.inactiveTabButton,
          ]}
          onPress={() => handleTabPress('Tab2')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Tab2'
                ? styles.activeTabText
                : underlineTab
                ? styles.inactiveTabTextWithUnderline
                : styles.inactiveTabText,
            ]}>
            {secondTabName}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Render Content based on Active Tab */}
      <View
        style={StyleSheet.flatten([
          styles.contentContainer,
          contentContainerStyle,
        ])}>
        {activeTab === 'Tab1' ? firstTabContent() : secondTabContent()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    margin: -7,
    flexDirection: 'row',
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  tab1: {
    borderTopLeftRadius: 20,
  },
  tab2: {
    borderTopRightRadius: 20,
  },
  activeTabButton: {
    backgroundColor: theme.colors.white,
  },
  inactiveTabButton: {
    backgroundColor: theme.colors.secondary,
  },
  tabText: {
    fontSize: 16,
    fontFamily: theme.customfonts.regular,
    textAlign: 'center',
  },
  activeTabText: {
    color: theme.colors.primary,
    fontFamily: theme.customfonts.medium,
  },
  inactiveTabText: {
    color: theme.colors.light,
  },
  inactiveTabTextWithUnderline: {
    color: theme.colors.textDark, // When underlineTab is true, inactive tab text color will be textDark
  },
  contentContainer: {
    padding: 20,
    marginTop: 10,
  },
});
