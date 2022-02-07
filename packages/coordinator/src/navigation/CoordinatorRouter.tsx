import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  initFirebase,
  registerAuthChange,
} from "../firebase/FirebaseInitializer";
import SearchDonorsScreenContainer from "../screens/searchDonorsScreen/SearchDonorsScreenContainer";
import ReportsScreenContainer from "../screens/reports/ReportsScreenContainer";
import { CoordinatorScreenKey } from "./CoordinatorScreenKey";
import SignInScreenContainer from "../screens/AuthScreens/SignInScreenContainer";
import ResetPasswordScreenContainer from "../screens/AuthScreens/ResetPasswordScreenContainer";
import SplashScreen from "../screens/loading/SplashScreen";
import ScheduleScreenContainer from "../screens/schedule/ScheduleScreenContainer";
import DonationDayScreenContainer from "../screens/donationDay/DonationDayScreenContainer";
import BookManualDonationScreenContainer from "../screens/bookManualDonationScreen/BookManualDonationScreenContainer";
import BookedAppointmentScreenContainer from "../screens/bookedDonation/BookedAppointmentScreenContainer";
import AddAppointmentScreenContainer from "../screens/AddAppointmentScreen/AddAppointmentScreenContainer";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "../store/login/LoginStatusActions";
import { schedulePath } from "./RouterUtils";
import { isFetching } from "../store/appointments/selectors/GetIsFetchingSelector";

// const ROLES_THAT_ADD_APPOINTMENTS = [
//   CoordinatorRole.SYSTEM_USER,
//   CoordinatorRole.ZM_COORDINATOR,
//   CoordinatorRole.HOSPITAL_COORDINATOR,
// ];
//
// const ROLES_THAT_VIEW_OPEN_APPOINTMENTS = [
//   CoordinatorRole.SYSTEM_USER,
//   CoordinatorRole.ZM_COORDINATOR,
//   CoordinatorRole.HOSPITAL_COORDINATOR,
//   CoordinatorRole.GROUP_COORDINATOR,
// ];
//
// const ROLES_THAT_VIEW_BOOKED_APPOINTMENTS = [
//   CoordinatorRole.SYSTEM_USER,
//   CoordinatorRole.ZM_COORDINATOR,
//   CoordinatorRole.HOSPITAL_COORDINATOR,
//   CoordinatorRole.GROUP_COORDINATOR,
// ];
//
// const ROLES_THAT_VIEW_DONORS = [
//   CoordinatorRole.SYSTEM_USER,
//   CoordinatorRole.ZM_COORDINATOR,
//   CoordinatorRole.GROUP_COORDINATOR,
// ];

export default function CoordinatorRouter() {
  const dispatch = useDispatch();
  const fetching = useSelector(isFetching);

  useEffect(() => {
    initFirebase();
  }, []);

  useEffect(() => {
    registerAuthChange((newLoginStatus) => {
      dispatch(setLoginStatus(newLoginStatus));
    });
  }, [dispatch]);

  if (fetching) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      <Route
        path={CoordinatorScreenKey.LOGIN}
        element={<SignInScreenContainer />}
      />
      <Route
        path={CoordinatorScreenKey.RESET_PASSWORD}
        element={<ResetPasswordScreenContainer />}
      />

      <Route
        path={CoordinatorScreenKey.SCHEDULE + "/:timestamp"}
        element={<ScheduleScreenContainer />}
      />

      <Route
        path={CoordinatorScreenKey.DAY + "/:timestamp"}
        element={<DonationDayScreenContainer />}
      />

      <Route
        path={CoordinatorScreenKey.APPOINTMENT + "/:appointmentId"}
        element={<BookedAppointmentScreenContainer />}
      />

      <Route
        path={
          CoordinatorScreenKey.MANUAL_DONATION + "/:appointmentId/:timestamp"
        }
        element={<BookManualDonationScreenContainer />}
      />

      <Route
        path={CoordinatorScreenKey.ADD}
        element={<AddAppointmentScreenContainer />}
      />

      <Route
        path={CoordinatorScreenKey.ADD + "/:timestamp"}
        element={<AddAppointmentScreenContainer />}
      />

      {/*Old screens*/}
      <Route
        path={CoordinatorScreenKey.DONORS}
        element={<SearchDonorsScreenContainer />}
      />

      <Route
        path={CoordinatorScreenKey.REPORTS}
        element={<ReportsScreenContainer />}
      />

      {/*in case of no match*/}
      <Route path="*" element={<Navigate to={schedulePath(new Date())} />} />
    </Routes>
  );
}
