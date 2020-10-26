import React from 'react';
import "./HospitalSelect.css";

export default function SelectHospital({ t, hospitals, handleHospitalChange, chosenHospital }) {

  return (
    <select className="hospitalsOptionsList" onChange={handleHospitalChange} value={chosenHospital}>
      {hospitals?.length > 1 ? <option value="Select" disabled selected> {t('general.select')}</option> : null}
      {hospitals.map((names, index) => (
        <option key={index} value={JSON.stringify(names)}>
          {names.currLangName}
        </option>
      ))}
    </select>
  )
}