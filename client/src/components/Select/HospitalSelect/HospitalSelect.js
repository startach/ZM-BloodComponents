import React from 'react';
import { getHospitalLangName } from '../../../utils/enums/hospitals';
import "./HospitalSelect.css";

export default function SelectHospital({ t, hospitals, handleHospitalChange, chosenHospital }) {

  return (
    <select className="hospitalsOptionsList" onChange={handleHospitalChange}>
      {hospitals?.length > 1 ? <option value="Select" disabled selected> {t('general.select')}</option> : null}
      {hospitals.map((hospital) => (
        <option key={hospital.id} value={hospital.id}>
            {getHospitalLangName(hospital.id)}
        </option>
      ))}
    </select>
  )
}