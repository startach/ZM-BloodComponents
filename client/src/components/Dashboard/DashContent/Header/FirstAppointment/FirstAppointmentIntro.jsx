import React, { useState } from 'react';
import "../../../dashboard.css";

export default function FirstAppointmentIntro(props) {
    const {t, userName} = props;

    return (
        <div>
            <div id="introSpan" className="introSpan pinkBox">
                {t('dashboard.hello')} <span className="highlight">{userName}</span>,
                <span>{t('dashboard.intro')}</span>
            </div>
        </div>
    )
} 