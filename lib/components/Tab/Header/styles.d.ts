declare const styles: {
    container: {
        width: number;
        height: number;
        position: "absolute";
        top: number;
        left: number;
        flexDirection: "row";
        backgroundColor: string;
        opacity: number;
    };
    tabContainer: {
        flex: number;
        justifyContent: "center";
        alignItems: "center";
        flexDirection: "column";
        width: number;
    };
    tabText: {
        fontSize: number;
        fontFamily: string;
        color: string;
        lineHeight: number;
        marginTop: number;
    };
    textActive: {
        color: string;
    };
    underline: {
        position: "absolute";
        height: number;
        width: number;
        borderRadius: number;
        backgroundColor: string;
        bottom: number;
        left: number;
    };
    badge: {
        backgroundColor: string;
        paddingHorizontal: number;
        height: number;
        borderRadius: number;
        alignItems: "center";
        justifyContent: "center";
        marginLeft: number;
    };
};
export default styles;
