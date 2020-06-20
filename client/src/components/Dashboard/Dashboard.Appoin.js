import React, { useState } from "react";
import "./dashboard.css"
import "../appointmentsEntry/appointmentsEntry.css"

export default function DashboardAppoin() {
  const [appointmentDate, setAppointmentDate] = useState("dd/mm/yy");
  const [appointmentTime, setappointmentTime] = useState("15:00 PM");
  const [appointmentLocation, setappointmentLocation] = useState("Haifa-Rambam");

  const [appointmentDetails, setappointmentDetails] = useState(['Date', 'Time', 'Location']);
  
  return (
    <div className='dashboardView'>
      <div className='userEligibility'>
      you are <b style={{ color: "green" }}> eligible </b> to donate.
      <br></br>
      Here is few details regarding your upcoming appointment:
      </div>
      <table className='schedulesTables upcomingAppointment'>
        <thead>
          <tr className='headerRow'>
            <th className='headerEntries'>Date</th>
            <th className='headerEntries'>Time</th>
            <th className='headerEntries'>Location</th>
          </tr>
        </thead>
        <tbody> 
            <tr className='rowContainer'>
          <td className='rowClass'>{appointmentDate}</td>
          <td className='rowClass'>{appointmentTime}</td>
          <td className='rowClass'>{appointmentLocation}</td>
          </tr>
        </tbody>
      </table>
      <button className='directionsButton'>Get Directions</button>
      <button className='taxiButton'>Order Taxi</button>
    </div>
  );
}



// import React, { useState } from "react";

// export default function DashboardAppoin() {
//   const [appointmentDate, setAppointmentDate] = useState("dd/mm/yy");
//   const [appointmentTime, setappointmentTime] = useState("15:00 PM");
//   const [appointmentLocation, setappointmentLocation] = useState("Haifa-Rambam");

//   const [appointmentDetails, setappointmentDetails] = useState(['Date', 'Time', 'Location'])

// var columnList=[]
//   const handlecols = (appointmentDetails) => {
//      columnList =  appointmentDetails.map((col) => { return (
//           <th id={col}>{col}</th>)
//       })
//       console.log('list ',columnList);
//   }

//   return (
//     <div>
//       you are <b style={{ color: "green" }}>eligible</b> to donate.
//       <br></br>
//       Here is few details regarding your upcoming appointment.
//       <table>
//         <thead>
//           <tr handlecols={handlecols}>
//               {columnList}
//           </tr>
//         </thead>
//         <tbody> 
//             <tr>
//           <td>{appointmentDate}</td>
//           <td>{appointmentTime}</td>
//           <td>{appointmentLocation}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
