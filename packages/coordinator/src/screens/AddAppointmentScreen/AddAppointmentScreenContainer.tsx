import { Hospital } from "@zm-blood-components/common";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import AddAppointmentScreen from "./AddAppointmentScreen";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { getTimestamp } from "../../navigation/RouterUtils";

interface AddAppointmentsScreenContainerProps {
  loggedIn: boolean;
}

export default function AddAppointmentScreenContainer(
  props: AddAppointmentsScreenContainerProps
) {
  const navigate = useNavigate();
  const { hospital, timestamp } =
    useParams<{ hospital: Hospital; timestamp: string }>();
  if (!props.loggedIn) {
    return <Navigate to={CoordinatorScreenKey.LOGIN} />;
  }

  if (!hospital) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULE} />;
  }

  let time = getTimestamp(timestamp);
  if (!time) {
    // If no timestamp, take tomorrow
    time = new Date();
    time.setDate(time.getDate() + 1);
  }
  const initialDate = getInitialDate(time);

  const onSave = async (donationStartTimes: number[]) => {
    await CoordinatorFunctions.addNewAppointment(hospital, donationStartTimes);
    navigate(-1);
  };

  return (
    <AddAppointmentScreen
      onSubmit={onSave}
      initialDate={initialDate}
      hospital={hospital}
    />
  );
}

function getInitialDate(date: Date) {
  if (date.getDay() === 6) {
    // If day is Saturday, move to Sunday.
    date.setDate(date.getDate() + 1);
  }

  date.setHours(11, 0, 0, 0);
  return date;
}
