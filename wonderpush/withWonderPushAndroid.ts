import { ConfigPlugin, withAppBuildGradle } from '@expo/config-plugins'

import { WonderPushPluginProps } from '../types/types'

function addWonderPushDefaultConfigBlock(buildGradle: string, props: WonderPushPluginProps) {
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
        buildConfigField 'String', 'WONDERPUSH_CLIENT_ID', '"` + props.wonderPushClientId + `"'
        buildConfigField 'String', 'WONDERPUSH_CLIENT_SECRET', '"` + props.wonderPushClientSecret + `"'
        buildConfigField 'String', 'WONDERPUSH_SENDER_ID', '"`+ props.wonderPushSenderId +`"'`,
  )
}

export const withWonderPushAndroid: ConfigPlugin<WonderPushPluginProps> = (config, props) => {
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.language === "groovy") {
      config.modResults.contents = addWonderPushDefaultConfigBlock(config.modResults.contents, props)
    } else {
      throw new Error(
        "Cannot add WonderPush maven gradle because the project build.gradle is not groovy",
      )
    }
    return config
  })
}
