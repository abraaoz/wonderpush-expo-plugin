"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NSE_TARGET_NAME = exports.DEFAULT_BUNDLE_SHORT_VERSION = exports.DEFAULT_BUNDLE_VERSION = exports.BUNDLE_VERSION_TEMPLATE_REGEX = exports.BUNDLE_SHORT_VERSION_TEMPLATE_REGEX = exports.GROUP_IDENTIFIER_TEMPLATE_REGEX = exports.NSE_PODFILE_REGEX = exports.NSE_PODFILE_SNIPPET = exports.TARGETED_DEVICE_FAMILY = exports.IPHONEOS_DEPLOYMENT_TARGET = void 0;
exports.IPHONEOS_DEPLOYMENT_TARGET = "10.0";
exports.TARGETED_DEVICE_FAMILY = `"1,2"`;
exports.NSE_PODFILE_SNIPPET = `
target 'WonderPushNotificationServiceExtension' do
  platform :ios, '10.0'

  # Pods for WonderPushNotificationServiceExtension
  pod 'WonderPushExtension', '~> 4.0'
end`;
exports.NSE_PODFILE_REGEX = /target 'WonderPushNotificationServiceExtension'/;
exports.GROUP_IDENTIFIER_TEMPLATE_REGEX = /{{GROUP_IDENTIFIER}}/gm;
exports.BUNDLE_SHORT_VERSION_TEMPLATE_REGEX = /{{BUNDLE_SHORT_VERSION}}/gm;
exports.BUNDLE_VERSION_TEMPLATE_REGEX = /{{BUNDLE_VERSION}}/gm;
exports.DEFAULT_BUNDLE_VERSION = '1';
exports.DEFAULT_BUNDLE_SHORT_VERSION = '1.0';
exports.NSE_TARGET_NAME = "WonderPushNotificationServiceExtension";
