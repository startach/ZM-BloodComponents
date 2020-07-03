import React from 'react';
import { useHistory } from 'react-router-dom'
import {MDBBtn, MDBIcon } from "mdbreact";

const styles = {
  icon: {
    width: '50px',
    margin: '10px'
  }
};

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
    icon="angle-double-left" 
    className="white" 
    size="2x"
    onClick={() => onClickGoBackArrow()}
    style={styles.image}/>
  )
}

export default BackArrow;