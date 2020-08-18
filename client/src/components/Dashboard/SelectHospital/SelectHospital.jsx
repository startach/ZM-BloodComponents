import React, { Component } from 'react'
import "../dashboard.css";

export default function SelectHospital(props) {
    const { t, hospitals, handleHospitalChange } = props;   

    return (
        <div className="hospitalsOptionsContainer mt-3 pinkBox">
            <div className="hospital">
            {t('dashboard.NearestHospital')}:{" "}
            </div>
            <div>
            <select className="hospitalsOptionsList" onChange={handleHospitalChange}>
                <option value="Select" disabled selected> {t('general.select')}</option>
                {hospitals.map((names, index) => (
                <option key={index} value={JSON.stringify(names)}>
                    {names.currLangName}
                </option>
                ))}
            </select>
            </div>
        </div>
    )
}