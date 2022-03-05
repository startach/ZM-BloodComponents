import { mocked } from "ts-jest/utils";
import * as CoordinatorFunctions from "../../../firebase/CoordinatorFunctions";
import { ThunkAction } from "../../store";
import {
  Appointment,
  Coordinator,
  Hospital,
} from "@zm-blood-components/common";
import {
  clearAndFetchAppointments,
  maybeFetchMoreAppointments,
} from "./InsertAppointmentsActions";
import * as actionTypes from "../AppointmentsActionTypes";
import { SET_COORDINATOR } from "../../coordinator/CoordinatorActionTypes";

jest.mock("../../../firebase/CoordinatorFunctions");
const mockedCoordinatorFunctions = mocked(CoordinatorFunctions);

const dispatch = jest.fn();
const getState = jest.fn();

const HOSPITAL = Hospital.TEL_HASHOMER;
const NOW = 1644568200000; // Friday, February 11, 2022 10:30:00
const FOUR_WEEKS_AGO = 1641679200000; // Sunday, January 9, 2022 0:00:00
const FOUR_WEEKS_AHEAD = 1646517599999; // Saturday, March 5, 2022 23:59:59.999
const WEEK_MILLIS = 7 * 24 * 60 * 60 * 1000;
const COORDINATOR = {
  coordinatorId: "coordinatorId",
} as Coordinator;

const SAMPLE_APPOINTMENT = {
  id: "sampleAppointment",
} as Appointment;

describe("Insert Appointments Actions", () => {
  beforeEach(() => {
    dispatch.mockClear();
    getState.mockClear();
    mockedCoordinatorFunctions.getAppointments.mockClear();
    mockedCoordinatorFunctions.getAppointments.mockReturnValue(
      Promise.resolve({
        appointments: [SAMPLE_APPOINTMENT],
        hospitalFetched: HOSPITAL,
        coordinator: COORDINATOR,
      })
    );

    getState.mockReturnValue({
      appointments: {
        hospital: HOSPITAL,
        earliestTimeFetched: FOUR_WEEKS_AGO,
        latestTimeFetched: FOUR_WEEKS_AHEAD,
      },
    });
  });

  test("clearAndFetchAppointments", async () => {
    await clearAndFetchAppointments(HOSPITAL, NOW)(dispatch, getState, {});
    await triggerActions(dispatch);

    expect(mockedCoordinatorFunctions.getAppointments).toHaveBeenCalledWith(
      HOSPITAL,
      FOUR_WEEKS_AGO,
      FOUR_WEEKS_AHEAD
    );

    expect(dispatch).toHaveBeenCalledTimes(6);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: actionTypes.START_FETCHING,
      hospital: HOSPITAL,
      earliestStartTimeMillis: FOUR_WEEKS_AGO,
      latestStartTimeMillis: FOUR_WEEKS_AHEAD,
    });
    expect(dispatch).toHaveBeenNthCalledWith(3, {
      type: SET_COORDINATOR,
      coordinator: COORDINATOR,
    });
    expect(dispatch).toHaveBeenNthCalledWith(4, {
      type: actionTypes.SET_HOSPITAL,
      hospital: HOSPITAL,
    });
    expect(dispatch).toHaveBeenNthCalledWith(5, {
      type: actionTypes.ADD_APPOINTMENTS_TO_STATE,
      appointments: [SAMPLE_APPOINTMENT],
    });
    expect(dispatch).toHaveBeenNthCalledWith(6, {
      type: actionTypes.SET_FETCHED_TIMES,
      earliestTimeFetched: FOUR_WEEKS_AGO,
      latestTimeFetched: FOUR_WEEKS_AHEAD,
    });
  });

  test("maybeFetchMoreAppointments - no need to fetch", async () => {
    await maybeFetchMoreAppointments(NOW + 1000)(dispatch, getState, {});

    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  test("maybeFetchMoreAppointments - need to fetch earlier appointments", async () => {
    const scheduleTime = FOUR_WEEKS_AGO + 1000;
    const expectedFetchStart = FOUR_WEEKS_AGO - WEEK_MILLIS;

    await maybeFetchMoreAppointments(scheduleTime)(dispatch, getState, {});
    await triggerActions(dispatch);

    expect(mockedCoordinatorFunctions.getAppointments).toHaveBeenCalledWith(
      HOSPITAL,
      expectedFetchStart,
      FOUR_WEEKS_AGO
    );

    expect(dispatch).toHaveBeenCalledTimes(5);
    expect(dispatch).toHaveBeenNthCalledWith(4, {
      type: actionTypes.ADD_APPOINTMENTS_TO_STATE,
      appointments: [SAMPLE_APPOINTMENT],
    });
    expect(dispatch).toHaveBeenNthCalledWith(5, {
      type: actionTypes.SET_FETCHED_TIMES,
      earliestTimeFetched: expectedFetchStart,
      latestTimeFetched: FOUR_WEEKS_AHEAD,
    });
  });

  test("maybeFetchMoreAppointments - need to fetch later appointments", async () => {
    const scheduleTime = FOUR_WEEKS_AHEAD - 1000;
    const expectedFetchEnd = FOUR_WEEKS_AHEAD + WEEK_MILLIS;

    await maybeFetchMoreAppointments(scheduleTime)(dispatch, getState, {});
    await triggerActions(dispatch);

    expect(mockedCoordinatorFunctions.getAppointments).toHaveBeenCalledWith(
      HOSPITAL,
      FOUR_WEEKS_AHEAD,
      expectedFetchEnd
    );

    expect(dispatch).toHaveBeenCalledTimes(5);
    expect(dispatch).toHaveBeenNthCalledWith(4, {
      type: actionTypes.ADD_APPOINTMENTS_TO_STATE,
      appointments: [SAMPLE_APPOINTMENT],
    });
    expect(dispatch).toHaveBeenNthCalledWith(5, {
      type: actionTypes.SET_FETCHED_TIMES,
      earliestTimeFetched: FOUR_WEEKS_AGO,
      latestTimeFetched: expectedFetchEnd,
    });
  });
});

// https://stackoverflow.com/a/6000009/4748839
async function triggerActions(mockedDispatch: jest.Mock) {
  for (const call of mockedDispatch.mock.calls) {
    const callback = call[0];
    if (typeof callback === "function") {
      const action = callback as ThunkAction;
      await action(dispatch, getState, {});
    }
  }
}
