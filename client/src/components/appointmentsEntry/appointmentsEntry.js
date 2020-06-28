import React from "react";
import "./appointmentsEntry.css";
import Button from "../button";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase/firebase";
import { useState, useEffect, Fragment } from "react";

const AppointmentsEntry = () => {
  let [appointments, setAppointments] = useState([]);

  useEffect(() => {
    var userID = localStorage.getItem("userid");

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
          {appointments.map((appointment) => (
            <tr className="rowContainer" id={appointment.id}>
              <td className="rowClass">{appointment.date}</td>
              <td className="rowClass">{appointment.time}</td>
              <td className="rowClass">{appointment.hospitalName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link id="link" to="/dashboard">
        <Button text="Dashboard" />
      </Link>
    </div>
  );
};

export default AppointmentsEntry;
