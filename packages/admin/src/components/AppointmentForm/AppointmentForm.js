import React, { useState, useEffect } from 'react';
import { ConfirmButton, SelectButton, DateTimeButton } from '../buttons';
import './AppointmentForm.css';

const donationType = ['טרומבוציטים', 'גרנולוציטים'];
const hospitalName = [
  'איכילוב',
  'תל השומר',
  'בילינסון',
  'הדסה',
  'רמב״ם',
  'סורוקה',
];
const squaresNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const bloodKindArray = ['לא ידועה', '+A', '-A', '+B', '-B', '+AB'];
const msgContentArray = [
  'הודעת ברירת מחדל',
  'zichronmenachem@gmail.com הודעת שגיאה ',
];

// const AppointmentForm = (props) => {
//   const [donation, setDonation] = useState('טרומבוציטים');
const AppointmentForm = ({ addAppToArray }) => {
  const [donation, setDonation] = useState('');
  const [hospital, setHospital] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [squares, setSquares] = useState('');
  // const { rows, setRows } = props;


  const [msgContent, setMsgContent] = useState('');
  const [bloodKind, setBloodKind] = useState('');

  const isButtonDisable = () =>
    !(donation && hospital && date && hour && squares);

  const onClick = () => {
    addAppToArray({ donation, hospital, date, hour, squares });

    setDonation('');
    setHospital('');
    setDate('');
    setHour('');
    setSquares('');
  };

  return (
    <div className="appointmentForm">
      <SelectButton
        header={'תרומת'}
        content={donationType}
        setData={setDonation}
        data={donation}
      />
      <SelectButton
        header={'בית חולים'}
        content={hospitalName}
        setData={setHospital}
        data={hospital}
      />
      <DateTimeButton
        header={'תאריך ושעה'}
        date={date}
        setDate={setDate}
        hour={hour}
        setHour={setHour}
      />
      <SelectButton
        header={'משבצות'}
        content={squaresNum}
        setData={setSquares}
        data={squares}
      // </SelectButton>
      // {donation === "גרנולוציטים" ?
      //   <SelectButton header={'תוכן הודעה'} content={msgContent} setData={setSquares}>
      //     {' '}
      //     data={squares}
      //   </SelectButton> : null}
      // {donation === "גרנולוציטים" ?
      //   <SelectButton header={'סוג דם'} content={bloodKind} setData={setSquares}>
      //     {' '}
      //     data={squares}
      //   </SelectButton> : null}
      // <ConfirmButton text="הוספה" data={{ donation, hospital, date, hour, squares }} rows={rows} setRows={setRows} />
      />
      {donation === 'גרנולוציטים' ? (
        <SelectButton
          header={'תוכן הודעה'}
          content={msgContentArray}
          setData={setMsgContent}
          data={msgContent}
        />
      ) : null}
      {donation === 'גרנולוציטים' ? (
        <SelectButton
          header={'סוג דם'}
          content={bloodKindArray}
          setData={setBloodKind}
          data={bloodKind}
        />
      ) : null}
      <ConfirmButton
        text="הוספה"
        disabled={isButtonDisable()}
        onClick={onClick}
      />
    </div>
  );
};

export default AppointmentForm;
