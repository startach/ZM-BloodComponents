import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import AppointmentVerification from "../../Screens/appointmentVerification";
import "./App.css";
import Dashboard from "../../Screens/dashboard";
import NotFound from "../NotFound";
import Login from "../../Screens/login";
import User from "../../Screens/user";
import Register from "../../Screens/register";
import ContactUs from "../../Screens/ContactUs";
import About from "../../Screens/About";
import DonateProcess from "../../Screens/DonateProcess";
import AddAppointment from "../../Screens/addAppointment";
import Admin from "../../Screens/admin";
import Questions from "../../Screens/Questionnaire";
import EmergencyDonations from "../../Screens/emergencyDonations";
import DeleteEditAppointments from "../../Screens/deleteAppointments";
import ProtectedRoute from "../../routes/ProtectedRoute";
import PublicRoute from "../../routes/PublicRoute";
import { ForgotPassword } from "../forgetPassword/ForgotPassword";
import UsersBrowsing from '../../Screens/usersBrowsing';
import DonationsManagement from '../../Screens/donationsManagement';

function App() {
  const isAuthenticated = !!localStorage.getItem("userid");
  const languageSelected = localStorage.getItem("i18nextLng");

  return (
    <Router>
      <Switch>
        <ProtectedRoute
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/verfication"
          component={AppointmentVerification}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/user"
          component={User}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/questions"
          component={Questions}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/emergency"
          component={EmergencyDonations}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/contactus"
          component={ContactUs}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/about"
          component={About}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/donateprocess"
          component={DonateProcess}
          isAuthenticated={isAuthenticated}
        />

        <ProtectedRoute
          path="/add"
          component={AddAppointment}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/edit-delete"
          component={DeleteEditAppointments}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute 
          path='/donations-management' 
          component={DonationsManagement} 
          isAuthenticated={isAuthenticated} 
        />
        <ProtectedRoute 
          path='/users' 
          component={UsersBrowsing} 
          isAuthenticated={isAuthenticated} 
        />

        <ProtectedRoute
          path="/admin"
          component={Admin}
          isAuthenticated={isAuthenticated}
        />

        <PublicRoute path="/not-found" component={NotFound} />
        <PublicRoute
          path="/login"
          languageSelected={languageSelected}
          component={Login}
        />
        <PublicRoute
          path="/register"
          languageSelected={languageSelected}
          component={Register}
        />
        <PublicRoute
          path="/passwordreset"
          languageSelected={languageSelected}
          component={ForgotPassword}
        />

        <Redirect from="/" exact to="/login" />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
}

export default App;
