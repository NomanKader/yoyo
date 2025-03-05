import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import theme from '../../styles/colors';
import {CommonStyles} from '../../styles/CommonStyles';

const {width, height} = Dimensions.get('window');

export default function CustomButtonTab({
  firstTabName,
  secondTabName,
  firstTabContent,
  secondTabContent,
  contentContainerStyle,
  onChangeTab, // <--- add this
  underlineTab = false, // Default to false if not passed
}) {
  const [activeTab, setActiveTab] = useState('Tab1');

  const handleTabPress = tab => {
    setActiveTab(tab);
    if (onChangeTab) {
      // Let the parent know which tab is active
      onChangeTab(tab);
    }
  };

  return (
    <>
      {/* Custom Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            styles.tab1,
            underlineTab
              ? {
                  backgroundColor: '#F5F9FD',
                  borderBottomWidth: activeTab === 'Tab1' ? 3 : 0,
                  borderBottomColor: theme.colors.primary,
                }
              : activeTab === 'Tab1'
              ? styles.activeTabButton
              : styles.inactiveTabButton,
          ]}
          activeOpacity={1}
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
                  borderBottomWidth: activeTab === 'Tab2' ? 3 : 0,
                  borderBottomColor: theme.colors.primary,
                }
              : activeTab === 'Tab2'
              ? styles.activeTabButton
              : styles.inactiveTabButton,
          ]}
          activeOpacity={1}
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
    // height: 65,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab1: {
    borderTopLeftRadius: 20,
  },
  tab2: {
    borderTopRightRadius: 20,
  },
  activeTabButton: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: width * 0.1,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  inactiveTabButton: {
    backgroundColor: theme.colors.textLight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: width * 0.1,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  tabText: {
    fontSize: 14,
    fontFamily: theme.customfonts.regular,
  },
  activeTabText: {
    color: theme.colors.textLight,
    fontFamily: theme.customfonts.medium,
  },
  inactiveTabText: {
    color: theme.colors.textDark,
    fontFamily: theme.customfonts.medium,
  },
  inactiveTabTextWithUnderline: {
    color: theme.colors.textDark, // When underlineTab is true, inactive tab text color will be textDark
  },
  contentContainer: {
    padding: 20,
  },
});
