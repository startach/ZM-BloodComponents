import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import DeleteAppointmentButton from '../buttons/DeleteAppointmentButton';
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
  fontSize: 'small'
};

const AppointmentRow = ({ row, onDelete }) => {
  const classes = useRowStyles();
  const { donation, hospital, date, hour, squares } = row;

  return (
    <TableRow className={classes.root}>
      <TableCell width="5%" style={cellStyle}
      >
        <DeleteAppointmentButton onClick={onDelete} />
      </TableCell>
      <TableCell width="19%" style={cellStyle}>
        {squares}
      </TableCell>
      <TableCell width="19%" style={cellStyle}>
        {hour}
      </TableCell>
      <TableCell width="19%" style={cellStyle}>
        {date}
      </TableCell>
      <TableCell width="19%" style={cellStyle}>
        {hospital}
      </TableCell>
      <TableCell width="19%" style={cellStyle}>
        {donation}
      </TableCell>
    </TableRow >
  );
};

AppointmentRow.propTypes = {
  row: PropTypes.shape({
    donation: PropTypes.string.isRequired,
    hospital: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    hour: PropTypes.string.isRequired,
    squares: PropTypes.number.isRequired,
  }).isRequired,
};

export default AppointmentRow;
