import React from "react";
import aboutIcon from "./About.svg";
import ContactUsIcon from "./Contact_us.svg";
import DonateIcon from "./Donate.svg";
import "./bottomBar.css"

export default function BottomBar() {

    const addIconClass = (e) => {
        e.target.classList.add('iconClicked')
    }

    return (
            <ul className='listContainer'>
                <li className='iconContainer aboutBtn' onClick={(e) => { addIconClass(e) }}>
                    <img className='ion-about' alt="About icon" tabIndex='1' src={aboutIcon}></img>
                </li>

                <li className='iconContainer donateIcon donateBtn' onClick={(e) => { addIconClass(e) }}>
                    <img className='ion-donate' tabIndex='2' alt="Donate icon" src={DonateIcon}></img>
                </li>
                <li className='iconContainer contactBtn' onClick={(e) => { addIconClass(e) }}>
                    <img className='ion-contact' tabIndex='3' alt="Contact us icon" src={ContactUsIcon}></img>
                </li>
            </ul>
    );
}
