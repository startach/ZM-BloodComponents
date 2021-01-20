import React, { useState, useEffect } from 'react'
import './Notifications.css'
import { db } from '../firebase/firebase'
import { useTranslation } from 'react-i18next';
import { updateUser } from '../../services/userService';

const NotificationOptions = () => {
    const initialSettingsObj = {
        ShowNotifications: false,
        SMS: false,
        Whatsapp: false,
        Phonecall: false,
        Email: false,
        ReminderFrequency: 0,
    }

    const [chosenNotifications, setChosenNotifications] = useState(initialSettingsObj)

    const [showError, setShowError] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    const { t } = useTranslation();
    let languageSelected = localStorage.getItem('i18nextLng');

    //user id from localstorage
    const id = localStorage.getItem('userid');

    const userDoc = db.collection('users').doc(id)

    useEffect(() => {
        // initialize choices
        try {
            if (userDoc) {
                const getChosenNotifications = async () => {
                    const prevChosenNotifications = (await userDoc.get()).data().notifications
                    setChosenNotifications({ ...chosenNotifications, ...prevChosenNotifications })

                    // if previously chose to be notified - if no option chosen, will show error
                    setShowError(prevChosenNotifications?.ShowNotifications)
                }
                getChosenNotifications()
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
            setChosenNotifications(initialSettingsObj)
            userDoc.update({ [`notifications`]: initialSettingsObj })
        }
    }
    return (
        <div id={languageSelected === 'en' ? 'ltrNotificationContainer' : 'rtlNotificationContainer'} className="notifications ma0">
            {
                isLoading ? null :
                    <div className="form-check dib mt3">
                        <label>
                            <input type="checkbox"
                                width={75}
                                // if {ShowNotifications: true} && all else false - they didn't choose a notification option
                                name="ShowNotifications"
                                checked={chosenNotifications.ShowNotifications}
                                onChange={(e) => {
                                    handleShowNotifications(e)
                                }}
                            />
                    &nbsp;
                    {t('userProfile.notifiedOn')}
                        </label>
                        {chosenNotifications.ShowNotifications ?
                            <div>
                                <p>
                                    {t("userProfile.please_remind")}
                                    {chosenNotifications.ReminderFrequency != 0 ? <span>&nbsp;{t("userProfile.every")}</span> : null}
                                &nbsp;
                                <select
                                        name="ReminderFrequency"
                                        value={chosenNotifications.ReminderFrequency}
                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        onFocus="this.size=3"
                                        onBlur="this.size=1">
                                        <option value={0}>{t("userProfile.never")}</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                    </select>
                                    {chosenNotifications.ReminderFrequency != 0 ?
                                        <span>
                                            &nbsp;
                                {chosenNotifications.ReminderFrequency == 1 ?
                                                `${t("userProfile.month")}` : `${t("userProfile.months")}`}
                                        </span> :
                                        null}
                                </p>
                                {
                                    // show error only if previously opted into notifications && no option chosen
                                    showError && Object.values(chosenNotifications).lastIndexOf(true) < 1 ?
                                        <span style={{ color: "red" }}>{t("userProfile.error_notification_type_not_chosen")}</span> :
                                        null
                                }
                                <div>
                                    <div className={languageSelected === 'en' ? 'notificationOptions' : 'notificationOptionsRtl'}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className={`${languageSelected == 'en' ? 'ltrNotifications' : 'rtlNotifications'}`}
                                                name="SMS"
                                                checked={chosenNotifications.SMS}
                                                onChange={(e) => handleChange(e.target.name, e.target.checked)} />
                                            &nbsp;
                                            {t('notificationOptions.SMS')}
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="Whatsapp"
                                                checked={chosenNotifications.Whatsapp}
                                                onChange={(e) => handleChange(e.target.name, e.target.checked)} />
                                                &nbsp;
                                            {t('notificationOptions.Whatsapp')}
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="Phonecall"
                                                checked={chosenNotifications.Phonecall}
                                                onChange={(e) => handleChange(e.target.name, e.target.checked)} />
                                                &nbsp;
                                            {t('notificationOptions.Phonecall')}
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="Email"
                                                checked={chosenNotifications.Email}
                                                onChange={(e) => handleChange(e.target.name, e.target.checked)} />
                                                &nbsp;
                                            {t('notificationOptions.Email')}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            : null}
                    </div>
            }
        </div>
    )
}
export default NotificationOptions
