import { useHistory } from 'react-router-dom';
import './NavBarButton.css';
import PropTypes from 'prop-types';

const NavBarButton = ({ text, path }) => {
  const history = useHistory();
  const onClick = () => history.push(path);

  return (
    <button className="navBarButton" onClick={onClick}>
      {text}
    </button>
  );
};

NavBarButton.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavBarButton;
