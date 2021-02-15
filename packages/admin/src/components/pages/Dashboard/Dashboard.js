import AppointmentsContainer from '../../AppointmentsContainer';
import AppointmentForm from '../../AppointmentForm';
import { Fragment, useState } from 'react';

// const Dashboard = () => {
//     const [rows, setRows] = useState([]);
//     return (
//         <Fragment>
//             <AppointmentForm rows={rows} setRows={setRows} />
//             <AppointmentsContainer rows={rows} setRows={setRows} />
//         </Fragment>
//     );
// };

const Dashboard = () => {
    const [appArray, setAppArray] = useState([]);
    const addAppToArray = (app) => {
        appArray.push(app);
        setAppArray([...appArray]);
    };

    const onDeleteAppFromIndex = (index) => {
        appArray.splice(index, 1);
        setAppArray([...appArray]);
    };

    return (
        <Fragment>
            <AppointmentForm addAppToArray={addAppToArray} />
            <AppointmentsContainer
                appArray={appArray}
                onDeleteAppFromIndex={onDeleteAppFromIndex}
            />
        </Fragment>
    );
};

export default Dashboard;
