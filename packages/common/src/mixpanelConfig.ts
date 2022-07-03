const isProductionEnvironment = process.env.REACT_APP_PRODUCTION_FIREBASE;

function isProduction() {
  return isProductionEnvironment;
}

export function getMixpanelConfig() {
  if (isProduction()) {
    console.log("Using production mixpanel");
    return mixpanelConfigProd;
  } else {
    console.log("Using dev firebase");
    return mixpanelConfigDev;
  }
}

export const mixpanelConfigDev = {
  token: "52d74bb94b65b22516cf0660ef7f7dfa",
  debug: true,
};

export const mixpanelConfigProd = {
  token: "5d8bd357809d54e97db4d05da6baad4f",
  debug: false,
};
