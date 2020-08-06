import React, { useState } from 'react';
import "../dashboard.css";
import "../DashHeader/dashHeader.css";
import dbIcon from '../dbIcon.svg';
import Button from '../../button';
import { Check2 } from 'react-bootstrap-icons';

export default function DashHeader(props) {
    const {t, userName, pastAppointments, appointmentLastMonth, nextAppointments, handleViewDates, haveAppointmentTomorrow} = props;
    const appointmentsCount = pastAppointments.length;
    const [viewDates, setViewDates] = useState(false);
    const [arrivalVerified, setArrivalVerified] = useState(false);

    const handleViewDatesClick = () => {
        setViewDates(true);
        handleViewDates();
    }

    const handleVerifiyArrival = () => {
        setArrivalVerified(true);
    }

    return (
        <div>
            <img src={dbIcon} />
            <div className="highlight pageTitle">{t('general.Thrombocytes')}</div>
            <div id="introSpan" className="introSpan pinkBox">
                {t('dashboard.hello')} <span className="highlight">{userName}</span>,
                { appointmentsCount === 0 ? <span>{t('dashboard.intro')}</span> : 
                    <span>
                        {t('dashboard.youDonated')} <b>{appointmentsCount}</b> {t('dashboard.donationTimes')}. {t('dashboard.wonderful')}
                    </span>
                }
            </div>
            <div className="pinkBox">
            {haveAppointmentTomorrow ? `${t('dashboard.appointmentTomorrow')} ${t('dashboard.lookingForward')}` :  
                (appointmentsCount > 0) ? `${t('dashboard.lastDonation')} ${pastAppointments[appointmentsCount - 1]}. ` :  undefined }
            {appointmentLastMonth ? `${t('dashboard.waitOneMonth')}` : 
                !haveAppointmentTomorrow && 
                <div>
                    {t('dashboard.youAre')} <span className="highlight"> {t('dashboard.eligible')} </span>
                    {t('dashboard.toDonate')} {nextAppointments.length > 0 ? t('dashboard.fewDetails') : t('dashboard.scheduleAppointment')}
                </div> 
            }
            </div>
            { haveAppointmentTomorrow ? 
                ( !arrivalVerified ? 
                    <Button text={t('dashboard.verifyArrival')} marginTop={20} onClick={handleVerifiyArrival}/> :
                    <div><Check2 color="green"/> {t('dashboard.arrivalConfirmed')}</div> ) :
                appointmentLastMonth && 
                    <div>
                        <Button text={t('dashboard.remindMe')} marginTop={20}/>
                        { !viewDates && 
                            <Button text={t('dashboard.viewAvailableAppiontments')} marginTop={20} onClick={handleViewDatesClick}/> }
                    </div> 
            }
        </div>
    )
} 