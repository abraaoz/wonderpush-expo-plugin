export class WonderPushLog {
  static log(str: string) {
    console.log(`\twonderpush-expo-plugin: ${str}`)
  }

  static error(str: string) {
    console.error(`\twonderpush-expo-plugin: ${str}`)
  }
}
