import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '../../../style/colors';
import DefaultButtonComponent from '../../../components/Button/DefaultButtonComponent';
import StepAppBarComponent from '../../../components/AppBar/StepAppBarComponent';
import {CommonStyles} from '../../../style/CommonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconButtonComponent from '../../../components/Button/IconButtonComponent';

const RoomPhotoScreen = ({navigation}) => {
  return (
    <SafeAreaView style={CommonStyles.scrollViewContainer}>
      <StepAppBarComponent
        title="Room Photo Screen"
        currentStep={8}
        navigation={navigation}
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Text style={CommonStyles.header}>Room category photos</Text>
        <Text style={CommonStyles.subHeader}>
          Please add photos for this room category.
        </Text>
        <View style={styles.photoContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="plus" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        <IconButtonComponent
          iconName={'plus'}
          label={'Add more photo'}
          onPress={() => console.log('Add more photo')}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <DefaultButtonComponent
          title="Submit"
          backgroundColor={theme.colors.primary}
          onPress={() => {
            navigation.navigate('SuccessScreen', {
              header: 'Category Created',
              subheader: 'Your Subheader Text',
              nextScreen: 'AppStack', // Pass the screen name as a string
              nextScreenParams: { screen: 'RoomCategoryCreate' },
              navigation:navigation
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  photoContainer: {
    backgroundColor: theme.colors.textLightGray,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    width: 180,
    height: 44,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'flex-start', // Align the button to the left
  },
  addMoreButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  addMoreButtonIcon: {
    marginRight: 8,
  },
});

export default RoomPhotoScreen;
