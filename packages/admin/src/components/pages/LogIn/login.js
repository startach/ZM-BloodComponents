import React from 'react';
import LoginForm from '../../loginForm'
import { useHistory } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { Fragment, useState } from 'react';
function Login() {
  const history = useHistory();
  const user = '';
  const userId = user.userid;

  if (userId) {
    history.push('/dashboard');
  }
  //   if (localStorage.getItem('userid')) history.push('/dashboard');

  return (
    <Fragment>
      <LoginForm />
    </Fragment>
  );
}

export default Login;
