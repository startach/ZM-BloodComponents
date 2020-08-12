import React, { useState } from 'react';
import "../../../dashboard.css";
import Button from '../../../../button';

export default function LastMonthAppointment(props) {
    const {t, pastAppointments, appointmentsCount, handleViewDates} = props;
    const [viewDates, setViewDates] = useState(false);

    const handleViewDatesClick = () => {
        setViewDates(true);
        handleViewDates();
    }

    return (
        <div>
            <div className="pinkBox">
            {appointmentsCount > 0 ? `${t('dashboard.lastDonation')} ${pastAppointments[appointmentsCount - 1]}. ` :  undefined }
            {t('dashboard.waitOneMonth')}
            </div>
            <div>
                <Button text={t('dashboard.remindMe')} marginTop={20}/>
                { !viewDates && 
                    <Button text={t('dashboard.viewAvailableAppiontments')} marginTop={20} onClick={handleViewDatesClick}/> }
            </div> 
        </div>
    )
} 