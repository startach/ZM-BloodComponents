import React from "react";
import "./Login.css";
import zmIcon from "../../images/Logo.jpg";

export class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  render() {
    this.handleChange = this.handleChange.bind(this);

    return (
      <div className="loginPage">
        <img className="img" src={zmIcon} id="zmIcon-img" />
        <div className="loginHeader">
          <h1 className="login"> Blood Components Donations </h1>
          <div className="form">
            <form class="login-form" onSubmit={this.handleSubmit} method="POST">

              <label> E-mail: </label>
              <input
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
                placeholder="Email"
              ></input>
                <br></br>
                <label> Password: </label>

              <input
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                placeholder="Password"
                name="password"
              ></input>
              <br></br>
              <button type="submit" className="loginbutt" onClick={this.login}>
                Login{" "}
              </button>
            </form>

          <div class="registPart">
            <p>Not signed up as donor yet</p>

            {/* <button type="submit"  onClick={this.login}>
              Come Save Lives{" "}
            </button> */}
            <a  class="registPart" href="/Regist">Come Save Lives</a>
          </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Login;
