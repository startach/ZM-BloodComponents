import React from 'react'
import { Link } from 'react-router-dom'
import { updateAppointment } from '../../../services/appointmentService';
import { getHospitalLangName } from '../../../utils/enums/hospitals';
import moment from 'moment';
import YesNoPopUp from '../../PopUp/YesNoPopUp/YesNoPopUp';
import "../dashboard.css";

export default function AppointmentsTable(props) {
    const { t, appointments, withActions } = props;  
    let appointmentDate = null;
    let appointmentTime = null; 

    const deleteAppointment = ({appId}) => {
        updateAppointment(appId, {
          userID: null,
          confirmArrival: false
        });
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
            {appointments.map(appointment => {
                appointmentDate = moment(appointment.datetime.toMillis()).format('DD/MM/YY');
                appointmentTime = moment(appointment.datetime.toMillis()).format('HH:mm');

                return (
                <tr className='rowContainer' id={appointment.id}>
                  <td className='rowClass'>{getHospitalLangName(appointment.hospitalID)}</td>
                  <td className='rowClass' >{appointmentDate}</td>
                  <td className='rowClass' >{appointmentTime}</td>
                  { withActions && 
                  <td className='rowClass'>
                      { appointment.userID ?
                      <YesNoPopUp text={t('dashboard.deleteAppointment')} handleYes={deleteAppointment} appId={appointment.id}>
                          <button className="cancelButton"> {t('dashboard.Cancel')}</button>
                      </YesNoPopUp> : 
                      <Link to={{
                        pathname: '/questions', 
                        state: {
                          hospitalID: appointment.hospitalID,
                          appointmentID: appointment.id,
                          appointmentDate: appointmentDate,
                          appointmentTime: appointmentTime
                        }}} >
                        <button id={appointment.id} className="registerButton">{t('general.Register')}</button>
                      </Link> }
                  </td> 
                  }   
                </tr>
                )}
              )}
          </table>
    )
}
