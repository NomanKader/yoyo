import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../styles/colors';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import {useFocusEffect} from '@react-navigation/native';

const PropertiesDetailsScreen = ({navigation, route}) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.submitted) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 2000);
      }
    }, [route.params]),
  );
  const availableUnits = [
    {
      id: '1',
      title: 'Skyview Residence 12',
      price: '$1,200/mo',
      image:
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    },
    {
      id: '2',
      title: 'Skyview Residence 18',
      price: '$1,500/mo',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
    },
    {
      id: '3',
      title: 'Skyview Residence 22',
      price: '$1,800/mo',
      image: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
    },
    {
      id: '4',
      title: 'Skyview Residence 12',
      price: '$1,200/mo',
      image:
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Home Detail</Text>

        <TouchableOpacity onPress={() => console.log('Favorite Toggled')}>
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {/* Property Image */}
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/358528/pexels-photo-358528.jpeg',
          }}
          style={styles.propertyImage}
        />

        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.propertyTitle}>Skyview Residence 18</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="gray" />
              <Text style={styles.locationText}>Phrom Phong, Bangkok</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>$176.00</Text>
            <Text style={styles.priceSubText}>/month</Text>
          </View>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.featureThreeItem}>
            <Ionicons name="business-outline" size={20} color="black" />
            <Text style={styles.featureText}>Condo</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.featureThreeItem}>
            <Ionicons name="bed-outline" size={20} color="black" />
            <Text style={styles.featureText}>1 Bed</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.featureThreeItem}>
            <Ionicons name="water-outline" size={20} color="black" />
            <Text style={styles.featureText}>1 Bath</Text>
          </View>
        </View>

        {/* Agent Information */}
        <View style={styles.agentCard}>
          {/* Profile Image */}
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
            }}
            style={styles.agentImage}
          />

          {/* Agent Info */}
          <View style={styles.agentInfo}>
            <Text style={styles.agentName}>Aiden Christopher Lee</Text>
            <Text style={styles.agentTitle}>Real estate broker</Text>
          </View>

          {/* Call Icon */}
          <TouchableOpacity
            style={styles.callIcon}
            onPress={() => console.log('Call Agent')}>
            <Ionicons name="call-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          A beautiful 2-bedroom apartment in the heart of the city with modern
          amenities, stunning views, and easy access to shopping, restaurants,
          and entertainment.
        </Text>

        {/* Amenities */}
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenitiesContainer}>
          <View style={styles.amenityItem}>
            <Ionicons name="tv-outline" size={20} color="black" />
            <Text style={styles.amenityText}>TV</Text>
          </View>
          <View style={styles.amenityItem}>
            <Ionicons name="wifi-outline" size={20} color="black" />
            <Text style={styles.amenityText}>Wifi</Text>
          </View>
          <View style={styles.amenityItem}>
            <Ionicons name="flame-outline" size={20} color="black" />
            <Text style={styles.amenityText}>Stove</Text>
          </View>
          <View style={styles.amenityItem}>
            <Ionicons name="snow-outline" size={20} color="black" />
            <Text style={styles.amenityText}>AC</Text>
          </View>
          <View style={styles.amenityItem}>
            <Ionicons name="thermometer-outline" size={20} color="black" />
            <Text style={styles.amenityText}>Heater</Text>
          </View>
          <View style={styles.amenityItem}>
            <Ionicons name="pizza-outline" size={20} color="black" />
            <Text style={styles.amenityText}>Oven</Text>
          </View>
          <View style={styles.amenityItem}>
            <Ionicons name="water-outline" size={20} color="black" />
            <Text style={styles.amenityText}>Dishwasher</Text>
          </View>
          <View style={styles.amenityItem}>
            <Ionicons name="cube-outline" size={20} color="black" />
            <Text style={styles.amenityText}>Refrigerator</Text>
          </View>
        </View>

        {/* Basic Information Section */}
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <View style={styles.basicInfoContainer}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Date listed</Text>
            <Text style={styles.infoValue}>Jun 16, 2022</Text>

            <Text style={styles.infoLabel}>Property Type</Text>
            <Text style={styles.infoValue}>Condo</Text>

            <Text style={styles.infoLabel}>Number of Units</Text>
            <Text style={styles.infoValue}>24</Text>

            <Text style={styles.infoLabel}>Furniture</Text>
            <Text style={styles.infoValue}>Furnished</Text>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Date listed</Text>
            <Text style={styles.infoValue}>Jun 16, 2022</Text>

            <Text style={styles.infoLabel}>Floor</Text>
            <Text style={styles.infoValue}>3</Text>

            <Text style={styles.infoLabel}>Size</Text>
            <Text style={styles.infoValue}>36 SqM</Text>
          </View>
        </View>

        {/* Maps Section */}
        <Text style={styles.sectionTitle}>Maps</Text>
        <Image
          source={{
            uri: 'https://static-maps.yandex.ru/1.x/?ll=100.5690,13.7309&z=15&size=600,300&l=map&pt=100.5690,13.7309,pm2rdl',
          }}
          style={styles.mapImage}
        />

        {/* Project Details */}
        <Text style={styles.sectionTitle}>Project Details</Text>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
          }}
          style={styles.projectImage}
        />
        {/* Project Details Section */}
        <Text style={styles.sectionTitle}>Project Details</Text>
        <View style={styles.basicInfoContainer}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Project Name</Text>
            <Text style={styles.infoValue}>Skyline Oasis Residences</Text>

            <Text style={styles.infoLabel}>Property Type</Text>
            <Text style={styles.infoValue}>Condo</Text>

            <Text style={styles.infoLabel}>Number of Units</Text>
            <Text style={styles.infoValue}>24</Text>

            <Text style={styles.infoLabel}>Furniture</Text>
            <Text style={styles.infoValue}>Furnished</Text>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Developer</Text>
            <Text style={styles.infoValue}>Urban Elegance Developments</Text>

            <Text style={styles.infoLabel}>Floor</Text>
            <Text style={styles.infoValue}>3</Text>

            <Text style={styles.infoLabel}>Size</Text>
            <Text style={styles.infoValue}>36 SqM</Text>
          </View>
        </View>

        {/* Project Features */}
        <Text style={styles.sectionTitle}>Project Features</Text>
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Ionicons name="water-outline" size={20} color="black" />
            <Text style={styles.featureText}>Pool</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="leaf-outline" size={20} color="black" />
            <Text style={styles.featureText}>Garden</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="shield-checkmark-outline" size={20} color="black" />
            <Text style={styles.featureText}>Security 24 Hours</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="flame-outline" size={20} color="black" />
            <Text style={styles.featureText}>Sauna</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="barbell-outline" size={20} color="black" />
            <Text style={styles.featureText}>GYM</Text>
          </View>
        </View>

        {/* Available Units */}
        {/* Available Units Section */}
        <Text style={styles.sectionTitle}>
          Available Units at Skyview Residence
        </Text>
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{paddingVertical: 10}}>
          <View style={styles.availableUnitsContainer}>
            {availableUnits.map(item => (
              <View key={item.id} style={styles.unitCard}>
                <Image source={{uri: item.image}} style={styles.unitImage} />

                {/* Heart Icon */}
                <TouchableOpacity style={styles.heartIcon}>
                  <Ionicons name="heart-outline" size={20} color="red" />
                </TouchableOpacity>

                {/* Unit Details */}
                <Text style={styles.unitTitle}>{item.title}</Text>
                <Text style={styles.unitLocation}>📍 Phrom Phong, Bangkok</Text>
                <Text style={styles.unitPrice}>{item.price}</Text>

                {/* Unit Features */}
                <View style={styles.unitFeatures}>
                  <Ionicons name="business-outline" size={16} color="black" />
                  <Text style={styles.featureText}> Condo</Text>
                  <Ionicons
                    name="bed-outline"
                    size={16}
                    color="black"
                    style={{marginLeft: 10}}
                  />
                  <Text style={styles.featureText}> 2 Bed</Text>
                  <Ionicons
                    name="water-outline"
                    size={16}
                    color="black"
                    style={{marginLeft: 10}}
                  />
                  <Text style={styles.featureText}> 1 Bath</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Request Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => console.log('Open Chat')}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>

          <DefaultButtonComponent
            title="Request Info"
            onPress={() => navigation.navigate('enquiryScreen')}
            backgroundColor="#1E40AF" // Blue color
            buttonStyle={styles.requestButton}
          />
        </View>
      </ScrollView>
      <Modal visible={showSuccessModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Ionicons name="checkmark-circle" size={50} color="#1E40AF" />
            <Text style={styles.modalTitle}>Thanks for your inquiry</Text>
            <Text style={styles.modalMessage}>
              We'll contact you soon with details. Explore more properties in
              our app while you wait. Thanks for your patience!
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PropertiesDetailsScreen;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', color: '#000', marginTop: 10},
  modalMessage: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 15,
  },
  chatButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.textGray,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  unitList: {
    paddingBottom: 20,
  },
  availableUnitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
  },
  agentImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 10,
    elevation: 2, // Adds shadow for better design
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  infoColumn: {
    width: '45%',
  },
  locationText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5,
  },
  basicInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoColumn: {
    width: '45%',
  },
  infoLabel: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  mapImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.textGray,
  },
  priceContainer: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  priceSubText: {
    fontSize: 12,
    color: 'gray',
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  propertyImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#007BFF',
    marginTop: 5,
  },
  agentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  agentInfo: {
    flex: 1,
    marginLeft: 10,
  },
  agentName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  agentTitle: {
    fontSize: 12,
    color: 'gray',
  },
  callIcon: {
    padding: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    marginBottom: 10,
  },
  amenityText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  amenities: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },

  projectImage: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 15,
  },
  unitPrice: {
    fontSize: 14,
    color: '#007BFF',
    marginTop: 2,
  },
  requestButton: {
    flex: 1,
    height: 50,
    marginLeft: 10,
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 10,
  },
  divider: {
    width: 1,
    height: 25,
    backgroundColor: '#E0E0E0',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    marginBottom: 10,
  },
  featureThreeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  unitCard: {
    backgroundColor: theme.colors.textLight,
    borderRadius: 15,
    marginVertical: 15,
    paddingBottom: 10,
    elevation: 1,
    width: '48%',
    overflow: 'hidden',
  },
  unitImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 5,
  },
  unitTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  unitLocation: {
    fontSize: 12,
    color: 'gray',
    paddingHorizontal: 10,
  },
  unitPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007BFF',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  unitFeatures: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  featureText: {
    fontSize: 10,
    marginStart: 10,
    color: '#000',
  },
});
