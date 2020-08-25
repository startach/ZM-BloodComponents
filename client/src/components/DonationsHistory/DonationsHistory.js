import React, { useRef, useState, useEffect, Fragment } from 'react';
import "./DonationsHistory.css";
import { db, auth } from '../firebase/firebase';
import { useHistory, Redirect } from 'react-router-dom';
import Popup from "reactjs-popup";
import i18next from 'i18next';
import Table from "../Table/Table";
import Button from '../button'

export default function DonationsHistory(props) {
  const { t, userId, editableMode } = props;

  const [appointments, setAppointments] = useState([]);
  const [reload, setReload] = useState(false);

  const history = useHistory();
  const loggedUser = localStorage.getItem("userid");

  if (!loggedUser)
    history.push("/login");

  const loadAppointments = () => {
    const today = Date.now() / 1000;
    const filteredQuery = db
      .collection("Appointments")
      .where("userID", "==", userId);
  
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
        
        Appointments.sort(function (a, b) {
          a = new Date(a.timestamp.seconds);
          b = new Date(b.timestamp.seconds);
          return a > b ? -1 : a < b ? 1 : 0;
        });
        setAppointments(Appointments);
      })
      .catch((error) => {
        // Catch errors
      });
  };

  useEffect(() => {
    loadAppointments();
  }, [setAppointments]);

  const updateDonationHappened = (e) => {
    const appointmentId = e.target.id;
    db.collection('Appointments').doc(appointmentId).update({
      hasDonated: true
    });
    loadAppointments();
  };
  const updateDonationNotHappened = (e) => {
    const appointmentId = e.target.id;
    db.collection('Appointments').doc(appointmentId).update({
      hasDonated: false
    });
    loadAppointments();
  };

  const headerFields = [
      t('general.date'),
      t('general.hospital'),
      t('donationsHistory.verification')
  ];

  const appointmentsTableRows = appointments.map((appointment) => {
    const confirmArrivalField = appointment.hasDonated ? 
      t('general.Yes') 
    : (
      <div>
        {t('donationsHistory.notYet')}
        <br />
        {editableMode ? (
          // Change later to yesno popup
          <Popup
            trigger={
              <button className="detailsButton">
                {t('donationsHistory.verify')}
              </button>
            }
            modal 
            position="left top" 
            closeOnDocumentClick
          >
            {close => (
              <div>
                <h3>{t('donationsHistory.donationHappened')}</h3>
                <div className="actions">
                  <button
                    id={appointment.id}
                    className="yesButton"
                    onClick={(e) => {
                      updateDonationHappened(e);
                      close();
                    }}>
                      {t('general.Yes')}
                  </button>
                  <button
                    id={appointment.id}
                    className="noButton"
                    onClick={(e) => {
                      updateDonationNotHappened(e);
                      close();
                    }}>
                      {t('general.No')}
                  </button>
                </div>
              </div>
            )}
          </Popup>
        ): null }
      </div>
    );

    return ({
      key: appointment.id,
      fields: [
        appointment.date,
        appointment.hospitalName,
        confirmArrivalField
      ]
    })
  });

  return (
    <div>
      <h2>{t('donationsHistory.donationsHistory')}</h2>
      <span>{t('donationsHistory.totalDonations')}: {appointments.length}</span>
      <Table 
        headerFields={headerFields} 
        rowsFields={appointmentsTableRows} 
      />
    </div>
  )
}