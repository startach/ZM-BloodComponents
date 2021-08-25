import { useState } from "react";
import { Hospital } from "@zm-blood-components/common";
import AddAppointmentsScreen from "./AddAppointmentsScreen";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";

export type NewSlots = {
  key: string;
  hospital: Hospital;
  donationStartTime: Date;
  slots: number;
};

interface AddAppointmentsScreenContainerProps {
  activeHospitalsForCoordinator: Hospital[];
}

export default function AddAppointmentsScreenContainer(
  props: AddAppointmentsScreenContainerProps
) {
  const [slotsArray, setSlotsArray] = useState<NewSlots[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const deleteSlotsRequest = (key: string) => {
    setSlotsArray(slotsArray.filter((request) => request.key !== key));
  };

  const onSave = async () => {
    setIsSaving(true);
    await CoordinatorFunctions.addNewAppointments(slotsArray);
    setSlotsArray([]);
    setIsSaving(false);
  };

  return (
    <AddAppointmentsScreen
      activeHospitalsForCoordinator={props.activeHospitalsForCoordinator}
      slotsArray={slotsArray}
      setSlotsArray={setSlotsArray}
      deleteSlotsRequest={deleteSlotsRequest}
      isSaving={isSaving}
      onSave={onSave}
    />
  );
}
