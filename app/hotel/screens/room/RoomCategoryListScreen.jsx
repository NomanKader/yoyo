import React, { useCallback, useContext, useLayoutEffect, useRef, useState } from "react";
import { View, BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ListSkeletonComponent from "../../components/Skeleton/ListSkeletonComponent";
import { CommonStyles } from "../../style/CommonStyles";
import AppBarComponent from "../../components/AppBar/AppBarComponent";
import DividerComponent from "../../components/Divider/DividerComponent";
import RoomService from "../../services/RoomService";
import RoomListComponent from "../../components/List/RoomListComponent";
import { LanguageContext } from "../../../hotel/context/LanguageContext";
import _handleListService from "../../helper/HandleListService";
import { RoomContext } from "../../context/RoomContext";

export default function RoomCategoryListScreen({ navigation }) {
  const [showLoading, setShowLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);

  const { type, setType } = useContext(RoomContext);
  const { language, translate } = useContext(LanguageContext);

  const mountedRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      mountedRef.current = true;
      console.log("Language", language);
      console.log("Translate", translate);

      const fetchRoomList = async () => {
        setShowLoading(true);
        try {
          await RoomService.GetRoomCategory(setRoomData);
        } finally {
          if (mountedRef.current) setShowLoading(false);
        }
      };

      fetchRoomList();

      const onHardwareBack = () => {
        if (type === "list") {
          RoomService.GetRoomCategory(setRoomData);
          setType("category");
          return true; 
        }
        return false; 
      };

      const sub = BackHandler.addEventListener("hardwareBackPress", onHardwareBack);

      return () => {
        mountedRef.current = false;
        sub.remove();
      };
    }, [language, translate, type, setType])
  );

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({ tabBarStyle: { display: type === "list" ? "none" : "flex" } });

    return () => {
      parent?.setOptions({ tabBarStyle: undefined });
    };
  }, [navigation, type]);

  const handleBackPress = useCallback(() => {
    if (type === "list") {
      RoomService.GetRoomCategory(setRoomData);
      setType("category");
      return;
    }
    navigation.goBack?.();
  }, [type, navigation, setType]);

  return (
    <View style={CommonStyles.room.container}>
      <AppBarComponent
        title={translate?.room?.Rooms}
        navigation={navigation}
        searchData={roomData}
        type={type}
        showBackIcon={type === "list"}
        onPressBack={handleBackPress}
      />
      <DividerComponent />
      {showLoading ? (
        <View style={CommonStyles.scrollViewContainer}>
          <ListSkeletonComponent />
          <ListSkeletonComponent />
        </View>
      ) : (
        <RoomListComponent
          data={roomData}
          navigation={navigation}
          type={type}
          onPress={() =>
            _handleListService(
              type,
              setType,
              navigation,
              RoomService,
              setRoomData,
              () => navigation.navigate("AppStack", { screen: "RoomDetailScreen" })
            )
          }
        />
      )}
    </View>
  );
}
