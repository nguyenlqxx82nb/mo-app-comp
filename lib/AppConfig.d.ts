declare const AppConfig: {
    Domain: string;
    MerchantId: string;
    AppCode: string;
    Version: string;
    GoogleMapApiKey: string;
    YouTubeApiKey: string;
    Admin: string;
    FacebookApp: string;
    NotificationIgnoreKeys: string[];
    HomeLayout: ({
        image: string;
        layout: string;
        category: string;
        name?: undefined;
        notAll?: undefined;
    } | {
        name: string;
        image: string;
        layout: string;
        category: string;
        notAll?: undefined;
    } | {
        name: string;
        layout: string;
        category: string;
        notAll: boolean;
        image?: undefined;
    })[];
};
export default AppConfig;
