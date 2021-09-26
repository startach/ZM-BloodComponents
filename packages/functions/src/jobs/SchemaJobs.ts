import * as functions from "firebase-functions";
import { migrateAppointmentStatus } from "../dal/migrationScripts/ChangeAppointmentStatusMigration";

enum Jobs {
  DbMigrationAddAppointmentStatus = "DB_MIGRATION_ADD_APPOINTMENT_STATUS",
}

type JobResponse = {
  message: string;
  status: number;
};

export const jobHandler = functions.https.onRequest(async (request, res) => {
  if (request.query?.token !== functions.config().job_handler_token.key) {
    res.status(403).send();
    return;
  }

  let response: JobResponse = {
    message: "",
    status: 400,
  };

  const wetRun = request.query?.wetRun === "true";

  switch (request.query?.jobName) {
    case Jobs.DbMigrationAddAppointmentStatus:
      response = await migrateAppointmentStatus(wetRun);
      break;
    default:
      res.send(404);
      return;
  }

  res.status(response.status).send(response.message);
});
