import React, { useState, useEffect, Fragment } from "react";
import "./dashboard.css";
import "../appointmentsEntry/appointmentsEntry.css";
import { db, auth } from '../firebase/firebase'
import { Link, useHistory } from 'react-router-dom'
import Popup from "reactjs-popup";
import Button from '../button'
import BookTaxi from '../BookTaxi/BookTaxi'
import DashHeader from './DashHeader/DashHeader';
import { getAllHospitals } from '../../services/hospitalService';
import { getAllAppointments, updateAppointment } from '../../services/appointmentService';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import googlemaps from './googlemaps.png'
import waze from './waze.png';
import moment from 'moment';
import SelectHospital from './SelectHospital/SelectHospital';
import AppointmentsTable from './AppointmentsTable/AppointmentsTable';

function DashboardNoAppoin() {
  const { t } = useTranslation();
  const history = useHistory();

  const [hospitals, setHospitals] = useState([])
  const [pastApp, setPastApp] = useState([])
  const [appointmentLastMonth, setAppointmentLastMonth] = useState(false);
  const [bookingData, setBookingData] = useState(false)
  const [rideBooked, setRideBooked] = useState(false)
  const [availableAppointments, setAvailableAppointments] = useState([])
  const [chosenHospital, setChosenHospital] = useState(null)
  const [checkUserAppointments, setCheckUserAppointments] = useState(false)
  const [userName, setUserName] = useState('')
  const [userAppointmentsDetails, setUserAppointmentsDetails] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [viewDates, setViewDates] = useState(false);

  const handleHospitalChange = (e) => {
    setChosenHospital(e.target.value)
  }

  const handleViewDates = () => {
    setViewDates(true);
  }

  const setHospitalNames = () => {
    getAllHospitals().then((hopsitals) => {
      const hospitalsNames = hopsitals.docs.map(hospitalDetails => {
        return hospitalDetails.data().hospitalName
      })
      setHospitals(hospitalsNames)
    })
  }

  useEffect(() => {
    //redirect user to login screen if he is not logged in 
    if (!localStorage.getItem('userid')) {
      history.push('/login')
    }
    else {
      auth.onAuthStateChanged(async user => {
        if (user) {
          const userData = await db.collection('users').doc(user.uid).get()
          setUserName(userData.data().name);

          db.collection('Appointments').where('userID', '==', user.uid).onSnapshot(snapShot => {
            if (snapShot.empty) {
              setCheckUserAppointments(false);
              setHospitalNames()
              setIsLoading(false); 
            }
            else {
              const appointmentsDetails = []
              //map appointments if not historic
              snapShot.docs.map(userAppointments => {
                let appointmentDate = moment(userAppointments.data().timestamp.seconds * 1000);
                const today = moment();
                if (appointmentDate > today) {
                  let currentID = userAppointments.id
                  let appObj = { ...userAppointments.data(), ['id']: currentID }
                  appointmentsDetails.push(appObj)
                  setUserAppointmentsDetails(appointmentsDetails)
                } else {
                  setPastApp(prev => [...prev, appointmentDate.format('D.M')] );
                  
                  const monthAgo = moment(new Date());
                  monthAgo.subtract(1, 'month');
                  if (appointmentDate > monthAgo) {
                    setAppointmentLastMonth(true);
                  }                  
                }
              })

              //if none of the appointments found were in the future, set up page for book new appointment
              if (!appointmentsDetails.length) {
                setCheckUserAppointments(false);
                setHospitalNames()
              } else {
                setCheckUserAppointments(true);
                //checkRideBooked(user.uid)
              }

              setIsLoading(false); 
            }
          })
        }
      })
    } 
  }, [])

  useEffect(() => {
    //only run when hospital chosen
    if (chosenHospital) {
      const today = Date.now() / 1000
      const filteredQuery = db.collection('Appointments').where('userID', '==', null).where('hospitalName', '==', chosenHospital)

      filteredQuery.get()
        .then(querySnapshot => {
          const Appointments = []
          querySnapshot.docs.forEach(hospitalAppointments => {
            let app = hospitalAppointments.data().timestamp.seconds
            if (app > today) {
              let currentID = hospitalAppointments.id
              let appObj = { ...hospitalAppointments.data(), ['id']: currentID }
              Appointments.push(appObj)
            }
          })
          Appointments.sort(function (b, a) {
            a = new Date(a.timestamp.seconds);
            b = new Date(b.timestamp.seconds);
            return a > b ? -1 : a < b ? 1 : 0;
          })
          setAvailableAppointments(Appointments)
        })
        .catch(error => {
          // Catch errors
        });
    }
  }, [chosenHospital])


  return (
    !isLoading && <div className="dashboardView mt-3">
      {checkUserAppointments ? (
        <Fragment>
          <DashHeader t={t} userName={userName} pastAppointments={pastApp} 
            appointmentLastMonth={appointmentLastMonth} nextAppointments={userAppointmentsDetails} />
          <AppointmentsTable t={t} appointments={userAppointmentsDetails}/>
          <div className="bottomButtons">
            {/* <a target="_blank"
              href={`https://www.google.com/maps/search/?api=1&query=${localStorage.getItem('hospital').replace(/\s/g, '%')}%hospital`}
            ><Button type="button" text={t('dashboard.getDirections')} width="150px">
              </Button></a> */}
            <Popup className="popup3" trigger={<Button type="button" text={t('dashboard.getDirections')} width="150px">
            </Button>} modal position="left top" closeOnDocumentClick>
              {<a target="_blank"
                href={`https://www.google.com/maps/search/?api=1&query=${localStorage.getItem('hospital').replace(/\s/g, '%')}%20hospital`}
              ><img className="mapIcon" src={googlemaps} /></a>}
              {<a target="_blank"
                href={`https://www.waze.com/ul?q=${localStorage.getItem('hospital').replace(/\s/g, '%')}%20hospital`}
              ><img className="mapIcon" src={waze} /></a>}
            </Popup>
            <Popup className="popup1" trigger={bookingData ? <Button type="button" text={t('dashboard.rideDetails')} color='#C71585' width="150px"></Button> : <Button type="button" text={t('dashboard.orderTaxi')} color='#C71585' width="150px"></Button>} modal position="left top" closeOnDocumentClick>
              {close => <BookTaxi close={close} bookingData={bookingData} setBookingData={setBookingData} rideBooked={rideBooked} setRideBooked={setRideBooked} />}
            </Popup>
          </div>
        </Fragment>
        //no appointments
      ) : (
          <Fragment>
            <DashHeader t={t} userName={userName} pastAppointments={pastApp} 
            appointmentLastMonth={appointmentLastMonth} nextAppointments={userAppointmentsDetails} handleViewDates={handleViewDates} />
            {(!appointmentLastMonth || viewDates) && 
              <SelectHospital t={t} hospitals={hospitals} handleHospitalChange={handleHospitalChange}/> }
            <AppointmentsTable t={t} appointments={availableAppointments} viewDates={viewDates}/>
          </Fragment>
        )
      }
    </div>
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
