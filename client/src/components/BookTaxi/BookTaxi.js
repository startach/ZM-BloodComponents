import React, { useState, useEffect } from 'react'
import Button from '../button/button'
import { db } from '../firebase/firebase'
import './bookTaxi.css'

export default function BookTaxi({ close }) {

    //object containing pick up info
    const [pickupData, setPickupData] = useState({
        user: localStorage.getItem('userid'),
        from: "",
        backto: "",
        hour: "",
        min: "",
        hospital: localStorage.getItem('hospital')
    })


    const [addressOptions, setAddressOptions] = useState({
        main: "",
        second: ""
    })

    const [screen, setScreen] = useState("book")


    useEffect(() => {
        //get address
        db.collection('users').doc(localStorage.getItem('userid')).get().then(user => {
            setAddressOptions({
                main: `${user.data().address}, ${user.data().city}`,
                second: `${user.data().secondaryAddress}, ${user.data().city}`
            })

        }, err => console.log(err.message))

        //get appointment details

        db.collection('Appointments').doc(localStorage.getItem('appointmentID')).get().then(app => {

            localStorage.setItem('appointmentDate', app.data().date)
            localStorage.setItem('appointmentTime', app.data().time)
        })


        console.log("USE EFFECT RUNNING in BookTaxi")

    }, [])



    //create hours & min arrays
    let arr = [], i;
    for (i = 6; i < 23; i++) {
        arr.push(i)
    }
    let mins = ["00", "15", "30", "45"]

    //get current time
    let d = new Date()
    let h = d.getHours()
    let pos = arr.indexOf(h)
    let timelist = arr.slice(pos).concat(arr.slice(0, pos));

    const handleChange = (e) => {
        console.log(e.target.id, e.target.value)

        setPickupData({ ...pickupData, [e.target.id]: e.target.value })
        console.log(pickupData)
    }

    const confirm = () => {
        setScreen("confirm")
        let time = `${pickupData.hour}:${pickupData.min}`
        db.collection('taxiBookings').add({ ...pickupData, ["date"]: localStorage.getItem('appointmentDate'), ['appointmentID']: localStorage.getItem('appointmentID'), ['time']: time })
    }



    return (
        <div>
            <a className="close" onClick={() => close()}>
                &times;
        </a>


            {screen === "book" ? <div>

                <div className="my-3">
                    I need a ride from
                <div>
                        <select className="addressMenu" onChange={handleChange} id="from">
                            <option>select</option>
                            {Object.values(addressOptions).map((address) => <option>{address}</option>)}
                        </select>
                    </div>
                </div>

                <div className="my-3">
                    I need a ride back to
                <div>
                        <select className="addressMenu" onChange={handleChange} id="backto">
                            <option>select</option>
                            {Object.values(addressOptions).map((address) => <option>{address}</option>)}
                        </select>
                    </div>
                </div>


                <div className="my-3">
                    Pickup Time:
                <div>
                        <select onChange={handleChange} id="hour">
                            {timelist.map((slot) => (
                                <option value={slot}>{slot}</option>
                            ))}
                        </select>:
                <select onChange={handleChange} id="min">
                            {mins.map((min) => (
                                <option value={min}>{min}</option>
                            ))}
                        </select>
                    </div>

                </div>
                <hr />

                <div className="my-3">
                    <b>From:</b>  {pickupData.from ? <span> {pickupData.from} <i class="fa fa-check" aria-hidden="true"></i> </span> : "....."}
                </div>
                <div className="my-3">
                    <b> Back to: </b>  {pickupData.backto ? <span> {pickupData.backto} <i class="fa fa-check" aria-hidden="true"></i> </span> : "....."}
                </div>
                <div className="my-3">
                    <b> Time:</b> {pickupData.min && pickupData.hour ? <span>{pickupData.hour}:{pickupData.min} <i class="fa fa-check" aria-hidden="true"></i> </span> : "....."}
                </div>
                <hr />
                <div className="my-3">
                    <div><b>For appointment:</b></div>
                on {localStorage.getItem('appointmentDate')}, at {localStorage.getItem('appointmentTime')} at {localStorage.getItem('hospital')}
                </div>


                {pickupData.min && pickupData.hour && pickupData.from && pickupData.backto ?

                    <div className="my-3">
                        <Button text="Confirm" onClick={() => {
                            confirm();
                        }}></Button>
                    </div>
                    :
                    <div className="my-3">
                        <Button text="Confirm" color="grey"></Button>
                    </div>
                }


            </div>
                : <div className="mt-5">Your taxi has been confirmed for:


                <div className="my-4">
                        <b>From:</b>  {pickupData.from}
                    </div>
                    <div className="my-4">
                        <b> Back to: </b>  {pickupData.backto}
                    </div>
                    <div className="my-4">
                        <b> Time:</b> {pickupData.hour}: {pickupData.min}
                    </div>

                    If you have any issues on the day, please contact your coordinator.

                </div>}

            <div className="my-3">
                <Button text="Close" color="red" onClick={() => {
                    close();
                }}></Button>
            </div>


        </div>
    )
}
