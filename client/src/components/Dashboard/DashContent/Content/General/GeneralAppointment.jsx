import React from 'react';
import "../../../dashboard.css";

export default function GeneralAppointment(props) {
    const {t, userName, pastAppointments, appointmentsCount, haveFutureAppointment} = props;

    return (
        <div className="pinkBox">
            {t('dashboard.hello')} <span className="highlight">{userName}</span>, {appointmentsCount > 0 && `${t('dashboard.lastDonation')} ${pastAppointments[appointmentsCount - 1]}. ${t('dashboard.ThankYou')} ` }
            {haveFutureAppointment ? t('dashboard.fewDetails') : t('dashboard.scheduleAppointment')}
        </div>
    )
} 