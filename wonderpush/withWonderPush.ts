/**
 * Expo config plugin for WonderPush
 * @see https://docs.wonderpush.com/docs/mobile-push-notifications-react-native
 */

import { ConfigPlugin } from '@expo/config-plugins'

import { WonderPushPluginProps } from '../types/types'
import { withWonderPushAndroid } from './withWonderPushAndroid'
import { withWonderPushIos } from './withWonderPushIos'

const withWonderPush: ConfigPlugin<WonderPushPluginProps> = (config, props) => {
  config = withWonderPushIos(config, props)
  config = withWonderPushAndroid(config, props)

  return config
}

export default withWonderPush
