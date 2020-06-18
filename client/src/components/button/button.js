import React from 'react'
import './button.css'

const button = (props) => {
    return (
        <div className = "btnContainer">

                <button id = "btn" type="button"  onClick={props.onClick}> {props.text} </button>
            </div>

    )
}

export default button
