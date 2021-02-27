const isProductionEnvironment = process.env.REACT_APP_PRODUCTION_FIREBASE;
export function getFirebaseConfig() {
  if (isProductionEnvironment) {
    console.log("Using production firebase");
    return firebaseConfigProd;
  } else {
    console.log("Using dev firebase");
    return firebaseConfigDev;
  }
}

export const firebaseConfigDev = {
  apiKey: "AIzaSyBDsPo9-wzaC9dOmb1ypD8iUmEYFEUN_XU",
  authDomain: "blood-components.firebaseapp.com",
  databaseURL: "https://blood-components.firebaseio.com",
  projectId: "blood-components",
  storageBucket: "blood-components.appspot.com",
  messagingSenderId: "388223113819",
  appId: "1:388223113819:web:1273570a12add0fedafd7e",
  measurementId: "G-K6NM078FWD",
};

export const firebaseConfigProd = {
  apiKey: "AIzaSyBrpaowMgDhMk9m4alrBQcxOdnVDKlZ678",
  authDomain: "blood-components-9ad48.firebaseapp.com",
  databaseURL: "https://blood-components-9ad48.firebaseio.com",
  projectId: "blood-components-9ad48",
  storageBucket: "blood-components-9ad48.appspot.com",
  messagingSenderId: "716612101303",
  appId: "1:716612101303:web:d3282c2202cbbd43aad932",
  measurementId: "G-4F5B3GB6SZ",
};
