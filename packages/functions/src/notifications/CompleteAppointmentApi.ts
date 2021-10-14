import * as functions from "firebase-functions";
import { completeAppointmentFunc } from "../donor/CompleteAppointmentHandler";

export const completeAppointmentApi = functions.https.onRequest(
  async (request, res) => {
    const donorId = request.query.donorId as string;
    const appointmentId = request.query.appointmentId as string;
    const isNoshow = request.query.isNoshow as string;

    if (!donorId) {
      throw new Error("Invalid donor id");
    }

    if (!appointmentId) {
      throw new Error("Invalid appointment id");
    }

    // if (!isNoshow || !(isNoshow in ["true", "false"]) ) {
    //   throw new Error("Invalid isNoshow value");
    // }

    try {
      await completeAppointmentFunc(
        appointmentId,
        donorId,
        isNoshow === "false"
      );
    } catch (err) {
      functions.logger
        .error(`something went wrong while completing appointment id
       ${appointmentId}, donorId: ${donorId} err: ${err}`);
      res.send("לא הצלחנו לסמן את הפגישה עקב שגיאה");
    }
    res.send("הפגישה סומנה בהצלחה");
  }
);
