import React, { useState } from 'react'
import NotificationOptions from '../Notifications/NotificationOptions'
import './Notifications.css'

export default function Notifications() {

    //state for if addtional options are visable or not, set by checkbox click
    const [visible, setVisible] = useState({
        emergency: false,
        casual: false,
    })

    return (
        <div>
            <div className="notificationTitle">Notification Prefences</div>
            <div className="notifications">
                <span className="notifiedText my-3">I want to get notified on:</span>
                <div className="form-check my-3">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={() => setVisible({ ...visible, ["emergency"]: !visible["emergency"] })} />
                    <label className="form-check-label" htmlFor="exampleCheck1"><b>Emergency request that I am suitable to answer</b></label>
                    {visible.emergency ? <NotificationOptions /> : null}
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={() => setVisible({ ...visible, ["casual"]: !visible["casual"] })} />
                    <label className="form-check-label" htmlFor="exampleCheck1"><b>Casual reminders calling me to donate</b></label>
                    {visible.casual ? <NotificationOptions /> : null}
                </div>
            </div>
        </div>
    )
}
