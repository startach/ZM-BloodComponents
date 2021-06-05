import React from "react";
import { useState } from "react";
import RadioGroup from "../../components/basic/RadioGroup";
import { RadioOption } from "../../components/basic/RadioGroup/RadioGroup";
import DonationInfoIcons from "../../components/DonationInfoIcons";
import Button from "../../components/basic/Button";
import styles from "./QuestionnaireScreen.module.scss";
import Text from "../../components/basic/Text";
import Checkbox from "../../components/basic/Checkbox/Checkbox";
import { DonationSlot } from "../../utils/AppointmentsGrouper";
import ZMScreen from "../../components/basic/ZMScreen";
import Popup from "../../components/basic/Popup";
import { FunctionsApi } from "@zm-blood-components/common";

interface QuestionnaireScreenProps {
  bookableAppointment: DonationSlot;
  onSuccess: () => void;
  isLoading: boolean;
  debugMode: boolean;
  errorCode?: FunctionsApi.BookAppointmentStatus;
  goToHomePage: () => Promise<void>;
}

const YesNoOptions: RadioOption[] = [
  { value: "yes", label: "כן" },
  { value: "no", label: "לא" },
];

const YesNoNotApplicableOptions: RadioOption[] = [
  { value: "yes", label: "כן" },
  { value: "no", label: "לא" },
  { value: "na", label: "לא רלוונטי" },
];

export default function QuestionnaireScreen({
  bookableAppointment,
  onSuccess,
  isLoading,
  debugMode,
  errorCode,
  goToHomePage,
}: QuestionnaireScreenProps) {
  const [hasAlreadyDonated, setHasAlreadyDonated] = React.useState("");
  const HaveYouAlreadyDonated = (
    <RadioGroup
      options={YesNoOptions}
      value={hasAlreadyDonated}
      onChange={setHasAlreadyDonated}
      label={"האם תרמת דם / טרומבוציטים בעבר?"}
    />
  );

  const [isWeightValid, setIsWeightValid] = useState("");
  const IsWeightValid = (
    <RadioGroup
      options={YesNoOptions}
      value={isWeightValid}
      onChange={setIsWeightValid}
      label={"האם משקלך מעל 50 ק״ג?"}
    />
  );

  const [isSurgeryValid, setIsSurgeryValid] = useState("");
  const IsSurgeryValid = (
    <RadioGroup
      options={YesNoOptions}
      value={isSurgeryValid}
      onChange={setIsSurgeryValid}
      label={"האם עברת ניתוח כירורגי בחצי השנה האחרונה?"}
    />
  );

  const [isRightAge, setIsRightAge] = useState("");
  const IsRightAge = (
    <RadioGroup
      options={YesNoOptions}
      value={isRightAge}
      onChange={setIsRightAge}
      label={"האם הנך מעל גיל 17?"}
    />
  );

  const [wasPregnant, setWasPregnantEver] = useState("");
  const WasPregnant = (
    <RadioGroup
      options={YesNoNotApplicableOptions}
      value={wasPregnant}
      onChange={setWasPregnantEver}
      label={"לנשים: האם היית / הנך בהריון?"}
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
    hasAlreadyDonated === "yes" &&
    isWeightValid === "yes" &&
    isSurgeryValid === "no" &&
    isRightAge === "yes" &&
    wasPregnant === "no";

  const isWrongAnswerChosen =
    hasAlreadyDonated === "no" ||
    isWeightValid === "no" ||
    isSurgeryValid === "yes" ||
    isRightAge === "no" ||
    wasPregnant === "yes";

  const isVerified = isCorrectAnswers && isConfirmed;

  return (
    <ZMScreen title="שאלון התאמה" hasBackButton>
      <Popup
        buttonApproveText="אישור"
        open={isWrongAnswerChosen}
        titleFirst="נראה כי אינך עומד בתנאים הדרושים לביצוע תרומה"
        titleSecond="אנא וודא תשובתך"
        onApproved={() => {
          if (hasAlreadyDonated === "no") {
            setHasAlreadyDonated("");
          }
          if (isWeightValid === "no") {
            setIsWeightValid("");
          }
          if (isSurgeryValid === "yes") {
            setIsSurgeryValid("");
          }
          if (isRightAge === "no") {
            setIsRightAge("");
          }
          if (wasPregnant === "yes") {
            setWasPregnantEver("");
          }
          return Promise.resolve();
        }}
      />

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

        <Button
          className={styles.continueButton}
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
      titleFirst={"אופס!"}
      titleSecond={text}
      buttonApproveText={"בחירת מועד חדש"}
      open={true}
      onApproved={props.goToHomePage}
    />
  );
}
