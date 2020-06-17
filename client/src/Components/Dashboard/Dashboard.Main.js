import React, { useState, Fragment } from "react";
import NotEligible from "./Dashboard.NotEligible";
import HaveAppointment from "./Dashboard.Appoin";
import DontHaveAppointment from "./Dashboard.NoAppoin";

export default function Dashboard() {
  const [view, setView] = useState("");


const handleNotEligible = () => {
    setView("NotEligibleView");
}

const handleHaveAppointment = () => {
    setView("AppointmentView");
}

const handleNoAppointment = () => {
    setView("NoAppointmentView");
}

  return (
    <div>
      <button onClick={handleNotEligible}>Not Eligible view</button>
      <button onClick={handleHaveAppointment}>Have an appointment</button>
      <button onClick={handleNoAppointment}>Dont have an appointment</button>
      <Fragment>
        {
          (view == "NotEligibleView" ? (
            <NotEligible />
          ) : (
            (view == "AppointmentView" ? (
              <HaveAppointment />
            ) : (
              (view == "NoAppointmentView" ? (
                <DontHaveAppointment />
              ) : (
                <span>
                  This is the first thing ull see when u first register
                </span>
              ))
            ))
          ))
        }
      </Fragment>
    </div>
  );
}
