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
    Address: "",
  };

  AddUser(e)
  {
    
    //const  db = fire.firestore();
    //let setDocRef = db.collection('ManageUsers').doc('users')
    //setDocRef.update(data);
    //let alovelaceDocumentRef = db.collection('users').doc('users').add(data);
    }

  


    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  

  render() {
    this.handleChange = this.handleChange.bind(this);

    return (
      <div className="imageicon1">
        <img src={zmIcon} id="zmIcon-img" />
        <div className="loginHeader">
          <h1 className="login">
            {" "}
            Sign Up<br></br> Become A Doner{" "}
          </h1>
          <div className="form">
            <form
              class="Regist-form"
              onSubmit={this.handleSubmit}
              method="POST"
            >
              <fieldset>
                <label> Full Name: </label>
                <input
                  value={this.state.fullName}
                  onChange={this.handleChange}
                  type="text"
                  name="fullName"
                  placeholder="fullName"
                ></input>
                <br></br>
                <label> E-mail: </label>
                <input
                  value={this.state.Email}
                  onChange={this.handleChange}
                  type="text"
                  name="Email"
                  placeholder="Email"
                ></input>
                <br></br>

                <label> Password </label>
                <input
                  value={this.state.Password}
                  onChange={this.handleChange}
                  type="password"
                  name="Password"
                  placeholder="Password"
                ></input>
                <br></br>
                <label> Phone </label>
                <input
                  value={this.state.Phone}
                  onChange={this.handleChange}
                  type="Phone"
                  name="Phone"
                  placeholder="Phone"
                ></input>
                <br></br>
                <label> City: </label>
                <input
                  value={this.state.City}
                  onChange={this.handleChange}
                  type="City"
                  name="City"
                  placeholder="City"
                ></input>
                <br></br>
                <label> Address: </label>
                <input
                  value={this.state.Address}
                  onChange={this.handleChange}
                  type="Address"
                  name="Address"
                  placeholder="Address"
                ></input>
                <br></br>

                <div className="BloodDetails">
                  <label>Blood Type: </label>
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
              </fieldset>
            </form>
          </div>
          <button class="savelivestxt" href="/Regist">
            {" "}
            <strong>Notifications Prefernces</strong>
          </button>
          <br></br>

          <button class="loginbutt" onClick={this.AddUser} >
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
