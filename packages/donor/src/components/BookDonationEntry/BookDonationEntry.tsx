import styles from "./BookDonationEntry.module.scss";
import Card from "../basic/Card";
import Text from "../basic/Text";
import classNames from "classnames";
import { Hospital, LocaleUtils, DateUtils } from "@zm-blood-components/common";

export interface BookDonationEntryProps {
  hospital: Hospital;
  donationStartTimeMillis: number;
  onClick?: () => void;
  onRegisterClick?: () => void;
  appointmentIds: string[];
}

function BookDonationEntry({
  hospital,
  donationStartTimeMillis,
  onClick,
  onRegisterClick,
  appointmentIds,
}: BookDonationEntryProps) {
  const debugAppointmentIds = appointmentIds.map((id) => "id." + id);

  return (
    <Card
      className={classNames(
        styles.component,
        "anim_onClick--scaleDown",
        debugAppointmentIds
      )}
      onClick={onClick}
    >
      <Text>
        {DateUtils.ToTimeString(new Date(donationStartTimeMillis))}
        {" - "}
        {LocaleUtils.getHospitalName(hospital)}
      </Text>
      <Text className={styles.registerText} onClick={onRegisterClick}>
        הרשמה
      </Text>
    </Card>
  );
}

export default BookDonationEntry;
