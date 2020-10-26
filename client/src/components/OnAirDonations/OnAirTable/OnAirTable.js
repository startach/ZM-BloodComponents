import React, {useState, useEffect, Fragment} from "react";
import "./OnAirTable.css";
import collapse from "../collapse-arrow.png";
import expand from "../expand-arrow.png";
import YesNoPopUp from '../../PopUp/YesNoPopUp/YesNoPopUp';

export default function OnAirTable(props) {
  const { t, date, dateAppointments, usersMap, deleteTimeAppointments } = props;

  const [tableRows, setTableRows] = useState([]);
  

  const handleArrowClicked = (rowIndex) => {
    const tableRowsCopy = [ ...tableRows ];
    tableRowsCopy[rowIndex].showDonors = !tableRowsCopy[rowIndex].showDonors;
    setTableRows(tableRowsCopy);
  };

  const handleDeleteAppointments = ({time}) => {
    deleteTimeAppointments(date, time);
    // Show a successfully/unsuccessfully appointment deletion alert
  };
  

  const headerFields = [
    t('onAirDonations.time'),
    t('onAirDonations.totalSlots'),
    t('onAirDonations.occupied')
  ];

  const getDateAppointmentsTableRows = () => {
    const rows = [];
    for (let [time, appointments] of dateAppointments) {
      const occupied = appointments.filter(({userID}) => userID);
      
      rows.push({
        key: time,
        fields: [
          time,
          appointments.length,
          occupied.length
        ],
        occupied: occupied,
        showDonors: false
      });
    }

    return rows
  };

  useEffect(() => {
    setTableRows(getDateAppointmentsTableRows());
  }, [dateAppointments]);

  return (
    <table className="onAirTable">
      <thead>
        <tr className="onAirHeadRow">
          {headerFields.map(field => (
            <th key={field} className="onAirHeadField">{field}</th>
          ))}
          <th key="arrows" className="arrowField">{""}</th>
        </tr>
      </thead>
      <tbody>
        {tableRows ? tableRows.map((rowFields, rowIndex) => (
          <Fragment key={rowFields.key}>
            <tr key={rowFields.key} className="onAirRow">
              {rowFields.fields.map((field, index) => (
                <td key={headerFields[index]} className="onAirRowField">{field}</td>
              ))}
              <td key="details" className="arrowField">
                <img 
                  className="arrowButton" 
                  src={rowFields.showDonors ? collapse : expand } 
                  onClick={() => handleArrowClicked(rowIndex)}
                />
              </td>
            </tr>
            { rowFields.showDonors ?
            <tr key={`donors${rowFields.key}`}>
              <td className="donors" colSpan={rowFields.fields.length}>
                {rowFields.occupied.map(donation => 
                  <div key={donation.userID} className="donorItem">
                    <span className="donorField">
                      {t('onAirDonations.donor')}:
                    </span>
                    
                      <span className="donorField">{usersMap[donation.userID]?.name}</span> 
                      <span className="donorField">{usersMap[donation.userID]?.phone}</span>
                      <span className="donorField">{donation.confirmArrival 
                        ? <span className="verified">{t('onAirDonations.verified')}</span> 
                        : <span className="notVerified">
                            {t('onAirDonations.notYet')} {t('onAirDonations.verified')}
                          </span>
                      }</span>
                    
                  </div>
                )}
                <YesNoPopUp text={t('onAirDonations.sureDeleteAppointment')} handleYes={handleDeleteAppointments} time={rowFields.key}>
                  <button className="deleteButton"> {t('onAirDonations.deleteAppointment')}</button>
                </YesNoPopUp>
              </td>
            </tr>
            : null }
          </Fragment>
        )) : null}
      </tbody>
    </table>
  )
}
