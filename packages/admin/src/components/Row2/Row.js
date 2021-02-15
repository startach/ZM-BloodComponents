import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
  textAlign: 'center'
};

const Row = ({ row }) => {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const { donation, hospital, date, hour, squares } = row;

  return (
    <Fragment>
      <TableRow className={classes.root} >
        <TableCell width='10%' style={cellStyle}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell width='18%' style={cellStyle}>
          {donation}
        </TableCell>
        <TableCell width='18%' style={cellStyle}>
          {hospital}
        </TableCell>
        <TableCell width='18%' style={cellStyle}>
          {date}
        </TableCell>
        <TableCell width='18%' style={cellStyle}>
          {hour}
        </TableCell>
        <TableCell width='18%' style={cellStyle}>
          {squares}
        </TableCell>
      </TableRow>

    </Fragment>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    hour: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    numOfBookedAppointments: PropTypes.number.isRequired,
    volunteers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        isArrivalConfirmed: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Row;
