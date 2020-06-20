import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import './burgerMenu.css'
import {Dropdown} from 'react-bootstrap';

const BurgerMenu = () => {
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
          transition:'all 1s ease'
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
          outline : 'none',
          textDecoration: 'none',

        },
        
        bmOverlay: {
          background: 'rgba(0, 0, 0, 0)'
        }
      }
    return (
        <div>
        <Menu styles={styles} className="tc shadow-5">
            <Link to='/dashboard' className="menu-item">
                Dashboard
            </Link>
            <Link to='/profile' className="link">
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
       
        {/* <Dropdown id="dropdown-menu">
            <Dropdown.Toggle 
            variant="success" 
            id="dropdown-basic">
                Dropdown
            </Dropdown.Toggle>
            <Dropdown.Menu className="super-colors">
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Item href="#">Something</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown> */}
       
        </div>
    )
}



export default BurgerMenu;
