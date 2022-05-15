/**
 * WonderPushPluginProps refer to the properties set by the user in their app config file (e.g: app.json)
 */
export type WonderPushPluginProps = {
  /**
   * (iOS only) Environment name and bundle identifier
   */
  mode: Mode
  devTeam: string
  iPhoneDeploymentTarget: string
  wonderPushClientId: string
  wonderPushClientSecret: string
  wonderPushSenderId: string
}

/**
 * Not to be confused with WonderPushPluginProps, PluginOptions are the *internal* properties used by the config plugin
 * These include a combination of user-defined properties (from WonderPushPluginProps) and other data to pass between functions
 */
export type PluginOptions = {
  iosPath: string
  mode: Mode
  devTeam?: string
  bundleVersion?: string
  bundleShortVersion?: string
  bundleIdentifier?: string
  iPhoneDeploymentTarget?: string
}

export enum Mode {
  Dev = "development",
  Prod = "production",
}
