import React from 'react';
import BackArrow from '../BackArrow';
import BurgerMenu from '../burgerMenu'
import './menuHeader.css'
import LanguageSwitch from '../languageSwich/LanguageSwitch';
import {MDBBtn, MDBIcon } from "mdbreact";
let styles = {
    header: {
        alignItems: "center",
        backgroundColor: '#d5068d',
        color: 'black',
        // borderBottom: '1px solid black',
        height: '60px',
    }
}

const Menu_header = (props) => {
    return (
        <div className="headerBody">
            <div className="burger">
                {props.icon === 'backArrow' ? <BackArrow/> : props.icon === 'burger' ? <BurgerMenu/> : null}
            </div>

            <div className="title"> 
                {props.title}
            </div>

            <div className="language">
                <MDBIcon icon="bolt" className="ml-2 white bg-green pa2" size="2x"/>
                {/* <LanguageSwitch caption='' /> */}
            </div>
        </div>
    );
}

export default Menu_header;