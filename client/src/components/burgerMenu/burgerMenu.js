import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import './burgerMenu.css'

const BurgerMenu = () => {


  //set this depending on auth status (global variable)
  const coordinator = true;


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
      height: '400px',
      transition: 'all 1s ease'
    },
    bmMenu: {
      background: '#DEB675',
      padding: '2.0em 1.5em 0',
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
      padding: '.8em',
      fontFamily: 'Montserrat',
      outline: 'none',
      textDecoration: 'none',

    },

    bmOverlay: {
      background: 'rgba(0, 0, 0, 0)'
    }
  }
  return (
    <div>
      <Menu styles={styles} className="tc shadow-5">
        <Link to='/dashboard' className="link">
          Dashboard
            {/* <a id="dashboard" className="menu-item">Dashboard</a> */}
        </Link>
        {coordinator ? <Link to='/add' className="link">
          Add Appointments
            </Link> : null}
        <Link to='/user' className="link">
          Profile
            </Link>
        <Link to='/Emergency' className="link">
          Emergency Donation
            </Link>
        <Link to='/prevapp' className="link">
          Previous  Appointments
            </Link>
        <Link to='/logout' className="link">
          Logout
            </Link>
      </Menu>
    </div>
  )
}



export default BurgerMenu;
