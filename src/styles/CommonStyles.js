import theme from './colors';

export const CommonStyles = {
  container: {
    flex:1,
    display: 'flex',    
    alignItems: 'center',
    backgroundColor:theme.colors.textLight
  },
  header: {    
    fontSize: 20,
    fontWeight:'bold',
  },
  thaiHeader: {
    fontFamily: theme.customfonts.medium,
    fontSize: 20,
    color: theme.colors.secondary,
    marginBottom: 12,
  },
  money: {
    fontFamily: theme.customfonts.medium,
    fontSize: 30,
    color: theme.colors.textDark,
  },
  points: {
    fontFamily: theme.customfonts.medium,
    fontSize: 30,
    color: theme.colors.primary,
  },
  subHeader: {
    fontFamily: theme.customfonts.regular,
    fontSize: 16,
    color: theme.colors.textDark,
    paddingTop: 14,
  },
  dividerView: {
    marginTop: 20,
  },
  divider: {
    height: 0.75,
    backgroundColor: theme.colors.formBorderColor,
    width: '100%',
  },
  defaultButtonContainer: {
    marginTop: 20,
  },
  defaultButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  defaultButtonText: {
    fontSize: 16,
    color: theme.colors.white,
    fontFamily: theme.customfonts.medium,
  },
  defaultButtonOutline: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderColor: theme.colors.primary, // Border color
    borderWidth: 1,
    borderRadius: 15,
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  defaultButtonOutlineText: {
    fontSize: 16,
    color: theme.colors.primary,
    fontFamily: theme.customfonts.medium,
  },
  subHeaderBold: {
    fontFamily: theme.customfonts.bold,
    fontSize: 16,
    color: theme.colors.textDark,
    paddingTop: 20,
    fontWeight: 'bold',
  },
  textNormal: {
    fontFamily: theme.customfonts.regular,
    fontSize: 15,
    color: theme.colors.textDark,
    paddingTop: 5,
  },
  textBold: {
    fontFamily: theme.customfonts.medium,
    fontSize: 16,
    color: theme.colors.textDark,
    // paddingTop: 5,
  },
  splashTitle: {
    fontSize: 28,
    marginBottom: 7,
    fontFamily: theme.customfonts.bold,
    color: theme.colors.secondary,
    letterSpacing: 2,
  },
  splashText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: theme.customfonts.regular,
    color: theme.colors.textDark,
  },
  rowView: {
    flexDirection: 'row',
  },
  rowViewSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  screenPadding: {
    padding: 8,
  },
  // Form Input Styles
  inputContainer: {
    position: 'relative',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: theme.colors.formBorderColor,
    borderRadius: 14,
    minHeight: 72,
    width: '100%',
    padding: 14,
    paddingVertical: 10,
    marginBottom: 12,
  },
  filled: {
    borderColor: theme.colors.primary,
  },
  error: {
    borderColor: theme.colors.danger,
  },
  formLabel: {
    fontSize: 13,
    color: theme.colors.textGray,
    marginBottom: 5,
    fontFamily: theme.customfonts.regular,
    marginTop: 3,
  },
  formInput: {
    width: '100%',
    fontFamily: theme.customfonts.regular,
    fontSize: 18,
    color: theme.colors.textDark,
    paddingHorizontal: 0,
    height: 58,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputValueText: {
    fontFamily: theme.customfonts.bold,
    fontSize: 18,
    color: theme.colors.textDark,
  },
  inputValuePlaceholder: {
    fontFamily: theme.customfonts.regular,
    fontSize: 18,
    color: theme.colors.textGray,
  },
  col20: {
    width: '20%',
  },
  col27: {
    width: '27%',
  },
  col40: {
    width: '40%',
  },
  col50: {
    width: '50%',
  },
  buttonHolder: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxRadioLabel: {
    fontFamily: theme.customfonts.regular,
    fontSize: 16,
    color: theme.colors.textDark,
  },
  textDanger: {
    fontFamily: theme.customfonts.medium,
    fontSize: 16,
    color: theme.colors.danger,
  },
  bottomSheet: {
    contentContainer: {
      flex: 1,
      padding: 16,
      height: 300,
    },
    bottomSheetContent: {
      padding: 20,
    },
    bottomSheet: {
      zIndex: 2, // Ensure BottomSheet appears above the overlay
    },
    bottomSheetHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    bottomSheetTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginLeft: 10,
      marginBottom: 5,
      color: theme.colors.textDark,
    },
    icon: {
      width: 30,
      height: 30,
      marginBottom: 5,
    },
    arrowIcon: {
      width: 7,
      height: 12,
      marginLeft: 'auto',
    },
    bottomSheetItem: {
      paddingVertical: 16,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bottomSheetItemText: {
      fontSize: 16,
      marginLeft: 10,
      marginBottom: 5,
      color: '#000',
    },
  },
};
