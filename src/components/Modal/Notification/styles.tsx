import { StyleSheet } from 'react-native';
import { Constants, Device } from 'mo-app-common';

export default StyleSheet.create({
    modalIconContainer:{
        position:'absolute',
        top:-22,
        left: (Device.ModalWidth / 2) - 30,
        width:60,
        height:60,
        borderRadius:30,
        backgroundColor:'#fff',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingTop:8
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent:'center',
        paddingHorizontal:10,
        backgroundColor:'#fff',
        width: Device.ModalWidth
    },
    modalNotification: {
        alignItems:'center',
        justifyContent:'center',
        height: Constants.Height,
        paddingHorizontal: Constants.Width * 0.1,
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
        zIndex: 20,
        backgroundColor: '#000',
        opacity:0.5
    },
    title: { fontSize: 16, marginTop: 5, marginBottom: 15, lineHeight: 22, marginHorizontal: 15},
    scrollContainer: { maxHeight: Constants.Height * 2 / 3, alignItems: 'center', justifyContent: 'center'},
    contentText: { marginTop: 5, lineHeight: 20, marginHorizontal: 10 },
    linkText: { paddingTop: 5, lineHeight: 30, fontWeight: '600' },
    buttonContainer: { marginTop: 20, marginBottom: 15, flexDirection: 'row' },
    smallButtonText: { fontSize: 13, lineHeight: 16 },
    buttonText: { fontSize:16, lineHeight: 22 },
    rippleButton: {justifyContent: 'center', alignItems: 'center', height: 32, paddingHorizontal: 15 },
    listContent: {width: Device.ModalWidth - 40, flexDirection: 'column', justifyContent: 'flex-start'},
});

