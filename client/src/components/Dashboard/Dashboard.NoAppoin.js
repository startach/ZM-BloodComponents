import React from "react";
import "./dashboard.css"

function DashboardNoAppoin() {
  return (
    <div>
      <span className="userEligibility">
        you are <b style={{ color: "green" }}>eligible</b> to donate.
        <br></br>
        Please, schedule a new appointment:
      </span>

      <br></br>

      <p className="hospitalsOptionsContainer">
        Nearest hospital is{" "}
        <select className="hospitalsOptionsList">
          <option value="Rambam - Haifa" className="option">
            Rambam - Haifa
          </option>
          <option value="Tal Hashomer - Tel Aviv" className="option">
            Tal Hashomer - Tel Aviv
          </option>
        </select>
      </p>
      {/* table area::::: */}

      <table className="table noAppointmentTable">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Schedule</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01/08/2020</td>
            <td>12:30</td>
            <td>
              {" "}
              <button className="scheduleButton">Register</button>
            </td>
          </tr>
          <tr>
            <td>31/06/2020</td>
            <td>14:30</td>
            <td>
              {" "}
              <button className="scheduleButton">Register</button>
            </td>
          </tr>
          <tr>
            <td>08/07/2020</td>
            <td>09:00</td>
            <td>
              {" "}
              <button className="scheduleButton">Register</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DashboardNoAppoin;
