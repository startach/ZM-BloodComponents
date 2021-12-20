import { DateUtils, FunctionsApi } from "@zm-blood-components/common";
import { getDonor } from "../dal/DonorDataAccessLayer";
import * as functions from "firebase-functions";

import { calendar_v3, google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import Calendar = calendar_v3.Calendar;
import Schema$Event = calendar_v3.Schema$Event;
import { getAllAppointments, getAppointments, getAppointmentsByIds } from "../dal/AppointmentDataAccessLayer";

export default async function (
  request: FunctionsApi.SaveInCalanderRequest,
  callerId: string
): Promise<FunctionsApi.SaveInCalanderResponse> {
  if (!request.donorId) {
    throw new Error("Invalid saveInCalander request");
  }

  if (callerId !== request.donorId) {
    throw new Error("Unauthorized saveInCalander request");
  }

  const getAppointments = getAppointmentsByIds([request.appointment.id])

  const dbDonor = await getDonor(request.donorId);
  if (!dbDonor){
    return {
      status: FunctionsApi.SaveInCalanderStatus.DONOR_NOT_FOUND
    }; 
  }

  const appointments = await getAppointments;
  if (appointments.length !== 1) {
    throw new Error("Appointment not found");
  }
  const appointment = appointments[0];

  const time = DateUtils.ToDateString(request.appointment.donationStartTimeMillis, "YY-MM-DDThh:mm:ss+02:00");

  const event : Schema$Event = {  
    summary: "תרומת טרומבוציטים",
    description: "can be modified in the future",
    start: {
      dateTime: time,
      timeZone : "Asia/Jerusalem"
    },
    attendees: [
      { email: dbDonor.email}
    ]
  }

  const googleCreds = functions.config().web_app // NEED to get credentials

  const auth : OAuth2Client = new google.auth.OAuth2(
    googleCreds.web.client_id,
    googleCreds.web.client_secret,
    googleCreds.web.redirect_uris[0]
  );

  auth.setCredentials({
    refresh_token: googleCreds.refresh_token
  });

  addEvent(event, auth).catch(err => console.log(err));

  return {
    status: FunctionsApi.SaveInCalanderStatus.SUCCESS
  };
}

async function addEvent(event: Schema$Event, auth : OAuth2Client) {
  const calendar : Calendar = google.calendar({ version: "v3" })

  const res = await calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    requestBody: event
  });

  return res;
}