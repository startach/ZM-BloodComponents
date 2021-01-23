import * as firebaseFunctionsTest from "firebase-functions-test";

const firebaseConfig = {
  apiKey: "AIzaSyC6EDL8gMkZc3GGzGveMqWe5zvAr5DNiL4",
  authDomain: "blood-components.firebaseapp.com",
  databaseURL: "https://blood-components.firebaseio.com",
  projectId: "blood-components",
  storageBucket: "blood-components.appspot.com",
  messagingSenderId: "388223113819",
  appId: "1:388223113819:web:1273570a12add0fedafd7e",
  measurementId: "G-K6NM078FWD",
};

const serviceAccountKeyPath = "./src/testUtils/test-service-account-key.json";
const firebaseTest = firebaseFunctionsTest(
  firebaseConfig,
  serviceAccountKeyPath
);

export default firebaseTest;
