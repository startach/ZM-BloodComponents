import { run, Options } from "cordova-res";
import path from "path";
import fse from "fs-extra";
import { Arguments } from "yargs";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import * as cliOptions from "./options";

//define the cli command--------------------------------------------------
interface CliArguments extends Arguments {
  $0: string;
  android: boolean;
  ios: boolean;
  cleanup: boolean;
}
const cliArgs = yargs(hideBin(process.argv))
  .options(cliOptions)
  .fail((msg) => {
    console.error(msg);
    process.exit();
  })
  .help().argv as CliArguments;

//generate images--------------------------------------------------

//get absolute paths
const projectDir = path.resolve(__dirname, "..", "..");
const resourcesDir = path.resolve(projectDir, "src", "assets", "mobile");
const tempResourcesDir = path.resolve(projectDir, ".mobileImages");
const androidDir = path.resolve(projectDir, "android");
const iosDir = path.resolve(projectDir, "ios");
const logoPath = path.resolve(resourcesDir, "icon.png");
const splashScreenPath = path.resolve(resourcesDir, "splash.png");

//add base configuration
const cordovaResOptions: Options = {
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
if (fse.pathExistsSync(androidDir) || cliArgs.android) {
  //@ts-ignore - the field is typed as "readonly"
  cordovaResOptions.platforms["android"] = {
    icon: { sources: [logoPath] },
    splash: { sources: [splashScreenPath] },
  };
}

//generate ios images
if (fse.pathExistsSync(iosDir) || cliArgs.ios) {
  //@ts-ignore - the field is typed as "readonly"
  cordovaResOptions.platforms["ios"] = {
    icon: { sources: [logoPath] },
    splash: { sources: [splashScreenPath] },
  };
}

//generate + copy images
(async function main() {
  await run(cordovaResOptions);
  if (cliArgs.cleanup) await fse.remove(tempResourcesDir);
})().catch(console.error);
