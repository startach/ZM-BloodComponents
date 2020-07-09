import React, { useState, useEffect, Fragment } from "react";
import "./dashboard.css";
import "../appointmentsEntry/appointmentsEntry.css";
import { db, auth } from '../firebase/firebase'
import { Link, useHistory } from 'react-router-dom'
import Button from '../button'
import Popup from "reactjs-popup";
import BookTaxi from '../BookTaxi/BookTaxi'
import dbIcon from './dbIcon.svg'

///////
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
//////

import googlemaps from './googlemaps.png'
import waze from './waze.png'



function DashboardNoAppoin() {

  /////////
  const { t } = useTranslation();
  //////////

  const [show, setShow] = useState(false);

  const history = useHistory();

  let [hospital, setHospital] = useState([])
  let [pastApp, setPastApp] = useState(0)
  let [bookingData, setBookingData] = useState(false)
  let [rideBooked, setRideBooked] = useState(false)
  let [appointments, setAppointments] = useState([])
  let [chosenOption, setChosenOption] = useState(null)
  let [checkUserAppointments, setCheckUserAppointments] = useState(false)
  let [userName, setUserName] = useState('')
  let [userAppointmentsDetails, setUserAppointmentsDetails] = useState([])

  function handleChange(e) {
    setChosenOption(e.target.value)
    localStorage.setItem('hospital', e.target.value);
  }


  function setlocalStorage(appointmentID) {
    localStorage.setItem('appointmentId', (appointmentID));
  }

  function deleteAppointment(e) {
    console.log(e.target.id)
    var appId = e.target.id;
    db.collection('Appointments').doc(appId).update({
      userID: null
    })

    deleteRideFunc(appId)

  }

  const setHospitalNames = () => {
    db.collection('Hospitals').get().then((hopsitals) => {
      const hospitalsNames = hopsitals.docs.map(hospitalDetails => {
        return hospitalDetails.data().hospitalName
      })
      setHospital(hospitalsNames)
    })
  }

  const deleteRideFunc = (appId) => {

    var deleteRide = db.collection('taxiBookings').where("appointmentID", "==", appId);
    deleteRide.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });

  }


  //FIXME:
  const checkRideBooked = (userid) => {

    //get bookings where userID matches.
    console.log(userid)

    db.collection('taxiBookings').where('user', '==', userid).get().then((bookings) => {
      const bookingsMap = bookings.docs.map(bookingDetails => {
        return bookingDetails.data()
      })
      setBookingData(bookingsMap[0])
      bookingData ? setRideBooked(true) : setRideBooked(false)
      console.log("booking", bookingsMap[0], "IS RIDE bOOKED", rideBooked)


    })
  }



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
          console.log("APPS", Appointments)
          setAppointments(Appointments)
        })
        .catch(error => {
          // Catch errors
        });
    }
  }, [chosenOption])



  useEffect(() => {

    //redirect user to login screen if he is not logged in 
    if (!localStorage.getItem('userid'))
      history.push('/login')

    //get currently logged in user
    auth.onAuthStateChanged(async user => {
      if (user) {
        const userData = await db.collection('users').doc(user.uid).get()
        setUserName(userData.data().name)

        userData.data().genderType ? localStorage.setItem('gender', userData.data().genderType) : localStorage.setItem('gender', 'unknown');


        //get appointments for that user, if any
        db.collection('Appointments').where('userID', '==', user.uid).onSnapshot(snapShot => {

          //if non exist
          if (snapShot.empty) {

            //change state to false - show no appointment screen
            setCheckUserAppointments(false);
            console.log("User doesn't have any Appointment")
            //set names for drop down
            setHospitalNames()


          } // if user has appointments
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
                //set local storag for later pages (taxi booking)
                localStorage.setItem('hospital', appointmentsDetails[0].hospitalName)
                localStorage.setItem('appointmentDate', appointmentsDetails[0].date)
                localStorage.setItem('appointmentTime', appointmentsDetails[0].time)
                localStorage.setItem('appointmentID', currentID)
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
              checkRideBooked(user.uid)
            }
          }
        })
      }
    })

  }, [rideBooked])





  return (
    <div className="dashboardView mt-3">


      {checkUserAppointments ? (
        <Fragment>

          <img src={dbIcon} />

          <div className="highlight pageTitle">{t('general.Thrombocytes')}</div>
          <div id="introSpan" className="introSpan pinkBox">{t('dashboard.hello')} <span className="highlight">{userName}</span>,{!pastApp ? <span> {t('dashboard.intro')} </span> : <span> {t('dashboard.youDonated')} <b>{pastApp}</b> {t('dashboard.donationTimes')}. {t('dashboard.wonderful')}</span>}</div>
          <div className="pinkBox">   {t('dashboard.youAre')} <span className="highlight"> {t('dashboard.eligible')} </span>{t('dashboard.toDonate')}       {t('dashboard.fewDetails')}</div>





          <table className="schedulesTables">
            <tr className="headerRow">
              <th className="headerEntries"> {t('dashboard.Location')}</th>
              <th className="headerEntries"> {t('dashboard.date')}</th>
              <th className="headerEntries"> {t('dashboard.Time')}</th>
              <th className="headerEntries">{t('dashboard.Time')}</th>
            </tr>

            {userAppointmentsDetails.map(appointment => (
              <tr className='rowContainer' id={appointment.id}>
                <td className='rowClass'>{appointment.hospitalName}</td>
                <td className='rowClass' >{appointment.date}</td>
                <td className='rowClass'>{appointment.time}</td>
                <td className='rowClass'>
                  <Popup className="popup2" trigger={<button id={appointment.id} className="cancelButton"> {t('dashboard.Cancel')}</button>
                  }
                    modal position="left top" closeOnDocumentClick
                    contentStyle={{ width: "20px" }}
                  >
                    {close => (
                      <div className="container">
                        <a className="close" onClick={close}>
                          X
                                </a>


                        <div className="content">

                          {t('dashboard.deleteAppointment')}?

                        </div>

                        <div className="actions">

                          <button
                            id={appointment.id}
                            className="yesButton"
                            onClick={(e) => {
                              deleteAppointment(e)
                              close();
                            }}>
                            {t('general.Yes')}
                          </button>

                          <button
                            className="noButton"
                            onClick={() => {
                              close();
                            }}>
                            {t('general.No')}
                          </button>

                        </div>



                      </div>
                    )}

                  </Popup>
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


            <img src={dbIcon} />
            <div className="highlight pageTitle">{t('general.Thrombocytes')}</div>
            <div id="introSpan" className="introSpan pinkBox">{t('dashboard.hello')} <span className="highlight">{userName}</span>,
            {!pastApp ? <span> {t('dashboard.intro')} </span> : <span> {t('dashboard.youDonated')} <b>{pastApp}</b> {t('dashboard.donationTimes')}. {t('dashboard.wonderful')}</span>}</div>
            <div className="pinkBox">   {t('dashboard.youAre')} <span className="highlight"> {t('dashboard.eligible')} </span>{t('dashboard.toDonate')}  {t('dashboard.scheduleAppointment')}</div>

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
                <th className="headerEntries">{t('general.hospital')}</th>
                <th className="headerEntries">{t('dashboard.date')}</th>
                <th className="headerEntries">{t('dashboard.Time')}</th>
                <th className="headerEntries">{t('general.Register')}</th>
              </tr>

              {appointments.map(appointment => (

                <tr className='rowContainer' id={appointment.id}>
                  <td className='rowClass' >{chosenOption}</td>
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


export default DashboardNoAppoin;
