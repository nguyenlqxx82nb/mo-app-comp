export interface WrapTextProps {
    f?: 'r' | 'm' | 'b';
    s?: number;
    c?: string;
    st?: object;
    lh?: number;
    nl?: number;
    children?: any;
    up?: boolean;
    onPress?: any;
}
export declare const WrapText: (props: WrapTextProps) => JSX.Element;
