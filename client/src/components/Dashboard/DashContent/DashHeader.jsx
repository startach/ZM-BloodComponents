import React from 'react';
import "../dashboard.css";
import "./dashHeader.css";
import dbIcon from '../dbIcon.svg';
import FirstAppointmentIntro
  from './Header/FirstAppointment/FirstAppointmentIntro';
import TomorrowAppointment
  from './Content/TomorrowAppointment/TomorrowAppointment';
import LastMonthAppointment
  from './Content/LastMonthAppointment/LastMonthAppointment';
import GeneralAppointment from './Content/General/GeneralAppointment';

export default function DashHeader(props) {
    const {t, userName, pastAppointments, appointmentLastMonth, nextAppointments, handleViewDates, haveAppointmentTomorrow} = props;
    
    const appointmentsCount = pastAppointments.length;
    const haveFutureAppointment = nextAppointments.length;

    return (
        <div>
            <img src={dbIcon} alt="db"/>
            <div className="highlight pageTitle">{t('general.Thrombocytes')}</div>
            { !appointmentsCount && !haveFutureAppointment ? <FirstAppointmentIntro t={t} userName={userName}/> : 
                haveAppointmentTomorrow ? <TomorrowAppointment t={t} userName={userName} nextAppointments={nextAppointments}/> :  
                    appointmentLastMonth ? <LastMonthAppointment t={t} userName={userName} appointment={appointmentLastMonth} pastAppointments={pastAppointments} appointmentsCount={appointmentsCount} handleViewDates={handleViewDates}/>: 
                        <GeneralAppointment t={t} userName={userName} pastAppointments={pastAppointments} appointmentsCount={appointmentsCount} haveFutureAppointment={haveFutureAppointment}/>   
            }
        </div>
    )
} 