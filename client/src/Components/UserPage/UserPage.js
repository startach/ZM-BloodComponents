import React, { useRef, useState } from 'react'
import "./UserPage.css"
import Notifications from '../Notifications/Notifications.js'

export default function UserPage() {

    //state for user
    const [userDetails, setUserDetails] = useState({
        email: "dvir@gmail.com",
        phone: "972-53-01243567",
        address: "123 Main St, Haifa, Isreal"
    })


    //state for if data feild is currently editable or not
    const [editable, setEditable] = useState({
        emailData: false,
        phoneData: false,
        addressData: false,
    })


    //set up refs for data field nodes (to link with the buttons below)
    const emailNode = useRef(null)
    const phoneNode = useRef(null)
    const addressNode = useRef(null)

    //run when edit button is clicked
    const handleEdit = (e, dataType) => {

        console.log("user details", userDetails)

        //allows you to edit another feild, only if no other feilds are open
        if ((editable.emailData === true || editable.phoneData === true || editable.addressData === true) && editable[dataType] === false) return

        //set data feild to editable
        setEditable({ ...editable, [dataType]: !editable[dataType] })
        console.log("editable content", editable, editable[dataType])

        //alligns data field with correct data node based on edit button clicked
        let currentNode = ""
        dataType === "emailData" ? currentNode = emailNode : dataType === "phoneData" ? currentNode = phoneNode : currentNode = addressNode

        console.log("refed node", currentNode.current)

        if (e.target.textContent == "Save") {
            //options for non-editable state
            e.target.textContent = "Edit"
            e.target.style.backgroundColor = "#DEB675"
            e.target.style.transform = "translateY(+2px) scale(1)";
            currentNode.current.style.backgroundColor = "white"
            currentNode.current.style.border = "none";

            //save new data to state on click of save
            let currentData = ""
            dataType === "emailData" ? currentData = "email" : dataType === "phoneData" ? currentData = "phone" : currentData = "address"
            setUserDetails({ ...userDetails, [currentData]: currentNode.current.textContent })

            //send to database TODO:

        }
        else {
            //options for editable state
            e.target.textContent = "Save"
            e.target.style.backgroundColor = "crimson"
            e.target.style.transform = "scale(1.11) translateY(-2px)";
            currentNode.current.style.border = "medium solid #DEB675";
        }

    }
    return (
        <div className="userPage" >

            <div className="title">User Page</div>
            <div className="line1"></div>
            <div className="topBox">
                <div className="name topBox-right">Dvir Cohen</div>
                <div className="topBox-right">
                    <span className="bloodType">Blood Type:</span>
                    <span>B-</span></div>
            </div>

            <div className="line2"></div>


            <div className="userDetails" >
                <div className="dataItem">
                    <div className="icon"><i className="far fa-envelope"></i></div>
                    <div ref={emailNode} className="data" contentEditable={editable.emailData} suppressContentEditableWarning={true}>
                        {userDetails.email}
                    </div>
                    <div className="editBtn" onClick={(e) => handleEdit(e, "emailData")}>Edit</div>
                </div>
                <div className="dataItem">
                    <div className="icon"><i className="fas fa-phone"></i></div>
                    <div ref={phoneNode} className="data" contentEditable={editable.phoneData} suppressContentEditableWarning={true}>
                        {userDetails.phone}
                    </div>
                    <div className="editBtn" onClick={(e) => handleEdit(e, "phoneData")}>Edit</div>
                </div>
                <div className="dataItem">
                    <div className="icon"><i className="fas fa-home"></i></div>
                    <div ref={addressNode} className="data" contentEditable={editable.addressData} suppressContentEditableWarning={true}>
                        {userDetails.address}
                    </div>
                    <div className="editBtn" onClick={(e) => handleEdit(e, "addressData")}>Edit</div>
                </div>
                <Notifications />
            </div>


        </div>

    )

}
