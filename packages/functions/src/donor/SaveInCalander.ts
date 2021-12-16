import { DateUtils, FunctionsApi } from "@zm-blood-components/common";
import { SaveInCalanderStatus } from "common/src/functions-api";
import { getDonor } from "../dal/DonorDataAccessLayer";
import * as functions from "firebase-functions";

import { calendar_v3, google } from 'googleapis';
import { OAuth2Client, Credentials } from 'google-auth-library';
import Calendar = calendar_v3.Calendar;
import Schema$Event = calendar_v3.Schema$Event;

export default async function (
  request: FunctionsApi.SaveInCalanderRequest,
  callerId: string
): Promise<FunctionsApi.SaveInCalanderResponse> {
  if (!request.donorId) {
    throw new Error("Invalid getDonor request");
  }

  if (callerId !== request.donorId) {
    throw new Error("Unauthorized getDonor request");
  }

  const dbDonor = await getDonor(request.donorId);
  if (!dbDonor){
    return {
      status: SaveInCalanderStatus.DONOR_NOT_FOUND
    }; 
  }

  const time = DateUtils.ToDateString(request.appointment.donationStartTimeMillis, "YY-MM-DDThh:mm:ss+02:00");

  var event : Schema$Event = {  
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

  addEvent(event, auth);

  return {
    status: SaveInCalanderStatus.SUCCESS
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