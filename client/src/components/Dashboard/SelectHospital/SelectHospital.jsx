import React, { Component } from 'react';
import "../dashboard.css";
import HospitalSelect from "../../Select/HospitalSelect/HospitalSelect";

export default function SelectHospital(props) {
  const { t, hospitals, handleHospitalChange } = props;   

  return (
    <div className="hospitalsOptionsContainer mt-3 pinkBox">
      <div className="hospital">
        {t('dashboard.NearestHospital')}:{" "}
      </div>
      <div>
        <HospitalSelect t={t} hospitals={hospitals} handleHospitalChange={handleHospitalChange}/>
      </div>
    </div>
  )
}