import React, { useRef, useState, useEffect, Fragment } from 'react'
import "./UserDetails.css"
import { db, auth } from '../firebase/firebase'
import i18next from 'i18next';
import Button from '../button'
import { updateUser } from '../../services/userService';

export default function UserDetails(props) {
  const { t, userId, userDetails, editableMode } = props;

  const [chosenBloodType, setChosenBloodType] = useState();
  const [editingNode, setEditingNode] = useState();

  //set up refs for data field nodes (to link with the buttons below)
  const emailNode = useRef(null);
  const phoneNode = useRef(null);
  const cityNode = useRef(null);
  const addressNode = useRef(null);
  const secondaryAddressNode = useRef(null);

  // Add coordinator name and preferred hospital when exists
  const details = [{ 
    detailNode: emailNode, 
    title: 'userDetails.email', 
    detail: 'email', 
    isEdit: editableMode
  }, { 
    detailNode: phoneNode, 
    title: 'userDetails.contactNumber', 
    detail: 'phone', 
    isEdit: editableMode 
  }, { 
    detailNode: cityNode, 
    title: 'userDetails.city', 
    detail: 'city', 
    isEdit: editableMode 
  }, { 
    detailNode: addressNode, 
    title: 'userDetails.address', 
    detail: 'address', 
    isEdit: editableMode 
  }, {
    detailNode: secondaryAddressNode,
    title: 'userDetails.secondaryAddress',
    detail: 'secondaryAddress',
    isEdit: editableMode
  }];

  const handleEdit = (e, clickedNode, detail) => {
    console.log("user details", userDetails)

    // Other field is being edited
    if (editingNode && editingNode !== clickedNode)
      return;

    // Consider changing className instead of style
    // Save was clicked (editingNode equals clickedNode)
    if (editingNode) {
      e.target.style.backgroundColor = "#d5068d"
      e.target.style.transform = "scale(1)";
      clickedNode.current.style.border = "none";
      clickedNode.current.contentEditable = false
      updateUser(userId, {
        [detail]: clickedNode.current.textContent
      });
      setEditingNode(null);
      return;
    }

    // Edit was clicked
    e.target.style.backgroundColor = "gray"
    e.target.style.transform = "scale(1.11) translateY(-2px)";
    clickedNode.current.style.border = "medium solid gray";
    clickedNode.current.contentEditable = true;
    setEditingNode(clickedNode);
  };

  const handleBloodTypeChange = (e) => {
    setChosenBloodType(e.target.value);
  };

  const handleBloodTypeUpdate = () => {
    if (chosenBloodType) {
      updateUser(userId, {
        bloodType: chosenBloodType
      });
    }
  };

  return (
    <div>
      <div className="topBox">
        <div className="topBox-right">
          {userDetails.name}
        </div>
        <div className="topBox-right">
          <span className="bloodType">{t('userDetails.bloodType')}</span>
            {editableMode && userDetails.bloodType === "dontKnow" ? (
              <Fragment>
                {/* Later change it to a seperate reusable component */}
                <select
                  className="userBloodType"
                  onChange={handleBloodTypeChange}
                  required>
                    <option value="" selected disabled>
                        {t("registerForm.selectBloodType")}
                    </option>
                    <option value="dontKnow"> {t("registerForm.dontKnow")}</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>

                <Button text= {t("general.save")} onClick={handleBloodTypeUpdate} disabled={!chosenBloodType} width = "100px" marginTop = "10px"></Button>
              </Fragment>
            ) :
            (
              <Fragment>
                <span style={{ color: 'red' }}>{userDetails.bloodType}</span>
              </Fragment>
            )}
        </div>
      </div>

      <div className="line2">
      </div>

      <div className="userDetails">
        {details.map((item) => {
          return (
            <div key={item.detail} className="dataItem">
              <div className="iconBackground">
                {t(item.title)}
              </div>
              <div
                ref={item.detailNode}
                className="data"
                contentEditable={false}
                suppressContentEditableWarning={true}>
                  {userDetails[item.detail]}
              </div>
              {item.isEdit ? (
                <div
                  className="editBtn"
                  onClick={(e) => handleEdit(e, item.detailNode, item.detail)}>
                    {/* Consider Adding cancel button also */}
                    {editingNode === item.detailNode ? t('general.save') : t('general.edit')}
                </div>
              ): null}
            </div>
          )
        })}
      </div>
    </div>
  )
}