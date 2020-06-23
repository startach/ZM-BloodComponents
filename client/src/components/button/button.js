import React from 'react'
import './button.css'

const button = (props) => {
    return (
        <div style = {{'margin-top': props.marginTop}} className="btnContainer">

            <button id="btn" type={props.type}  style={{ 'background-color': props.color , 'width':props.width }}
                onClick={props.onClick}> {props.text} </button>
        </div>

    )
}

export default button
