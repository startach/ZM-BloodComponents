import React, {useEffect, useState} from 'react'
import {auth, db, functions} from '../firebase/firebase'
///////
import {useTranslation} from 'react-i18next';
import {hospitals} from "../../utils/enums/hospitals"
//////

export default function Admin() {


    const { t } = useTranslation();


    //set current access level
    const [accessLevel, setAccessLevel] = useState();

    const [response, setResponse] = useState(null);

    //set person to add
    const [userEmail, setUserEmail] = useState("");

    const [hospital, setHospital] = useState("");

    useEffect(() => {

        auth.onAuthStateChanged(function (user) {
            if (user) {
                user.getIdTokenResult().then(function (data) {
                    setAccessLevel(data.claims.userLevel)
                });
            }
        });
    }, [])



    //call backend function with email data from form
    const handleAddRole = (e) => {
        e.preventDefault();
        const role = e.target.name;
        let functionName = ""
        let payload = {
            email: userEmail
        }
        switch (role) {
            case "admin":
                functionName = 'addAdminRole';
                break;
            case "cord":
            default:
                functionName = 'addCordRole';
                break;
            case "hospitalCord":
                functionName = 'addHospitalCordRole';
                payload = { ...payload, hospitalName: hospital }
                break;
        }
        const addAdminRole = functions.httpsCallable(functionName);
        addAdminRole(payload).then(result => {
            setResponse(result)
            console.log(result)
            console.log(result.data.message)
        });

    }

    const handleRemove = (e) => {
        e.preventDefault();

        const removeRole = functions.httpsCallable('removeRole');
        removeRole({ email: userEmail }).then(result => {
            setResponse(result)
            console.log(result)
            console.log(result.data.message)
        });


    }


    //state to use when set up
    const [userList, setUserList] = useState([]);


    let languageSelected = localStorage.getItem('i18nextLng');
    //set drop downs from users in DB
    useEffect(() => {

        db.collection('users').onSnapshot(snapshot => {
            let list = snapshot.docs.map((user) => {
                return user.data().email
            })
            setUserList(list)
        }, err => console.log(err.message))

    }, [])





    const handleChange = (e) => {
        switch (e.target.name) {
            case "hospital":
                setHospital(e.target.value)
                break;
            case "email":
            default:
                setUserEmail(e.target.value)
                break;
        }
    }


    return (
        <div>
            <div className="text-center mt-5">
                <u>
                    {t('admin.accessLevel')}
                </u>:
                <b>
                    {languageSelected === 'en' ? accessLevel : t(`admin.${accessLevel}`)}
                </b>
            </div>

            <form className="mb-5" style={{ margin: "40px auto", maxWidth: "300px" }} >
                <input type="email" placeholder="User email" id="cord-email" value={userEmail} onChange={handleChange} required />
                <select className="dropdown mt-2" id="cord" name="email" onChange={handleChange}>
                    <option value="select" className="option">{t('admin.selectToMakeCord')} </option>
                    {userList.map((user) => (
                        <option value={user} id="cord" className="option">{user}</option>

                    ))}
                </select>

                <button class="btn btn-small btn-warning mt-2" onClick={handleAddRole} name="cord">{t('admin.makeCord')}</button>
                <button className="btn btn-small btn-secondary mt-2 ml-2" onClick={handleRemove}>{t('admin.remove')}</button>
            </form>

            <form style={{ margin: "40px auto", maxWidth: "300px" }} >
                <input type="email" placeholder="User email" id="admin-email" value={userEmail} onChange={handleChange} required />

                <select className="dropdown mt-2" id="admin" name="email" onChange={handleChange}>
                    <option value="select" className="option">{t('admin.selectMakeAdmin')} </option>
                    {userList.map((user) => (

                        <option value={user} id="admin" className="option">{user}</option>

                    ))}
                </select>
                <button className="btn btn-small btn-danger mt-2" onClick={handleAddRole} name="admin">{t('admin.makeAdmin')}</button>
                <button className="btn btn-small btn-secondary mt-2 ml-2" onClick={handleRemove}>{t('admin.remove')}</button>
            </form>


            <form style={{ margin: "40px auto", maxWidth: "300px" }} >
                <input type="email" placeholder="User email" id="admin-email" value={userEmail} onChange={handleChange} required />

                <select className="dropdown mt-2" id="admin" name="email" onChange={handleChange}>
                    <option value="select" className="option">{t('admin.selectMakeHospitalCord')} </option>
                    {userList.map((user) => (
                        <option value={user} id="admin" className="option">{user}</option>
                    ))}
                </select>
                <select className="dropdown mt-2" id="admin" name="hospital" onChange={handleChange}>
                    <option value="select" className="option">{t('admin.selectHospital')} </option>
                    {hospitals.map((hospital) => (
                        <option value={hospital.id} id="admin" className="option">{hospital.name}</option>
                    ))}
                </select>
                <button className="btn btn-small btn-primary mt-2" onClick={handleAddRole} name="hospitalCord">{t('admin.makeHospitalCord')}</button>
                <button className="btn btn-small btn-secondary mt-2 ml-2" onClick={handleRemove}>{t('admin.remove')}</button>
            </form>

            {response ? <div className="text-center">{response.data.message}</div> : null}

        </div>
    )
}
