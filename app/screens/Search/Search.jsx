import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, memo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../../style/CommonStyles';
import SearchAppBarComponent from '../../components/AppBar/SearchAppBarComponent';
import {ScrollView} from 'react-native-gesture-handler';
import HotelCardWithIcon from '../../components/Card/HotelCardWithIcon';
import BottomSheetComponent from '../../components/BottomSheet/BottomSheetComponent';
import {RadioButton, TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import theme from '../../style/colors';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import TextInputComponent from '../../components/TextInput/TextInputComponent';
import Icon from 'react-native-vector-icons/Ionicons';

const HotelTypeSelector = memo(function HotelTypeSelector({
  selectedType,
  onTypeChange,
}) {
  return (
    <View>
      <RadioButton.Group onValueChange={onTypeChange} value={selectedType}>
        <View style={styles.hotelTypeContainer}>
          <Text>Hotel</Text>
          <RadioButton value="hotel" color={theme.colors.primary} />
        </View>
        <View style={styles.hotelTypeContainer}>
          <Text>Apartment</Text>
          <RadioButton value="apartment" color={theme.colors.primary} />
        </View>
        <View style={styles.hotelTypeContainer}>
          <Text>Both</Text>
          <RadioButton value="both" color={theme.colors.primary} />
        </View>
      </RadioButton.Group>
    </View>
  );
});

const RoomStyleSelector = memo(function RoomStyleSelector({
  selectedStyle,
  onStyleChange,
}) {
  return (
    <View style={styles.roomStyleContainer}>
      <Text style={styles.sectionTitle}>Room Style</Text>
      <View style={styles.buttonGroup}>
        {['all', 'standard', 'suite'].map(style => (
          <TouchableOpacity
            key={style}
            onPress={() => onStyleChange(style)}
            style={[
              styles.optionButton,
              selectedStyle === style
                ? styles.selectedOptionButton
                : styles.unselectedOptionButton,
            ]}>
            <Text
              style={
                selectedStyle === style
                  ? styles.selectedOptionText
                  : styles.unselectedOptionText
              }>
              {style === 'all'
                ? 'All'
                : style === 'standard'
                ? 'Standard room'
                : 'Presidential suite'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

const RoomPriceSlider = ({minPrice, maxPrice, onPriceChange}) => (
  <View style={styles.sliderContainer}>
    <MultiSlider
      values={[minPrice, maxPrice]}
      min={10000}
      max={50000}
      step={1000}
      onValuesChange={onPriceChange}
      selectedStyle={styles.selectedSlider}
      unselectedStyle={styles.unselectedSlider}
      containerStyle={styles.sliderContainerStyle}
      trackStyle={styles.sliderTrackStyle}
      customMarker={() => <View style={styles.customMarker} />}
    />
    <View style={styles.priceLabels}>
      <Text>{minPrice.toLocaleString()}</Text>
      <Text>{maxPrice.toLocaleString()}</Text>
    </View>
  </View>
);

const Search = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hotelType, setHotelType] = useState('hotel');
  const [roomStyle, setRoomStyle] = useState('all');
  const [minPrice, setMinPrice] = useState(10000);
  const [maxPrice, setMaxPrice] = useState(50000);

  const handlePriceChange = values => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  const handleOpen = () => {
    console.log('Bottom sheet opened');
    setIsVisible(true);
  };

  const handleClose = () => {
    console.log('Bottom sheet closed');
    setIsVisible(false);
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
      <SearchAppBarComponent
        navigation={navigation}
        changeFilterVisible={handleOpen}
      />
      <HotelCardWithIcon />
      <BottomSheetComponent
        isVisible={isVisible}
        onClose={handleClose}
        title="Filter"
        snapPoints={['60%', '80%']}>
        <HotelTypeSelector
          selectedType={hotelType}
          onTypeChange={setHotelType}
        />
        <View style={styles.searchRow}>
          <View style={styles.searchInputContainer}>
            <TextInputComponent label="Search" />
          </View>
          <TouchableOpacity style={styles.mapIcon}>
            <Icon name="map-outline" size={20} color={theme.colors.textDark} />
          </TouchableOpacity>
        </View>
        <RoomStyleSelector
          selectedStyle={roomStyle}
          onStyleChange={setRoomStyle}
        />
        <Text style={styles.sectionTitle}>Room Price</Text>
        <RoomPriceSlider
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
        />
        <DefaultButtonComponent
          onPress={handleClose}
          backgroundColor={theme.colors.primary}
          color={theme.colors.textLights}
          title="Apply Filter"
        />
      </BottomSheetComponent>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  sliderContainer: {
    marginVertical: 10,
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  roomStyleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 35,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchRow: {
    flexDirection: 'row',
    // paddingVertical: 30,
  },
  searchInputContainer: {
    width: '90%',
    height: 50,
  },
  mapIcon: {
    justifyContent: 'flex-end',
    marginHorizontal: 10,
    height: 70,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: theme.colors.textDark,
  },
  hotelTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    padding: 10,
    borderRadius: 20,
    margin: 5,
    alignItems: 'center',
  },
  selectedOptionButton: {
    backgroundColor: theme.colors.primary,
  },
  unselectedOptionButton: {
    borderColor: theme.colors.textGray,
    borderWidth: 1,
  },
  selectedOptionText: {
    color: theme.colors.textLight,
  },
  unselectedOptionText: {
    color: theme.colors.textDark,
  },
  customMarker: {
    height: 15,
    width: 15,
    borderRadius: 7,
    backgroundColor: theme.colors.textLight,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  selectedSlider: {
    backgroundColor: theme.colors.primary,
  },
  unselectedSlider: {
    backgroundColor: theme.colors.gridColor,
  },
  sliderContainerStyle: {
    height: 40,
  },
  sliderTrackStyle: {
    height: 6,
  },
});
