import { getStaffRecipientsInternal } from "./StaffEmailRecipientsCalculator";
import { sampleUser } from "../testUtils/TestSamples";
import { Hospital } from "@zm-blood-components/common";
import { DbDonor } from "../function-types";

describe("Staff Email Recipients Calculator", () => {
  const creatorUser: DbDonor = {
    ...sampleUser,
    id: "id",
    email: "my@email",
    firstName: "myFirstName",
  };

  const mockedHospitalRecipients = {
    [Hospital.BEILINSON]: ["a@beilinson.com", "b@beilinson.com"],
  };

  test("stg env sends email to stg user and not to hospital coordinator", () => {
    const res = getStaffRecipientsInternal(
      false,
      Hospital.BEILINSON,
      mockedHospitalRecipients,
      creatorUser
    );

    expect(res).toHaveLength(2);
    expect(res).toEqual([
      {
        email: "bloodbank.ZM@gmail.com",
        name: "בנק הדם",
      },
      {
        email: "my@email",
        name: "myFirstName",
      },
    ]);
  });

  test("prod env sends email to prod user, creator and hospital coordinator - Config has hospital", () => {
    const res = getStaffRecipientsInternal(
      true,
      Hospital.BEILINSON,
      mockedHospitalRecipients,
      creatorUser
    );

    expect(res).toEqual([
      {
        email: "dam@zichron.org",
        name: "בנק הדם",
      },
      {
        email: "my@email",
        name: "myFirstName",
      },
      {
        email: "a@beilinson.com",
        name: "בית החולים בילינסון",
      },
      {
        email: "b@beilinson.com",
        name: "בית החולים בילינסון",
      },
    ]);
  });

  test("prod env sends email to prod user, creator and hospital coordinator - Config doesn't have hospital", () => {
    const res = getStaffRecipientsInternal(
      true,
      Hospital.SOROKA,
      mockedHospitalRecipients,
      creatorUser
    );

    expect(res).toEqual([
      {
        email: "dam@zichron.org",
        name: "בנק הדם",
      },
      {
        email: "my@email",
        name: "myFirstName",
      },
    ]);
  });

  test("Creator user is blood bank then only one recipient is returned", () => {
    const creatorUser: DbDonor = {
      ...sampleUser,
      id: "id",
      email: "bloodbank.ZM@gmail.com",
      firstName: "בנק הדם",
    };

    const res = getStaffRecipientsInternal(
      false,
      Hospital.BEILINSON,
      mockedHospitalRecipients,
      creatorUser
    );

    expect(res).toHaveLength(1);
    expect(res[0]).toEqual({
      email: "bloodbank.ZM@gmail.com",
      name: "בנק הדם",
    });
  });

  test("Only one recipient when no creator user and no hospital coordinator", () => {
    const res = getStaffRecipientsInternal(
      true,
      Hospital.TEL_HASHOMER,
      mockedHospitalRecipients,
      undefined
    );

    expect(res).toHaveLength(1);
    expect(res[0]).toEqual({
      email: "dam@zichron.org",
      name: "בנק הדם",
    });
  });
});
