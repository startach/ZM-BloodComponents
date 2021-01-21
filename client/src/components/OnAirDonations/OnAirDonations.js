import React, { useState, useEffect, Fragment } from "react";
import "./OnAirDonations.css";
import { db } from "../firebase/firebase";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { getAppointmentsForHospital } from "../../services/appointmentService";
import { hospitals, getHospitalLangName } from "../../utils/enums/hospitals";
import HospitalSelect from "../Select/HospitalSelect/HospitalSelect";
import OnAirTable from "./OnAirTable/OnAirTable";
import { getUserClaims } from "../../services/userService";

const getAllUsersMap = async () => {
  const usersQuery = await db.collection("users").get();
  const usersMap = {};
  usersQuery.docs.forEach((user) => {
    usersMap[user.id] = user.data();
  });
  return usersMap;
};

const getAllTaxiBookingsMap = async () => {
  const taxiQuery = await db.collection("taxiBookings").get();
  const taxiMap = {};
  taxiQuery.docs.forEach((taxi) => {
    taxiMap[taxi.data().appointmentID] = taxi.id;
  });
  return taxiMap;
};

export default function OnAirDonations() {
  const { t } = useTranslation();
  const history = useHistory();
  const hospitalsDetails = hospitals;
  // If hospitalCoord, can only see their own hospital
  const [coordHospitalId, setCoordHospitalId] = useState();
  const [chosenHospital, setChosenHospital] = useState(null);
  const [usersMap, setUsersMap] = useState({});
  const [taxiBookingsMap, setTaxiBookingsMap] = useState({});
  const [appointmentsMap, setAppointmentsMap] = useState(new Map());

  useEffect(() => {
    //redirect user to login screen if he is not logged in
    if (!localStorage.getItem("userid")) {
      history.push("/login");
    }

    // get user's hospital - if user is a hospitalCord
    const getHospitalCoordId = async () => {
      
      const userClaims = await getUserClaims();
      if (userClaims.userLevel === "hospitalCord") {
        return userClaims.hospital
      }
      return;
    };

    getHospitalCoordId().then((hospitalId) => {
      if (hospitalId) {
        setCoordHospitalId(hospitalId)
        setChosenHospital(hospitalId)
      }
      fetchUsersMap();
      fetchTaxiBookingsMap();
    });

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

  const handleHospitalChange = (e) => {
    const hospitalID = e.target.value;
    setChosenHospital(hospitalID);
  };


  const deleteTimeAppointments = (date, time) => {
    const timeAppointments = appointmentsMap.get(date).get(time);
    let batch = db.batch();

    for (let appointment of timeAppointments) {
      batch.delete(db.collection("Appointments").doc(appointment.id));

      // When appointment is being deleted, delete its taxi booking
      if (taxiBookingsMap[appointment.id]) {
        batch.delete(
          db.collection("taxiBookings").doc(taxiBookingsMap[appointment.id])
        );
      }
    }

    batch
      .commit()
      .then(function () {
        loadAppointmentsMap();
        alert("The appointment has been deleted successfully");
      })
      .catch(function () {
        alert("An Error occured");
      });
  };

  const loadAppointmentsMap = () => {
    //only run when hospital chosen
    if (chosenHospital) {
      const today = Date.now() / 1000;
      const filteredQuery = getAppointmentsForHospital(chosenHospital);
      let appointmentDate = null;
      let appointmentTime = null;
      filteredQuery
        .get()
        .then((querySnapshot) => {
          const Appointments = [];
          querySnapshot.docs.forEach((hospitalAppointments) => {
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
            a = new Date(a.timestamp.seconds);
            b = new Date(b.timestamp.seconds);
            return a > b ? -1 : a < b ? 1 : 0;
          });

          let mapOfAppointments = new Map();
          Appointments.forEach((appObj) => {
            appointmentDate = moment(appObj.datetime.toMillis()).format(
              "DD/MM/YY"
            );
            appointmentTime = moment(appObj.datetime.toMillis()).format(
              "HH:mm"
            );
            if (mapOfAppointments.has(appointmentDate)) {
              if (mapOfAppointments.get(appointmentDate).has(appointmentTime)) {
                mapOfAppointments
                  .get(appointmentDate)
                  .get(appointmentTime)
                  .push(appObj);
              } else {
                mapOfAppointments
                  .get(appointmentDate)
                  .set(appointmentTime, [appObj]);
              }
            } else {
              let times = new Map();
              times.set(appointmentTime, [appObj]);
              mapOfAppointments.set(appointmentDate, times);
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
      {coordHospitalId ?  <span>{hospitals.find(hospital => hospital.id === coordHospitalId)?.hebName || ""}</span> : (
        <div>
          <span>{t("general.hospital")}</span>
          <HospitalSelect
            t={t}
            hospitals={hospitals}
            handleHospitalChange={handleHospitalChange}
            chosenHospital={chosenHospital}
          />
        </div>
      )}
      <br />
      <br />
      {appointmentsMap.size === 0 ? (
        <h4>{t("onAirDonations.noScheduled")}</h4>
      ) : (
        [...appointmentsMap.keys()].map((date) => (
          <Fragment key={date}>
            <h3>
              {t("onAirDonations.date")}: {date}
            </h3>
            <OnAirTable
              t={t}
              date={date}
              dateAppointments={appointmentsMap.get(date)}
              usersMap={usersMap}
              deleteTimeAppointments={deleteTimeAppointments}
            />
          </Fragment>
        ))
      )}
    </div>
  );
}
