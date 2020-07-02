import React from 'react'
import Button from '../button'
import './verificationList.css'
import { Link } from 'react-router-dom'
import Popup from "reactjs-popup";
import BookTaxi from '../BookTaxi/BookTaxi'

import { MDBIcon, MDBBtn } from "mdbreact";

const VerificationList = () => {
    const backArrow = "/img/back-button-white.svg"
    return (
        <div>
            <div className="introContainer">

                <MDBIcon icon="check-circle" className="checkIcon" size="4x" />

                <p id="firstHeader">You have been registered successfully ! </p>

                <p id="secondHeader">Thanks, we're expecting you at <b>{localStorage.getItem('appointmentTime')} </b> on the <b>{localStorage.getItem('appointmentDate')}</b> at <b> {localStorage.getItem('hospital')} Hospital</b> </p>
            </div>



            <h2 id="forgetText" ><b>Don't Forget to</b></h2>


            <ul className="bringList">

                <li id="toBring">Bring your ID with you</li>

                <li id="toBring" >Eat some fruit/snack (but not a fatty one)</li>

                <li id="toBring">Drink some water</li>


            </ul>

            <Link id="link" to="/dashboard">
                <button className="dashboardButton">Dashboard</button>
            </Link>

            <p id="footer">Need a ride for your visit to the hospital ?</p>

            <div className="my-4">
                <Popup className="popup1" trigger={<div className="bookTaxiButtonContainer">
                    <button className="bookTaxiButton">
                    <img src={backArrow} id="backArrowVer" />
                    <span id="BookTaxiSpan">Order a ride now </span>
                    </button>
                    
                </div>} modal position="left top" closeOnDocumentClick>
                    {close => <BookTaxi close={close} />}
                </Popup>
            </div>




        </div>
    )
}

export default VerificationList
