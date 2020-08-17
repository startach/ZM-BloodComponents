import React, { useState } from 'react';
import "../../../dashboard.css";

export default function GeneralAppointment(props) {
    const {t, pastAppointments, appointmentsCount, haveFutureAppointment} = props;

    return (
        <div className="pinkBox">
            {appointmentsCount > 0 ? `${t('dashboard.lastDonation')} ${pastAppointments[appointmentsCount - 1]}. ` :  undefined }
                {t('dashboard.youAre')} <span className="highlight"> {t('dashboard.eligible')} </span>
                {t('dashboard.toDonate')} {haveFutureAppointment ? t('dashboard.fewDetails') : t('dashboard.scheduleAppointment')}
        </div>
    )
} 