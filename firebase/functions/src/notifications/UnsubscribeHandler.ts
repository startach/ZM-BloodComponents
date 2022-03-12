import * as functions from "firebase-functions";
import * as DonorDataAccessLayer from "../dal/DonorDataAccessLayer";
import { isProd } from "../utils/EnvUtils";

export const unsubscribeHandler = functions.https.onRequest(
  async (request, res) => {
    if (!request.query.userId) {
      throw new Error("Invalid user id");
    }

    const method = request.query.method as string;
    if (method !== "email") {
      throw new Error("Invalid method");
    }

    const dbDonor = await DonorDataAccessLayer.getDonor(
      request.query.userId as string
    );

    if (!dbDonor) {
      throw new Error("Invalid user");
    }

    if (!dbDonor.notificationSettings) {
      dbDonor.notificationSettings = { disableEmailNotifications: false };
    }

    dbDonor.notificationSettings.disableEmailNotifications = true;

    await DonorDataAccessLayer.setDonor(dbDonor);

    let redirectUrl;
    if (isProd()) {
      redirectUrl = "https://blood-bank.zichron.org/unsubscribe";
    } else {
      redirectUrl = "https://zm-donor-qa.web.app/unsubscribe";
    }

    res.redirect(redirectUrl);
  }
);
