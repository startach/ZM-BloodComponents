import React, { useState } from 'react'
import Button from '../button'
import './verificationList.css'
import { Link } from 'react-router-dom'
import Popup from "reactjs-popup";
import BookTaxi from '../BookTaxi/BookTaxi'

import { MDBIcon, MDBBtn } from "mdbreact";
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const VerificationList = () => {
    const backArrow = "/img/back-button-white.svg"
    const { t } = useTranslation();

    let [bookingData, setBookingData] = useState(false)
    let [rideBooked, setRideBooked] = useState(false)

    return (
        <div>
            <div className="introContainer">

                <MDBIcon icon="check-circle" className="checkIcon" size="4x" />

                <p id="firstHeader">{t('verificationList.registeredSuccesfully')} ! </p>

                <p id="secondHeader">{t('verificationList.expectingYou')} <b>{localStorage.getItem('appointmentTime')} </b> {t('verificationList.onThe')} <b>{localStorage.getItem('appointmentDate')}</b> {t('verificationList.at')} <b> {localStorage.getItem('hospitalLang')} {t('verificationList.hospital')}</b> </p>
            </div>



            <h2 id="forgetText" ><b>{t('verificationList.dontForget')}</b></h2>


            <ul style={{ textAlign: (localStorage.getItem('i18nextLng') === 'en') ? 'left' : 'right' }} className="bringList">

                <li id="toBring">{t('verificationList.bringId')}</li>

                <li id="toBring" >{t('verificationList.eatSome')}</li>

                <li id="toBring">{t('verificationList.drinkSome')}</li>


            </ul>

            <Link id="link" to="/dashboard">
                <button className="confirmButton">{t('verificationList.confirm')}</button>
            </Link>

            <p id="footer">{t('verificationList.needARide')} ?</p>

            <div className="my-4">
                <Popup className="popup1" trigger={<div className="bookTaxiButtonContainer">
                    <button className="bookTaxiButton">
                        <img src={backArrow} id="backArrowVer" />
                        <span id="BookTaxiSpan">{t('verificationList.orderRide')} </span>
                    </button>

                </div>} modal position="left top" closeOnDocumentClick>
                    {close => <BookTaxi close={close} bookingData={bookingData} setBookingData={setBookingData} rideBooked={rideBooked} setRideBooked={setRideBooked} />}
                </Popup>
            </div>




        </div>
    )
}

export default VerificationList
