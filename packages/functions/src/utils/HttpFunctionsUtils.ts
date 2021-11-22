const PROD_FUNCTION =
  "https://us-central1-blood-components-9ad48.cloudfunctions.net/";
const STG_FUNCTION = "https://us-central1-blood-components.cloudfunctions.net/";

export function getHttpFunction(
  isProduction: boolean,
  functionName: string,
  parameters: string
) {
  if (isProduction) {
    return PROD_FUNCTION + functionName + "?" + parameters;
  } else {
    return STG_FUNCTION + functionName + "?" + parameters;
  }
}
