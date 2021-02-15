import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

import { DeleteAppointmentButton } from '../buttons';

import './CollapseRow.css';

import { getEmptyRows } from './utils';

const ArrivalApproved = () => <div className="arrivalApproved">הגעה אושרה</div>;

const ArrivalDisapproved = () => (
  <div className="arrivalDisapproved">אין אישור הגעה</div>
);

const useCellStyles = makeStyles({
  sizeSmall: {
    padding: 0,
  },
});

const CollapseRow = ({
  open,
  volunteers,
  numOfBookedAppointments,
  onDelete,
}) => {
  const classes = useCellStyles();

  return (
    <TableRow>
      <TableCell
        style={{
          paddingBottom: 0,
          paddingTop: 0,
        }}
        colSpan={4}
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Table
              size="small"
              aria-label="purchases"
              style={{
                borderCollapse: 'separate',
                borderSpacing: '0px 8px ',
                width: '100%',
                background: 'white',
              }}
            >
              <TableBody>
                {volunteers.map(({ name, number, isArrivalConfirmed }) => (
                  <TableRow key={name} className="tableRow">
                    <TableCell
                      className={['tableCell', classes.sizeSmall].join(' ')}
                    >
                      {isArrivalConfirmed ? (
                        <ArrivalApproved />
                      ) : (
                        <ArrivalDisapproved />
                      )}
                    </TableCell>
                    <TableCell className="tableCell" align="center">
                      {number}
                    </TableCell>
                    <TableCell className="tableCell" align="right">
                      {name}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow key="empty" className="tableRow">
                  <TableCell className="tableCell" align="center" colSpan={3}>
                    אין רישום
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <DeleteAppointmentButton onClick={onDelete} title="מחק תור" />
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

CollapseRow.propTypes = {
  open: PropTypes.bool.isRequired,
  volunteers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      isArrivalConfirmed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default CollapseRow;
