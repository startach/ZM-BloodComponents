import React from "react";
import QuestionnaireScreen from "./QuestionnaireScreen";
import { Hospital } from "@zm-blood-components/common";
import { useHistory } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";

interface QuestionnaireScreenContainerProps {}

export default function QuestionnaireScreenContainer(
  props: QuestionnaireScreenContainerProps
) {
  const history = useHistory();

  const onSuccess = () => {
    history.push(MainNavigationKeys.Home);
  };

  return (
    <QuestionnaireScreen
      availableAppointment={{
        id: "test1",
        hospital: Hospital.ASAF_HAROFE,
        donationStartTime: new Date(),
      }}
      onSuccess={onSuccess}
    />
  );
}
