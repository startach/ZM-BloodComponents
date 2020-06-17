import React from 'react'
import NotificationOptions from '../Notifications/NotificationOptions'
import './Notifications.css'

export default function Notifications() {
    return (
        <div>
            <div className="notificationTitle">Notification Prefences</div>
            <div className="notifications">
                <span className="notifiedText">I want to get notified on:</span>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1"><b>Emergency request that I am suitable to answer</b></label>
                    <NotificationOptions />
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1"><b>Casual reminders calling me to donate</b></label>
                    <NotificationOptions />
                </div>
            </div>
        </div>
    )
}
