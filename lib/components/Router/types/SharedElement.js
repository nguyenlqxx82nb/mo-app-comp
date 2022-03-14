"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSharedElementsConfig = exports.normalizeSharedElementConfig = void 0;
function normalizeSharedElementConfig(sharedElementConfig) {
    if (typeof sharedElementConfig === 'string') {
        return {
            id: sharedElementConfig,
            otherId: sharedElementConfig,
            animation: 'move',
        };
    }
    else {
        const { id, otherId, animation, ...other } = sharedElementConfig;
        return {
            id,
            otherId: otherId || id,
            animation: animation || 'move',
            ...other,
        };
    }
}
exports.normalizeSharedElementConfig = normalizeSharedElementConfig;
function normalizeSharedElementsConfig(sharedElementsConfig = undefined) {
    if (!sharedElementsConfig || !sharedElementsConfig.length)
        return;
    return sharedElementsConfig.map(normalizeSharedElementConfig);
}
exports.normalizeSharedElementsConfig = normalizeSharedElementsConfig;
//# sourceMappingURL=SharedElement.js.map