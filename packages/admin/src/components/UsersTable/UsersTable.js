import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import UsersTableRow from '../UsersTableRow';

const cellStyle = {
  font: 'normal normal normal 16px/24px Rubik',
  color: '#272932',
  opacity: '1 ',
  paddingBottom: 0,
  paddingTop: 0,
  textAlign: 'center',
};

const rowStyle = {
  font: 'normal normal normal 16px/24px Rubik',
  color: '#272932',
  opacity: '1 ',
};

let rows = [
  {
    name: 'ישראל ישראלי',
    phone: '054-7696192',
    address: 'הבנים 4, כפר סבא',
    hospital: 'הבנים 4, כפר סבא',
  },
  {
    name: 'ישראל ישראלי',
    phone: '054-7696192',
    address: 'הבנים 4, כפר סבא',
    hospital: 'הבנים 4, כפר סבא',
  },
  {
    name: 'ישראל ישראלי',
    phone: '052-7696192',
    address: 'הבנים 4, כפר סבא',
    hospital: 'הבנים 4, כפר סבא',
  },
  {
    name: 'ישראל ישראלי',
    phone: '054-7696192',
    address: 'הבנים 4, כפר סבא',
    hospital: 'הבנים 4, כפר סבא',
  },
];

const UsersTable = ({ nameOrNumber }) => {
  let realRows = rows;
  if (nameOrNumber) {
    realRows = rows.filter(
      (row) =>
        row.phone.includes(nameOrNumber) || row.name.includes(nameOrNumber)
    );
  } else {
    realRows = rows;
  }

  return (
    <TableContainer>
      <Table
        style={{
          borderCollapse: 'separate',
          borderSpacing: '0px 4px ',
          width: '100%',
          height: '48px',
        }}
      >
        <TableHead align="right">
          <TableRow style={rowStyle}>
            <TableCell style={cellStyle} width="10%"></TableCell>
            <TableCell style={cellStyle} width="30%">
              בית חולים
            </TableCell>
            <TableCell style={cellStyle} width="30%">
              כתובת
            </TableCell>
            <TableCell style={cellStyle} width="30%">
              טלפון
            </TableCell>
            <TableCell style={cellStyle} width="30%">
              שם
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {realRows.map((row, index) => (
            <UsersTableRow key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
