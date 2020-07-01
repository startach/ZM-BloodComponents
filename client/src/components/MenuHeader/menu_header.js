import React, {useState} from 'react';
import BackArrow from '../BackArrow';
import BurgerMenu from '../burgerMenu'
import './menuHeader.css'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

let styles = {
    header: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: '#fafafa',
        color: 'BLACK',
        borderBottom: '1px solid black'
    },
    backArrow: {
        display: 'flex',
        justifyContent: 'start',

    },
    burgerMenu: {
        // display: 'flex',
        // justifyContent: 'start',

    },
    backArrowIcon: {
        display: 'flex',
    },
    title: {
        fontSize: '1.0em',
        color: 'black',
        fontWeight: 'bold',

    },
    titleSingle: {
        // display: 'flex',
        // justifyContent: 'center',
        fontSize: '30px',
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
        width: '70%',

    },
    imgIcon: {
        width: '40px',
    }


};

const Menu_header = (props) => {

    const { t } = useTranslation();

    const handleChange = e => {

        i18next.changeLanguage(e.target.value)
    }
  
    const photoURL = localStorage.getItem('photoURL')
    return (
        <div className="col-xs-12 navbar-fixed-top fixed-top" style={styles.header}>
            <div className="col-xs-1 vcenter" style={styles.backArrow}>
                {/* change the icon depending on the page we are in */}
                {props.icon === 'backArrow' ? <BackArrow style={styles.backArrowIcon} /> : props.icon === 'burger' ? <BurgerMenu style={styles.burgerMenu} /> : null}
            </div>

            <span className="col-xs-8 tc title" style={styles.titleSingle}>
                <p className="titleText"> {props.title}</p>
            </span>

      

      <select style={{width:"50px"}} onChange={handleChange} >
            <option value='heb'>עִברִית</option>
            <option value='ara'>عربى</option>
            <option value='en'>en</option>
    </select>
 


            <div className="col-xs-2 vcenter pa2">
                {/* <img 
                style={styles.imgIcon}
                src={photoURL}>
                </img>  */}
            </div>

        </div>
    );
}

export default Menu_header;