import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { GetAllAddOn } from "../../../services/BookingService";
import DetailAppBarComponent from "../../../components/AppBar/DetailAppBarComponent";
import DividerComponent from "../../../components/Divider/DividerComponent";
import DefaultButtonComponent from "../../../components/Button/DefaultButtonComponent";
import theme from "../../../style/colors";

import CheckBox from "react-native-check-box";
import { useRoomData } from "../../../context/CreatCategoryContext";

const RoomCategoryAddOnScreen = ({ navigation }) => {
  const [addOns, setAddOns] = useState([]);
  const [loading, setLoading] = useState(false);

  const { roomData, updateRoomData } = useRoomData();

  useEffect(() => {
    fetchAddOns();
  }, []);

  const fetchAddOns = async () => {
    try {
      setLoading(true);
      const res = await GetAllAddOn();

      const list = Array.isArray(res?.data?.data) ? res.data.data : [];
      const savedAddOns = roomData?.addOns ?? [];

      const formatted = list.map((item) => {
        const existing = savedAddOns.find(
          (x) => Number(x.addOnId) === Number(item.id)
        );

        return {
          id: String(item.id),
          name: item.description ?? "",
          price: Number(item.price ?? 0),
          selected: !!existing,
          quantity: existing?.quantity ?? 1,
        };
      });

      setAddOns(formatted);
    } catch (error) {
      console.log("GetAllAddOn error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Sync local addOns -> context AFTER render (no warning)
  useEffect(() => {
    const selectedAddOns = addOns
      .filter((a) => a.selected)
      .map((a) => ({
        addOnId: Number(a.id),
        quantity: a.quantity,
      }));

    updateRoomData({ addOns: selectedAddOns });
  }, [addOns, updateRoomData]);

  // 👉 ONLY update local state, no context here
  const toggleAddOn = (id) => {
    setAddOns((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, selected: !a.selected } : a
      )
    );
  };

  // 👉 ONLY update local state, no context here
  const changeQuantity = (id, delta) => {
    setAddOns((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;

        const newQty = Math.max(1, a.quantity + delta);

        return { ...a, quantity: newQty };
      })
    );
  };

  const handleProceed = () => {
    console.log("roomData add-ons:", JSON.stringify(roomData, null, 2));
    navigation.navigate("AppStack", {
      screen: "RoomBasicFeatureScreen",
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <DetailAppBarComponent title="Room Add-ons" navigation={navigation} />
      </View>

      <DividerComponent />

      {loading && (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading add-ons...</Text>
        </View>
      )}

      {!loading && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {addOns.length === 0 ? (
            <Text style={styles.emptyText}>No add-ons available.</Text>
          ) : (
            addOns.map((item) => (
              <View key={item.id} style={styles.row}>
                {/* Checkbox */}
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    style={styles.checkboxStyle}
                    isChecked={item.selected}
                    onClick={() => toggleAddOn(item.id)}
                    checkBoxColor={theme.colors.primary}
                  />
                </View>

                {/* Name + Price */}
                <View style={styles.middleContainer}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.priceText}>{item.price} MMK</Text>
                </View>

                {/* Quantity (disabled if unchecked) */}
                <View style={styles.qtyContainer}>
                  <TouchableOpacity
                    style={[
                      styles.qtyButton,
                      (!item.selected || item.quantity <= 1) &&
                        styles.qtyButtonDisabled,
                    ]}
                    onPress={() =>
                      item.selected && changeQuantity(item.id, -1)
                    }
                    disabled={!item.selected || item.quantity <= 1}
                  >
                    <Text style={styles.qtyButtonText}>-</Text>
                  </TouchableOpacity>

                  <Text
                    style={[
                      styles.qtyText,
                      !item.selected && { opacity: 0.4 },
                    ]}
                  >
                    {item.quantity}
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.qtyButton,
                      !item.selected && styles.qtyButtonDisabled,
                    ]}
                    onPress={() =>
                      item.selected && changeQuantity(item.id, +1)
                    }
                    disabled={!item.selected}
                  >
                    <Text style={styles.qtyButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}

      <View style={styles.buttonContainer}>
        <DefaultButtonComponent
          title="Proceed"
          backgroundColor={theme.colors.primary}
          onPress={handleProceed}
        />
      </View>
    </View>
  );
};

export default RoomCategoryAddOnScreen;

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  loadingWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  loadingText: {
    marginTop: 8,
    color: "#777",
  },
  emptyText: {
    marginTop: 24,
    textAlign: "center",
    color: "#777",
  },

  row: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },

  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  checkboxStyle: {
    height: 26,
    width: 26,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },

  middleContainer: {
    flex: 1,
    marginRight: 8,
  },

  itemName: {
    fontSize: 15,
    fontWeight: "600",
  },

  priceText: {
    marginTop: 3,
    fontSize: 13,
    color: "#555",
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },

  qtyButtonDisabled: {
    opacity: 0.3,
  },

  qtyButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },

  qtyText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "600",
    minWidth: 20,
    textAlign: "center",
  },

  buttonContainer: {
    backgroundColor: "white",
    padding: 16,
  },
});
