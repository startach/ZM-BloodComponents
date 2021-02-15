import { SelectButton } from '../../buttons';
import { useState, Fragment } from 'react';
import BookedAppointmentsContainer from '../../BookedAppointmentsContainer';

import AddLocationOutlinedIcon from '@material-ui/icons/AddLocationOutlined';

import './BookedAppointments.css';

const hospitalName = [
  'איכילוב',
  'תל השומר',
  'בילינסון',
  'הדסה',
  'רמב״ם',
  'סורוקה',
];
const BookedAppointments = () => {
  const [hospital, setHospital] = useState('');
  return (
    <Fragment>
      <div className="selectButtonContainer">

        <SelectButton
          header={'בית חולים'}
          content={hospitalName}
          setData={setHospital}
          data={hospital}
        />
      </div>

      <BookedAppointmentsContainer />
    </Fragment>
  );
};

export default BookedAppointments;
