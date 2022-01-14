import { Hospital } from "@zm-blood-components/common";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import AddAppointmentScreen from "./AddAppointmentScreen";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";

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

  const onSave = async (donationStartTime: Date, slots: number) => {
    await CoordinatorFunctions.addNewAppointment(
      hospital,
      donationStartTime,
      slots
    );
    navigate(-1);
  };

  return <AddAppointmentScreen onSubmit={onSave} />;
}
