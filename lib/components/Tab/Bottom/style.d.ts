declare const styles: {
    tabbar: {
        height: number;
        paddingBottom: number;
        flexDirection: "row";
        justifyContent: "center";
        alignItems: "center";
        backgroundColor: string;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
        zIndex: number;
    };
    tab: {
        alignItems: "center";
        justifyContent: "center";
        flexDirection: "column";
    };
    tabLabel: {
        fontFamily: string;
        fontSize: number;
        color: string;
        marginTop: number;
    };
    topDivider: {
        height: number;
        backgroundColor: string;
        borderRadius: number;
        width: number;
    };
    qrButtonContainer: {
        flex: number;
        flexDirection: "column";
        justifyContent: "flex-start";
        alignItems: "center";
        marginTop: number;
    };
    qrButton: {
        width: number;
        height: number;
        borderRadius: number;
        backgroundColor: string;
        alignItems: "center";
        justifyContent: "center";
        shadowColor: string;
        zIndex: number;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    center: {
        justifyContent: "center";
        alignItems: "center";
    };
    tabContainer: {
        flex: number;
        flexDirection: "column";
        justifyContent: "center";
        alignItems: "center";
    };
    tabBottom: {
        alignItems: "center";
        justifyContent: "center";
        flexGrow: number;
    };
};
export default styles;
