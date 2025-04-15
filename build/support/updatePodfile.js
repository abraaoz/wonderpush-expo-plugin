"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePodfile = updatePodfile;
const fs = __importStar(require("fs"));
const FileManager_1 = require("./FileManager");
const iosConstants_1 = require("./iosConstants");
const WonderPushLog_1 = require("./WonderPushLog");
async function updatePodfile(iosPath) {
    const podfile = await FileManager_1.FileManager.readFile(`${iosPath}/Podfile`);
    const matches = podfile.match(iosConstants_1.NSE_PODFILE_REGEX);
    if (matches) {
        WonderPushLog_1.WonderPushLog.log("WonderPushNotificationServiceExtension target already added to Podfile. Skipping...");
    }
    else {
        fs.appendFile(`${iosPath}/Podfile`, iosConstants_1.NSE_PODFILE_SNIPPET, (err) => {
            if (err) {
                WonderPushLog_1.WonderPushLog.error("Error writing to Podfile");
            }
        });
    }
}
