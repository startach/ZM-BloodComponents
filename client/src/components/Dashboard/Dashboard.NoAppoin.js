import React from "react";
import "./dashboard.css";
import "../appointmentsEntry/appointmentsEntry.css";

function DashboardNoAppoin() {
  return (
    <div className="dashboardView noAppointmentViewContainer">
      <div className="userEligibility">
        you are <b style={{ color: "green" }}> eligible </b> to donate.
        <br></br>
        Please, schedule a new appointment:
      </div>


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

      <table className="schedulesTables noAppointmentTable">
        <thead>
          <tr className="headerRow">
            <th className="headerEntries">Date</th>
            <th className="headerEntries">Time</th>
            <th className="headerEntries">Schedule</th>
          </tr>
        </thead>
        <tbody>
          <tr className='rowContainer'>
            <td className='rowClass' >01/08/2020</td>
            <td className='rowClass'>12:30</td>
            <td className='rowClass'><button className="scheduleButton">Register</button>
            </td>
          </tr>
          <tr className='rowContainer'>
            <td className="rowClass">31/06/2020</td>
            <td className="rowClass">14:30</td>
            <td className="rowClass"><button className="scheduleButton">Register</button>
            </td>
          </tr>
          <tr className='rowContainer'>
            <td className="rowClass scheduleTableRow">08/07/2020</td>
            <td className="rowClass">09:00</td>
            <td className="rowClass"><button className="scheduleButton">Register</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DashboardNoAppoin;
