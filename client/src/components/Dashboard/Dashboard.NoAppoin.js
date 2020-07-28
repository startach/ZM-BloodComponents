import React, { useState, useEffect, Fragment } from "react";
import "./dashboard.css";
import "../appointmentsEntry/appointmentsEntry.css";
import { db, auth } from '../firebase/firebase'
import { Link, useHistory } from 'react-router-dom'
import Popup from "reactjs-popup";
import Button from '../button'
import BookTaxi from '../BookTaxi/BookTaxi'
import DashHeader from './DashHeader/DashHeader';
import YesNoPopUp from '../PopUp/YesNoPopUp/YesNoPopUp';
import { getAllHospitals } from '../../services/hospitalService';
import { getAllAppointments, updateAppointment } from '../../services/appointmentService';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import googlemaps from './googlemaps.png'
import waze from './waze.png'

function DashboardNoAppoin() {
  const { t } = useTranslation();
  const history = useHistory();

  const [hospital, setHospital] = useState([])
  const [pastApp, setPastApp] = useState(0)
  const [bookingData, setBookingData] = useState(false)
  const [rideBooked, setRideBooked] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [chosenOption, setChosenOption] = useState(null)
  const [checkUserAppointments, setCheckUserAppointments] = useState(false)
  const [userName, setUserName] = useState('')
  const [userAppointmentsDetails, setUserAppointmentsDetails] = useState([])

  const handleChange = (e) => {
    setChosenOption(e.target.value)
  }

  const setlocalStorage = (appointmentID) => {
    localStorage.setItem('appointmentId', (appointmentID));
  }

  const deleteAppointment = ({appId}) => {
    updateAppointment(appId, {
      userID: null
    });
  }

  const setHospitalNames = () => {
    getAllHospitals().then((hopsitals) => {
      const hospitalsNames = hopsitals.docs.map(hospitalDetails => {
        return hospitalDetails.data().hospitalName
      })
      setHospital(hospitalsNames)
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
            }
            else {
              const appointmentsDetails = []
              let count = 0
              //map appointments if not historic
              snapShot.docs.map(userAppointments => {
                let app = userAppointments.data().timestamp.seconds
                const today = Date.now() / 1000
                if (app > today) {
                  let currentID = userAppointments.id
                  let appObj = { ...userAppointments.data(), ['id']: currentID }
                  appointmentsDetails.push(appObj)
                  setUserAppointmentsDetails(appointmentsDetails)
                } else {
                  //count old appointments
                  count++
                }
                setPastApp(count)
              })

              //if none of the appointments found were in the future, set up page for book new appointment
              if (!appointmentsDetails.length) {
                setCheckUserAppointments(false);
                setHospitalNames()
              } else {
                setCheckUserAppointments(true);
                //checkRideBooked(user.uid)
              }
            }
          })
        }
      })
    }  
  }, [])

  useEffect(() => {
    //only run when hospital chosen
    if (chosenOption) {
      const today = Date.now() / 1000
      const filteredQuery = db.collection('Appointments').where('userID', '==', null).where('hospitalName', '==', chosenOption)

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
          setAppointments(Appointments)
        })
        .catch(error => {
          // Catch errors
        });
    }
  }, [chosenOption])


  return (
    <div className="dashboardView mt-3">
      {checkUserAppointments ? (
        <Fragment>
          <DashHeader t={t} userName={userName} pastAppointment={pastApp} nextAppointments={userAppointmentsDetails} />
          <table className="schedulesTables">
            <tr className="headerRow">
              <th className="headerEntries"> {t('dashboard.Location')}</th>
              <th className="headerEntries"> {t('dashboard.date')}</th>
              <th className="headerEntries"> {t('dashboard.Time')}</th>
              <th className="headerEntries"></th>
            </tr>
            {userAppointmentsDetails.map(appointment => (
              <tr className='rowContainer' id={appointment.id}>
                <td className='rowClass'>{appointment.hospitalName}</td>
                <td className='rowClass' >{appointment.date}</td>
                <td className='rowClass'>{appointment.time}</td>
                <td className='rowClass'>
                  <YesNoPopUp text={t('dashboard.deleteAppointment')} handleYes={deleteAppointment} appId={appointment.id}>
                    <button className="cancelButton"> {t('dashboard.Cancel')}</button>
                  </YesNoPopUp>
                </td>
              </tr>
            ))}
          </table>
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
            <DashHeader t={t} userName={userName} pastAppointment={pastApp} nextAppointments={userAppointmentsDetails} />
            <div className="hospitalsOptionsContainer mt-3 pinkBox">
              <div className="hospital">
                {t('dashboard.NearestHospital')}:{" "}
              </div>
              <div>
                <select className="hospitalsOptionsList" onChange={handleChange}>
                  <option value="Select" disabled selected> {t('general.select')}</option>
                  {hospital.map(name => (
                    <option value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <table className="schedulesTables">
              <tr className="headerRow">
                <th className="headerEntries">{t('dashboard.date')}</th>
                <th className="headerEntries">{t('dashboard.Time')}</th>
                <th className="headerEntries">{t('general.Register')}</th>
              </tr>
              {appointments.map(appointment => (
                <tr className='rowContainer' id={appointment.id}>
                  <td className='rowClass' >{appointment.date}</td>
                  <td className='rowClass'>{appointment.time}</td>
                  <td className='rowClass'>
                    <Link to='/questions'>
                      <button onClick={() => setlocalStorage(appointment.id)} id={appointment.id} className="registerButton">{t('general.Register')}</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </table>
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
