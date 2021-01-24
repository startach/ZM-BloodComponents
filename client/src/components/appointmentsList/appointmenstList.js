import React from 'react'
import './appointmentsList.css'

import {useTranslation} from 'react-i18next';

const AppointmentList = () => {
    const { t } = useTranslation();

    return (
        <ul className="appHeaderRow">
            <li className="appHeaderEntries" key="Date">{t('general.date')}</li>
            <li className="appHeaderEntries" key="Time">{t('dashboard.Time')}</li>
            <li className="appHeaderEntries" key="Location">{t('dashboard.Location')} </li>
        </ul>
    )
}

export default AppointmentList
