export const makeAddAppointment = (dbAddAppointment) => {
  return async (appointment) => {
    try {
      await dbAddAppointment(appointment);
    } catch (e) {
      throw Error('Db error');
    }
  };
};
