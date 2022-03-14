declare const _default: {
    accessory: {
        width: number;
        height: number;
        justifyContent: "center";
        alignItems: "center";
    };
    overlay: {
        position: "absolute";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    };
    picker: {
        shadowRadius: number;
        shadowColor: string;
        shadowOpacity: number;
        shadowOffset: {
            width: number;
            height: number;
        };
        elevation?: undefined;
        backgroundColor: string;
        borderRadius: number;
        borderTopLeftRadius: number;
        borderTopRightRadius: number;
        position: "absolute";
    } | {
        shadowRadius: number;
        shadowColor: string;
        shadowOpacity: number;
        shadowOffset: {
            width: number;
            height: number;
        };
        elevation: number;
        backgroundColor: string;
        borderRadius: number;
        borderTopLeftRadius: number;
        borderTopRightRadius: number;
        position: "absolute";
    };
    item: {
        textAlign: "left";
    };
    scroll: {
        flex: number;
        borderRadius: number;
    };
    scrollContainer: {
        paddingVertical: number;
    };
    menuDropdown: {
        height: number;
        width: string;
        paddingLeft: number;
        borderWidth: number;
        borderRadius: number;
        borderColor: string;
        flexDirection: "row";
        justifyContent: "space-between";
        alignItems: "center";
        backgroundColor: string;
    };
    menuOpen: {
        shadowRadius: number;
        shadowColor: string;
        shadowOpacity: number;
        shadowOffset: {
            width: number;
            height: number;
        };
        elevation?: undefined;
        borderWidth: number;
        backgroundColor: string;
        borderBottomLeftRadius: number;
        borderBottomRightRadius: number;
    } | {
        shadowRadius: number;
        shadowColor: string;
        shadowOpacity: number;
        shadowOffset: {
            width: number;
            height: number;
        };
        elevation: number;
        borderWidth: number;
        backgroundColor: string;
        borderBottomLeftRadius: number;
        borderBottomRightRadius: number;
    };
    container: {
        flex: number;
    };
};
export default _default;
