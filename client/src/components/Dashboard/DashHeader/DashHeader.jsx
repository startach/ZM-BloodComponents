import React, { Component } from 'react';
import "../dashboard.css";
import "../DashHeader/dashHeader.css";
import dbIcon from '../dbIcon.svg';

export default function DashHeader(props) {
    const {t, userName, pastAppointments, appointmentLastMonth, nextAppointments} = props;

    return (
        <div>
            <img src={dbIcon} />
            <div className="highlight pageTitle">{t('general.Thrombocytes')}</div>
            <div id="introSpan" className="introSpan pinkBox">
                {t('dashboard.hello')} <span className="highlight">{userName}</span>,
                { !pastAppointments ? <span>{t('dashboard.intro')}</span> : 
                    <span>
                        {t('dashboard.youDonated')} <b>{pastAppointments}</b> {t('dashboard.donationTimes')}. {t('dashboard.wonderful')}
                    </span>
                }
            </div>
            <div className="pinkBox">
            { appointmentLastMonth ? `${t('dashboard.lastDonation')} ${appointmentLastMonth}. ${t('dashboard.waitOneMonth')}` : 
            <div>
                {t('dashboard.youAre')} <span className="highlight"> {t('dashboard.eligible')} </span>
                {t('dashboard.toDonate')} {nextAppointments.length > 0 ? t('dashboard.fewDetails') : t('dashboard.scheduleAppointment')}
            </div> 
            }
            </div>
        </div>
    )
} 