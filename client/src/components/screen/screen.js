import React from 'react'
import './screen.css'

const Screen = (props) => {
  
    return (
        <div  className="screenContainer">
        {props.children}
      </div>
    )
}

export default Screen
