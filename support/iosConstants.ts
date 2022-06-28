export const IPHONEOS_DEPLOYMENT_TARGET = "10.0";
export const TARGETED_DEVICE_FAMILY = `"1,2"`;

export const NSE_PODFILE_SNIPPET = `
target 'WonderPushNotificationServiceExtension' do
  platform :ios, '10.0'

  # Pods for WonderPushNotificationServiceExtension
  pod 'WonderPushExtension', '~> 4.0'
end`;

export const NSE_PODFILE_REGEX = /target 'WonderPushNotificationServiceExtension'/;

export const GROUP_IDENTIFIER_TEMPLATE_REGEX = /{{GROUP_IDENTIFIER}}/gm;
export const BUNDLE_SHORT_VERSION_TEMPLATE_REGEX = /{{BUNDLE_SHORT_VERSION}}/gm;
export const BUNDLE_VERSION_TEMPLATE_REGEX = /{{BUNDLE_VERSION}}/gm;

export const DEFAULT_BUNDLE_VERSION = '1';
export const DEFAULT_BUNDLE_SHORT_VERSION = '1.0';

export const NSE_TARGET_NAME = "WonderPushNotificationServiceExtension";
