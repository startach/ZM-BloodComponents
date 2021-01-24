import React, {useEffect, useLayoutEffect, useState} from 'react'
import "./BrowseUsers.css"
import Table from "../Table/Table";
import UserDetails from "../UserDetails/UserDetails";
import DonationsHistory from "../DonationsHistory/DonationsHistory";
import Popup from "reactjs-popup";
import {useTranslation} from 'react-i18next';
import {getAllHospitals} from '../../services/hospitalService';
import {getAllUsers} from '../../services/userService';
import {getAllOccupiedAppointments} from '../../services/appointmentService';

// Later seperate these to service
const maxBy = (array, comparator) => {
  let max = array?.[0];
  for (const item of array) {
    if (comparator(item, max)) {
      max = item;
    }
  }
  return max;
}

const getLastAppointment = async (userId, userAppointments) => {
  const now = Date.now() / 1000;
  const pastAppointments = userAppointments.filter(({timestamp: {seconds}}) => (seconds <  now));
  const lastAppointment = maxBy(pastAppointments, (appA,appB) => appA.datetime > appB.datetime);
  return {id: userId, lastAppointment};
}

const getUsersLastAppointments = async (userIds) => {
  const occupiedAppointments = await getAllOccupiedAppointments();
  const lastAppointments = await Promise.all(userIds.map(userId => {
    const userAppointments = occupiedAppointments.filter(({ userID }) => (userID === userId));
    return getLastAppointment(userId, userAppointments)
  }));
  const lastAppointmentsMap = lastAppointments.reduce((acc, appointment) => {
    acc[appointment.id] = appointment.lastAppointment;
    return acc;
  }, {});
  return lastAppointmentsMap;
}


export default function BrowseUsers() {

  const { t } = useTranslation();
  const defaultSelect = "Select";

  let [searchName, setsearchName] = useState("")
  let [bloodTypes, setbloodTypes] =
    useState(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
  let [chosenBloodType, setChosenBloodType] = useState(defaultSelect)
  let [hospitals, setHospitals] = useState([])
  let [chosenHospital, setChosenHospital] = useState(defaultSelect)
  let [users, setUsers] = useState([])
  const [usersAppointments, setUsersAppointments] = useState({});

  useLayoutEffect(() => {
    setHospitalNames();
  }, [setHospitals]);

  function handleSearchNameChange(e) {
    setsearchName(e.target.value)
  }

  function handleBloodTypeChange(e) {
    setChosenBloodType(e.target.value)
  }

  function handleHospitalChange(e) {
    setChosenHospital(e.target.value)
  }

  const setHospitalNames = () => {
    getAllHospitals().then((hospitals) => {
      const hospitalsNames = hospitals.map(hospitalDetails => {
        return hospitalDetails.hospitalName
      })
      setHospitals(hospitalsNames)
    })
  };

  useEffect(() => {
    async function fetchUsersTableData() {
      const allUsers = await getAllUsers();
      const userIds = allUsers.map(user => user.id);
      const usersAppointments = await getUsersLastAppointments(userIds);
      setUsers(allUsers);
      setUsersAppointments(usersAppointments);
    }

    fetchUsersTableData();
  }, []);

  const getUsersTableHeaderRow = () => {
    const header = [
      t('browseUsers.fullName'),
      t('browseUsers.bloodType'),
      t('browseUsers.hospital'),
      t('browseUsers.lastDonation'),
      t('browseUsers.details')
    ];
    return header
  };

  const getUsersTableRows = () => {
    const usersToShow = [];

    users.forEach((user) => {
      // filter by name
      const userNamelowercase = user.name.toLowerCase()
      const searchNameLowercase = searchName.toLowerCase()
      if (userNamelowercase.indexOf(searchNameLowercase) === -1)
        return;
      if (chosenBloodType !== defaultSelect && chosenBloodType !== user.bloodType)
        return;
      if (chosenHospital !== defaultSelect && usersAppointments[user.id]?.hospitalName !== chosenHospital)
        return;

      // present unknown bloodtype as N/A
      if (user.bloodType === "dontKnow")
        user = { ...user, bloodType: "N/A" }

      usersToShow.push({
        user: user,
        userAppointment: usersAppointments[user.id]
      });
    });

    usersToShow.sort(function (a, b) {
      const timestampA = a.userAppointment ? a.userAppointment.datetime.seconds : 0;
      const timestampB = b.userAppointment ? b.userAppointment.datetime.seconds : 0;
      a = new Date(timestampA);
      b = new Date(timestampB);
      return a > b ? -1 : a < b ? 1 : 0;
    });

    const rows = usersToShow.map((shownUser) => {
      const user = shownUser.user;
      const appointment = shownUser.userAppointment;

      const popup =
        <Popup
          contentStyle={{ width: "auto", minWidth: "50%" }}
          trigger={<button
            className="detailsButton">
            {t('browseUsers.details')}
          </button>
          }
          modal
          position="left top"
          closeOnDocumentClick
        >
          {close => (
            <div style={{ maxHeight: '70vh', overflow: 'scroll' }}>
              <h2>{t('browseUsers.userProfile')}</h2>
              <UserDetails t={t} userId={user.id} userDetails={user} editableMode={false} />
              <br />
              <DonationsHistory t={t} userId={user.id} editableMode={false} />
            </div>
          )}
        </Popup>

      return ({
        key: user.id,
        fields: [
          user.name,
          user.bloodType,
          appointment?.hospitalName,
          appointment?.date,
          popup
        ]
      })
    });

    return rows
  };


  return (
    <div className="browseUsers mt-3" >
      <div>
        <input
          type="text"
          placeholder={t('browseUsers.fullName')}
          value={searchName}
          onChange={handleSearchNameChange}
        />
        <br />
        <select
          className="optionsList"
          value={chosenBloodType}
          onChange={handleBloodTypeChange}>
          <option key={defaultSelect} value={defaultSelect}>
            {"-- " + t('general.select') + " " + t('browseUsers.bloodType') + " --"}
          </option>
          <option key="dontKnow" value="dontKnow"> {t("registerForm.dontKnow")}</option>
          {bloodTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <br />
        <select
          className="optionsList"
          value={chosenHospital}
          onChange={handleHospitalChange}>
          <option key={defaultSelect} value={defaultSelect}>
            {"-- " + t('general.select') + " " + t('browseUsers.hospital') + " --"}
          </option>
          {hospitals.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <Table headerFields={getUsersTableHeaderRow()} rowsFields={getUsersTableRows()} className="responsiveTable" />
    </div>
  )
}
