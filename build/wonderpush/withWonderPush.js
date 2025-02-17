"use strict";
/**
 * Expo config plugin for WonderPush
 * @see https://docs.wonderpush.com/docs/mobile-push-notifications-react-native
 */
Object.defineProperty(exports, "__esModule", { value: true });
const withWonderPushAndroid_1 = require("./withWonderPushAndroid");
const withWonderPushIos_1 = require("./withWonderPushIos");
const withWonderPush = (config, props) => {
    config = (0, withWonderPushIos_1.withWonderPushIos)(config, props);
    config = (0, withWonderPushAndroid_1.withWonderPushAndroid)(config, props);
    return config;
};
exports.default = withWonderPush;
