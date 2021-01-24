import React, {useEffect, useState} from 'react'
import "./UserPage.css"
import UserDetails from '../UserDetails/UserDetails';
import DonationsHistory from "../DonationsHistory/DonationsHistory";
import {db} from "../firebase/firebase";
import {useHistory} from "react-router-dom";
import Popup from "reactjs-popup";
import userProfile from "./userProfile.svg";
import {useTranslation} from "react-i18next";
import {getAppointmentsForUser} from "../../services/appointmentService";

export default function UserPage({ userId }) {
  const { t } = useTranslation();

  // State for user
  const [userDetails, setUserDetails] = useState({});
  const [donationsNumber, setDonationsNumber] = useState(0);

  //state for if addtional options are visable or not, set by checkbox click
  const [visible, setVisible] = useState({
    emergency: false,
    casual: false,
  });

  const [notificationsChosen, setNotificationsChosen] = useState({});

  // Get user id from props if exists, else get from localstorage
  const id = userId ? userId : localStorage.getItem("userid");
  const languageSelected = localStorage.getItem("i18nextLng");
  const history = useHistory();

  useEffect(() => {
    //if user has no id (is not logged in) then forward to log in screen
    if (!localStorage.getItem("userid")) history.push("/login");

    db.collection("users")
      .doc(id)
      .onSnapshot(
        (snapshot) => {
          setUserDetails(snapshot.data());
        },
        (error) => {
          console.log("Error getting user details");
        }
      );
  }, []);

  // Shouldn't be here - fix when doing services
  useEffect(() => {
    const today = Date.now() / 1000;
    const filteredQuery = getAppointmentsForUser(id);

    filteredQuery
      .get()
      .then((querySnapshot) => {
        const Appointments = [];
        querySnapshot.docs.forEach((hospitalAppointment) => {
          const appDate = hospitalAppointment.data().datetime.seconds;
          if (appDate < today && hospitalAppointment.data().hasDonated !== false) {
            Appointments.push({ ...hospitalAppointment.data(), id: hospitalAppointment.id });
          }
        });

        setDonationsNumber(Appointments.length);
      })
      .catch((error) => {
        // Catch errors
      });
    }, [setDonationsNumber]);

  return (
    <div className="userPage">
      <div className="userImage">
        <img src={userProfile} />
      </div>

      {/* Similar to dashboard, consider Later, plus fix ltr/rtl */}
      <div className="introSpan pinkBox">
        {t("dashboard.hello")}{" "}
        <span className="highlight">{userDetails.name}</span>,
        <br />
        {!donationsNumber ? (
          <span> {t("dashboard.intro")} </span>
        ) : (
          <div>
            <span>
              {t("dashboard.youDonated")} <b>{donationsNumber}</b>{" "}
              {t("dashboard.donationTimes")}.
              <br />
              {t("dashboard.wonderful")}
            </span>
            <br />
            <Popup
              trigger={
                <button className="detailsButton">
                  {t("userProfile.seeHistory")}
                </button>
              }
              modal
              closeOnDocumentClick
              contentStyle={{ width: "80vw" }}
            >
              {(close) => (
                <div style={{ maxHeight: "70vh", overflow: "scroll" }}>
                  <DonationsHistory t={t} userId={id} editableMode={true} />
                </div>
              )}
            </Popup>
          </div>
        )}
      </div>

      <UserDetails
        t={t}
        userId={id}
        userDetails={userDetails}
        editableMode={true}
      />

      <br />
      {/* **************** hide notification preference until further notice****************** */}
      {/* Consider seperate to notifications component */}
      {/* <div className="notificationTitle ma3">
      </div>


      <NotificationOptions
        notifications={userDetails.casualNotifications}
        chooseNotification={(type) => {
          if (notificationsChosen[type]) {
            const prevChoice = notificationsChosen[type]
            setNotificationsChosen({ ...notificationsChosen, [type]: !prevChoice })
          } else {
            setNotificationsChosen({ ...notificationsChosen, [type]: true })
          }
        }} /> */}
    </div>
  );
}
