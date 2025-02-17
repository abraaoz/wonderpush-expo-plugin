"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WonderPushLog = void 0;
class WonderPushLog {
    static log(str) {
        console.log(`\twonderpush-expo-plugin: ${str}`);
    }
    static error(str) {
        console.error(`\twonderpush-expo-plugin: ${str}`);
    }
}
exports.WonderPushLog = WonderPushLog;
