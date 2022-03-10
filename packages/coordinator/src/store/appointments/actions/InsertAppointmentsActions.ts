import * as actionTypes from "../AppointmentsActionTypes";
import {
  Appointment,
  DateUtils,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import { ThunkAction } from "../../store";
import * as CoordinatorFunctions from "../../../firebase/CoordinatorFunctions";
import {
  getEarliestTimeFetched,
  getLatestTimeFetched,
} from "../selectors/GetIsFetchingSelector";
import { getHospital } from "../selectors/GetHospitalSelector";
import _ from "lodash";
import { setCoordinator } from "../../coordinator/CoordinatorActions";

const MILLIS_IN_WEEK = 7 * 24 * 60 * 60 * 1_000;
const DEFAULT_WEEKS_TO_FETCH = 4;
export const clearAndFetchAppointments =
  (hospital: Hospital | undefined, nowMillis: number | Date): ThunkAction =>
  (dispatch) => {
    const earliestStartTimeMillis =
      DateUtils.GetStartOfTheWeek(nowMillis).getTime() -
      DEFAULT_WEEKS_TO_FETCH * MILLIS_IN_WEEK;
    const latestStartTimeMillis =
      DateUtils.GetStartOfTheWeek(nowMillis).getTime() +
      DEFAULT_WEEKS_TO_FETCH * MILLIS_IN_WEEK -
      1;
    dispatch({
      type: actionTypes.START_FETCHING,
      hospital,
      earliestStartTimeMillis,
      latestStartTimeMillis,
    });

    dispatch(
      fetchAndInsertAppointments(
        hospital,
        earliestStartTimeMillis,
        latestStartTimeMillis
      )
    );
  };

/*
 * This action will check if the selected week, the one before it and the one
 * after were already fetched. If not, it will fetch these weeks and add them
 * to the app state.
 */
export const maybeFetchMoreAppointments =
  (timeInWeek: number): ThunkAction =>
  (dispatch, getState) => {
    const hospital = getHospital(getState());
    if (!hospital) {
      return;
    }

    const earliestTimeFetched = getEarliestTimeFetched(getState());
    const latestTimeFetched = getLatestTimeFetched(getState());

    if (timeInWeek - MILLIS_IN_WEEK < earliestTimeFetched) {
      dispatch(
        fetchAndInsertAppointments(
          hospital,
          DateUtils.GetStartOfTheWeek(timeInWeek - MILLIS_IN_WEEK).getTime(),
          earliestTimeFetched
        )
      );
    }

    if (timeInWeek + MILLIS_IN_WEEK > latestTimeFetched) {
      dispatch(
        fetchAndInsertAppointments(
          hospital,
          latestTimeFetched,
          DateUtils.GetStartOfTheWeek(
            timeInWeek + 2 * MILLIS_IN_WEEK
          ).getTime() - 1
        )
      );
    }
  };

const fetchAndInsertAppointments = (
  hospital: Hospital | undefined,
  earliestStartTimeMillis: number,
  latestStartTimeMillis: number
): ThunkAction => {
  return async (dispatch, getState) => {
    const response = await CoordinatorFunctions.getAppointments(
      hospital,
      earliestStartTimeMillis,
      latestStartTimeMillis
    );

    dispatch(setCoordinator(response.coordinator));
    dispatch(setHospital(response.hospitalFetched));
    dispatch(insertAppointmentsToState(response.appointments));
    dispatch({
      type: actionTypes.SET_FETCHED_TIMES,
      earliestTimeFetched: _.min([
        getEarliestTimeFetched(getState()),
        earliestStartTimeMillis,
      ]),
      latestTimeFetched: _.max([
        getLatestTimeFetched(getState()),
        latestStartTimeMillis,
      ]),
    });
  };
};

export const insertAppointmentsToState = (appointments: Appointment[]) => {
  return {
    type: actionTypes.ADD_APPOINTMENTS_TO_STATE,
    appointments: appointments,
  };
};

export const setHospital = (
  hospital: Hospital | typeof HospitalUtils.ALL_HOSPITALS_SELECT
) => {
  return {
    type: actionTypes.SET_HOSPITAL,
    hospital: hospital,
  };
};
