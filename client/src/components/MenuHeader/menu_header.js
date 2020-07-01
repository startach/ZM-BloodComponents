import React from 'react';
import BackArrow from '../BackArrow';
import BurgerMenu from '../burgerMenu'
import './menuHeader.css'

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
        </div>
    );
}

export default Menu_header;