import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import uploadDocumentIcon from '../../assets/icons/uploadDocumentIcon.png';
import docuementCheckIcon from '../../assets/icons/documentCheckIcon.png';

const DocumentUploadModal = ({visible, onClose, onSubmitID, onSubmitDocs}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Image source={uploadDocumentIcon} style={styles.icon} />
          <Text style={styles.title}>You’re warmly welcome!</Text>
          <Text style={styles.description}>
            Kindly submit scans or clear photographs of both sides of your
            National ID card and all relevant hotel documentation, including
            your hotel registration on Basic Details info screen.
          </Text>

          <View style={styles.uploadBox}>
            <View style={styles.info}>
              <Image
                source={docuementCheckIcon}
                style={styles.idCardCheckIcon}
              />
              <View style={styles.textBlock}>
                <Text style={styles.label}>ID Card</Text>
                <Text style={styles.sub}>Front & Back</Text>
              </View>
            </View>
            <Pressable onPress={onSubmitID}>
              <Text style={styles.link}>Submit</Text>
            </Pressable>
          </View>

          <View style={styles.uploadBox}>
            <View style={styles.info}>
              <Image
                source={docuementCheckIcon}
                style={styles.documentCheckIcon}
              />
              <View style={styles.textBlock}>
                <Text style={styles.label}>Documents</Text>
                <Text style={styles.sub}>Official Hotel Documents</Text>
              </View>
            </View>
            <Pressable onPress={onSubmitDocs}>
              <Text style={styles.link}>Submit</Text>
            </Pressable>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <Text style={styles.modalCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 16,
    width: '90%',
    alignItems: 'center',
  },
  icon: {width: '30%', resizeMode: 'contain'},
  idCardCheckIcon: {width: '20%', resizeMode: 'contain'},
  documentCheckIcon: {width: '15%', resizeMode: 'contain'},
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  uploadBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#007aff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  info: {flexDirection: 'row', alignItems: 'center'},
  textBlock: {marginLeft: 10},
  label: {fontSize: 16, fontWeight: '500'},
  sub: {fontSize: 12, color: '#777'},
  link: {color: '#007aff', fontWeight: 'bold'},
  closeText: {color: '#fff', fontWeight: 'bold'},
});

export default DocumentUploadModal;
