import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    Text,
    Modal,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import DetailAppBarComponent from "../../components/AppBar/DetailAppBarComponent";
import DividerComponent from "../../components/Divider/DividerComponent";
import TextInputComponent from "../../components/TextInput/TextInputComponent";
import DefaultButtonComponent from "../../components/Button/DefaultButtonComponent";
import theme from "../../style/colors";

import {
    CreateAddOn,
    DeleteAddOn,
    GetAllAddOn,
    UpdateAddOn,
} from "../../services/BookingService";

export default function AddOnSettingScreen({ navigation }) {
    const [savedItems, setSavedItems] = useState([]);

    const [editableItemId, setEditableItemId] = useState(null);
    const [editFields, setEditFields] = useState({
        name: "",
        price: "",
    });

    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [newItem, setNewItem] = useState({
        name: "",
        price: "",
    });

    const [listLoading, setListLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    // ---------------- LOAD ALL ADD ONS ----------------
    useEffect(() => {
        fetchAddOns();
    }, []);

    const fetchAddOns = async () => {
        try {
            setListLoading(true);
            const res = await GetAllAddOn();

            const list = Array.isArray(res?.data?.data) ? res.data.data : [];

            const formatted = list.map((item) => ({
                id: String(item.id),
                name: item.description ?? "",
                price: Number(item.price ?? 0),
            }));

            setSavedItems(formatted);
        } catch (error) {
            console.error("Error fetching add-ons:", error);
            Alert.alert("Error", "Failed to load add-on items.");
        } finally {
            setListLoading(false);
        }
    };

    // ---------------- EDIT ----------------
    const startEdit = (item) => {
        setEditableItemId(item.id);
        setEditFields({
            name: item.name,
            price: String(item.price),
        });
    };

    const saveEdit = async (id) => {
        if (!editFields.name.trim()) {
            Alert.alert("Missing info", "Please enter item name.");
            return;
        }
        if (!editFields.price.trim()) {
            Alert.alert("Missing info", "Please enter price.");
            return;
        }

        const body = {
            id: Number(id),
            price: Number(editFields.price),
            status: 1,
            descriptions: [
                {
                    languageId: 1,
                    description: editFields.name.trim(),
                },
            ],
        };

        try {
            setActionLoading(true);
            await UpdateAddOn(body);

            setSavedItems((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            name: editFields.name.trim(),
                            price: Number(editFields.price),
                        }
                        : item
                )
            );

            setEditableItemId(null);
            Alert.alert("Success", "Add-on updated successfully.");
        } catch (error) {
            console.log("Update error:", error);
            Alert.alert("Error", "Failed to update add-on.");
        } finally {
            setActionLoading(false);
        }
    };

    // ---------------- DELETE ----------------
    const deleteSaved = (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this add-on?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setActionLoading(true);
                            await DeleteAddOn(id);
                            setSavedItems((prev) => prev.filter((item) => item.id !== id));
                            Alert.alert("Deleted", "Add-on removed successfully.");
                        } catch (error) {
                            console.log("Delete error:", error);
                            Alert.alert("Error", "Failed to delete add-on.");
                        } finally {
                            setActionLoading(false);
                        }
                    },
                },
            ]
        );
    };

    // ---------------- ADD NEW ITEM ----------------
    const openAddModal = () => {
        setNewItem({ name: "", price: "" });
        setIsAddModalVisible(true);
    };

    const closeAddModal = () => {
        setIsAddModalVisible(false);
    };

    const handleSaveNewItem = async () => {
        if (!newItem.name.trim()) {
            Alert.alert("Missing info", "Please enter item name.");
            return;
        }
        if (!newItem.price.trim()) {
            Alert.alert("Missing info", "Please enter price.");
            return;
        }

        try {
            setActionLoading(true);

            const body = {
                id: 0,
                price: Number(newItem.price),
                status: 1,
                descriptions: [
                    {
                        languageId: 1,
                        description: newItem.name.trim(),
                    },
                ],
            };

            const res = await CreateAddOn(body);
            const createdId = res?.data?.id ?? Date.now();

            const newSaved = {
                id: String(createdId),
                name: newItem.name.trim(),
                price: Number(newItem.price),
            };

            setSavedItems((prev) => [...prev, newSaved]);
            setIsAddModalVisible(false);
            Alert.alert("Success", "Add-on created successfully");
        } catch (err) {
            console.log("Create error:", err);
            Alert.alert("Error", "Failed to create add-on");
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <DetailAppBarComponent title={"Add on items"} navigation={navigation} />
            <DividerComponent />

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* 🔥 Show loading during fetch */}
                {listLoading ? (
                    <View style={{ marginTop: 40, alignItems: "center" }}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                        <Text style={{ marginTop: 10, color: "#777" }}>Loading items...</Text>
                    </View>
                ) : savedItems.length > 0 ? (
                    <View style={styles.savedListContainer}>
                        {savedItems.map((it, idx) => (
                            <View key={it.id} style={styles.savedItemCard}>
                                {editableItemId === it.id ? (
                                    <>
                                        <TextInputComponent
                                            label="Name"
                                            value={editFields.name}
                                            onChangeText={(t) =>
                                                setEditFields({ ...editFields, name: t })
                                            }
                                        />

                                        <TextInputComponent
                                            label="Price"
                                            value={editFields.price}
                                            keyboardType="number-pad"
                                            onChangeText={(t) =>
                                                setEditFields({ ...editFields, price: t })
                                            }
                                        />

                                        <DefaultButtonComponent
                                            title="Save Changes"
                                            backgroundColor={theme.colors.primary}
                                            onPress={() => saveEdit(it.id)}
                                            disabled={actionLoading}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.savedItemTitle}>
                                            {idx + 1}. {it.name}
                                        </Text>

                                        <Text style={styles.savedItemText}>
                                            Price: {it.price} MMK
                                        </Text>

                                        <View style={styles.savedActionsRow}>
                                            <DefaultButtonComponent
                                                title="Edit"
                                                backgroundColor="#4CAF50"
                                                onPress={() => startEdit(it)}
                                                disabled={actionLoading}
                                            />

                                            <DefaultButtonComponent
                                                title="Delete"
                                                backgroundColor="#E53935"
                                                onPress={() => deleteSaved(it.id)}
                                                disabled={actionLoading}
                                            />
                                        </View>
                                    </>
                                )}
                            </View>
                        ))}
                    </View>
                ) : (
                    <Text style={styles.emptyText}>No items added yet.</Text>
                )}

            </ScrollView>


            {/* Floating Add Button */}
            <TouchableOpacity
                style={styles.fabButton}
                onPress={openAddModal}
                disabled={listLoading}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            {/* Add Modal */}
            <Modal visible={isAddModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Item</Text>

                        <TextInputComponent
                            label="Item Name"
                            value={newItem.name}
                            onChangeText={(t) => setNewItem({ ...newItem, name: t })}
                        />

                        <TextInputComponent
                            label="Price"
                            value={newItem.price}
                            keyboardType="number-pad"
                            onChangeText={(t) => setNewItem({ ...newItem, price: t })}
                        />

                        <View style={styles.modalButtonRow}>
                            <DefaultButtonComponent
                                title="Cancel"
                                backgroundColor="#999"
                                onPress={closeAddModal}
                                disabled={actionLoading}
                            />
                            <DefaultButtonComponent
                                title="Save"
                                backgroundColor={theme.colors.primary}
                                onPress={handleSaveNewItem}
                                disabled={actionLoading}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Loading Overlay */}
            {actionLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContent: { paddingBottom: 80 },
    savedListContainer: { marginTop: 8 },
    savedItemCard: {
        padding: 12,
        borderRadius: 6,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e0e0e0",
        marginBottom: 12,
    },
    savedItemTitle: { fontSize: 15, fontWeight: "600", marginBottom: 6 },
    savedItemText: { fontSize: 14, color: "#555", marginBottom: 4 },
    savedActionsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    emptyText: {
        marginTop: 24,
        textAlign: "center",
        fontSize: 14,
        color: "#777",
    },

    fabButton: {
        position: "absolute",
        bottom: 24,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    fabText: { color: "#fff", fontSize: 32, fontWeight: "700", marginTop: -4 },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
    },
    modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
    modalButtonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
    },

    // 🔥 overlay when loading
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.25)",
        justifyContent: "center",
        alignItems: "center",
    },
});
