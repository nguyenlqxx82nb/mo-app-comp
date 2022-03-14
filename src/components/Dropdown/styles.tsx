import { StyleSheet, Platform } from 'react-native';
import { Constants, Color } from 'mo-app-common';

export default StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    height: Constants.Height,
    width: '100%',
  },

  // contentContainer: {
  //     backgroundColor:'#000',
  // },

  pickerContainer: {
    height: 34,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },

  dropdownContainer: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderRadius: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: '#fff',
  },

  dropdownTopContainer: {
    height: 34,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },

  contentContainer: {
    width: '100%',
    borderTopWidth: 1,
  },

  // overlayContainer: {
  // },

  item: {
    height: 34,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  searchContainer: {
    height: 34,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
  },

  searchInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 13,
    fontFamily: Constants.fontRegular,
    padding: 0,
    height: 34,
  },

  accessory: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  picker: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    borderRadius: 4,
    // borderTopLeftRadius:0,
    // borderTopRightRadius:0,
    paddingVertical: 4,
    // paddingHorizontal: 10,
    position: 'absolute',

    ...Platform.select({
      ios: {
        shadowRadius: 2,
        shadowColor: 'rgba(0, 0, 0, 1.0)',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 1 },
      },

      android: {
        shadowRadius: 2,
        shadowColor: 'rgba(0, 0, 0, 1.0)',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
      },
    }),
  },

  //   item: {
  //     textAlign: 'left',
  //   },

  scroll: {
    flex: 1,
    borderRadius: 2,
  },

  scrollContainer: {
    paddingVertical: 0,
  },

  menuDropdown: {
    height: 30,
    width: '100%',
    paddingLeft: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',

    // shadowRadius: 2,
    // shadowColor: 'rgba(0, 0, 0, 1.0)',
    // shadowOpacity: 0.3,
    // shadowOffset: { width: 0, height: 1 },
    // elevation: 1,
  },

  menuOpen: {
    borderWidth: 0,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: Color.text,
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 }
      },

      android: {
        shadowRadius: 2,
        shadowColor: Color.text,
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      },
    }),
  },

  container: {
    flex: 1
  }

});
