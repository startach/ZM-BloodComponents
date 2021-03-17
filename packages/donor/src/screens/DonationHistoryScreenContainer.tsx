import { useEffect, useState } from "react";
import { BookedAppointment } from "@zm-blood-components/common";
import * as FirebaseFunctions from "../firebase/FirebaseFunctions";
import DonationHistoryScreen from "./DonationHistoryScreen";

export default function DonationHistoryScreenContainer() {
  const [donations, setDonations] = useState<BookedAppointment[]>([]);

  useEffect(() => {
    FirebaseFunctions.getPastAppointments().then((appointments) =>
      setDonations(appointments)
    );
  }, []);

  return <DonationHistoryScreen donations={donations} />;
}
