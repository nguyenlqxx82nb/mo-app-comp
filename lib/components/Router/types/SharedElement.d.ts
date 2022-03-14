import type { SharedElementAnimation, SharedElementResize, SharedElementAlign } from 'react-native-shared-element';
export declare type SharedElementStrictConfig = {
    id: string;
    otherId: string;
    animation: SharedElementAnimation;
    resize?: SharedElementResize;
    align?: SharedElementAlign;
    debug?: boolean;
};
export declare type SharedElementsStrictConfig = SharedElementStrictConfig[];
export declare type SharedElementConfig = {
    id: string;
    otherId?: string;
    animation?: SharedElementAnimation;
    resize?: SharedElementResize;
    align?: SharedElementAlign;
    debug?: boolean;
};
export declare type SharedElementsConfig = SharedElementConfig[];
export declare function normalizeSharedElementConfig(sharedElementConfig: SharedElementConfig): SharedElementStrictConfig;
export declare function normalizeSharedElementsConfig(sharedElementsConfig?: SharedElementsConfig): SharedElementsStrictConfig;
