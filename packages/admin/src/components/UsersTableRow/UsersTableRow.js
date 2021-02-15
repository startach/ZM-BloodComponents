import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useRowStyles = makeStyles({
  root: {
    borderRadius: '4px',
    boxShadow: '0px 2px 4px #0000002E',
    backgroundColor: 'white',
  },
});

const cellStyle = {
  font: 'normal normal bold 16px/24px Rubik',
  letterSpacing: '0px',
  color: '#272932',
  opacity: '1',
  paddingBottom: 0,
  paddingTop: 0,
  padding: 0,
  textAlign: 'center',
};

const UsersTableRow = ({ row }) => {
  const classes = useRowStyles();
  const { name, phone, address, hospital } = row;

  return (
    <TableRow className={classes.root}>
      <TableCell width="10%" style={cellStyle}></TableCell>
      <TableCell width="30%" style={cellStyle}>
        {hospital}
      </TableCell>
      <TableCell width="30%" style={cellStyle}>
        {address}
      </TableCell>
      <TableCell width="30%" style={cellStyle}>
        {phone}
      </TableCell>
      <TableCell width="30%" style={cellStyle}>
        {name}
      </TableCell>
    </TableRow>
  );
};

UsersTableRow.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    hospital: PropTypes.string.isRequired,
  }).isRequired,
};

export default UsersTableRow;
