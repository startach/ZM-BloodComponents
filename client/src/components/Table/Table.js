import React from "react";
import "./Table.css"

export default function Table({headerFields, rowsFields, className}) {

  return (
    <table className={`appTable ${className}`}>
      <thead>
        <tr className="headerRow">
          {headerFields.map(field => (
            <th key={field} className="headerFields">{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowsFields.map(rowFields => (
          <tr key={rowFields.key} className="rowContainer">
            {rowFields.fields.map((field, index) => (
              <td key={headerFields[index]} className="rowFields">{field}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
