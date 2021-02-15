export const createData = (hour, location, numOfBookedAppointments) => {
  return {
    hour,
    location,
    numOfBookedAppointments,
    volunteers: [
      { name: 'nizar', number: '052-4554333', isArrivalConfirmed: true },
      { name: 'rakad', number: '052-4554333', isArrivalConfirmed: false },
    ],
  };
};
