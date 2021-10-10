import * as functions from "firebase-functions";
import { completeAppointmentFunc } from "../donor/CompleteAppointmentHandler";

export const completeAppointmentApi = functions.https.onRequest(
  async (request, res) => {
    if (!request.query.donorId) {
      throw new Error("Invalid donor id");
    }

    if (!request.query.appointmentId) {
      throw new Error("Invalid appointment id");
    }
    const donorId = request.query.donorId as string;
    const appointmentId = request.query.appointmentId as string;
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
