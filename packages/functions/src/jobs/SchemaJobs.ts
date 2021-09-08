import * as functions from "firebase-functions";
import * as DonorDataAccessLayer from "../dal/DonorDataAccessLayer";

enum Jobs {
  DbMigrationAddAppointmentStatus = "DB_MIGRATION_ADD_APPOINTMENT_STATUS",
}

type JobResponse = {
  message: string;
  status: number;
};

export const jobHandler = functions.https.onRequest(async (request, res) => {
  if (request.query?.token !== functions.config().jobHandlerToken) {
    res.status(403);
  }

  let response: JobResponse;

  switch (request.query?.jobName) {
    case Jobs.DbMigrationAddAppointmentStatus:
      response = await DbMigrationAddAppointmentStatus();
      break;
    default:
      res.send(404);
  }

  res.status(response!.status).send(response!.message);
});

const DbMigrationAddAppointmentStatus = async (): Promise<JobResponse> => {
  return {
    message: "success!",
    status: 200,
  };
};
