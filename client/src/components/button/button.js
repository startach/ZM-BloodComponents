import React from 'react'
import './button.css'

const button = (props) => {
    return (
        <div style = {{'marginTop': props.marginTop}} className="buttonContainer">

            <button id="btn" type={props.type}  style={{ 'background': props.color , 'width':props.width }}
                onClick={props.onClick}> {props.text} </button>
        </div>

    )
}

export default button
