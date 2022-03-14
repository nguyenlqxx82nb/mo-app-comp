import { StyleSheet } from 'react-native';
import { Color, Constants } from 'mo-app-common';

export default StyleSheet.create({

    formInputWrap: {
        // paddingHorizontal : 15,
        marginBottom: 15,
        flexDirection: 'column',
        width: '100%',
    },

    inputWrap: {
        width: '100%',
        borderRadius: 5,
        borderColor: Color.border,
        borderWidth: 1,
        paddingLeft: 12,
        paddingRight: 6,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 0,
        flexDirection: 'row',
    },

    formInput: {
        fontSize: 14,
        fontFamily: Constants.fontRegular,
        color: Color.text,
        lineHeight: 16,
        height: 32,
        width: '100%',
        borderWidth: 0,
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },

    formInputAutoGrowText: {
        fontSize: 14,
        fontFamily: Constants.fontRegular,
        color: Color.text,
        lineHeight: 16,
        height: 32,
        width: '100%',
        flex: 1,
    },

    rightButton: {
        marginLeft: 0,
        width: 30,
        height: 30,
        marginRight: -5,
    },

    updateButton: {
        height: 32,
        marginRight: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },

    optionInput: {
        height: 85,
    },
});
