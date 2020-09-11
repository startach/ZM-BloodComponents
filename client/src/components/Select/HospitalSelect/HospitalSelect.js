import React from 'react';
import "./HospitalSelect.css";

export default function SelectHospital(props) {
  const { t, hospitals, handleHospitalChange } = props;   

  return (
    <select className="hospitalsOptionsList" onChange={handleHospitalChange}>
      <option value="Select" disabled selected> {t('general.select')}</option>
      {hospitals.map((names, index) => (
        <option key={index} value={JSON.stringify(names)}>
          {names.currLangName}
        </option>
      ))}
    </select>
  )
}