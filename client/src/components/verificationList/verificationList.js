import React, { useState } from 'react'
import './verificationList.css'
import { Link, useLocation } from 'react-router-dom'
import Popup from "reactjs-popup";
import BookTaxi from '../BookTaxi/BookTaxi'
import { MDBIcon } from "mdbreact";
import { useTranslation } from 'react-i18next';
import { getHospitalLangName } from '../../utils/enums/hospitals';

const VerificationList = () => {
    const backArrow = "/img/back-button-white.svg"
    const { t } = useTranslation();
    const [bookingData, setBookingData] = useState(false);
    const [rideBooked, setRideBooked] = useState(false);

    const location = useLocation();
    const { appointmentDate, appointmentTime, hospitalID } = location.state;
    const hospitalName = getHospitalLangName(hospitalID);


    return (
        <div>
            <div className="introContainer">
                <MDBIcon icon="check-circle" className="checkIcon" size="4x" />
                <p id="firstHeader">{t('verificationList.registeredSuccesfully')} ! </p>
                <p id="secondHeader">{t('verificationList.expectingYou')} 
                    <b> {appointmentTime} </b> {t('verificationList.onThe')} <b>{appointmentDate}</b> {t('verificationList.at')} 
                    <b> {hospitalName} {t('verificationList.hospital')}</b> 
                </p>
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
            {/* <p id="footer">{t('verificationList.needARide')} ?</p>
            <div className="my-4">
                <Popup className="popup1" trigger={<div className="bookTaxiButtonContainer">
                    <button className="bookTaxiButton">
                        <img src={backArrow} id="backArrowVer" />
                        <span id="BookTaxiSpan">{t('verificationList.orderRide')} </span>
                    </button>

                </div>} modal position="left top" closeOnDocumentClick>
                    {close => <BookTaxi close={close} bookingData={bookingData} setBookingData={setBookingData} rideBooked={rideBooked} setRideBooked={setRideBooked} />}
                </Popup>
            </div> */}
        </div>
    )
}

export default VerificationList;
