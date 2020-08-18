import React, { Component } from 'react';
import Popup from "reactjs-popup";
import { useTranslation } from 'react-i18next';
import '../YesNoPopUp/yesNoPopUp.css';

export default function YesNoPopUp(props) {
    const { t } = useTranslation();
    const { text, handleYes, children, ...other } = props;

    return (    
        <Popup 
            className="popup2" 
            trigger={children}
            modal
            position="left top" 
            closeOnDocumentClick
            contentStyle={{ width: "20px" }}>
            { close => (
                <div className="container">
                <a className="close" onClick={close}>
                    X
                </a>
                <div className="content">
                    {text}?
                </div>
                <div className="actions">
                    <button
                    className="yesButton"
                    onClick={(e) => {
                        handleYes({...other})
                        close();
                    }}>
                    {t('general.Yes')}
                    </button>
                    <button
                    className="noButton"
                    onClick={() => {
                        close();
                    }}>
                    {t('general.No')}
                    </button>
                </div>
                </div>
            )}
        </Popup>
    )
}