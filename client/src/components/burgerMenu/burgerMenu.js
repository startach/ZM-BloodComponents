import React, { Component, useState, useEffect } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import { auth } from '../firebase/firebase'
import './burgerMenu.css'
import { Dropdown } from 'react-bootstrap';

const BurgerMenu = () => {

  const [accessLevel, setAccessLevel] = useState("loading");


  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        user.getIdTokenResult().then(function (data) {
          console.log(data.claims)
          setAccessLevel(data.claims.userLevel)
        });
      }
    });
  }, [])

  const handleLogout = () => {
    // remove remove localstored userid
    localStorage.removeItem('userid');
    auth.signOut();

  }


  var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '50px',
      height: '30px',
      left: '12px',
      top: '12px',
    },
    bmBurgerBars: {
      background: '#373a47'
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
      position: 'fixed',
      top: '57px',
      height: 'auto',
      transition: 'all 1s ease',
      borderRadius: '4px'
    },
    bmMenu: {
      background: '#DEB675',
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
      fontFamily: 'Montserrat',
      outline: 'none',
      textDecoration: 'none',
      textAlign: 'left',


    },

    bmOverlay: {
      background: 'rgba(0, 0, 0, 0)',
      position: 'fixed',
      width: '50px',
      height: '30px',
      left: '12px',
      top: '12px',
    }
  }
  return (
    <div>
      <Menu styles={styles} className="tc shadow-5">
        <Link to='/dashboard' className="link">
          Dashboard
            {/* <a id="dashboard" className="menu-item">Dashboard</a> */}
        </Link>
        <div className="line"></div>
        {accessLevel === "cord" || accessLevel === "admin" ? <Link to='/add' className="link">
          Add Appointments
            </Link> : null}
        {accessLevel === "cord" || accessLevel === "admin" ? <div className="line"></div> : null}
        <Link to='/user' className="link">
          Profile
            </Link>
        <div className="line"></div>
        <Link to='/Emergency' className="link">
          Emergency Donation
            </Link>
        <div className="line"></div>
        <Link to='/prevapp' className="link">
          Previous  Appointments
            </Link>
        <div className="line"></div>
        {accessLevel === "admin" ? <Link to='/admin' className="link">
          Admin
            </Link> : null}
        {accessLevel === "admin" ? <div className="line"></div> : null}
        <Link to='/login' className="link" onClick={handleLogout}>
          Logout
            </Link>
      </Menu>
    </div>
  )
}



export default BurgerMenu;
