import React, {useState} from 'react';
import "../../../dashboard.css";
import Button from '../../../../button';
import {Check2} from 'react-bootstrap-icons';
import {updateAppointment} from '../../../../../services/appointmentService';

export default function TomorrowAppointment(props) {
    const {t, userName, nextAppointments} = props;
    const haveFutureAppointment = nextAppointments.length; 
    const [arrivalVerified, setArrivalVerified] = useState(haveFutureAppointment && nextAppointments[0].confirmArrival);

    const handleVerifiyArrival = () => {
        updateAppointment(nextAppointments[0].id, {
            confirmArrival: true
        });
        setArrivalVerified(true);
    }

    return (
        <div>
            <div className="pinkBox">
                {t('dashboard.hello')} <span className="highlight">{userName}</span>,
                {` ${t('dashboard.appointmentTomorrow')} ${t('dashboard.lookingForward')}`}
            </div>
            {
                !arrivalVerified ? 
                <Button text={t('dashboard.verifyArrival')} marginTop={20} onClick={handleVerifiyArrival}/> :
                <div><Check2 color="green"/> {t('dashboard.arrivalConfirmed')}</div>
            }
        </div>
    )
} 