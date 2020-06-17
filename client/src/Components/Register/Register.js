import React from "react";
import "./Register.css";
import zmIcon from "../../images/Logo.jpg";

export class Register extends React.Component {
  state = {
    fullName: "",
    Email: "",
    Password: "",
    Phone: "",
    City: "",
    Adress: "",
  };

  render() {
    return (
      <div className="imageicon1">
        <img src={zmIcon} id="zmIcon-img" />
        <div className="loginHeader">
          <h1 className="login">
            {" "}
            Sign Up<br></br> Become A Doner{" "}
          </h1>
          <div className="Form">
            <form
              class="Regist-form"
              onSubmit={this.handleSubmit}
              method="POST"
            >
              <label> Full Name:  </label>
              <input
                value={this.state.fullName}
                onChange={this.handleChange}
                type="text"
                name="fullName"
                placeholder="fullName"
              ></input>
              <br></br>
              <label> E-mail:  </label>
              <input
                value={this.state.Email}
                onChange={this.handleChange}
                type="email"
                name="email"
                placeholder="Email"
              ></input>
              <br></br>

              <label> Password  </label>
              <input
                value={this.state.Password}
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="Password"
              ></input>
              <br></br>
              <label> Phone </label>
              <input
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
                placeholder="Email"
              ></input>
              <br></br>
              <label> City:  </label>
              <input
                value={this.state.City}
                onChange={this.handleChange}
                type="email"
                name="email"
                placeholder="City"
              ></input>
              <br></br>
              <label> Address:  </label>
              <input
                value={this.state.Adress}
                onChange={this.handleChange}
                type="Adress"
                name="Adress"
                placeholder="Adress"
              ></input>
              <br></br>

              <div className="BloodDetails">
                <label>Blood Type:  </label>
                <select id="dropdown">
                  <option value="N/A">N/A</option>
                  <option value="1">A+</option>
                  <option value="2">A-</option>
                  <option value="3">B+</option>
                  <option value="4">B-</option>
                  <option value="3">O+</option>
                  <option value="4">O-</option>
                </select>
              </div>

            </form>
            
            <a href="/Regist"> Notifications Prefernces</a>
          </div>
         <button  class="registPart" href="/Regist">Sign Up</button>

        </div>
      </div>
    );
  }
}

export default Register;
