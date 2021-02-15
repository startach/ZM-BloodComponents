import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const getEmptyRows = (numOfBookedAppointments, numOfvolunteers) => {
  const arrOfemptyRows = [];
  const numOfUntakenAppointments = numOfBookedAppointments - numOfvolunteers;
  for (let i = 0; i < numOfUntakenAppointments; i++) {
    arrOfemptyRows.push(
      <TableRow
        key={i}
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <TableCell align="center" className="tableCell singleTableCell">
          אין רישום
        </TableCell>
      </TableRow>
    );
  }
  return arrOfemptyRows;
};
