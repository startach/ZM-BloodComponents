import React, {Fragment, useEffect, useState} from "react";
import "./dashboard.css";
import "../appointmentsEntry/appointmentsEntry.css";
import {auth} from "../firebase/firebase";
import {useHistory} from "react-router-dom";
import Popup from "reactjs-popup";
import Button from "../button";
import DashHeader from "./DashContent/DashHeader";
import {getAllHospitals} from "../../services/hospitalService";
import {
  getAppointmentsForUser,
  getAvailableAppointmentsForHospital,
} from "../../services/appointmentService";
import {getUserById} from "../../services/userService";
import {useTranslation} from "react-i18next";
import googlemaps from "./googlemaps.png";
import waze from "./waze.png";
import moment from "moment";
import HospitalSelect from "../Select/HospitalSelect/HospitalSelect";
import AppointmentsTable from "./AppointmentsTable/AppointmentsTable";

function DashboardNoAppoin() {
  const { t } = useTranslation();
  const history = useHistory();

  const [hospitals, setHospitals] = useState([]);
  const [pastApp, setPastApp] = useState([]);
  const [appointmentLastMonth, setAppointmentLastMonth] = useState();
  const [bookingData, setBookingData] = useState(false);
  const [rideBooked, setRideBooked] = useState(false);
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [chosenHospital, setChosenHospital] = useState(null);
  const [userName, setUserName] = useState("");
  const [userAppointmentsDetails, setUserAppointmentsDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewDates, setViewDates] = useState(false);
  const [haveAppointmentTomorrow, setHaveAppointmentTomorrow] = useState(false);

  const handleHospitalChange = (e) => {
    const hospitalID = e.target.value; 
    setChosenHospital(hospitalID);
  }

  const handleViewDates = () => {
    setViewDates(true);
  };

  const setHospitalNames = () => {
    getAllHospitals().then((data) => {
      setHospitals(data)  
    })
  };

  const classifiyAppointment = (userAppointment) => {
    const appData = userAppointment.data();
    let appointmentDate = moment(appData.datetime.seconds * 1000);
    const today = moment();
    if (appointmentDate.isAfter(today)) {
      if (appointmentDate.diff(today, "day") === 1 && appointmentDate > today) {
        setHaveAppointmentTomorrow(true);
      }

      let appObj = { ...appData, ["id"]: userAppointment.id };
      setUserAppointmentsDetails((prev) => [...prev, appObj]);
    } else {
      if (appData.hasDonated !== false) {
        setPastApp((prev) => [...prev, appointmentDate.format("D.M")]);
        const monthAgo = moment(new Date());
        monthAgo.subtract(1, "month");
        if (appointmentDate > monthAgo) {
          setAppointmentLastMonth({ ...appData, ["id"]: userAppointment.id });
        }
      }
    }
  };

  useEffect(() => {
    //redirect user to login screen if he is not logged in
    if (!localStorage.getItem("userid")) {
      history.push("/login");
    } else {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userData = await getUserById(user.uid);
          setUserName(userData.data().name);
          setHospitalNames();

          getAppointmentsForUser(user.uid).onSnapshot((snapShot) => {
            if (snapShot.empty) {
              setIsLoading(false);
            } else {
              setUserAppointmentsDetails([]);
              setPastApp([]);
              snapShot.docs.map((userAppointment) => {
                classifiyAppointment(userAppointment);
              });

              if (!userAppointmentsDetails) {
                setHospitalNames();
              } else {
                //checkRideBooked(user.uid)
              }

              setIsLoading(false);
            }
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    //only run when hospital chosen
    if (chosenHospital) {
      const today = Date.now() / 1000;
      const filteredQuery = getAvailableAppointmentsForHospital(chosenHospital);
      filteredQuery.get()
        .then(querySnapshot => {
          const Appointments = []
          querySnapshot.docs.forEach(hospitalAppointments => {
            let app = hospitalAppointments.data().datetime.seconds;
            if (app > today) {
              let currentID = hospitalAppointments.id;
              let appObj = {
                ...hospitalAppointments.data(),
                ["id"]: currentID,
              };
              Appointments.push(appObj);
            }
          });
          Appointments.sort(function (b, a) {
            a = new Date(a.datetime.seconds);
            b = new Date(b.datetime.seconds);
            return a > b ? -1 : a < b ? 1 : 0;
          });
          setAvailableAppointments(Appointments);
        })
        .catch((error) => {
          // Catch errors
        });
    }
  }, [chosenHospital]);

  return (
    !isLoading && (
      <div className="dashboardView mt-3">
        {userAppointmentsDetails.length > 0 ? (
          <Fragment>
            <DashHeader
              t={t}
              userName={userName}
              pastAppointments={pastApp}
              appointmentLastMonth={appointmentLastMonth}
              nextAppointments={userAppointmentsDetails}
              haveAppointmentTomorrow={haveAppointmentTomorrow}
            />
            <AppointmentsTable
              t={t}
              appointments={userAppointmentsDetails}
              withActions={!viewDates}
            />
            <div className="bottomButtons">
              {/* <a target="_blank"
              href={`https://www.google.com/maps/search/?api=1&query=${localStorage.getItem('hospital').replace(/\s/g, '%')}%hospital`}
            ><Button type="button" text={t('dashboard.getDirections')} width="150px">
              </Button></a> */}
              <Popup
                className="popup3"
                trigger={
                  <Button
                    type="button"
                    text={t("dashboard.getDirections")}
                    width="150px"
                  ></Button>
                }
                modal
                position="left top"
                closeOnDocumentClick
              >
                {
                  <a
                    target="_blank"
                    href={`https://www.google.com/maps/search/?api=1&query=${localStorage
                      .getItem("hospital")
                      .replace(/\s/g, "%")}%20hospital`}
                  >
                    <img className="mapIcon" src={googlemaps} />
                  </a>
                }
                {
                  <a
                    target="_blank"
                    href={`https://www.waze.com/ul?q=${localStorage
                      .getItem("hospital")
                      .replace(/\s/g, "%")}%20hospital`}
                  >
                    <img className="mapIcon" src={waze} />
                  </a>
                }
              </Popup>
              {/* ********* hide book a taxi until further notice**** */}
              {/* <Popup className="popup1" trigger={bookingData ? <Button type="button" text={t('dashboard.rideDetails')} color='#C71585' width="150px"></Button> : <Button type="button" text={t('dashboard.orderTaxi')} color='#C71585' width="150px"></Button>} modal position="left top" closeOnDocumentClick>
              {close => <BookTaxi close={close} bookingData={bookingData} setBookingData={setBookingData} rideBooked={rideBooked} setRideBooked={setRideBooked} />}
            </Popup> */}
            </div>
          </Fragment>
        ) : (
          //no appointments
          <Fragment>
            <DashHeader
              t={t}
              userName={userName}
              pastAppointments={pastApp}
              appointmentLastMonth={appointmentLastMonth}
              nextAppointments={userAppointmentsDetails}
              handleViewDates={handleViewDates}
              haveAppointmentTomorrow={haveAppointmentTomorrow}
            />
            {(!appointmentLastMonth || viewDates) && (
              <div className="hospitalsOptionsContainer mt-3 pinkBox">
                <div className="hospital">
                  {t("dashboard.NearestHospital")}:{" "}
                </div>
                <div>
                  <HospitalSelect
                    t={t}
                    hospitals={hospitals}
                    handleHospitalChange={handleHospitalChange}
                  />
                </div>
              </div>
            )}
            <AppointmentsTable
              t={t}
              appointments={availableAppointments}
              withActions={!viewDates}
            />
          </Fragment>
        )}
      </div>
    )
  );
}

// //FIXME:
// const checkRideBooked = (userid) => {
//   db.collection('taxiBookings').where('user', '==', userid).get().then((bookings) => {
//     const bookingsMap = bookings.docs.map(bookingDetails => {
//       return bookingDetails.data()
//     })
//     setBookingData(bookingsMap[0])
//     bookingData ? setRideBooked(true) : setRideBooked(false)
//   })
// }

// const deleteRideFunc = (appId) => {
//   var deleteRide = db.collection('taxiBookings').where("appointmentID", "==", appId);
//   deleteRide.get().then(function (querySnapshot) {
//     querySnapshot.forEach(function (doc) {
//       doc.ref.delete();
//     });
//   });
// }

export default DashboardNoAppoin;
