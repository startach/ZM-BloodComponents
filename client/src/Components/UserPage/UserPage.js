import React from 'react'
import "./UserPage.css"
import Notifications from '../Notifications/Notifications.js'

export default function UserPage() {
    return (
        <div className="userPage">

            <div className="title">User Page</div>
            <div className="line1"></div>
            <div className="topBox">
                <div className="name topBox-right">Dvir Cohen</div>
                <div className="topBox-right">
                    <span className="bloodType">Blood Type:</span>
                    <span>B-</span></div>
            </div>

            <div className="line2"></div>


            <div className="userDetails">
                <div className="dataItem">
                    <div className="icon"><i className="far fa-envelope"></i></div>
                    <div className="data">dvir@gmail.com</div>
                    <div className="editBtn">Edit</div>
                </div>
                <div className="dataItem">
                    <div className="icon"><i className="fas fa-phone"></i></div>
                    <div className="data">972-53-01243567</div>
                    <div className="editBtn">Edit</div>
                </div>
                <div className="dataItem">
                    <div className="icon"><i className="fas fa-home"></i></div>
                    <div className="data">123 Main St, Haifa, Isreal</div>
                    <div className="editBtn">Edit</div>
                </div>


                <Notifications />

            </div>




        </div>

    )
}

