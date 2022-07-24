import { useState } from "react";
import Button from "../../components/basic/Button";
import styles from "./QuestionnaireScreen.module.scss";
import Checkbox from "../../components/basic/Checkbox/Checkbox";
import ZMScreen from "../../components/basic/ZMScreen";
import { FunctionsApi, Hospital } from "@zm-blood-components/common";
import DonationInfo from "../../components/DonationInfo/DonationInfo";
import QuestionnaireQuestions from "./questions/QuestionnaireQuestions";
import QuestionnaireNotes from "./notes/QuestionnaireNotes";
import ConfirmSwapAppointmentPopup from "../../components/popups/ConfirmSwapAppointmentPopup";
import BookingAppointmentErrorPopup from "../../components/popups/BookingAppointmentErrorPopup";

export interface QuestionnaireScreenProps {
  hospital: Hospital;
  donationStartTimeMillis: number;
  onSuccess: () => void;
  isLoading: boolean;
  debugMode: boolean;
  bookingErrorCode: FunctionsApi.BookAppointmentStatus | undefined;
  onBack: () => void;
  goToHomePage: () => Promise<void>;
  isSwapAppointment: boolean;
}

export function QuestionnaireScreen({
  hospital,
  donationStartTimeMillis,
  onSuccess,
  onBack,
  isLoading,
  debugMode,
  goToHomePage,
  isSwapAppointment,
  bookingErrorCode,
}: QuestionnaireScreenProps) {
  const [areAllAnswersCorrect, setAreAllAnswersCorrect] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showSwapPopup, setShowSwapPopup] = useState(false);

  const isVerified = areAllAnswersCorrect && isConfirmed;

  const handleSuccess = () => {
    if (isSwapAppointment) {
      setShowSwapPopup(true);
    } else {
      onSuccess();
    }
  };
  return (
    <ZMScreen
      title="שאלון התאמה"
      hasBackButton
      onBack={onBack}
      className={styles.screen}
    >
      <DonationInfo
        donationStartTimeMillis={donationStartTimeMillis}
        hospital={hospital}
        isPreviousAppointmentInfo={false}
      />

      <div className={styles.questionnaireSection}>
        <div className={styles.questionnaireTitle}>
          שאלון התאמה לתרומת טרומבוציטים
        </div>
        <div className={styles.questionnaireText}>
          עזרו לנו לוודא התאמה ולמנוע מצב בו תגיעו ביום התור אך לא תוכלו לתרום
        </div>

        <QuestionnaireQuestions
          hospital={hospital}
          goToHomePage={goToHomePage}
          setAreAllAnswersCorrect={setAreAllAnswersCorrect}
        />

        <QuestionnaireNotes hospital={hospital} />

        <div className={styles.confirmButtonContainer}>
          <Checkbox
            name="all_info_correct"
            label={"קראתי ומאשר/ת שכל המידע לעיל נכון"}
            isChecked={isConfirmed}
            onChange={setIsConfirmed}
          />
        </div>

        <Button
          analyticsName="continue"
          isDisabled={!debugMode && !isVerified}
          onClick={handleSuccess}
          title={"המשך"}
          isLoading={isLoading}
        />
      </div>

      <BookingAppointmentErrorPopup
        errorCode={bookingErrorCode}
        onApproved={goToHomePage}
      />

      <ConfirmSwapAppointmentPopup
        isOpen={showSwapPopup}
        onApproved={onSuccess}
        onBack={onBack}
        onClose={() => setShowSwapPopup(false)}
      />
    </ZMScreen>
  );
}

export default QuestionnaireScreen;
