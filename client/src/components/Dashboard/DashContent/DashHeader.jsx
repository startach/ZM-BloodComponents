import React from 'react';
import "../dashboard.css";
import "./dashHeader.css";
import dbIcon from '../dbIcon.svg';
import FirstAppointmentIntro from './Header/FirstAppointment/FirstAppointmentIntro';
import HaveAppointmentsIntro from './Header/FutureAppointment/HaveAppointmentsIntro';
import TomorrowAppointment from './Content/TomorrowAppointment/TomorrowAppointment';
import LastMonthAppointment from './Content/LastMonthAppointment/LastMonthAppointment';
import GeneralAppointment from './Content/General/GeneralAppointment';

export default function DashHeader(props) {
    const {t, userName, pastAppointments, appointmentLastMonth, nextAppointments, handleViewDates, haveAppointmentTomorrow} = props;
    
    const appointmentsCount = pastAppointments.length;
    const haveFutureAppointment = nextAppointments.length;

    return (
        <div>
            <img src={dbIcon} />
            <div className="highlight pageTitle">{t('general.Thrombocytes')}</div>
            { appointmentsCount === 0 ? 
                <FirstAppointmentIntro t={t} userName={userName}/> : <HaveAppointmentsIntro t={t} userName={userName} appointmentsCount={appointmentsCount}/>
            }
            {haveAppointmentTomorrow ? <TomorrowAppointment t={t} nextAppointments={nextAppointments}/> :  
                appointmentLastMonth ? <LastMonthAppointment t={t} appointment={appointmentLastMonth} pastAppointments={pastAppointments} appointmentsCount={appointmentsCount} handleViewDates={handleViewDates}/>: 
                    <GeneralAppointment t={t} pastAppointments={pastAppointments} appointmentsCount={appointmentsCount} haveFutureAppointment={haveFutureAppointment}/>   
            }
        </div>
    )
} 