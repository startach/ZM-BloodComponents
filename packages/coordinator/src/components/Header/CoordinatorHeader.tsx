import Button from "../Button";
import React from "react";
import Logo from "../Logo";
import "./CoordinatorHeader.css";
import { useHistory } from "react-router-dom";
import { CoordinatorScreen } from "../../navigation/CoordinatorScreen";

interface CoordinatorHeaderProps {
  showSignOutButton: boolean;
  onSignOut: () => void;
}

export default function CoordinatorHeader(props: CoordinatorHeaderProps) {
  const history = useHistory();

  const navigate = (screen: CoordinatorScreen) => () =>
    history.push("/" + screen);
  return (
    <div className="navBar">
      <div className="logo">
        <Logo />
      </div>
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
        {props.showSignOutButton && (
          <Button title="התנתק" onClick={props.onSignOut} />
        )}
      </div>
    </div>
  );
}
