import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { updateAppointment } from '../../../services/appointmentService';
import { getHospitalLangName } from '../../../services/hospitalService';
import YesNoPopUp from '../../PopUp/YesNoPopUp/YesNoPopUp';
import "../dashboard.css";

export default function AppointmentsTable(props) {
    const { t, appointments, withActions } = props;   
    const [hospitalNameLang, setHospitalNameLang] = useState();

    ( appointments.length > 0 ) && getHospitalLangName(appointments[0].hospitalID).then(data => setHospitalNameLang(data));

    const deleteAppointment = ({appId}) => {
        updateAppointment(appId, {
          userID: null,
          confirmArrival: false
        });
    }
    
    const onPressRegisterAppointment = (appointment) => {
      localStorage.setItem('hospitalID', appointment.hospitalID);
      localStorage.setItem('appointmentId', appointment.id);
      localStorage.setItem('appointmentDate', appointment.date)
      localStorage.setItem('appointmentTime', appointment.time)
    }

    return (
        appointments.length > 0 &&
        <table className="schedulesTables">
            <tr className="headerRow">
              <th className="headerEntries"> {t('dashboard.Location')}</th>
              <th className="headerEntries"> {t('dashboard.date')}</th>
              <th className="headerEntries"> {t('dashboard.Time')}</th>
              { withActions && 
              <th className="headerEntries"></th> 
              }
            </tr>
            {appointments.map(appointment => 
              <tr className='rowContainer' id={appointment.id}>
                <td className='rowClass'>{hospitalNameLang}</td>
                <td className='rowClass' >{appointment.date}</td>
                <td className='rowClass'>{appointment.time}</td> 
                { withActions && 
                <td className='rowClass'>
                    { appointment.userID ?
                    <YesNoPopUp text={t('dashboard.deleteAppointment')} handleYes={deleteAppointment} appId={appointment.id}>
                        <button className="cancelButton"> {t('dashboard.Cancel')}</button>
                    </YesNoPopUp> : 
                    <Link to='/questions'>
                      <button onClick={() => onPressRegisterAppointment(appointment)} id={appointment.id} className="registerButton">{t('general.Register')}</button>
                    </Link> }
                </td> 
                }   
              </tr>
              )}
          </table>
    )
}
