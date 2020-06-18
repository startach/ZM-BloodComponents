import React from "react";
import aboutIcon from "./About.svg";
import ContactUsIcon from "./Contact_us.svg";
import DonateIcon from "./Donate.svg";
import "./bottomBar.css"

export default function BottomBar() {
  return (
    <div className='bottomBarContainer'>
        <ul>
            <li className='iconContainer'>
                <img alt="About icon" src={aboutIcon}></img>
                About
            </li>

            <li className='iconContainer'>
                <img alt="Donate icon" src={DonateIcon}></img>
                Donate
            </li>
            <li className='iconContainer'>
                <img alt="Contact icon" src={ContactUsIcon}></img>
                Contact us
            </li>
        </ul>
    </div>
  );
}
