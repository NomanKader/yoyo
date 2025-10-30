import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, PermissionsAndroid, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StepAppBarComponent from "../../../components/AppBar/StepAppBarComponent";
import TextInputComponent from "../../../components/TextInput/TextInputComponent";
import theme from "../../../style/colors";
import { CommonStyles } from "../../../style/CommonStyles";
import DefaultButtonComponent from "../../../components/Button/DefaultButtonComponent";
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomSheetComponent from "../../../components/BottomSheet/BottomSheetComponent";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ImageUpload, RemoveImage } from "../../../../common/service/ImageFileService";
import { CreateRoom } from "../../../services/RoomService";
import { BASE_IMAGE_URL } from "../../../../common/service/HttpService";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const pickerOpts = { mediaType: 'photo', quality: 0.9, includeBase64: true };

const CreateNewRoomScreen = ({ navigation, route }) => {
    const [roomNo, setRoomNo] = useState("");
    const { id } = route.params || "";
    const [images, setImages] = useState([]); // uploaded image names
    const [editingIndex, setEditingIndex] = useState(null);
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const hasAny = images.length > 0;

    const openBottomSheet = (index) => {
        setEditingIndex(index);
        setIsBottomSheetVisible(true);
    };
    const closeBottomSheet = () => setIsBottomSheetVisible(false);

    const pickDone = async (response) => {
        if (!response?.assets?.length) return closeBottomSheet();

        const image = response.assets[0];

        if (image.fileSize && image.fileSize > MAX_FILE_SIZE) {
            Alert.alert('File too large', 'Please select a photo up to 5 MB.');
            return closeBottomSheet();
        }

        const fileName = image.fileName || image.uri?.split('/').pop();
        const fileType = image.type || `image/${(fileName?.split('.').pop() || 'jpeg').toLowerCase()}`;

        const formData = new FormData();
        formData.append('myFile', {
            uri: image.uri || image.path,
            type: fileType,
            name: fileName,
        });
        formData.append('usage', 0);

        try {
            closeBottomSheet();
            setUploading(true);
            const uploadResponse = await ImageUpload(formData);

            if (uploadResponse?.success) {
                setImages((prev) => {
                    const next = [...prev];
                    if (editingIndex != null && editingIndex < next.length) {
                        next[editingIndex] = uploadResponse.data?.name;
                    } else {
                        next.push(uploadResponse.data?.name);
                    }
                    return next;
                });
            }
        } catch (error) {
            console.error('Upload failed:', error);
            Alert.alert('Upload failed', 'Something went wrong while uploading.');
        } finally {
            setUploading(false);
        }
    };

    const handleGallery = () => launchImageLibrary(pickerOpts, pickDone);

    const requestCameraPermission = async () => {
        if (Platform.OS !== 'android') return true;
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'Allow camera to take photos.',
                    buttonPositive: 'OK',
                    buttonNegative: 'Cancel',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch {
            return false;
        }
    };

    const handleCamera = async () => {
        const ok = await requestCameraPermission();
        if (ok) launchCamera(pickerOpts, pickDone);
    };

    const handleDelete = async (index) => {
        try {
            const response = await RemoveImage(images[index]);
            if (response?.success) {
                setImages((prev) => prev.filter((_, i) => i !== index));
            } else {
                console.warn('Failed to remove image:', response.message);
            }
        } catch (error) {
            console.error('Image delete error:', error);
        }
    };

    const handleSubmit = async () => {
        if (!hasAny) {
            return Alert.alert('Add a photo', 'Please upload at least one photo.');
        }

        const postBody = {
            roomCategoryId: id,
            roomNumber: roomNo,
            roomPhotos: images.map((img) => ({
                photoName: img,
                photoTypeId: 0,
            })),
            status: 1,
        };
        // console.log("PostBody",JSON.stringify(postBody))
        // return

        try {
            setSubmitting(true); // start loading
            const response = await CreateRoom({
                languageId: 1,
                hotelId: 1,
                body: postBody,
            });

            if (response.success) {
                console.log('Room created:', response);
                navigation.replace("AppStack", { screen: "RoomListScreen", params: { id: id } })
            } else {
                Alert.alert('Error', response.message || 'Failed to create room.');
            }
        } catch (error) {
            console.log('Create error', error);
            Alert.alert('Error', 'Failed to create room. Please try again.');
        } finally {
            setSubmitting(false); // stop loading
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StepAppBarComponent
                title="Some Screen"
                currentStep="1"
                maxStep={2}
                navigation={navigation}
            />
            <ScrollView showsVerticalScrollIndicator={false}>


                <View style={{ marginVertical: 24 }}>
                    <Text style={CommonStyles.header}>Add New Room</Text>
                    <Text style={CommonStyles.subHeader}>
                        Add a new room to your categories of hotels using {"\n"} this form
                    </Text>
                </View>

                <TextInputComponent
                    placeholder="Room NO"
                    value={roomNo}
                    onChangeText={setRoomNo}
                    label="Room No"
                    keyboardType="numeric"
                />

                <View style={{ marginVertical: 24 }}>
                    <Text style={CommonStyles.header}>Add Photos</Text>
                    <Text style={CommonStyles.subHeader}>
                        Please upload at least one photo for this category to be created.
                    </Text>
                </View>

                {images.map((image, idx) => (
                    <View key={idx} style={styles.verticalCard}>
                        <Image
                            source={{ uri: `${BASE_IMAGE_URL}${image}` }}
                            style={styles.verticalImage}
                        />
                        <View style={styles.cardActions}>
                            <TouchableOpacity
                                style={styles.iconBtn}
                                onPress={() => openBottomSheet(idx)}
                                disabled={uploading || submitting}
                            >
                                <Icon name="edit" size={18} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.iconBtn}
                                onPress={() => handleDelete(idx)}
                                disabled={uploading || submitting}
                            >
                                <Icon name="delete" size={18} color={theme.colors.error} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {/* Add photo card */}
                <TouchableOpacity
                    onPress={() => openBottomSheet(images.length)}
                    style={styles.addVerticalCard}
                    disabled={uploading || submitting}
                >
                    {uploading ? (
                        <ActivityIndicator size="small" color={theme.colors.primary} />
                    ) : (
                        <>
                            <Icon name="add" size={32} color={theme.colors.primary} />
                            <Text style={styles.addTileText}>Add photo</Text>
                        </>
                    )}
                </TouchableOpacity>

                <View>
                    <DefaultButtonComponent
                        title={submitting ? 'Submitting...' : 'Continue'}
                        backgroundColor={theme.colors.primary}
                        onPress={handleSubmit}
                        disabled={submitting}
                    />
                </View>

                <BottomSheetComponent
                    isVisible={isBottomSheetVisible}
                    onClose={closeBottomSheet}
                    title="Choose Option"
                >
                    <TouchableOpacity
                        style={styles.option}
                        onPress={handleCamera}
                        disabled={uploading || submitting}
                    >
                        <Icon name="photo-camera" size={20} color="#000" />
                        <Text style={styles.optionText}>Camera</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity
                        style={styles.option}
                        onPress={handleGallery}
                        disabled={uploading || submitting}
                    >
                        <Icon name="photo-library" size={20} color="#000" />
                        <Text style={styles.optionText}>Gallery</Text>
                    </TouchableOpacity>
                </BottomSheetComponent>
            </ScrollView>

        </SafeAreaView>
    );
};

export default CreateNewRoomScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    verticalCard: {
        width: '100%',
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginVertical: 15,
    },
    verticalImage: { width: '100%', height: 180, resizeMode: 'cover' },
    cardActions: { position: 'absolute', top: 10, right: 10, flexDirection: 'row', gap: 8 },
    iconBtn: { backgroundColor: '#fff', borderRadius: 999, padding: 6 },
    addVerticalCard: {
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        gap: 8,
    },
    addTileText: { fontSize: 12, color: '#111827', fontWeight: '600' },
    option: { flexDirection: 'row', alignItems: 'center', padding: 16 },
    optionText: { fontSize: 16, marginLeft: 10 },
    divider: { height: 1, backgroundColor: '#e5e7eb' },
});
