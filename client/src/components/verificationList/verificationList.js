import React from 'react'
import Button from '../button'
import './verificationList.css'
import {Link} from 'react-router-dom'

const VerificationList = () => {
    return (
        <div>

            <div className="introContainer">

                <p id="introHeader">Thanks, we're expecting you on the <b>dd/mm/yyyy</b> at <b>X</b> hospital</p>

            </div>

                <h2 id = "forgetText" ><b>Don't Forget to</b></h2>

       
            <ul className="bringList">

                <li id="toBring">Bring your ID with you</li>

                <li id="toBring" >Eat some fruit/snack (but not a fatty one)</li>

                <li id="toBring">Drink some water</li>

            </ul>

                <p id="footer">Have a nice day ,</p>


            <Link id ="link" to ="/dashboard">
                <Button text = "Dashboard"/>
                </Link>


        </div>
    )
}

export default VerificationList
