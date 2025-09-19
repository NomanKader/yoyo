import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../../style/colors';
import DefaultButtonComponent from '../../../components/Button/DefaultButtonComponent';
import StepAppBarComponent from '../../../components/AppBar/StepAppBarComponent';
import { CommonStyles } from '../../../style/CommonStyles';
import { RoomCreationDataContext } from '../../../context/RoomCreationContext';
import { useRoomData } from '../../../context/CreatCategoryContext';
import CheckBoxComponent from '../../../components/Checkbox/CheckboxComponent';

const RoomViewScreen = ({ navigation }) => {
  const { roomCreationData } = useContext(RoomCreationDataContext);
  const { roomData, updateRoomData } = useRoomData();

  // Normalize options from API (value as number)
  const roomViewOptions = useMemo(() => {
    const src = roomCreationData?.roomViews ?? [];
    return src.map(v => ({
      value: Number(v?.id), // number id
      label: String(v?.description ?? ''),
    }));
  }, [roomCreationData?.roomViews]);

  // Local selection as Set<number>
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Seed from context (preserve picks)
  useEffect(() => {
    const preset = Array.isArray(roomData?.roomView)
      ? roomData.roomView.map(Number)
      : [];
    setSelectedIds(new Set(preset));
  }, [roomData?.roomView, roomViewOptions]);

  // Derived "select all"
  const areAllSelected =
    roomViewOptions.length > 0 &&
    roomViewOptions.every(o => selectedIds.has(o.value));

  // Toggle all
  const toggleAll = () => {
    if (areAllSelected) {
      setSelectedIds(new Set()); // clear all
    } else {
      setSelectedIds(new Set(roomViewOptions.map(o => o.value))); // select all
    }
  };

  // Toggle single
  const toggleFeature = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Push selections -> context as int array: roomView: number[]
  useEffect(() => {
    const ids = Array.from(selectedIds).sort((a, b) => a - b);
    const prev = (roomData?.roomView ?? []).map(Number).sort((a, b) => a - b);

    const changed =
      ids.length !== prev.length || ids.some((v, i) => v !== prev[i]);

    if (changed) {
      updateRoomData({ roomView: ids });
    }
  }, [selectedIds, updateRoomData]); // don't include roomData to avoid loops

  return (
    <SafeAreaView style={CommonStyles.scrollViewContainer}>
      <StepAppBarComponent title="Room View Screen" currentStep={6} navigation={navigation} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={CommonStyles.header}>Room View</Text>
        <Text style={CommonStyles.subHeader}>
          Please select all the room views available in this category.
        </Text>

        <View style={CommonStyles.room?.inputContainer ?? { marginTop: 16 }}>
          {/* Select All */}
          <CheckBoxComponent
            selectAll
            selectAllLabel="Select All"
            isAllSelected={areAllSelected}
            onToggleAll={toggleAll}
          />

          {/* Options */}
          {roomViewOptions.map(opt => (
            <CheckBoxComponent
              key={opt.value}
              label={opt.label}
              isChecked={selectedIds.has(opt.value)}
              onToggle={() => toggleFeature(opt.value)}
            />
          ))}

          {roomViewOptions.length === 0 && (
            <Text style={{ color: '#666', marginTop: 8 }}>No room views found.</Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <DefaultButtonComponent
          title="Proceed"
          backgroundColor={theme.colors.primary}
          onPress={() => {
            navigation.navigate('AppStack', { screen: 'RoomRuleScreen' });
            console.log('roomData', roomData); // will include roomView: [int, ...]
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
});

export default RoomViewScreen;
