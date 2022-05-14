import fs from 'fs'

import { FileManager } from './FileManager'
import { NSE_PODFILE_REGEX, NSE_PODFILE_SNIPPET } from './iosConstants'
import { WonderPushLog } from './WonderPushLog'

export async function updatePodfile(iosPath: string) {
  const podfile = await FileManager.readFile(`${iosPath}/Podfile`)
  const matches = podfile.match(NSE_PODFILE_REGEX)

  if (matches) {
    WonderPushLog.log(
      "WonderPushNotificationServiceExtension target already added to Podfile. Skipping..."
    )
  } else {
    fs.appendFile(`${iosPath}/Podfile`, NSE_PODFILE_SNIPPET, (err) => {
      if (err) {
        WonderPushLog.error("Error writing to Podfile")
      }
    })
  }
}
