import React from 'react';
import "../../../dashboard.css";
import Button from '../../../../button';
import { updateAppointment } from '../../../../../services/appointmentService';

export default function ConfirmDonation(props) {
    const {t, appointment, appointmentDate, onConfirm} = props;

    const handleConfirmDonation = (hasDonated) => {
        updateAppointment(appointment.id, {
            hasDonated: hasDonated
          });

          onConfirm();
    }

    return (
        <div>
            <div className="pinkBox">
            {`${t('dashboard.lastDonation')} ${appointmentDate}. ${t('dashboard.confirmMadeDonation')}`}
            </div>
            <div>
                <Button text={t('dashboard.madeDonation')} marginTop={20} onClick={() => handleConfirmDonation(true)}/>
                <Button text={t('dashboard.notMadeDonation')} marginTop={20} onClick={() => handleConfirmDonation(false)}/>
            </div> 
        </div>
    )
} 