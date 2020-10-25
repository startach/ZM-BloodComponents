import React, { useState, useEffect, Fragment } from 'react';
import "./OnAirDonations.css";
import { db } from '../firebase/firebase';
import { useHistory } from 'react-router-dom';
import Datepicker from "react-datepicker";
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { getAllHospitals } from '../../services/hospitalService';
import HospitalSelect from '../Select/HospitalSelect/HospitalSelect';
import OnAirTable from "./OnAirTable/OnAirTable";
import { getUserClaims } from '../../services/userService'


/*
const getAppointmentsOfDate = (date) => {
  return (db.collection('Appointments').where('date', '==', date));
};
*/

const getAllUsersMap = async () => {
  const usersQuery = await db.collection("users").get();
  const usersMap = {};
  usersQuery.docs.forEach(user => {
    usersMap[user.id] = user.data();
  });
  return usersMap;
}

const getAllTaxiBookingsMap = async () => {
  const taxiQuery = await db.collection("taxiBookings").get();
  const taxiMap = {};
  taxiQuery.docs.forEach(taxi => {
    taxiMap[taxi.data().appointmentID] = taxi.id;
  });
  return taxiMap;
}

export default function OnAirDonations() {
  const { t } = useTranslation();
  const history = useHistory();

  const [hospitals, setHospitals] = useState([]);
  const [chosenHospital, setChosenHospital] = useState(null);
  //const [searchDate, setSearchDate] = useState(new Date());

  const [usersMap, setUsersMap] = useState({});
  const [taxiBookingsMap, setTaxiBookingsMap] = useState({});
  const [appointmentsMap, setAppointmentsMap] = useState(new Map());

  useEffect(() => {

    // get user's hospital - if user is a hospitalCord
    const getUserHospital = async () => {
      const userClaims = await getUserClaims()
      if (userClaims.userLevel === "hospitalCord") {
        return userClaims.hospital.toLowerCase()
      }
      return
    }

    getUserHospital().then((hospitalName) => {
      setHospitalNames(hospitalName);
      fetchUsersMap();
      fetchTaxiBookingsMap();
    })

    async function fetchUsersMap() {
      const users = await getAllUsersMap();
      setUsersMap(users);
    }

    async function fetchTaxiBookingsMap() {
      const taxies = await getAllTaxiBookingsMap();
      setTaxiBookingsMap(taxies);
    }

  }, []);

  useEffect(() => {
    loadAppointmentsMap();
  }, [chosenHospital]);

  // trigger loadAppointmentsMap() only when hospitals change
  useEffect(() => {
    if (hospitals?.length === 1) {
      setChosenHospital(hospitals[0].name)
    }
  }, [hospitals])

  const handleHospitalChange = (e) => {
    const hospitalNames = JSON.parse(e.target.value);
    setChosenHospital(hospitalNames.name);
  };

  const setHospitalNames = async (hospitalName) => {
    getAllHospitals().then((hopsitals) => {
      let hospitalNames = hopsitals.map(hospitalDetails => {
        return { name: hospitalDetails.hospitalName, currLangName: hospitalDetails.currLangName }
      });
      // if user is hospitalCord, show only their hospital
      if (hospitalName) {
        hospitalNames = [hospitalNames.find(hospital => hospital.name.replace(" ", "").toLowerCase() === hospitalName)]
      }
      setHospitals(hospitalNames)
    })
  };

  const deleteTimeAppointments = (date, time) => {
    const timeAppointments = appointmentsMap.get(date).get(time);
    let batch = db.batch();

    for (let appointment of timeAppointments) {
      batch.delete(db.collection("Appointments").doc(appointment.id));

      // When appointment is being deleted, delete its taxi booking
      if (taxiBookingsMap[appointment.id]) {
        batch.delete(db.collection("taxiBookings").doc(taxiBookingsMap[appointment.id]));
      }
    }

    batch.commit().then(function () {
      loadAppointmentsMap();
      alert("The appointment has been deleted successfully");
    }).catch(function () {
      alert("An Error occured");
    });
  };

  const loadAppointmentsMap = () => {
    //only run when hospital chosen
    if (chosenHospital) {
      const today = Date.now() / 1000

      // firebase queries are not case sensitive -
      // how should hospital cases be treated?
      db.collection('Appointments').where("hospitalName", "==", chosenHospital || "").get()
        .then(querySnapshot => {
          const Appointments = [];
          querySnapshot.docs.forEach(hospitalAppointment => {
            const appointmentTime = hospitalAppointment.data().timestamp.seconds
            if (appointmentTime > today) {
              let currentID = hospitalAppointment.id;
              let appObj = {
                ...hospitalAppointment.data(),
                ["id"]: currentID,
              };
              Appointments.push(appObj);
            }
          });
          Appointments.sort(function (b, a) {
            a = new Date(a.timestamp.seconds);
            b = new Date(b.timestamp.seconds);
            return a > b ? -1 : a < b ? 1 : 0;

          });

          let mapOfAppointments = new Map();
          Appointments.forEach(appObj => {
            if (mapOfAppointments.has(appObj.date)) {
              if (mapOfAppointments.get(appObj.date).has(appObj.time)) {
                mapOfAppointments.get(appObj.date).get(appObj.time).push(appObj);
              } else {
                mapOfAppointments.get(appObj.date).set(appObj.time, [appObj]);
              }
            } else {
              let times = new Map();
              times.set(appObj.time, [appObj]);
              mapOfAppointments.set(appObj.date, times);
            }
          });

          setAppointmentsMap(mapOfAppointments);
        })
        .catch((error) => {
          // Catch errors
        });
    }
  };

  return (
    <div className="onAirView mt-3">
      <div>
        <span>{t('general.hospital')}{': '}</span>
        <HospitalSelect t={t}
          hospitals={hospitals}
          handleHospitalChange={handleHospitalChange}
          chosenHospital={chosenHospital} />
      </div>
      <br />
      <br />
      {/*<Datepicker selected={searchDate} onChange={handleDateChange} /> */}
      {[...appointmentsMap.keys()].map(date => (
        <Fragment key={date}>
          <h3>{t('onAirDonations.date')}: {date}</h3>
          <OnAirTable
            t={t}
            date={date}
            dateAppointments={appointmentsMap.get(date)}
            usersMap={usersMap}
            deleteTimeAppointments={deleteTimeAppointments}
          />
        </Fragment>
      ))}
    </div>
  )
}