import React from 'react'
import Button from '../button'
import './verificationList.css'
import { Link } from 'react-router-dom'
import Popup from "reactjs-popup";
import BookTaxi from '../BookTaxi/BookTaxi'


const VerificationList = () => {
    return (
        <div>
            <div className="introContainer">

                <p id="introHeader">Thanks, we're expecting you on the <b>dd/mm/yyyy</b> at <b> {localStorage.getItem('hospital')} </b> Hospital</p>
            </div>

            <div className="my-4">
                <Popup trigger={<Button type="button" text="I Need A Ride" color='#C71585' width="150px"></Button>} modal position="left top" closeOnDocumentClick>
                    <div>
                        <BookTaxi />
                    </div>
                </Popup>
            </div>


            <h2 id="forgetText" ><b>Don't Forget to</b></h2>


            <ul className="bringList">

                <li id="toBring">Bring your ID with you</li>

                <li id="toBring" >Eat some fruit/snack (but not a fatty one)</li>

                <li id="toBring">Drink some water</li>

            </ul>

            <p id="footer">Have a nice day & thank you for donating</p>


            <Link id="link" to="/dashboard">
                <Button text="Dashboard" />
            </Link>


        </div>
    )
}

export default VerificationList
