import Button from "../Button";
import React from "react";
import Logo from "../Logo";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="buttons">
        <Button title="חיפוש משתמשים" onClick={() => {}} />
        <Button title="תורים מתוכננים" onClick={() => {}} />
        <Button title="הוספת תורים" onClick={() => {}} />
      </div>
      <div className="logo">
        <Logo />
      </div>
    </div>
  );
};

export default NavBar;
