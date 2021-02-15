import { NavBarButton } from '../buttons';
import Logo from '../Logo';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="buttons">
        <NavBarButton text="חיפוש משתמשים" path="/usersSearch" />
        <NavBarButton text="תורים מתוכננים" path="/bookedAppointments" />
        <NavBarButton text="הוספת תורים" path="/" />
      </div>
      <div className="logo">
        <Logo />
      </div>
    </div>
  );
};

export default NavBar;
