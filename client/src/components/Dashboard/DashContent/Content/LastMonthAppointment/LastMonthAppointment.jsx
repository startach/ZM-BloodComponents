import React, { useState } from 'react';
import "../../../dashboard.css";
import Button from '../../../../button';
import ConfirmDonation from '../ConfirmDonation/ConfirmDonation';

export default function LastMonthAppointment(props) {
    const {t, userName, appointment, pastAppointments, appointmentsCount, handleViewDates} = props;
    const [viewDates, setViewDates] = useState(false);
    const [confirmLastAppointment, setConfirmLastAppointment] = useState(false);

    const handleViewDatesClick = () => {
        setViewDates(true);
        handleViewDates();
    }

    const handleConfirmLastAppointment = () => {
        setConfirmLastAppointment(true);
    }

    return (
        <div>
            {appointment.hasDonated === null && !confirmLastAppointment ? 
                <ConfirmDonation t={t} userName={userName} appointment={appointment} appointmentDate={pastAppointments[appointmentsCount - 1]} onConfirm={handleConfirmLastAppointment}/>
                :
                <div>
                    <div className="pinkBox">
                    {t('dashboard.hello')} <span className="highlight">{userName}</span>,
                    {appointmentsCount > 0 && ` ${t('dashboard.lastDonation')} ${pastAppointments[appointmentsCount - 1]}. ` }
                    {t('dashboard.waitOneMonth')}
                    </div>
                    <div>
                        {/* <Button text={t('dashboard.remindMe')} marginTop={20}/> */}
                        { !viewDates && 
                            <Button text={t('dashboard.viewAvailableAppiontments')} marginTop={20} onClick={handleViewDatesClick}/> }
                    </div> 
                </div>
            }
            
        </div>
    )
} 