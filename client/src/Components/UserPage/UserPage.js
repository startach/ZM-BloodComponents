import React, { useRef, useState } from 'react'
import "./UserPage.css"
import Notifications from '../Notifications/Notifications.js'

export default function UserPage() {

    const [editable, setEditable] = useState({
        emailData: false,
        phoneData: false,
        addressData: false,
    })
    const emailNode = useRef(null)
    const phoneNode = useRef(null)
    const addressNode = useRef(null)


    const handleEdit = (e, dataType) => {
        console.log(editable.dataType)
        if ((editable.emailData === true || editable.phoneData === true || editable.addressData === true) && editable[dataType] === false) return

        setEditable({ ...editable, [dataType]: !editable[dataType] })
        console.log(editable, editable[dataType])

        let currentNode = ""
        dataType === "emailData" ? currentNode = emailNode : dataType === "phoneData" ? currentNode = phoneNode : currentNode = addressNode

        console.log(currentNode.current)

        if (e.target.textContent == "Save") {
            e.target.textContent = "Edit"
            e.target.style.backgroundColor = "#DEB675"
            e.target.style.transform = "translateY(+2px) scale(1)";

            currentNode.current.style.backgroundColor = "white"
            currentNode.current.style.border = "none";

        }
        else {
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
                    <div ref={emailNode} className="data" contentEditable={editable.emailData} suppressContentEditableWarning={true}>dvir@gmail.com</div>
                    <div className="editBtn" onClick={(e) => handleEdit(e, "emailData")}>Edit</div>
                </div>
                <div className="dataItem">
                    <div className="icon"><i className="fas fa-phone"></i></div>
                    <div ref={phoneNode} className="data" contentEditable={editable.phoneData} suppressContentEditableWarning={true}>972-53-01243567</div>
                    <div className="editBtn" onClick={(e) => handleEdit(e, "phoneData")}>Edit</div>
                </div>
                <div className="dataItem">
                    <div className="icon"><i className="fas fa-home"></i></div>
                    <div ref={addressNode} className="data" contentEditable={editable.addressData} suppressContentEditableWarning={true}>123 Main St, Haifa, Isreal</div>
                    <div className="editBtn" onClick={(e) => handleEdit(e, "addressData")}>Edit</div>
                </div>


                <Notifications />

            </div>




        </div>

    )

}
