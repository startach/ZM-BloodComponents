import React, { useState } from "react";

export default function DashboardAppoin() {
  const [appointmentDate, setAppointmentDate] = useState("dd/mm/yy");
  const [appointmentTime, setappointmentTime] = useState("15:00 PM");
  const [appointmentLocation, setappointmentLocation] = useState(
    "Haifa-Rambam"
  );

  return (
    <div>
      you are <b style={{ color: "green" }}>eligible</b> to donate.
      <br></br>
      Here is few details regarding your upcoming appointment.
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody> 
            <tr>
          <td>{appointmentDate}</td>
          <td>{appointmentTime}</td>
          <td>{appointmentLocation}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
