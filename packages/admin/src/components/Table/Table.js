import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useState } from 'react';

import Row from '../Row';

import { createData } from './utils';

const cellStyle = {
  font: 'normal normal normal 16px/24px Rubik',
  color: '#272932',
  opacity: '1 ',
  paddingBottom: 0,
  paddingTop: 0,
  textAlign: 'center'
};
const rowStyle = {
  font: 'normal normal normal 16px/24px Rubik',
  color: '#272932',
  opacity: '1 ',
};
const CollapsibleTable = () => {
  const [rows, setRows] = useState([
    createData('12:00', 'haifa', 4),
    createData('14:00', 'haifa', 7),
    createData('16:00', 'haifa', 8),
  ]);
  const makeOnDelete = (index) => () =>
    setRows(rows.filter((_, i) => i !== index));
  return (
    <TableContainer>
      <Table style={{
        borderCollapse: 'separate',
        borderSpacing: '0px 4px ',
        width: '100%',
        height: '48px',
      }}  >
        <TableHead align='right'>
          <TableRow style={rowStyle}>
            <TableCell style={cellStyle} width='10%'>
            </TableCell>
            <TableCell style={cellStyle} width='30%'>
              רשומים
            </TableCell>
            <TableCell style={cellStyle} width='30%'>
              מקום
            </TableCell>
            <TableCell style={cellStyle} width='30%'>
              שעה
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} onDelete={makeOnDelete(index)} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
