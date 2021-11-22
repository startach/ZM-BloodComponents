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

  test("stg env sends email to stg user and not to hospital coordinator", () => {
    const res = getStaffRecipientsInternal(
      false,
      Hospital.BEILINSON,
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

  test("prod env sends email to prod user, creator and hospital coordinator", () => {
    const res = getStaffRecipientsInternal(
      true,
      Hospital.BEILINSON,
      creatorUser
    );

    expect(res).toHaveLength(3);
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
        email: "bloodbankbl@clalit.org.il",
        name: "בית החולים בילינסון",
      },
    ]);
  });

  test("prod env sends email to prod user, creator and hospital coordinator", () => {
    const res = getStaffRecipientsInternal(true, Hospital.SOROKA, creatorUser);

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
        email: "ronniema79@gmail.com",
        name: "בית החולים סורוקה",
      },
      {
        email: "dumanionok@gmail.com",
        name: "בית החולים סורוקה",
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
      undefined
    );

    expect(res).toHaveLength(1);
    expect(res[0]).toEqual({
      email: "dam@zichron.org",
      name: "בנק הדם",
    });
  });
});
