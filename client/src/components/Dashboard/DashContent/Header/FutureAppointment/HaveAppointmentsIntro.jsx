import React from 'react';
import "../../../dashboard.css";

export default function HaveAppointmentsIntro(props) {
    const {t, userName, appointmentsCount} = props; 

    return (
        <div>
            <div id="introSpan" className="introSpan pinkBox">            
                {t('dashboard.hello')} <span className="highlight">{userName}</span>,
                <span>
                    {t('dashboard.youDonated')} <b>{appointmentsCount}</b> {t('dashboard.donationTimes')}. {t('dashboard.wonderful')}
                </span>
            </div>
        </div>
    )
} 