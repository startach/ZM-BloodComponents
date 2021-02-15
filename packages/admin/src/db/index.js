import { makeAddAppointment } from './db.js';

import { addAppoinment as dbAddAppoinment } from '../frameworks/firebase/db';

const addAppointment = makeAddAppointment(dbAddAppoinment);

export { addAppointment };
