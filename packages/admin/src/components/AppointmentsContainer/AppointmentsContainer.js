/* eslint-disable react/jsx-no-duplicate-props */
import { manHoldingBox } from '../../assets';
import './AppointmentsContainer.css';
import { CollapsibleTable } from '../Table2';


// const AppointmentsContainer = (props) => {
//   const { rows, setRows } = props;
//   return (
//     <div className="appointmentsContainer">
//       <div className="table">
//         <CollapsibleTable rows={rows} setRows={setRows} />
//       </div>
//       {/* <div className="defaultText">עוד לא הוספת תורים</div> */}
//       {/* <img className="manHoldingBox" src={manHoldingBox} alt="manHoldingBox" /> */}
import AppointmentsTable from '../AppointmentsTable';

const AppointmentsContainer = ({ appArray, onDeleteAppFromIndex }) => {
  return (
    <div className="appointmentsContainer">
      <div id="default" className={appArray.length ? 'hide' : null}>
        <div className="defaultText">עוד לא הוספת תורים</div>
        <img
          className="manHoldingBox"
          src={manHoldingBox}
          alt="manHoldingBox"
        />
      </div>

      <div
        className="tableContainer"
        className={appArray.length ? null : 'hide'}
        style={{
          borderCollapse: 'separate',
          borderSpacing: '0px 4px ',
          width: '60%',
          height: '48px',
        }}
      >
        <AppointmentsTable
          rows={appArray}
          onDeleteAppFromIndex={onDeleteAppFromIndex}
        />
      </div>
    </div >
  );
};

export default AppointmentsContainer;
