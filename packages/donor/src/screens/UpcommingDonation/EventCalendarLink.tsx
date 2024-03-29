import React from "react";
import {
  AnalyticsEventType,
  BookedAppointment,
  DateUtils,
  DeviceUtils,
  LocaleUtils,
} from "@zm-blood-components/common";
import styles from "./UpcomingDonationScreen.module.scss";
import { reportEvent } from "../../Analytics";

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

  const CleanIsoFormatDate = (date: Date) => {
    const isoStringWithoutSeconds = date.toISOString().replace(/.\d+Z$/g, "Z");
    return isoStringWithoutSeconds.replace(/[-:.]/g, "");
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
      "SUMMARY:תרומת טרומבוציטים",
      "DESCRIPTION:" + eventDescription,
      "LOCATION:" + eventLocation,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([calendarUrl], {
      type: "text/calendar;charset=utf-8",
    });
    const ret = window.URL.createObjectURL(blob);
    window.open(ret, "_blank");
  };

  const linkByOperatingSystem = () => {
    return DeviceUtils.getMobileOperatingSystem() === "android"
      ? addToGoogleCalendar()
      : addToIOSCalendar();
  };

  const handleClick = () => {
    linkByOperatingSystem();

    reportEvent(AnalyticsEventType.Click, "add_reminder_to_calendar");
  };

  return (
    <div className={styles.link} onClick={handleClick}>
      הוספה ליומן
    </div>
  );
}
