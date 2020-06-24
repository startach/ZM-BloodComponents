import React, {useState, useEffect} from 'react'
import './Notifications.css'
import { db } from '../firebase/firebase'

const NotificationOptions = (props) => {
    const [notes, setNotes] = useState('')
    
    //user id from localstorage
    const id = localStorage.getItem('userid');
    useEffect(() => {
        if(!props.notifications){
            setNotes({
                SMS: false,
                Whatsapp: false,
                Phonecall: false,
                Email: false,
                inAppAlert: false
            })
        }else{
           setNotes({...props.notifications})
        }
     }, [])

    const handleChange = (e, isChecked) =>{
         //update the state
        setNotes({ ...notes, [ e.target.value]: !isChecked })
         //update database 
        db.collection('users').doc(id).update({ [`${props.id}.${e.target.value}`]: !isChecked })
    }
    return (
        <div className="options">
            <span className="comment">please select all methods you are happy to be contacted by:</span>
            <div className="notificationOptions">

                <div>
                    <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="exampleCheck1" 
                    value="SMS"
                    checked={notes.SMS}
                    onChange={(e)=>handleChange(e , notes.SMS)}/>
                    <label className="form-check-label" htmlFor="exampleCheck1">SMS</label>
                </div>
                <div>
                    <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="exampleCheck1" 
                    value="Whatsapp"
                    checked={notes.Whatsapp}
                    onChange={(e)=>handleChange(e , notes.Whatsapp)}/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Whatsapp</label>
                </div>
                <div>
                    <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="exampleCheck1" 
                    value="Phonecall"
                    checked={notes.Phonecall}
                    onChange={(e)=>handleChange(e , notes.Phonecall)}/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Phonecall</label>
                </div>
                <div>
                    <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="exampleCheck1" 
                    value="Email"
                    checked={notes.Email}
                    onChange={(e)=>handleChange(e , notes.Email)}/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Email</label>
                </div>
                <div>
                    <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="exampleCheck1" 
                    value="inAppAlert"
                    checked={notes.inAppAlert}
                    onChange={(e)=>handleChange(e , notes.inAppAlert)}/>
                    <label className="form-check-label" htmlFor="exampleCheck1">In-App alert</label>
                </div>
            </div>
        </div>
    )
}
export default NotificationOptions
