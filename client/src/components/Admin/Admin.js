import React, { useState, useEffect } from 'react'
import { functions, db, auth } from '../firebase/firebase'


export default function Admin() {

    //set current access level
    const [accessLevel, setAccessLevel] = useState();

    //set person to add
    const [control, setControl] = useState({
        admin: null,
        cord: null
    });


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



    //call backend function with email data from form
    const handleAdmin = (e) => {
        e.preventDefault();

        const addAdminRole = functions.httpsCallable('addAdminRole');
        addAdminRole({ email: control.admin }).then(result => {
            console.log(result);
        });

    }



    //or include in same as above by passing in which claim to add?
    const handleCord = (e) => {
        e.preventDefault();

        const addCordRole = functions.httpsCallable('addCordRole');
        addCordRole({ email: control.cord }).then(result => {
            console.log(result);
        });


    }


    const handleRemove = (e, role) => {
        e.preventDefault();

        const removeRole = functions.httpsCallable('removeRole');
        removeRole({ email: control.role }).then(result => {
            console.log(result);
        });


    }


    //state to use when set up
    const [userList, setUserList] = useState([]);


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

        setControl({ ...control, [e.target.id]: e.target.value })
        console.log(control)
    }


    return (
        <div>



            <div className="text-center mt-5">ACCESS LEVEL: <b>{accessLevel}</b></div>



            <form className="mb-5" style={{ margin: "40px auto", maxWidth: "300px" }} >
                <input type="email" placeholder="User email" id="cord-email" value={control.cord} required />

                <select className="dropdown mt-2" id="cord" onChange={handleChange}>
                    <option value="select" className="option">select user to make cord </option>
                    {userList.map((user) => (

                        <option value={user} id="cord" className="option">{user}</option>

                    ))}
                </select>

                <button class="btn btn-small btn-warning mt-2" onClick={handleCord}>Make Cordinator</button>
                <button className="btn btn-small btn-secondary mt-2 ml-2" onClick={(e) => handleRemove(e, "cord")}>Remove</button>
            </form>




            <form style={{ margin: "40px auto", maxWidth: "300px" }} >
                <input type="email" placeholder="User email" id="admin-email" value={control.admin} required />

                <select className="dropdown mt-2" id="admin" onChange={handleChange}>
                    <option value="select" className="option">select user to make admin </option>
                    {userList.map((user) => (

                        <option value={user} id="admin" className="option">{user}</option>

                    ))}
                </select>
                <button className="btn btn-small btn-danger mt-2" onClick={handleAdmin}>Make Admin</button>
                <button className="btn btn-small btn-secondary mt-2 ml-2" onClick={(e) => handleRemove(e, "admin")}>Remove</button>
            </form>

        </div >
    )
}
