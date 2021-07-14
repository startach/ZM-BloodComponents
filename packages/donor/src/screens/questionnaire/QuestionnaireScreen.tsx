import React, { useState } from "react";
import Button from "../../components/basic/Button";
import styles from "./QuestionnaireScreen.module.scss";
import Checkbox from "../../components/basic/Checkbox/Checkbox";
import ZMScreen from "../../components/basic/ZMScreen";
import Popup from "../../components/basic/Popup";
import { FunctionsApi, Hospital } from "@zm-blood-components/common";
import DonationToBookInfo from "../../components/DonationToBook/DonationToBookInfo";
import QuestionnaireQuestions from "./questions/QuestionnaireQuestions";
import QuestionnaireNotes from './notes/QuestionnaireNotes';

export interface QuestionnaireScreenProps {
  hospital: Hospital;
  donationStartTimeMillis: number;
  onSuccess: () => void;
  isLoading: boolean;
  debugMode: boolean;
  errorCode?: FunctionsApi.BookAppointmentStatus;
  onBack: () => void;
  goToHomePage: () => Promise<void>;
}

export default function QuestionnaireScreen({
  hospital,
  donationStartTimeMillis,
  onSuccess,
  onBack,
  isLoading,
  debugMode,
  errorCode,
  goToHomePage,
}: QuestionnaireScreenProps) {
  const [areAllAnswersCorrect, setAreAllAnswersCorrect] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const isVerified = areAllAnswersCorrect && isConfirmed;

  return (
    <ZMScreen
      title="שאלון התאמה"
      hasBackButton
      onBack={onBack}
      className={styles.screen}
    >
      <DonationToBookInfo
        donationStartTimeMillis={donationStartTimeMillis}
        hospital={hospital}
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

        <QuestionnaireNotes hospital={hospital}/>

        <div className={styles.confirmButtonContainer}>
          <Checkbox
            label={"קראתי ומאשר/ת שכל המידע לעיל נכון"}
            isChecked={isConfirmed}
            onChange={setIsConfirmed}
          />
        </div>

        <Button
          isDisabled={!debugMode && !isVerified}
          onClick={onSuccess}
          title={"המשך"}
          isLoading={isLoading}
        />
      </div>

      <ErrorPopup errorCode={errorCode} goToHomePage={goToHomePage} />
    </ZMScreen>
  );
}

function ErrorPopup(props: {
  errorCode?: FunctionsApi.BookAppointmentStatus;
  goToHomePage: () => Promise<void>;
}) {
  if (!props.errorCode) {
    return null;
  }

  let text = "";
  switch (props.errorCode) {
    case FunctionsApi.BookAppointmentStatus.NO_SUCH_APPOINTMENTS:
    case FunctionsApi.BookAppointmentStatus.NO_AVAILABLE_APPOINTMENTS:
      text =
        'מצטערים, התור הזה הרגע נתפס ע"י תורם/ת אחר/ת. אנא הירשם/י למועד אחר';
      break;

    case FunctionsApi.BookAppointmentStatus.HAS_OTHER_DONATION_IN_BUFFER:
      text = "מצטערים, לא ניתן לקבוע שתי תרומות בסמיכות של פחות מחודש";
      break;
  }

  return (
    <Popup
      title={"אופס!"}
      content={text}
      buttonApproveText={"בחירת מועד חדש"}
      open={true}
      onApproved={props.goToHomePage}
    />
  );
}
