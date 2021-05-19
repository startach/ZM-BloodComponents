//reference https://capacitorjs.com/docs/v3/config
import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.zmComponents.donor",
  appName: "donor",
  webDir: "./build",
  bundledWebRuntime: false,
};

if (process.env.DEV)
  config.server = {
    url: "http://localhost:3000",
    cleartext: true,
  };

export default config;
