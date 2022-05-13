import { ConfigPlugin, withAppBuildGradle } from '@expo/config-plugins'

import { WonderPushPluginProps } from '../types/types'

function addWonderPushDefaultConfigBlock(buildGradle: string) {
  const pattern = /wonderpush-plugin-default-config/g
  if (buildGradle.match(pattern)) {
    return buildGradle
  }

  return buildGradle.replace(
    /defaultConfig\s?{/,
    `defaultConfig {
        // wonderpush-plugin-default-config

        // Note that it's important to keep the double quotes as part of the third argument
        // as this represents a string in Java code
        buildConfigField 'String', 'WONDERPUSH_CLIENT_ID', '"3efc3669210859c866292ef3540c768631901298"'
        buildConfigField 'String', 'WONDERPUSH_CLIENT_SECRET', '"2b23a050ce4e31f339c6f622043726c71e29b45b5e6d6228bda63c2e4621ae7f"'
        buildConfigField 'String', 'WONDERPUSH_SENDER_ID', '"1089148331791"'`,
  )
}

export const withWonderPushAndroid: ConfigPlugin<WonderPushPluginProps> = (config) => {
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.language === "groovy") {
      config.modResults.contents = addWonderPushDefaultConfigBlock(config.modResults.contents)
    } else {
      throw new Error(
        "Cannot add WonderPush maven gradle because the project build.gradle is not groovy",
      )
    }
    return config
  })
}
