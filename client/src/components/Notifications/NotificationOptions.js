import React, { useState, useEffect } from 'react'
import './Notifications.css'
import { db } from '../firebase/firebase'

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const NotificationOptions = () => {
    const [chosenNotifications, setChosenNotifications] = useState({
        ShowNotifications: false,
        SMS: false,
        Whatsapp: false,
        Phonecall: false,
        Email: false
    })

    const [showError, setShowError] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    const { t } = useTranslation();
    let languageSelected = localStorage.getItem('i18nextLng');

    //user id from localstorage
    const id = localStorage.getItem('userid');

    const userDoc = db.collection('users').doc(id)
    useEffect(async () => {
        // initialize choices
        try {
            if (userDoc) {
                const prevChosenNotifications = (await userDoc.get()).data().notifications
                setChosenNotifications({ ...chosenNotifications, ...prevChosenNotifications })

                // if previously chose to be notified - if no option chosen, will show error
                setShowError(prevChosenNotifications?.ShowNotifications)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const handleChange = (propertyName, propertyValue) => {
        setChosenNotifications({ ...chosenNotifications, [propertyName]: propertyValue })
        //update database 
        userDoc.update({ [`notifications.${propertyName}`]: propertyValue })
    }

    const handleShowNotifications = (e) => {
        if (e.target.checked) {
            handleChange(e.target.name, e.target.checked)
        }
        else {
            const nextChosenNotifications = {
                ShowNotifications: false,
                SMS: false,
                Whatsapp: false,
                Phonecall: false,
                Email: false
            }
            setChosenNotifications(nextChosenNotifications)
            userDoc.update({ [`notifications`]: nextChosenNotifications })
        }
    }
    return (
        <div id={languageSelected === 'en' ? 'ltrNotificationContainer' : 'rtlNotificationContainer'} className="notifications ma0">
            {
                isLoading ? null : <div className="form-check dib mt3">
                    <input type="checkbox"
                        width={75}
                        // if {ShowNotifications: true} && all else false - they didn't choose a notification option
                        name="ShowNotifications"
                        checked={chosenNotifications.ShowNotifications}
                        onChange={(e) => {
                            handleShowNotifications(e)
                        }}
                    />
                    {t('userProfile.notifiedOn')}
                    {chosenNotifications.ShowNotifications ?
                        <div>
                            {
                                // show error only if previously opted into notifications && no option chosen
                                showError && Object.values(chosenNotifications).lastIndexOf(true) < 1 ?
                                    <span style={{ color: "red" }}>Must choose one</span> :
                                    null
                            }
                            <div className="options">
                                <div className={languageSelected === 'en' ? 'notificationOptions' : 'notificationOptionsRtl'}>
                                    <div>
                                        <input
                                            type="checkbox"
                                            className={`form-check-input ${languageSelected == 'en' ? 'ltrNotifications' : 'rtlNotifications'}`}
                                            name="SMS"
                                            checked={chosenNotifications.SMS}
                                            onChange={(e) => handleChange(e.target.name, e.target.checked)} />
                                        <label className="form-check-label" htmlFor="exampleCheck1">{t('notificationOptions.SMS')}</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name="Whatsapp"
                                            checked={chosenNotifications.Whatsapp}
                                            onChange={(e) => handleChange(e.target.name, e.target.checked)} />
                                        <label className="form-check-label" htmlFor="exampleCheck1">{t('notificationOptions.Whatsapp')}</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name="Phonecall"
                                            checked={chosenNotifications.Phonecall}
                                            onChange={(e) => handleChange(e.target.name, e.target.checked)} />
                                        <label className="form-check-label" htmlFor="exampleCheck1">{t('notificationOptions.Phonecall')}</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name="Email"
                                            checked={chosenNotifications.Email}
                                            onChange={(e) => handleChange(e.target.name, e.target.checked)} />
                                        <label className="form-check-label" htmlFor="exampleCheck1">{t('notificationOptions.Email')}</label>
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                </div>
                }
        </div>
    )
}
export default NotificationOptions
