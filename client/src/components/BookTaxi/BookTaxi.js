import React, { useState, useEffect, Link } from 'react'
import Button from '../button/button'
import { db } from '../firebase/firebase'
import './bookTaxi.css'

///////
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
//////

export default function BookTaxi({ close, bookingData, setBookingData, setRideBooked, rideBooked }) {
    const { t } = useTranslation();

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

        if (rideBooked) {
            setPickupData(bookingData)
            setScreen("confirmed")
        }
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
        setRideBooked(true)
        let time = `${pickupData.hour}:${pickupData.min}`
        db.collection('taxiBookings').add({ ...pickupData, ["date"]: localStorage.getItem('appointmentDate'), ['appointmentID']: localStorage.getItem('appointmentID'), ['time']: time })

    }


    const deleteRideFunc = (appId) => {

        console.log("bookingdata is", appId)

        var deleteRide = db.collection('taxiBookings').where("appointmentID", "==", appId);


        deleteRide.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });


        setRideBooked(false)
        setBookingData(null)

    }
    let languageSelected = localStorage.getItem('i18nextLng')


    return (
        <div className={languageSelected==='en'?'rideContainer':'rideContainerRtl'}>
            <a className="close" onClick={() => close()}>
                &times;
        </a>


            {!rideBooked ? <div>

                <div className="my-3">
                    {t('bookTaxi.rideFrom')}
                <div>
                        <select className="addressMenu" onChange={handleChange} id="from">
                            <option>{t('general.select')}</option>
                            {Object.values(addressOptions).map((address) => <option>{address}</option>)}
                        </select>
                    </div>
                </div>

                <div className="my-3">
                {t('bookTaxi.rideBack')}
                <div>
                        <select className="addressMenu" onChange={handleChange} id="backto">
                            <option>{t('general.select')}</option>
                            {Object.values(addressOptions).map((address) => <option>{address}</option>)}
                        </select>
                    </div>
                </div>


                <div className="my-3">
                {t('bookTaxi.pickupTime')}:
                <div className="time">
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
                    <b>{t('bookTaxi.from')}:</b>  {pickupData.from ? <span> {pickupData.from} <i class="fa fa-check" aria-hidden="true"></i> </span> : "....."}
                </div>
                <div className="my-3">
                    <b> {t('bookTaxi.backTo')}: </b>  {pickupData.backto ? <span> {pickupData.backto} <i class="fa fa-check" aria-hidden="true"></i> </span> : "....."}
                </div>
                <div className="my-3 ">
                    <b> {t('dashboard.Time')}:</b> {pickupData.min && pickupData.hour ? <span>{pickupData.hour}:{pickupData.min} <i class="fa fa-check" aria-hidden="true"></i> </span> : "....."}
                </div>
                <hr />
                <div className="my-3">
                    <div><b>{t('bookTaxi.forAppointment')}:</b></div>
                    {t('general.on')} {localStorage.getItem('appointmentDate')}, {t('general.at')} {localStorage.getItem('appointmentTime')} {t('general.at')} {localStorage.getItem('hospital')}
                </div>


                {pickupData.min && pickupData.hour && pickupData.from && pickupData.backto ?

                    <div className="my-3">
                        <Button text={t('bookTaxi.confirm')} onClick={() => {
                            confirm();
                        }}></Button>
                    </div>
                    :
                    <div className="my-3">
                        <Button text={t('bookTaxi.confirm')} color="grey"></Button>
                    </div>
                }

                <div className="my-3">
                    <Button text={t('bookTaxi.close')} color="#d5068d;" onClick={() => {
                        close();
                    }}></Button>
                </div>


            </div>
                : <div className="mt-5">{t('bookTaxi.taxiConfirm')}:


                <div className="my-4">
                        <b><span className="highlight">{t('bookTaxi.from')}: </span></b>  {pickupData.from}
                    </div>
                    <div className="my-4">
                        <b><span className="highlight">{t('bookTaxi.backTo')}: </span></b>   {pickupData.backto}
                    </div>
                    <div className="my-4">
                        <b><span className="highlight">{t('dashboard.Time')}: </span></b>   {pickupData.hour}: {pickupData.min}
                    </div>

                    {t('bookTaxi.editOrCancelPhrase')}.

                    <div className="my-3">
                        <div className="my-3">
                            <Button text="{t('bookTaxi.close')}" color="#d5068d;" onClick={() => {
                                close();
                            }}></Button>
                        </div>
                        <div className="my-5">
                            <Button text="{t('bookTaxi.cancelRide')}" color="#adb43a" onClick={() => {
                                deleteRideFunc(bookingData.appointmentID);
                                close();

                            }}></Button>
                        </div>

                    </div>

                </div>}




        </div>
    )
}
