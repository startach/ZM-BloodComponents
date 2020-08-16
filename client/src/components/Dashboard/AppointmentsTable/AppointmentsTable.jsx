import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import YesNoPopUp from '../../PopUp/YesNoPopUp/YesNoPopUp';
import { updateAppointment } from '../../../services/appointmentService';
import "../dashboard.css";

export default function AppointmentsTable(props) {
    const { t, appointments, withActions } = props;   

    const deleteAppointment = ({appId}) => {
        updateAppointment(appId, {
          userID: null,
          confirmArrival: false
        });
    }
    
    const onPressRegisterAppointment = (hospitalID, appointmentID) => {
      localStorage.setItem('hospitalID', (hospitalID));
      localStorage.setItem('appointmentId', (appointmentID));
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
            {appointments.map(appointment => (
              <tr className='rowContainer' id={appointment.id}>
                <td className='rowClass'>{appointment.hospitalName}</td>
                <td className='rowClass' >{appointment.date}</td>
                <td className='rowClass'>{appointment.time}</td> 
                { withActions && 
                <td className='rowClass'>
                    { appointment.userID ?
                    <YesNoPopUp text={t('dashboard.deleteAppointment')} handleYes={deleteAppointment} appId={appointment.id}>
                        <button className="cancelButton"> {t('dashboard.Cancel')}</button>
                    </YesNoPopUp> : 
                    <Link to='/questions'>
                      <button onClick={() => onPressRegisterAppointment(appointment.hospitalID, appointment.id)} id={appointment.id} className="registerButton">{t('general.Register')}</button>
                    </Link> }
                </td> 
                }   
              </tr>
            ))}
          </table>
    )
}