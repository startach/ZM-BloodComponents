import * as functions from "firebase-functions";
import { completeAppointmentFunc } from "../donor/CompleteAppointmentHandler";

export const completeAppointmentApi = functions.https.onRequest(
  async (request, res) => {
    const donorId = request.query.donorId as string;
    const appointmentId = request.query.appointmentId as string;
    if (!donorId) {
      throw new Error("Invalid donor id");
    }

    if (!appointmentId) {
      throw new Error("Invalid appointment id");
    }

    try {
      await completeAppointmentFunc(appointmentId, donorId);
    } catch (err) {
      functions.logger
        .error(`something went wrong while completing appointment id
       ${appointmentId}, donorId: ${donorId} err: ${err}`);
      res.send("לא הצלחנו לסמן את הפגישה עקב שגיאה");
    }
    res.send("הפגישה סומנה בהצלחה");
  }
);
