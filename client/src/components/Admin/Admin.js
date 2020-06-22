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
        setControl(control.admin = "")
    }



    //or include in same as above by passing in which claim to add?
    const handleCord = (e) => {
        e.preventDefault();

        const addCordRole = functions.httpsCallable('addCordRole');
        console.log("cord to add: ", control.cord)
        addCordRole({ email: control.cord }).then(result => {
            console.log(result);
        });
        setControl(control.cord = "")

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
            <div className="text-center">ADMIN PAGE</div>
            <div>ACCESS LEVEL: {accessLevel}</div>



            <form style={{ margin: "40px auto", maxWidth: "300px" }} onSubmit={handleCord}>
                <input type="email" placeholder="User email" id="cord-email" value={control.cord} required />

                <select className="dropdown" id="cord" onChange={handleChange}>
                    <option value="select" className="option">select user to make cord </option>
                    {userList.map((user) => (

                        <option value={user} id="cord" className="option">{user}</option>

                    ))}
                </select>

                <button class="btn btn-small btn-warning">Make Cordinator</button>
            </form>




            <form style={{ margin: "40px auto", maxWidth: "300px" }} onSubmit={handleAdmin}>
                <input type="email" placeholder="User email" id="admin-email" value={control.admin} required />

                <select className="dropdown" id="admin" onChange={handleChange}>
                    <option value="select" className="option">select user to make admin </option>
                    {userList.map((user) => (

                        <option value={user} id="admin" className="option">{user}</option>

                    ))}
                </select>
                <button className="btn btn-small btn-danger">Make Admin</button>
            </form>

        </div>
    )
}
