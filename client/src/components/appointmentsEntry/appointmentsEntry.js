import React from "react";
import "./appointmentsEntry.css";
import Button from "../button";
import { Link, useHistory } from "react-router-dom";
import { db, auth } from "../firebase/firebase";
import { useState, useEffect, Fragment } from "react";

const AppointmentsEntry = () => {
  let [appointments, setAppointments] = useState([]);
  let history = useHistory();
  var userID = localStorage.getItem("userid");
  if (!localStorage.getItem('userid'))
  history.push("/login")

  useEffect(() => {


    const today = Date.now() / 1000;

    const filteredQuery = db
      .collection("Appointments")
      .where("userID", "==", userID);

    filteredQuery
      .get()
      .then((querySnapshot) => {
        const Appointments = [];
        querySnapshot.docs.forEach((hospitalAppointments) => {
          let app = hospitalAppointments.data().timestamp.seconds;
          if (app < today) {
            Appointments.push(hospitalAppointments.data());
          }
        });
        Appointments.sort(function (a, b) {
          a = new Date(a.timestamp.seconds);
          b = new Date(b.timestamp.seconds);
          return a > b ? -1 : a < b ? 1 : 0;
        });
        setAppointments(Appointments);
      })
      .catch((error) => {
        // Catch errors
      });
  }, [setAppointments]);

  return (
    <div>
      <table className="schedulesTables noAppointmentTable">
        <tbody>
          {appointments.length ? appointments.map((appointment) => (
            <tr className="appContainer my-3" id={appointment.id}>
              <td className="rowEntry">{appointment.date}</td>
              <td className="rowEntry">{appointment.time}</td>
              <td className="rowEntry">{appointment.hospitalName}</td>
            </tr>
          )) : <div className="text-center my-4">You have no past appointments</div>}
        </tbody>
      </table>
      <Link id="link" to="/dashboard">
        <Button text="Dashboard" />
      </Link>
    </div>
  );
};

export default AppointmentsEntry;
