import React from "react";
// import aboutIcon from "./About.svg";
// import ContactUsIcon from "./Contact_us.svg";
// import DonateIcon from "./Donate.svg";
import "./bottomBar.css"

export default function BottomBar() {
    const aboutIcon = '/img/Info-Icon.png'
    const ContactUsIcon = '/img/Contact-Icon.png'
    const DonateIcon = '/img/Donate-Icon.png'

    const addIconClass = (e) => {
        e.target.classList.add('iconClicked')
    }

    return (

        <div className='listContainer fixed-bottom'>
            <div className='' onClick={(e) => { addIconClass(e) }}>
                <img className='' alt="About icon" tabIndex='1' src={aboutIcon}></img>
            </div>

            <div className='' onClick={(e) => { addIconClass(e) }}>
                <img className='' tabIndex='2' alt="Donate icon" src={DonateIcon}></img>
            </div>
            <div className='' onClick={(e) => { addIconClass(e) }}>
                <img className='' tabIndex='3' alt="Contact us icon" src={ContactUsIcon}></img>
            </div>
        </div>
    );
}
