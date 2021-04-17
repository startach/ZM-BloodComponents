//reference https://forum.ionicframework.com/t/how-to-build-an-android-apk-file-without-using-android-studio-in-a-capacitor-project/177814/10
import path from "path";
import fse from "fs-extra";
import os from "os";
import util from "util";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { Arguments } from "yargs";
import { exec, spawnSync } from "child_process";

// @ts-ignore
import { version } from "../../package.json";
import { alias, keystore, output } from "./options";
import inquirer from "inquirer";

const execPromise = util.promisify(exec);

//define the cli command--------------------------------------------------
interface CliArguments extends Arguments {
  $0: string;
  keystore: string;
  alias: string;
  file: string;
  output: string;
}

const cliArgs = yargs(hideBin(process.argv))
  .options({ alias, keystore, output })
  .demandOption("alias")
  .demandOption("keystore")
  .demandOption("output")
  // @ts-ignore
  .check((argv: CliArguments) => {
    if (!fse.existsSync(argv.keystore))
      throw new Error("Keystore file not found.");

    if (path.extname(argv.output).toLowerCase() !== ".apk")
      throw new Error(`Invalid output file extension. ( must be ".apk") `);

    return true;
  })
  .fail((msg) => {
    console.error(msg);
    process.exit();
  })
  .help().argv as CliArguments;

//build and sign the apk-------------------------------------------------

const projectRootDir = path.resolve(__dirname, "..", "..");
const keystorePath = path.resolve(projectRootDir, cliArgs.keystore);
const outputPath = path
  .resolve(projectRootDir, cliArgs.output)
  .replace("<version>", version);
const androidDir = path.resolve(projectRootDir, "android");
const androidApkDir = path.resolve(
  androidDir,
  "app",
  "build",
  "outputs",
  "apk",
  "release"
);

async function buildAPK() {
  console.log("Building APK...");

  const gradleExecutable =
    os.platform() === "win32" ? "gradlew.bat" : "gradlew";

  // generate apk
  await execPromise(
    `cd ${androidDir} && ./${gradleExecutable} assembleRelease`
  );
}
function signAPK() {
  console.log("Signing APK...");

  spawnSync(
    `jarsigner`,
    ["-keystore", keystorePath, "app-release-unsigned.apk", cliArgs.alias],
    {
      cwd: androidApkDir,
      stdio: "inherit",
    }
  );
}
async function generateProductionAPK() {
  console.log("generating optimized APK...");

  if (os.platform() === "win32") {
    throw new Error("you'll have to use zipalign manually.");
  }

  const findZipalign = await execPromise(
    `find ~/Library/Android/sdk/build-tools -name "zipalign"`
  );
  const zipalignVersions = findZipalign.stdout.split("\n");
  const { zipalingPath } = await inquirer.prompt({
    name: "zipalingPath",
    message: "Select build-tools version",
    type: "list",
    choices: zipalignVersions,
  });

  await execPromise(
    `cd "${androidApkDir}" && "${zipalingPath}" 4 app-release-unsigned.apk ${outputPath}`
  );
}

(async function Main() {
  await buildAPK();

  signAPK();

  //remove existing output file (if exists)
  await fse.remove(outputPath);

  await generateProductionAPK();

  console.log("done.");
})().catch(({ message }) => console.error(message));
