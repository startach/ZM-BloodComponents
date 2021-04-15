const { run } = require("cordova-res");
const path = require("path");
const fse = require("fs-extra");

//get cli arguments
const shouldDoAndroid = process.argv.includes("--android");
const shouldDoIOS = process.argv.includes("--ios");
const shouldCleanup = process.argv.includes("--cleanup");

//get absolute paths
const projectDir = path.resolve(__dirname, "..");
const resourcesDir = path.resolve(projectDir, "src", "assets", "mobile");
const tempResourcesDir = path.resolve(projectDir, ".mobileImages");
const androidDir = path.resolve(projectDir, "android");
const iosDir = path.resolve(projectDir, "ios");
const logoPath = path.resolve(resourcesDir, "icon.png");
const splashScreenPath = path.resolve(resourcesDir, "splash.png");

//add base configuration
/** @type {import("cordova-res").CordovaRes.Options} */
const options = {
  resourcesDirectory: tempResourcesDir,
  logstream: process.stdout, // Any WritableStream
  platforms: {},
  projectConfig: {
    android: { directory: androidDir },
    ios: { directory: iosDir },
  },
  skipConfig: true,
  copy: true,
};

//generate android images
if (shouldDoAndroid) {
  options.platforms["android"] = {
    icon: { sources: [logoPath] },
    splash: { sources: [splashScreenPath] },
  };
}

//generate ios images
if (shouldDoIOS) {
  options.platforms["ios"] = {
    icon: { sources: [logoPath] },
    splash: { sources: [splashScreenPath] },
  };
}

//generate + copy images
(async function main() {
  await run(options);
  if (shouldCleanup) await fse.remove(tempResourcesDir);
})().catch(console.error);
