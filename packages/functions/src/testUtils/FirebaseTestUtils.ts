import firebaseFunctionsTest from "firebase-functions-test";
import { firebaseConfigDev } from "@zm-blood-components/common";

const serviceAccountKeyPath = "../../test-service-account-key.json";

const firebaseTest = firebaseFunctionsTest(
  firebaseConfigDev,
  serviceAccountKeyPath
);

firebaseTest.mockConfig({ functions: { env: "stg" } });
export default firebaseTest;
