import React from 'react'
import './Notifications.css'

export default function NotificationOptions() {
    return (
        <div className="options">
            <span className="comment">please select all methods you are happy to be contacted by:</span>
            <div className="notificationOptions">

                <div >
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">SMS</label>
                </div>
                <div>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Whatsapp</label>
                </div>
                <div>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Phonecall</label>
                </div>
                <div>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Email</label>
                </div>
                <div>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">In-App alert</label>
                </div>
            </div>
        </div>
    )
}
