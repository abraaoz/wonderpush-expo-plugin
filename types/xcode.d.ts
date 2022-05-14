/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "xcode" {
  interface xcode {
    project(projPath: string): any
  }

  const xcode: xcode
  export default xcode
}
