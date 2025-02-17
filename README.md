<h1 align="center">Welcome to wonderpush-expo-plugin. 👋</h1>
<p>Based on <a href="https://github.com/OneSignal/onesignal-expo-plugin#readme" target="_blank">onesignal-expo-plugin</a></p>

> The WonderPush Expo plugin allows you to use WonderPush without leaving the managed workflow.

* 🏠 [Homepage](https://github.com/creative-web-solution/wonderpush-expo-plugin#readme)
* Forked from [https://github.com/creative-web-solution/wonderpush-expo-plugin]()

## Overview
This plugin is an [Expo Config Plugin](https://docs.expo.dev/guides/config-plugins/). It extends the Expo config to allow customizing the prebuild phase of managed workflow builds (no need to eject to a bare workflow).

## Supported environments:
* [The Expo run commands](https://docs.expo.dev/workflow/customizing/) (`expo run:[android|ios]`)
* [Custom clients](https://blog.expo.dev/introducing-custom-development-clients-5a2c79a9ddf8)
* [EAS Build](https://docs.expo.dev/build/introduction/)

---

## Install

Add this to the package.json

```json
{
  ...,
  "devDependencies": {
    ...,
    "wonderpush-expo-plugin": "https://github.com/abraaoz/wonderpush-expo-plugin.git"
  }
}
```

## Configuration in app.json / app.config.js
### Plugin
Add the plugin to the [plugin array](https://docs.expo.dev/versions/latest/config/app/):

**app.json**
```json
{
  "plugins": [
    [
      "wonderpush-expo-plugin",
      {
        "mode": "development",
        "wonderPushClientId": "",
        "wonderPushClientSecret": "",
        "wonderPushSenderId": "",
        "devTeam": "",
      }
    ]
  ]
}
```

or

**app.config.js**
```js
export default {
  ...
  plugins: [
    [
      "wonderpush-expo-plugin",
      {
        "mode": "development",
        "wonderPushClientId": "",
        "wonderPushClientSecret": "",
        "wonderPushSenderId": "",
        "devTeam": "",
      }
    ]
  ]
};
```

#### Plugin Prop
You can pass props to the plugin config object to configure:

| Plugin Prop              |          |                                                                                                                                                                                                                                                                                                                                |
|--------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `mode`                   | **required** | Used to configure  [APNs environment](https://developer.apple.com/documentation/bundleresources/entitlements/aps-environment)  entitlement.  `"development"` or  `"production"`                                                                                                                                                |
| `devTeam`                | optional | Used to configure Apple Team ID. You can find your Apple Team ID by running `expo credentials:manager`  e.g: `"91SW8A37CR"`                                                                                                                                                                                                    |

### Versioning
In your configuration file, make sure you set:

| Property             | Details                                                                                                                                                                      |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `version`         | Your app version. Corresponds to `CFBundleShortVersionString` on iOS. This value will be used in your NSE* target's plist file.                                               |
| `ios.buildNumber` | Build number for your iOS standalone app. Corresponds to `CFBundleVersion` and must match Apple's specified format. This value will be used in your NSE* target's plist file. |

\* NSE = Notification Service Extension. Learn more about the NSE [here](https://documentation.onesignal.com/docs/service-extensions).

## EAS (Expo Application Services)
See our [EAS documentation](EAS.md) for help with EAS.

### iOS Credentials: OneSignal + EAS
To distribute your iOS application via EAS, you will need to ensure your credentials are set up correctly. See our [credentials setup guide for instructions](IOS_CREDENTIALS_EAS.md).

## Prebuild (optional)
Prebuilding in Expo will result in the generation of the native runtime code for the project (and `ios` and `android` directories being built). By prebuilding, we automatically link and configure the native modules that have implemented CocoaPods, autolinking, and other config plugins. You can think of prebuild like a native code bundler.

When you run `expo prebuild` we enter into a custom managed workflow which provides most of the benefits of bare workflows and managed workflows at the same time.

#### Why should I prebuild?
It may make sense to prebuild locally to inspect config plugin changes and help in debugging issues.

#### Run
```sh
expo prebuild
```

```sh
# nukes changes and rebuilds
expo prebuild --clean
```

**EAS Note:** if you choose to stay in a fully managed workflow by not prebuilding, EAS will still run `expo prebuild` at build time. You can also prebuild locally but remain in a fully managed workflow by adding the `android` and `ios` directories to your .gitignore.

## Run
The following commands will prebuild *and* run your application. Note that for iOS, push notifications will **not** work in the Simulator.
```sh
# Build and run your native iOS project
expo run:ios

# Build and run your native Android project
expo run:android
```

---

## 📝 License

Copyright © 2021 [OneSignal](https://github.com/OneSignal).<br />
This project is [MIT](https://github.com/OneSignal/onesignal-expo-plugin/blob/main/LICENSE) licensed.
