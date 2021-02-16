import React, { useState } from "react";
import { Hospital } from "@zm-blood-components/common";
import AddAppointmentsScreen from "./AddAppointmentsScreen";

export type NewSlots = {
  id: string;
  hospital: Hospital;
  donationStartTime: Date;
  slots: number;
};

export default function AddAppointmentsScreenContainer() {
  const [slotsArray, setSlotsArray] = useState<NewSlots[]>([]);

  const addSlotsRequest = (
    hospital: Hospital,
    donationStartTime: Date,
    slots: number
  ) => {
    const request = {
      hospital,
      donationStartTime,
      slots,
      id: guidGenerator(),
    };
    setSlotsArray([...slotsArray, request]);
  };

  const deleteSlotsRequest = (id: string) => {
    setSlotsArray(slotsArray.filter((request) => request.id !== id));
  };

  return (
    <AddAppointmentsScreen
      slotsArray={slotsArray}
      addSlotsRequest={addSlotsRequest}
      deleteSlotsRequest={deleteSlotsRequest}
      onSave={() => console.log("Save")}
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
