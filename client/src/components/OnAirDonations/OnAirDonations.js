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

const getAppointmentsForHospital = (hospitalName) => {
  return (db.collection('Appointments').where('hospitalName', '==', hospitalName));
};

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


  const handleHospitalChange = (e) => {
    const hospitalNames = JSON.parse(e.target.value); 
    setChosenHospital(hospitalNames.name);
  };

  /*
  const handleDateChange = (date) => {
    setSearchDate(date)
    //const fullDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    //setHospitalAppointments({ ...hospitalAppointments, ['date']: fullDate })
  };
  */

  const setHospitalNames = () => {
    getAllHospitals().then((hopsitals) => {
      const hospitalsNames = hopsitals.map(hospitalDetails => {
        return { name: hospitalDetails.hospitalName, currLangName: hospitalDetails.currLangName }
      });

      setHospitals(hospitalsNames)  
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
    }).catch(function() {
      alert("An Error occured");
    });
  };

  const loadAppointmentsMap = () => {
    //only run when hospital chosen
    if (chosenHospital) {
      const today = Date.now() / 1000
      const filteredQuery = getAppointmentsForHospital(chosenHospital);
      filteredQuery.get()
        .then(querySnapshot => {
          const Appointments = [];
          querySnapshot.docs.forEach(hospitalAppointments => {
            let app = hospitalAppointments.data().timestamp.seconds
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


  useEffect(() => {
    //redirect user to login screen if he is not logged in 
    if (!localStorage.getItem('userid')) {
      history.push('/login')
    }

    setHospitalNames();
  }, []);

  useEffect(() => {
    async function fetchUsersMap() {
      const users = await getAllUsersMap();
      setUsersMap(users);
    }

    fetchUsersMap();
  }, []);

  useEffect(() => {
    async function fetchTaxiBookingsMap() {
      const taxies = await getAllTaxiBookingsMap();
      setTaxiBookingsMap(taxies);
    }

    fetchTaxiBookingsMap();
  }, []);

  useEffect(() => {
    loadAppointmentsMap();
  }, [chosenHospital]);

  return (
    <div className="onAirView mt-3">
      <div>
        <span>{t('general.hospital')}{': '}</span>
        <HospitalSelect t={t} hospitals={hospitals} handleHospitalChange={handleHospitalChange} />
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