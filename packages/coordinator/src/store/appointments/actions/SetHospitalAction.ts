import * as actionTypes from "../AppointmentsActionTypes";
import { Hospital } from "@zm-blood-components/common";
import { ThunkAction } from "../../store";
import { fetchAppointments } from "./FetchAppointmentsAction";

export const setHospital =
  (hospital: Hospital): ThunkAction =>
  async (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_HOSPITAL,
      hospital,
    });

    // TODO fetch more
    const millisInWeek = 7 * 24 * 60 * 60 * 1_000;

    dispatch(
      fetchAppointments(
        new Date().getTime() - 3 * millisInWeek,
        new Date().getTime() + 3 * millisInWeek
      )
    );
  };
