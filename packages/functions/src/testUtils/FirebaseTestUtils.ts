import * as firebaseFunctionsTest from "firebase-functions-test";
import { firebaseConfig } from "@zm-blood-components/common";

const serviceAccountKeyPath = "./src/testUtils/test-service-account-key.json";
const firebaseTest = firebaseFunctionsTest(
  firebaseConfig,
  serviceAccountKeyPath
);

export default firebaseTest;
