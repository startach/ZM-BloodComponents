/*
 * This is a cheat added for Beilinson hospital.
 * They asked to be able to add appointments, with specific hours, to the whole day in a single click.
 */
// import {Hospital} from '@zm-blood-components/common';
// import * as uuid from 'uuid';
//
export const onAddWholeDay = () => {};
//   if (!date || hospital !== Hospital.BEILINSON) {
//     return;
//   }
//
//   const weekdayHoursAndSlots = [
//     [8, 1],
//     [9, 1],
//     [10, 1],
//     [11, 1],
//     [12, 1],
//     [13, 1],
//     [14, 1],
//     [15, 2],
//     [16, 2],
//     [17, 2],
//   ];
//
//   const fridayHoursAndSlots = [
//     [8, 2],
//     [9, 2],
//     [10, 2],
//     [11, 2],
//   ];
//
//   const hoursAndSlots =
//       date.getDay() === 5 ? fridayHoursAndSlots : weekdayHoursAndSlots;
//
//   const newSlots = hoursAndSlots.map<NewSlots>((hourAndSlots) => {
//     const donationStartTime = new Date(date);
//     donationStartTime.setHours(hourAndSlots[0]);
//     donationStartTime.setMinutes(0);
//     return {
//       hospital,
//       donationStartTime,
//       slots: hourAndSlots[1],
//       key: uuid.v4(),
//     };
//   });
//
//   props.setSlotsArray([...props.slotsArray, ...newSlots]);
// };
