import app from '../firebase';

const db = app.firestore();

db.settings({
  timestampsInSnapshots: true,
});

const addAppoinment = ({
  appointmentType,
  hospital,
  year,
  month,
  day,
  hour,
  mashbetset,
}) =>
  db.collection('appointments').add({
    appointmentType,
    hospital,
    year,
    month,
    day,
    hour,
    mashbetset,
  });

export { addAppoinment };
