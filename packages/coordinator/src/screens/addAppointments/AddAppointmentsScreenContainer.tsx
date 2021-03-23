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

export default function AddAppointmentsScreenContainer() {
  const [slotsArray, setSlotsArray] = useState<NewSlots[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const addSlotsRequest = (
    hospital: Hospital,
    donationStartTime: Date,
    slots: number
  ) => {
    const request = {
      hospital,
      donationStartTime,
      slots,
      key: guidGenerator(),
    };
    setSlotsArray([...slotsArray, request]);
  };

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
      slotsArray={slotsArray}
      addSlotsRequest={addSlotsRequest}
      deleteSlotsRequest={deleteSlotsRequest}
      isSaving={isSaving}
      onSave={onSave}
    />
  );
}

// https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
function guidGenerator() {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}
