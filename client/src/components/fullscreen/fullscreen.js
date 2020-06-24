import React from 'react'
import './fullscreen.css'

const FullScreen = (props) => {
  return (
    <div className="fullscreenContainer">
      {props.children}
    </div>
  )
}

export default FullScreen
