import { useAppointmentToBookStore } from "../state/Providers";
import * as FirebaseFunctions from "../firebase/FirebaseFunctions";
import { AnalyticsEventType, BookedAppointment, FunctionsApi } from "@zm-blood-components/common";
import { reportEvent } from "../Analytics";
import { useNavigate } from "react-router-dom";
import { MainNavigationKeys } from "../navigation/app/MainNavigationKeys";

export default function useBookAppoitment() {
    const appointmentToBookStore = useAppointmentToBookStore();
    const navigate = useNavigate()
    const debugMode = !process.env.REACT_APP_PRODUCTION_FIREBASE;

    return {
        tryBookAppoitment: async (isSwapAppointment: boolean,
            appointmentToBeCancelledId?: string) => {

            if (debugMode) {
                console.log(
                    `Asked to ${isSwapAppointment ? "swap" : "book"} one of the following appointments: `,
                    appointmentToBookStore.appointmentIds
                );
            }

            const bookingFunction = isSwapAppointment ?
                FirebaseFunctions.donorSwapAppointment(appointmentToBookStore.appointmentIds, appointmentToBeCancelledId ?? "") :
                FirebaseFunctions.donorBookAppointment(
                    appointmentToBookStore.appointmentIds
                );

            const bookAppointmentResponse = await bookingFunction

            switch (bookAppointmentResponse.status) {
                case FunctionsApi.BookAppointmentStatus.SUCCESS:
                    reportEvent(
                        AnalyticsEventType.ApiConfirmation,
                        isSwapAppointment ? "donation_swapped" : "donation_booked",
                        bookAppointmentResponse.bookedAppointment!.id
                    );

                    if (debugMode) {
                        console.log(
                            isSwapAppointment ? "Swapped appointment" : "Booked appointment",
                            bookAppointmentResponse.bookedAppointment!.id
                        );
                    }
            }
            return bookAppointmentResponse
        },
        onSuccessfulBooking: (setBookedAppointment: () => void) => {
            setBookedAppointment();
            navigate(MainNavigationKeys.UpcomingDonation, { replace: true });
            appointmentToBookStore.clear();
        }
    }
} 