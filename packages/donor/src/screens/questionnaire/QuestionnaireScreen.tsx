import { useState } from "react";
import DonationInfoIcons from "../../components/DonationInfoIcons";
import Button from "../../components/basic/Button";
import styles from "./QuestionnaireScreen.module.scss";
import Text from "../../components/basic/Text";
import Checkbox from "../../components/basic/Checkbox/Checkbox";
import { DonationSlot } from "../../utils/AppointmentsGrouper";
import ZMScreen from "../../components/basic/ZMScreen";

interface QuestionnaireScreenProps {
  bookableAppointment: DonationSlot;
  onSuccess: () => void;
  isLoading: boolean;
  debugMode: boolean;
}

export default function QuestionnaireScreen({
  bookableAppointment,
  onSuccess,
  isLoading,
  debugMode,
}: QuestionnaireScreenProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const IsConfirmed = (
    <Checkbox
      label={"קראתי ומאשר שכל המידע הנמסר לעיל נכון ומעודכן"}
      isChecked={isConfirmed}
      onChange={setIsConfirmed}
    />
  );

  return (
    <ZMScreen title="שאלון התאמה" hasBackButton>
      <div className={styles.donationInfo}>
        <Text className={styles.donationInfoTitle}>פרטי התור הנבחר</Text>
        <DonationInfoIcons
          hospital={bookableAppointment.hospital}
          donationStartTimeMillis={bookableAppointment.donationStartTimeMillis}
        />
      </div>

      <div className={styles.questionnaireSection}>
        <Text className={styles.questionnaireTitle}>
          על מנת לוודא התאמה יש למלא את השאלון
        </Text>
        <Text>הנה מלא מלא טקסט של השאלון</Text>

        <div className={styles.confirmButtonContainer}>{IsConfirmed}</div>

        <Button
          className={styles.continueButton}
          isDisabled={!debugMode && !isConfirmed}
          onClick={onSuccess}
          title={"המשך"}
          isLoading={isLoading}
        />
      </div>
    </ZMScreen>
  );
}
