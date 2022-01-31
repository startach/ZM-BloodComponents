import React from "react";
import {
  BookedAppointment,
  DateUtils,
  DeviceUtils,
  LocaleUtils,
} from "@zm-blood-components/common";
import styles from "./UpcomingDonationScreen.module.scss";

export interface EventCalendarLinkProps {
  bookedAppointment: BookedAppointment;
  eventDurationByMinutes: number;
}

const GOOGLE_EVENT_URL =
  "https://calendar.google.com/calendar/u/0/r/eventedit?";

export default function EventCalendarLink({
  bookedAppointment,
  eventDurationByMinutes,
}: EventCalendarLinkProps) {
  const eventDateStart = new Date(bookedAppointment.donationStartTimeMillis);
  const eventDateEnd = DateUtils.DateWithAddedMinutes(
    eventDateStart,
    eventDurationByMinutes
  );
  const eventLocation = `בית החולים ${LocaleUtils.getHospitalName(
    bookedAppointment.hospital
  )}`;
  const eventDescription = `זכרון מנחם - ${eventLocation} - ${eventDateStart.toLocaleDateString(
    "he-He",
    DateUtils.ShortDateFormat
  )}`;

  const getGoogleCalendarEvent = (): any => ({
    text: `תרומת טרומבוציטים`,
    location: eventLocation,
    details: eventDescription,
    dates: `${CleanIsoFormatDate(eventDateStart)}/${CleanIsoFormatDate(
      eventDateEnd
    )}`,
  });

  const getAppleCalendarEvent = (): any => ({
    title: "תרומת טרומבוציטים",
    location: eventLocation,
    description: eventDescription,
    startTime: eventDateStart.toString(),
    endTime: eventDateEnd.toString(),
  });

  const CleanIsoFormatDate = (date: Date) => {
    return date.toISOString().replace(/[-:.]/g, "");
  };

  const addToGoogleCalendar = () => {
    const eventParams = Object.entries(getGoogleCalendarEvent())
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
    const googleEventUrlWithParams = GOOGLE_EVENT_URL + eventParams;
    window.open(googleEventUrlWithParams, "_blank");
  };

  const addToIOSCalendar = () => {
    const calendarUrl = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "URL:" + document.URL,
      "DTSTART:" + CleanIsoFormatDate(eventDateStart),
      "DTEND:" + CleanIsoFormatDate(eventDateEnd),
      "SUMMARY:" + "תרומת טרומבוציטים",
      "DESCRIPTION:" + eventDescription,
      "LOCATION:" + eventLocation,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const filename = "download.ics";
    const blob = new Blob([calendarUrl], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {DeviceUtils.getMobileOperatingSystem() === "android" ? (
        <div className={styles.link} onClick={addToGoogleCalendar}>
          הוספה ליומן
        </div>
      ) : (
        <div className={styles.link} onClick={addToIOSCalendar}>
          הוספה ליומן
        </div>
      )}
    </div>
  );
}
