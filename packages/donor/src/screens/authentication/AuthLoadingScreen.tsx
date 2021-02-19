import React from "react";
import Text from "../../components/basic/Text";
import { Loader } from "semantic-ui-react";

export default function AuthLoadingScreen() {
  return (
    <div>
      <Text>Loading screen</Text>
      <Loader size="large" active inline="centered">
        טוען
      </Loader>
    </div>
  );
}
