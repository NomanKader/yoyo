import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import apartmentList from '../../config/apartmentList';
import theme from '../../style/colors';

export default function ListingDetailScreen({navigation,route}) {
  const [activeTab, setActiveTab] = useState('details');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const id=route?.params?.id;
  console.log("ID",id)
  return (
    <ScrollView style={styles.container}>
      {/* Image Gallery */}
      <View style={styles.imageGallery}>
      {/* Back Button - Left Side */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>  
        <Icon name="arrow-left" size={22} color="#FFF" />
      </TouchableOpacity>

      {/* Bookmark Icon - Right Side */}
      <TouchableOpacity
        style={[styles.bookmarkButton,{backgroundColor:isBookmarked ? theme.colors.primary: 'rgba(0, 0, 0, 0.5)'}]}
        onPress={() => setIsBookmarked(!isBookmarked)}
      >
        <Icon
          name={isBookmarked ? 'bookmark' : 'bookmark'}
          size={22}
          color={isBookmarked ? theme.colors.textLight : "#FFF"} // Gold when active, white when inactive
          solid={isBookmarked} // Makes the icon filled when bookmarked
        />
      </TouchableOpacity>

      {/* Main Image */}
      <Image source={{ uri: apartmentList[id-1].image }} style={styles.mainImage} />
    </View>


      {/* Property Information */}
      <View style={styles.content}>
        <Text style={styles.distance}>2kms away</Text>
        <TouchableOpacity style={styles.virtualTourButton}>
          <Text style={styles.virtualTourText}>Virtual Tour</Text>
        </TouchableOpacity>

        <Text style={styles.title}>No.12, 34th street</Text>
        <Text style={styles.price}>300000 MMK/month</Text>
        <Text style={styles.price}>10000 MMK/day</Text>

        {/* Rating & Owner Details */}
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Icon name="star" size={18} color="#FFD700" />
          <Text style={{marginLeft: 10}}>3.4</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Image
              source={{uri: apartmentList[id-1].ownerImage}}
              style={styles.ownerAvatar}
            />
            <View style={{marginLeft: 10}}>
              <Text style={styles.ownerName}>Hla Hla</Text>
              <Text style={styles.ownerTitle}>Owner</Text>
            </View>
          </View>

          {/* Message Icon Aligned to the Right */}
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/apartmentTab/messageIcon.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('details')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'details' && styles.activeTab,
              ]}>
              Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('reviews')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'reviews' && styles.activeTab,
              ]}>
              Reviews
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'details' ? (
          <View>
            <Text style={styles.sectionTitle}>Address</Text>
            <Text style={styles.sectionContent}>Panbedan, Maharbandula</Text>

            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionContent}>We have 3 rooms available</Text>

            {/* Map View and Rent Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.mapButton}>
                <Icon name="map" size={18} color="#000" />
                <Text style={styles.mapText}>Map View</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rentButton}>
                <Text style={styles.rentText}>Rent</Text>
              </TouchableOpacity>
            </View>
            {/* Apartment Images */}
            <View style={{flexDirection: 'row', marginTop: 20}}>
              {apartmentList.map((apartment, index) => (
                <Image
                  key={index}
                  source={{uri: apartment.image}}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    marginRight: index !== apartmentList.length - 1 ? 10 : 0, // Adds space except for the last image
                  }}
                />
              ))}
            </View>

            {/* Other Details */}
            <Text style={styles.sectionTitle}>Other details</Text>
            <View style={styles.otherDetails}>
              <Text style={styles.detailItem}>
                ✔ Wi-Fi (Additional Charges)
              </Text>
              <Text style={styles.detailItem}>✔ Laundry Facilities</Text>
              <Text style={styles.detailItem}>✔ Study Areas</Text>
              <Text style={styles.detailItem}>✔ Bicycle Storage</Text>
              <Text style={styles.detailItem}>✔ Shared Kitchen</Text>
            </View>
          </View>
        ) : (
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image
                source={{uri: apartmentList[id-1].ownerImage}}
                style={styles.reviewAvatar}
              />
              <View>
                <Text style={styles.reviewName}>{apartmentList[2].owner}</Text>
                <Text style={styles.reviewDate}>June 2, 2024</Text>
              </View>
            </View>
            {/* Star Rating */}
            <View style={styles.ratingStars}>
              {[...Array(4)].map((_, index) => (
                <Icon key={index} name="star" size={16} color="#FFD700" />
              ))}
              <Icon name="star" size={16} color="#CCCCCC" />
            </View>
            {/* Review Text */}
            <Text style={styles.reviewText}>
              The location is near Sule Square.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F8F8F8'},
  imageGallery: {position: 'relative'},
  bookmarkButton: {
    position: 'absolute',
    top: 10,
    right: 10, // Positions the bookmark button on the right
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    borderRadius: 20,
    zIndex: 1, // Ensures the button is on top of the image
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    zIndex:1
  },
  checkButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  mainImage: {width: '100%', height: 200, resizeMode: 'cover'},
  content: {
    padding: 15,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  distance: {fontSize: 16, fontWeight: 'bold'},
  virtualTourButton: {
    backgroundColor: '#4A90E2',
    padding: 6,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  virtualTourText: {color: '#FFF', fontSize: 14},
  title: {fontSize: 20, fontWeight: 'bold', marginTop: 10},
  price: {fontSize: 16, color: '#666'},
  ownerSection: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  ownerAvatar: {width: 40, height: 40, borderRadius: 20, marginRight: 10},
  tabContainer: {flexDirection: 'row', marginTop: 20},
  tabText: {fontSize: 16, marginRight: 20, color: '#666'},
  activeTab: {
    fontWeight: 'bold',
    color: '#4A90E2',
    borderBottomWidth: 2,
    borderBottomColor: '#4A90E2',
    paddingBottom: 5,
  },
  sectionTitle: {fontSize: 16, fontWeight: 'bold', marginTop: 15},
  buttonRow: {flexDirection: 'row', marginTop: 15},
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  rentButton: {backgroundColor: '#4A90E2', padding: 10, borderRadius: 5},
  rentText: {color: '#FFF', fontSize: 14},

  // Review Section
  reviewCard: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    marginTop: 10,
  },
  reviewHeader: {flexDirection: 'row', alignItems: 'center'},
  reviewAvatar: {width: 40, height: 40, borderRadius: 20, marginRight: 10},
  reviewName: {fontSize: 16, fontWeight: 'bold'},
  reviewDate: {fontSize: 12, color: '#666'},
  ratingStars: {flexDirection: 'row', marginVertical: 5},
  reviewText: {fontSize: 14, color: '#333'},
});
