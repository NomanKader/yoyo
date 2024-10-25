import profileIcon from '../assets/icons/profileIcon.png';
import walletIcon from '../assets/icons/walletIcon.png';
import historyIcon from '../assets/icons/historyIcon.png';
import categoryIcon from '../assets/icons/categoryIcon.png';
import roomIcon from '../assets/icons/roomIcon.png';
import bookingCancelIcon from '../assets/icons/bookingCancelIcon.png';
import languageSettingIcon from '../assets/icons/languageSettingIcon.png';
import requestFacilityIcon from '../assets/icons/requestFacilityIcon.png';
import addOnPriceFeatureIcon from '../assets/icons/addOnPriceFeatureIcon.png';
import manageDiscountIcon from '../assets/icons/manageDiscountIcon.png';
import logoutIcon from '../assets/icons/logoutIcon.png';

const accountSettings = [
    {
      icon: profileIcon,
      header: 'Profile Settings',
      subheader: 'Edit your profile',
      navigateTo:null,
    }, // Set navigateTo to null
    {
      icon: walletIcon,
      header: 'Wallet',
      subheader: 'Manage your wallet',
      navigateTo: {name: 'AppStack', params: {screen: 'WalletScreen'}},
    },
    {
      icon: historyIcon,
      header: 'History',
      subheader: 'View your history',
      navigateTo: {name: 'AppStack', params: {screen: 'HistoryScreen'}},
    },
    {
      icon: categoryIcon,
      header: 'Manage Categories',
      subheader: 'Manage your categories',
      navigateTo: {
        name: 'AppStack',
        params: {screen: 'ManageCategoriesScreen'},
      },
    },
    {
      icon: roomIcon,
      header: 'Manage Rooms',
      subheader: 'Manage your rooms',
      navigateTo: {name: 'TabScreen', params: {screen: 'Room'}},
    },
    {
      icon: bookingCancelIcon,
      header: 'Booking Cancel Setting',
      subheader: 'Set booking cancellation policies',
      navigateTo: {
        name: 'AppStack',
        params: {screen: 'BookingCancelSettingScreen'},
      },
    },
    {
      icon: languageSettingIcon,
      header: 'Language Setting',
      subheader: 'Set app language',
      navigateTo: {name: 'AppStack', params: {screen: 'LanguageSettingScreen'}},
    },
    {
      icon: requestFacilityIcon,
      header: 'Request Facility',
      subheader: 'Request additional facilities',
      navigateTo: {name: 'AppStack', params: {screen: 'FacilitySettingScreen'}},
    },
    {
      icon: addOnPriceFeatureIcon,
      header: 'Add-on Price Features',
      subheader: 'Manage add-on prices',
      navigateTo: {
        name: 'AppStack',
        params: {screen: 'AddOnPriceFeatureSettingScreen'},
      },
    },
    {
      icon: manageDiscountIcon,
      header: 'Manage Discount',
      subheader: 'Set discounts',
      navigateTo: {name: 'AppStack', params: {screen: 'ManageDiscountScreen'}},
    },
    {
      icon: logoutIcon,
      header: 'Logout',
      subheader: 'Sign out of your account',
      navigateTo: 'Logout',
    },
  ];
  export default accountSettings;