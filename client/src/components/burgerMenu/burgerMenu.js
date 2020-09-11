import React, { useState, useEffect } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import { auth } from '../firebase/firebase'
import './burgerMenu.css'
import { useTranslation } from 'react-i18next';

const BurgerMenu = () => {
  const languageSelected = localStorage.getItem('i18nextLng');
  const { t } = useTranslation();
  const [accessLevel, setAccessLevel] = useState("loading");

  useEffect(() => {
    setAccessLevel(localStorage.getItem('userLevel'))
    },[])

  const handleLogout = () => {
    // remove localstored userid
    localStorage.removeItem('userid');
    //localStorage.removeItem('photoURL');
    localStorage.removeItem('userLevel');
    //email password sign out & google signout
    auth.signOut();
  }

  var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '40px',
      height: '30px',
      left: languageSelected==='en'?'10px':'none',
      right: languageSelected !=='en'? '10px': 'none',
      top: '20px'
    },
    bmBurgerBars: {
      background: 'white'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '25px',
    },
    bmCross: {
      background: 'black'
    },
    bmMenuWrap: {
      position: 'absolute',
      top: '70px',
      left:'0px',
      height: 'auto',
      transition: 'all 1s ease',
      borderRadius: '4px',
      zIndex:'-1'
    },
    bmMenu: {
      background: '#d5068d',
      padding: '1.0em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '.5em',
    },
    bmItem: {
      color: '#E4FDFF',
      paddingTop: '.8em',
      paddingBottom: '.8em',
      outline: 'none',
      textDecoration: 'none',
      textAlign: 'start',
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0)',
      position: 'fixed',
      width: '30px',
      height: '30px',
      left: languageSelected==='en'?'12px':'none',
      right: languageSelected!=='en'?'12px':'none',
      top: '12px',
    }
  }

  return (
    <div >
      <Menu styles={styles} right={languageSelected !== 'en'}>
        <Link to='/dashboard' className="link">
        {t('burgerMenu.dashboard')} 
        </Link>
        <div className="line"></div>
        {accessLevel === "cord" || accessLevel === "admin" ? <Link to='/add' className="link">
        {t('burgerMenu.addAppointment')} 
            </Link> : null}
        {accessLevel === "cord" || accessLevel === "admin" ? <div className="line"></div> : null}
        {accessLevel === "cord" || accessLevel === "admin" ? <Link to='/edit-delete' className="link">
        {t('burgerMenu.editAppointments')} 
            </Link> : null}
        {accessLevel === "cord" || accessLevel === "admin" ? <div className="line"></div> : null}
        {accessLevel === "cord" || accessLevel === "admin" ? <Link to='/donations-management' className="link">
        {t('burgerMenu.onAirDonations')} 
            </Link> : null}
        {accessLevel === "cord" || accessLevel === "admin" ? <div className="line"></div> : null}
        {accessLevel === "cord" || accessLevel === "admin" ? <Link to='/users' className="link">
        {t('burgerMenu.usersBrowsing')} 
            </Link> : null}
        {accessLevel === "cord" || accessLevel === "admin" ? <div className="line"></div> : null}
        <Link to='/user' className="link">
        {t('burgerMenu.profile')} 
            </Link>
        {/* <div className="line"></div>
        <Link to='/Emergency' className="link">
        {t('burgerMenu.emergencyDonation')} 
            </Link> */}
        <div className="line"></div>
        {accessLevel === "admin" ? <Link to='/admin' className="link">
        {t('burgerMenu.Admin')} 
            </Link> : null}
        {accessLevel === "admin" ? <div className="line"></div> : null}
        <Link to='/login' className="link" onClick={handleLogout}>
        {t('burgerMenu.Logout')} 
            </Link>
      </Menu>
    </div>
  )
}



export default BurgerMenu;
