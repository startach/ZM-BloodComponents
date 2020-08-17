import React, { useRef, useState, useEffect, Fragment } from 'react'
import "./UserPage.css"
import NotificationOptions from '../Notifications/NotificationOptions'
import UserDetails from '../UserDetails/UserDetails';
import DonationsHistory from "../DonationsHistory/DonationsHistory";
import { db, auth } from '../firebase/firebase'
import { useHistory, Redirect } from 'react-router-dom'
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Popup from "reactjs-popup";
import userProfile from './userProfile.svg'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Button from '../button'

export default function UserPage({userId}) {

  const { t } = useTranslation();

  // State for user
  const [userDetails, setUserDetails] = useState({});
  const [donationsNumber, setDonationsNumber] = useState(0);

  //state for if addtional options are visable or not, set by checkbox click
  const [visible, setVisible] = useState({
    emergency: false,
    casual: false,
  });
  
  // Get user id from props if exists, else get from localstorage
  const id = userId ? userId : localStorage.getItem('userid');
  const languageSelected = localStorage.getItem('i18nextLng');
  const history = useHistory();

  useEffect(() => {
    //if user has no id (is not logged in) then forward to log in screen
    if (!localStorage.getItem('userid'))
      history.push('/login')

    db.collection('users').doc(id).onSnapshot(snapshot => {
      setUserDetails(snapshot.data())
    }, error => {
      console.log("Error getting user details")
    })
  }, []);

  // Shouldn't be here - fix when doing services
  useEffect(() => {
    const today = Date.now() / 1000;
    const filteredQuery = db
      .collection("Appointments")
      .where("userID", "==", id);
  
    filteredQuery
      .get()
      .then((querySnapshot) => {
        const Appointments = [];
        querySnapshot.docs.forEach((hospitalAppointment) => {
          let app = hospitalAppointment.data().timestamp.seconds;
          if (app < today) {
            Appointments.push({ ...hospitalAppointment.data(), id: hospitalAppointment.id });
          }
        });
        
        setDonationsNumber(Appointments.length);
      })
      .catch((error) => {
        // Catch errors
      });
    }, [setDonationsNumber]);

/*
  // in order to show updates to notifications methods without having to refresh the page
  const handleReload = () => {
    db.collection('users').doc(id).get()
      .then(snapshot => setUserDetails(snapshot.data()))
  };
*/
  return (
    <div className="userPage">
      <div className="userImage">
        <img src={userProfile} />
      </div>

      {/* Similar to dashboard, consider Later, plus fix ltr/rtl */}
      <div className="introSpan pinkBox">
        {t('dashboard.hello')} <span className="highlight">{userDetails.name}</span>,
        <br />
        {!donationsNumber ? (
          <span> {t('dashboard.intro')} </span> 
        ) : (
          <div>
            <span>
              {t('dashboard.youDonated')} <b>{donationsNumber}</b> {t('dashboard.donationTimes')}.
              <br />
              {t('dashboard.wonderful')}
            </span>
            <br />
            <Popup
              trigger={<button 
                  //id={id} 
                  className="detailsButton">
                    {t('userProfile.seeHistory')}
                </button>
              }
              modal 
              position="left top" 
              closeOnDocumentClick
            >
              {close => (
                <div style={{maxHeight: '70vh', overflow: 'scroll'}}>
                  <DonationsHistory t={t} userId={id} editableMode={true} />
                </div>
              )}
            </Popup>
          </div>
        )}
      </div>

      <UserDetails t={t} userId={id} userDetails={userDetails} editableMode={true} />

      <br />

      {/* Consider seperate to notifications component */}
      <div className="notificationTitle ma3">
        {t('userProfile.notificationPrefence')}
      </div>
        
      <div id={languageSelected === 'en' ? 'ltrNotificationContainer' : 'rtlNotificationContainer'} className="notifications ma0">
        <span className="notifiedText ma2">{t('userProfile.notifiedOn')}:</span>
        <div className="form-check dib mt3">
          <BootstrapSwitchButton
            onlabel={t('userProfile.hide')}
            onstyle='danger'
            offlabel={t('userProfile.show')}
            offstyle='success'
            width={75}
            onChange={() => {
              setVisible({ ...visible, ["emergency"]: !visible["emergency"] })
              //handleReload()
            }}
          />
          {t('userProfile.emergencyThatWilling')}
          {visible.emergency ? <NotificationOptions notifications={userDetails.emergencyNotifications} id='emergencyNotifications' /> : null}
        </div>
        <div className="form-check dib mt3">
          <BootstrapSwitchButton
            onlabel={t('userProfile.hide')}
            onstyle='danger'
            offlabel={t('userProfile.show')}
            offstyle='success'
            width={75}
            onChange={() => {
              setVisible({ ...visible, ["casual"]: !visible["casual"] })
              //handleReload()
            }}
          /> 
          {t('userProfile.casualreminder')}
          {visible.casual ? <NotificationOptions notifications={userDetails.casualNotifications} id='casualNotifications' /> : null}
        </div>
      </div>
      
    </div>
  )
}
