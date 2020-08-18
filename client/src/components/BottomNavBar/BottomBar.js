import React from "react";
// import aboutIcon from "./About.svg";
// import ContactUsIcon from "./Contact_us.svg";
// import DonateIcon from "./Donate.svg";
import "./bottomBar.css";
import { Link } from "react-router-dom";

export default function BottomBar() {
  const aboutIcon = "/img/Info-Icon.svg";
  const ContactUsIcon = "/img/Contact-Icon.svg";
  const DonateIcon = "/img/Donate-Icon.svg";

  const addIconClass = (e) => {
    e.target.classList.add("iconClicked");
  };

  return (
    <div className="listContainer">
      <div
        className=""
        onClick={(e) => {
          addIconClass(e);
        }}
      >
        <Link id="link" to="/about">
          <img className="" alt="About icon" tabIndex="1" src={aboutIcon}></img>
        </Link>
      </div>

      <div
        className=""
        onClick={(e) => {
          addIconClass(e);
        }}
      >
        <Link id="link" to="/donateprocess">
          <img
            className=""
            tabIndex="2"
            alt="Donate icon"
            src={DonateIcon}
          ></img>
        </Link>
      </div>
      <div
        className=""
        onClick={(e) => {
          addIconClass(e);
        }}
      >
        <Link id="link" to="/contactus">
          <img
            className=""
            tabIndex="3"
            alt="Contact us icon"
            src={ContactUsIcon}
          ></img>
        </Link>
      </div>
    </div>
  );
}
