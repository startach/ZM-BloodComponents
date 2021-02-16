import Button from "../Button";
import React from "react";
import Logo from "../Logo";
import "./CoordinatorHeader.css";
import { useHistory } from "react-router-dom";
import { CoordinatorScreen } from "../../navigation/CoordinatorScreen";

const CoordinatorHeader = () => {
  const history = useHistory();

  const navigate = (screen: CoordinatorScreen) => () =>
    history.push("/" + screen);
  return (
    <div className="navBar">
      <div className="buttons">
        <Button
          title="הוספת תורים"
          onClick={navigate(CoordinatorScreen.ADD_APPOINTMENTS)}
        />
        <Button
          title="תורים מתוכננים"
          onClick={navigate(CoordinatorScreen.SCHEDULED_APPOINTMENTS)}
        />
        <Button
          title="חיפוש משתמשים"
          onClick={navigate(CoordinatorScreen.DONORS)}
        />
      </div>
      <div className="logo">
        <Logo />
      </div>
    </div>
  );
};

export default CoordinatorHeader;
