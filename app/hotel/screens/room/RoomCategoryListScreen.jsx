import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ListSkeletonComponent from "../../components/Skeleton/ListSkeletonComponent";
import { CommonStyles } from "../../style/CommonStyles";
import AppBarComponent from "../../components/AppBar/AppBarComponent";
import DividerComponent from "../../components/Divider/DividerComponent";
import RoomService, { GetAllRoomCategory } from "../../services/RoomService";
import RoomListComponent from "../../components/List/RoomListComponent";
import { LanguageContext } from "../../../hotel/context/LanguageContext";
import _handleListService from "../../helper/HandleListService";
import { RoomContext } from "../../context/RoomContext";
import RoomCategoryListComponent from "../../components/List/RoomCategoryListComponent";
import { useTranslation } from "react-i18next";



export default function RoomCategoryListScreen({ navigation }) {
  const [showLoading, setShowLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);

  const { type, setType } = useContext(RoomContext);
  const { language, translate } = useContext(LanguageContext);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchRoomList = async () => {
      setShowLoading(true);
      try {
        const response = await GetAllRoomCategory(1, 1);
        console.log("response", response);
        if (response.success) {
          setRoomData(response?.data?.roomCategories || []);

        }
      } finally {
        setShowLoading(false)
      }
    };
    fetchRoomList()
  }, [])

  return (
    <View style={CommonStyles.room.container}>
      <AppBarComponent
        title={t('roomCategory')}
        navigation={navigation}
        searchData={roomData}
        type={type}
        showBackIcon={type === "list"}
      />
      <DividerComponent />
      {showLoading ? (
        <View style={CommonStyles.scrollViewContainer}>
          <ListSkeletonComponent />
          <ListSkeletonComponent />
        </View>
      ) : (
        // <RoomListComponent
        //   data={roomData}
        //   navigation={navigation}
        //   type={type}
        //   onPress={() =>
        //     _handleListService(
        //       type,
        //       setType,
        //       navigation,
        //       RoomService,
        //       setRoomData,
        //       () => navigation.navigate("AppStack", { screen: "RoomDetailScreen" })
        //     )
        //   }
        // />
        <FlatList
          data={roomData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RoomCategoryListComponent item={item} navigation={navigation} />}
        />

      )}
    </View>
  );
}
