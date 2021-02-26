import * as firebaseFunctionsTest from "firebase-functions-test";
import { firebaseConfigDev } from "@zm-blood-components/common";

const serviceAccountKeyPath = "./src/testUtils/test-service-account-key.json";
const firebaseTest = firebaseFunctionsTest(
  firebaseConfigDev,
  serviceAccountKeyPath
);

export default firebaseTest;
