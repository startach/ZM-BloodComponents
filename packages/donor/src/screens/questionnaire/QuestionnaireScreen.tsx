import React, { useState } from "react";
import DonationInfoIcons from "../../components/DonationInfoIcons";
import Button from "../../components/basic/Button";
import styles from "./QuestionnaireScreen.module.scss";
import Text from "../../components/basic/Text";
import Checkbox from "../../components/basic/Checkbox/Checkbox";
import ZMScreen from "../../components/basic/ZMScreen";
import Popup from "../../components/basic/Popup";
import { FunctionsApi, SelectOption } from "@zm-blood-components/common";
import { DonationSlotToBook } from "../../navigation/app/LoggedInRouter";
import Picker from "../../components/basic/Picker";

export interface QuestionnaireScreenProps {
  bookableAppointment: DonationSlotToBook;
  onSuccess: () => void;
  isLoading: boolean;
  debugMode: boolean;
  errorCode?: FunctionsApi.BookAppointmentStatus;
  goToHomePage: () => Promise<void>;
}

const YesNoOptions: SelectOption<boolean>[] = [
  { value: true, label: "כן", key: "כן" },
  { value: false, label: "לא", key: "לא" },
];

export default function QuestionnaireScreen({
  bookableAppointment,
  onSuccess,
  isLoading,
  debugMode,
  errorCode,
  goToHomePage,
}: QuestionnaireScreenProps) {
  const [hasAlreadyDonated, setHasAlreadyDonated] =
    React.useState<boolean | undefined>(undefined);
  const HaveYouAlreadyDonated = (
    <Picker
      options={YesNoOptions}
      value={hasAlreadyDonated}
      onChange={setHasAlreadyDonated}
      label={"האם תרמת דם / טרומבוציטים בעבר?"}
      buttonClassName={styles.pickerButton}
    />
  );

  const [isWeightValid, setIsWeightValid] =
    React.useState<boolean | undefined>(undefined);
  const IsWeightValid = (
    <Picker
      options={YesNoOptions}
      value={isWeightValid}
      onChange={setIsWeightValid}
      label={"האם משקלך מעל 50 ק״ג?"}
      buttonClassName={styles.pickerButton}
    />
  );

  const [isSurgeryValid, setIsSurgeryValid] =
    React.useState<boolean | undefined>(undefined);
  const IsSurgeryValid = (
    <Picker
      options={YesNoOptions}
      value={isSurgeryValid}
      onChange={setIsSurgeryValid}
      label={"האם עברת ניתוח כירורגי בחצי השנה האחרונה?"}
      buttonClassName={styles.pickerButton}
    />
  );

  const [isRightAge, setIsRightAge] =
    React.useState<boolean | undefined>(undefined);
  const IsRightAge = (
    <Picker
      options={YesNoOptions}
      value={isRightAge}
      onChange={setIsRightAge}
      label={"האם הנך מעל גיל 17?"}
      buttonClassName={styles.pickerButton}
    />
  );

  const [wasPregnant, setWasPregnantEver] =
    React.useState<boolean | undefined>(undefined);
  const WasPregnant = (
    <Picker
      options={YesNoOptions}
      value={wasPregnant}
      onChange={setWasPregnantEver}
      label={"האם היית / הנך בהריון?"}
      buttonClassName={styles.pickerButton}
    />
  );

  const [isConfirmed, setIsConfirmed] = useState(false);
  const IsConfirmed = (
    <Checkbox
      label={"קראתי ומאשר שכל המידע הנמסר לעיל נכון ומעודכן"}
      isChecked={isConfirmed}
      onChange={setIsConfirmed}
    />
  );

  const isCorrectAnswers =
    hasAlreadyDonated &&
    isWeightValid &&
    isSurgeryValid === false &&
    isRightAge &&
    wasPregnant === false;

  const isWrongAnswerChosen =
    hasAlreadyDonated === false ||
    isWeightValid === false ||
    isSurgeryValid ||
    isRightAge === false ||
    wasPregnant;

  const isVerified = isCorrectAnswers && isConfirmed;

  const wrongAnswerPopupTitle = "מודים לך על הכוונה הטובה!";

  const wrongAnswerPopupContent =
    "אך לצערנו נראה שאי אפשר לתרום טרומבוציטים במצב זה.\n לבירור בבקשה ליצור קשר בנק מרכיבי הדם - 058-7100571";

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

        <div className={styles.question}>{WasPregnant}</div>
        <div className={styles.question}>{HaveYouAlreadyDonated}</div>
        <div className={styles.question}>{IsRightAge}</div>
        <div className={styles.question}>{IsWeightValid}</div>
        <div className={styles.question}>{IsSurgeryValid}</div>

        <div className={styles.notesText}>
          נציין שבהמשך מתאמ/ת בית החולים ת/יצור עמך קשר להמשך וידוא התאמה.
          <br />
          כמו כן, ינתן שירות הסעה במונית / פתרון חניה למגיעים ברכב.
        </div>

        <div className={styles.confirmButtonContainer}>{IsConfirmed}</div>
      </div>

      <Button
        className={styles.continueButton}
        isDisabled={!debugMode && !isVerified}
        onClick={onSuccess}
        title={"המשך"}
        isLoading={isLoading}
      />

      <ErrorPopup errorCode={errorCode} goToHomePage={goToHomePage} />

      <Popup
        buttonApproveText="אישור"
        open={!!isWrongAnswerChosen}
        title={wrongAnswerPopupTitle}
        content={wrongAnswerPopupContent}
        onApproved={() => {
          if (!hasAlreadyDonated) {
            setHasAlreadyDonated(undefined);
          }
          if (!isWeightValid) {
            setIsWeightValid(undefined);
          }
          if (isSurgeryValid) {
            setIsSurgeryValid(undefined);
          }
          if (!isRightAge) {
            setIsRightAge(undefined);
          }
          if (wasPregnant) {
            setWasPregnantEver(undefined);
          }
          return Promise.resolve();
        }}
      />
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
