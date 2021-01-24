import React from 'react';
import {Link} from 'react-router-dom';
import "../../../dashboard.css";
import Button from '../../../../button';
import {updateAppointment} from '../../../../../services/appointmentService';

export default function ConfirmDonation(props) {
    const {t, userName, appointment, appointmentDate, onConfirm} = props;

    const handleConfirmDonation = (hasDonated) => {
        updateAppointment(appointment.id, {
            hasDonated: hasDonated
          });

          onConfirm();
    }

    return (
        <div>
            <div className="pinkBox">
            {t('dashboard.hello')} <span className="highlight">{userName}</span>,
            {` ${t('dashboard.lastDonation')} ${appointmentDate}. ${t('dashboard.confirmMadeDonation')}`}
            </div>
            <div>
                <Link to='/dashboard'>
                    <Button text={t('dashboard.madeDonation')} marginTop={20} onClick={() => handleConfirmDonation(true)}/>
                    <Button text={t('dashboard.notMadeDonation')} marginTop={20} onClick={() => handleConfirmDonation(false)}/>
                </Link>
            </div> 
        </div>
    )
} 