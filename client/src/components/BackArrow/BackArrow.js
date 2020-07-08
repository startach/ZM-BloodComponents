import React from 'react';
import { useHistory } from 'react-router-dom'
import {MDBBtn, MDBIcon } from "mdbreact";

const styles = {
  icon: {
    width: '50px',
    margin: '10px'
  }
};

let languageSelected = localStorage.getItem('i18nextLng');

const BackArrow = (props) => {
  let history = useHistory();
  function onClickGoBackArrow() {
    if (props.entryPoint) {
      window.location = 'http://127.0.0.1';
    } else {
      history.goBack();
    }
  }

  return (
    <MDBIcon 
    icon={languageSelected==='en'?'arrow-left' : 'arrow-right'}   
    size={props.size}
    onClick={() => onClickGoBackArrow()}
    style={{"color" : props.color , "marginLeft" : props.marginLeft , "marginTop" : props.marginTop , "fontFamily" : "Font Awesome 5 Free"}}/>
  )
}

export default BackArrow;