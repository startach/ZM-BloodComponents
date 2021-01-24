import React, {useState} from "react";
import "./dashboard.css";
import "../appointmentsEntry/appointmentsEntry.css";

export default function DashboardNotEligible() {
  const [eligibleState, seteligibleState] = useState(false);

  return (
    <div className="dashboardView userEligibility">
      You are
      {eligibleState === false ? (
        <div>
          <b style={{ color: "red" }}> Not Eligible </b> to donate right now.
          For more information, please <i>contact</i> you coordinator{" "}
        </div>
      ) : (
        <p>You are eligible to donate</p>
      )}
    </div>
  );
}
