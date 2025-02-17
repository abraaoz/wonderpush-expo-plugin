"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Expo config plugin for One Signal (iOS)
 * @see https://documentation.onesignal.com/docs/react-native-sdk-setup#step-4-install-for-ios-using-cocoapods-for-ios-apps
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xcodeProjectAddNse = exports.withWonderPushIos = void 0;
const assert_1 = __importDefault(require("assert"));
const fs_1 = __importDefault(require("fs"));
const xcode_1 = __importDefault(require("xcode"));
const config_plugins_1 = require("@expo/config-plugins");
const getEasManagedCredentialsConfigExtra_1 = __importDefault(require("../support/eas/getEasManagedCredentialsConfigExtra"));
const FileManager_1 = require("../support/FileManager");
const iosConstants_1 = require("../support/iosConstants");
const NseUpdaterManager_1 = __importDefault(require("../support/NseUpdaterManager"));
const updatePodfile_1 = require("../support/updatePodfile");
const WonderPushLog_1 = require("../support/WonderPushLog");
/**
 * Add 'aps-environment' record with current environment to '<project-name>.entitlements' file
 * @see https://documentation.onesignal.com/docs/react-native-sdk-setup#step-4-install-for-ios-using-cocoapods-for-ios-apps
 */
const withAppEnvironment = (config, wonderpushProps) => {
    return (0, config_plugins_1.withEntitlementsPlist)(config, (newConfig) => {
        if ((wonderpushProps === null || wonderpushProps === void 0 ? void 0 : wonderpushProps.mode) == null) {
            throw new Error(`
        Missing required "mode" key in your app.json or app.config.js file for "wonderpush-expo-plugin".
        "mode" can be either "development" or "production".
        Please see wonderpush-expo-plugin's README.md for more details.`);
        }
        newConfig.modResults["aps-environment"] = wonderpushProps.mode;
        return newConfig;
    });
};
/**
 * Add "Background Modes -> Remote notifications" and "App Group" permissions
 * @see https://documentation.onesignal.com/docs/react-native-sdk-setup#step-4-install-for-ios-using-cocoapods-for-ios-apps
 */
const withRemoteNotificationsPermissions = (config) => {
    const BACKGROUND_MODE_KEYS = ["remote-notification"];
    return (0, config_plugins_1.withInfoPlist)(config, (newConfig) => {
        if (!Array.isArray(newConfig.modResults.UIBackgroundModes)) {
            newConfig.modResults.UIBackgroundModes = [];
        }
        for (const key of BACKGROUND_MODE_KEYS) {
            if (!newConfig.modResults.UIBackgroundModes.includes(key)) {
                newConfig.modResults.UIBackgroundModes.push(key);
            }
        }
        return newConfig;
    });
};
/**
 * Add "App Group" permission
 * @see https://documentation.onesignal.com/docs/react-native-sdk-setup#step-4-install-for-ios-using-cocoapods-for-ios-apps (step 4.4)
 */
const withAppGroupPermissions = (config) => {
    const APP_GROUP_KEY = "com.apple.security.application-groups";
    return (0, config_plugins_1.withEntitlementsPlist)(config, (newConfig) => {
        var _a;
        if (!Array.isArray(newConfig.modResults[APP_GROUP_KEY])) {
            newConfig.modResults[APP_GROUP_KEY] = [];
        }
        const modResultsArray = newConfig.modResults[APP_GROUP_KEY];
        const entitlement = `group.${((_a = newConfig === null || newConfig === void 0 ? void 0 : newConfig.ios) === null || _a === void 0 ? void 0 : _a.bundleIdentifier) || ""}.WonderPushNotificationServiceExtension`;
        if (modResultsArray.indexOf(entitlement) !== -1) {
            return newConfig;
        }
        modResultsArray.push(entitlement);
        return newConfig;
    });
};
const withWonderPushNSE = (config, wonderpushProps) => {
    return (0, config_plugins_1.withXcodeProject)(config, async (props) => {
        var _a, _b;
        const options = {
            iosPath: props.modRequest.platformProjectRoot,
            bundleIdentifier: (_a = props.ios) === null || _a === void 0 ? void 0 : _a.bundleIdentifier,
            devTeam: wonderpushProps === null || wonderpushProps === void 0 ? void 0 : wonderpushProps.devTeam,
            bundleVersion: (_b = props.ios) === null || _b === void 0 ? void 0 : _b.buildNumber,
            bundleShortVersion: props === null || props === void 0 ? void 0 : props.version,
            mode: wonderpushProps === null || wonderpushProps === void 0 ? void 0 : wonderpushProps.mode,
            iPhoneDeploymentTarget: wonderpushProps === null || wonderpushProps === void 0 ? void 0 : wonderpushProps.iPhoneDeploymentTarget,
        };
        xcodeProjectAddNse(props.modRequest.projectName || "", options, "node_modules/wonderpush-expo-plugin/build/support/serviceExtensionFiles/", wonderpushProps);
        return props;
    });
};
const withEasManagedCredentials = (config) => {
    var _a;
    (0, assert_1.default)((_a = config.ios) === null || _a === void 0 ? void 0 : _a.bundleIdentifier, "Missing 'ios.bundleIdentifier' in app config.");
    config.extra = (0, getEasManagedCredentialsConfigExtra_1.default)(config);
    return config;
};
const withAppDelegateCredentials = (config, props) => {
    return (0, config_plugins_1.withAppDelegate)(config, async (config) => {
        config.modResults.contents = config.modResults.contents.replace(`#import "AppDelegate.h"`, `#import "AppDelegate.h"

#import <WonderPush/WonderPush.h>

`);
        config.modResults.contents = config.modResults.contents.replace(`@implementation AppDelegate`, `@implementation AppDelegate

- (BOOL)application:(UIApplication *)application willFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [WonderPush setLogging:YES];
  [WonderPush setClientId:@"` +
            props.wonderPushClientId +
            `" secret:@"` +
            props.wonderPushClientSecret +
            `"];
  [WonderPush setupDelegateForApplication:application];
  [WonderPush setupDelegateForUserNotificationCenter];
  return YES;
}
- (void)applicationDidBecomeActive:(UIApplication *)application{
  [UIApplication sharedApplication].applicationIconBadgeNumber = 0; 
}
-(void)applicationDidEnterBackground:(UIApplication *)application{
  [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
}
`);
        return config;
    });
};
const withWonderPushIos = (config, props) => {
    withAppEnvironment(config, props);
    withRemoteNotificationsPermissions(config, props);
    withAppGroupPermissions(config, props);
    withWonderPushNSE(config, props);
    withEasManagedCredentials(config, props);
    withAppDelegateCredentials(config, props);
    return config;
};
exports.withWonderPushIos = withWonderPushIos;
function xcodeProjectAddNse(appName, options, sourceDir, wonderpushProps) {
    const { iosPath, devTeam, bundleIdentifier, bundleVersion, bundleShortVersion, iPhoneDeploymentTarget, } = options;
    // not awaiting in order to not block main thread
    (0, updatePodfile_1.updatePodfile)(iosPath).catch((err) => {
        WonderPushLog_1.WonderPushLog.error(err);
    });
    const projPath = `${iosPath}/${appName}.xcodeproj/project.pbxproj`;
    const extFiles = [
        "NotificationService.h",
        "NotificationService.m",
        `${iosConstants_1.NSE_TARGET_NAME}.entitlements`,
        `${iosConstants_1.NSE_TARGET_NAME}-Info.plist`,
    ];
    const xcodeProject = xcode_1.default.project(projPath);
    xcodeProject.parse(async function (err) {
        if (err) {
            WonderPushLog_1.WonderPushLog.log(`Error parsing iOS project: ${JSON.stringify(err)}`);
            return;
        }
        /* COPY OVER EXTENSION FILES */
        fs_1.default.mkdirSync(`${iosPath}/${iosConstants_1.NSE_TARGET_NAME}`, { recursive: true });
        for (let i = 0; i < extFiles.length; i++) {
            const extFile = extFiles[i];
            const targetFile = `${iosPath}/${iosConstants_1.NSE_TARGET_NAME}/${extFile}`;
            await FileManager_1.FileManager.copyFile(`${sourceDir}${extFile}`, targetFile);
            if (extFile === "NotificationService.h") {
                let hFile = await FileManager_1.FileManager.readFile(targetFile);
                hFile = hFile.replace(`return @"YOUR_CLIENT_ID"`, `return @"` + wonderpushProps.wonderPushClientId + `"`);
                hFile = hFile.replace(`return @"YOUR_CLIENT_SECRET"`, `return @"` + wonderpushProps.wonderPushClientSecret + `"`);
                await FileManager_1.FileManager.writeFile(targetFile, hFile);
            }
        }
        /* MODIFY COPIED EXTENSION FILES */
        const nseUpdater = new NseUpdaterManager_1.default(iosPath);
        await nseUpdater.updateNSEEntitlements(`group.${bundleIdentifier}.WonderPushNotificationServiceExtension`);
        await nseUpdater.updateNSEBundleVersion(bundleVersion !== null && bundleVersion !== void 0 ? bundleVersion : iosConstants_1.DEFAULT_BUNDLE_VERSION);
        await nseUpdater.updateNSEBundleShortVersion(bundleShortVersion !== null && bundleShortVersion !== void 0 ? bundleShortVersion : iosConstants_1.DEFAULT_BUNDLE_SHORT_VERSION);
        // Create new PBXGroup for the extension
        const extGroup = xcodeProject.addPbxGroup(extFiles, iosConstants_1.NSE_TARGET_NAME, iosConstants_1.NSE_TARGET_NAME);
        // Add the new PBXGroup to the top level group. This makes the
        // files / folder appear in the file explorer in Xcode.
        const groups = xcodeProject.hash.project.objects.PBXGroup;
        Object.keys(groups).forEach(function (key) {
            if (groups[key].name === undefined) {
                xcodeProject.addToPbxGroup(extGroup.uuid, key);
            }
        });
        // WORK AROUND for codeProject.addTarget BUG
        // Xcode projects don't contain these if there is only one target
        // An upstream fix should be made to the code referenced in this link:
        //   - https://github.com/apache/cordova-node-xcode/blob/8b98cabc5978359db88dc9ff2d4c015cba40f150/lib/pbxProject.js#L860
        const projObjects = xcodeProject.hash.project.objects;
        projObjects.PBXTargetDependency = projObjects.PBXTargetDependency || {};
        projObjects.PBXContainerItemProxy = projObjects.PBXTargetDependency || {};
        if (xcodeProject.pbxTargetByName(iosConstants_1.NSE_TARGET_NAME)) {
            WonderPushLog_1.WonderPushLog.log(`${iosConstants_1.NSE_TARGET_NAME} already exists in project. Skipping...`);
            return;
        }
        // Add the NSE target
        // This adds PBXTargetDependency and PBXContainerItemProxy for you
        const nseTarget = xcodeProject.addTarget(iosConstants_1.NSE_TARGET_NAME, "app_extension", iosConstants_1.NSE_TARGET_NAME, `${bundleIdentifier}.${iosConstants_1.NSE_TARGET_NAME}`);
        // Add build phases to the new target
        xcodeProject.addBuildPhase(["NotificationService.m"], "PBXSourcesBuildPhase", "Sources", nseTarget.uuid);
        xcodeProject.addBuildPhase([], "PBXResourcesBuildPhase", "Resources", nseTarget.uuid);
        xcodeProject.addBuildPhase([], "PBXFrameworksBuildPhase", "Frameworks", nseTarget.uuid);
        // Edit the Deployment info of the new Target, only IphoneOS and Targeted Device Family
        // However, can be more
        const configurations = xcodeProject.pbxXCBuildConfigurationSection();
        for (const key in configurations) {
            if (typeof configurations[key].buildSettings !== "undefined" &&
                configurations[key].buildSettings.PRODUCT_NAME == `"${iosConstants_1.NSE_TARGET_NAME}"`) {
                const buildSettingsObj = configurations[key].buildSettings;
                buildSettingsObj.DEVELOPMENT_TEAM = devTeam;
                buildSettingsObj.IPHONEOS_DEPLOYMENT_TARGET =
                    iPhoneDeploymentTarget !== null && iPhoneDeploymentTarget !== void 0 ? iPhoneDeploymentTarget : iosConstants_1.IPHONEOS_DEPLOYMENT_TARGET;
                buildSettingsObj.TARGETED_DEVICE_FAMILY = iosConstants_1.TARGETED_DEVICE_FAMILY;
                buildSettingsObj.CODE_SIGN_ENTITLEMENTS = `${iosConstants_1.NSE_TARGET_NAME}/${iosConstants_1.NSE_TARGET_NAME}.entitlements`;
                buildSettingsObj.CODE_SIGN_STYLE = "Automatic";
            }
        }
        // Add development teams to both your target and the original project
        xcodeProject.addTargetAttribute("DevelopmentTeam", devTeam, nseTarget);
        xcodeProject.addTargetAttribute("DevelopmentTeam", devTeam);
        fs_1.default.writeFileSync(projPath, xcodeProject.writeSync());
    });
}
exports.xcodeProjectAddNse = xcodeProjectAddNse;
