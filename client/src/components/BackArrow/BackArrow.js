import React from 'react';
import { useHistory } from 'react-router-dom'

const styles = {
  image: {
    width: '40px',
    height: '35px'
  },
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
    <img
      onClick={() => onClickGoBackArrow()}
      alt="presentation"
      style={styles.image}
      src="/img/back-button.svg" />
    );
}

export default BackArrow;