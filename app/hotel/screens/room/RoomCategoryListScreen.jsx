import React, { useContext, useEffect, useState, useCallback } from "react";
import { FlatList, View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import ListSkeletonComponent from "../../components/Skeleton/ListSkeletonComponent";
import { CommonStyles } from "../../style/CommonStyles";
import AppBarComponent from "../../components/AppBar/AppBarComponent";
import DividerComponent from "../../components/Divider/DividerComponent";
import { GetAllRoomCategory } from "../../services/RoomService";
import RoomCategoryListComponent from "../../components/List/RoomCategoryListComponent";
import { LanguageContext } from "../../../hotel/context/LanguageContext";
import { RoomContext } from "../../context/RoomContext";

export default function RoomCategoryListScreen({ navigation }) {
  const [showLoading, setShowLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // <-- for pull-to-refresh

  const { type, setType } = useContext(RoomContext);
  const { language, translate } = useContext(LanguageContext);
  const { t } = useTranslation();

  const fetchRoomList = useCallback(async () => {
    setShowLoading(true);
    try {
      const response = await GetAllRoomCategory(1, 1);
      if (response.success) {
        setRoomData(response?.data?.roomCategories || []);
      }
    } finally {
      setShowLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoomList();
  }, [fetchRoomList]);

  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await GetAllRoomCategory(1, 1);
      if (response.success) {
        setRoomData(response?.data?.roomCategories || []);
      }
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={CommonStyles.room.container}>
      <AppBarComponent
        title={t("roomCategory")}
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
      ) : roomData.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 16, color: "#999" }}>
            {"No category found"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={roomData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RoomCategoryListComponent item={item} navigation={navigation} />
          )}
          refreshing={refreshing}   // <-- bind refreshing state
          onRefresh={onRefresh}     // <-- pull-to-refresh callback
        />
      )}
    </View>
  );
}
