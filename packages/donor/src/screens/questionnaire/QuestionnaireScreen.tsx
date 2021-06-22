import React, { useState } from "react";
import Button, { ButtonVariant } from "../../components/basic/Button";
import styles from "./QuestionnaireScreen.module.scss";
import Checkbox from "../../components/basic/Checkbox/Checkbox";
import ZMScreen from "../../components/basic/ZMScreen";
import Popup from "../../components/basic/Popup";
import {
  DateUtils,
  FunctionsApi,
  LocaleUtils,
  SelectOption,
} from "@zm-blood-components/common";
import { DonationSlotToBook } from "../../navigation/app/LoggedInRouter";
import Calendar from "../../assets/images/AppointmentCalendar.svg";
import WhatsappIcon from "../../assets/images/whatsup-color-big.svg";

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

const YesNoNotRelevantOptions: SelectOption<string>[] = [
  { value: "yes", label: "כן", key: "כן" },
  { value: "no", label: "לא", key: "לא" },
  { value: "not-relevant", label: "לא רלוונטי", key: "לא רלוונטי" },
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
    <Question
      value={hasAlreadyDonated}
      onChange={setHasAlreadyDonated}
      label={"האם תרמת דם / טרומבוציטים בעבר?"}
      options={YesNoOptions}
    />
  );

  const [isWeightValid, setIsWeightValid] =
    React.useState<boolean | undefined>(undefined);
  const IsWeightValid = (
    <Question
      value={isWeightValid}
      onChange={setIsWeightValid}
      label={"האם משקלך מעל 50 ק״ג?"}
      options={YesNoOptions}
    />
  );

  const [isSurgeryValid, setIsSurgeryValid] =
    React.useState<boolean | undefined>(undefined);
  const IsSurgeryValid = (
    <Question
      value={isSurgeryValid}
      onChange={setIsSurgeryValid}
      label={"האם עברת ניתוח כירורגי בחצי השנה האחרונה?"}
      options={YesNoOptions}
    />
  );

  const [isRightAge, setIsRightAge] =
    React.useState<boolean | undefined>(undefined);
  const IsRightAge = (
    <Question
      value={isRightAge}
      onChange={setIsRightAge}
      label={"האם הנך מעל גיל 17?"}
      options={YesNoOptions}
    />
  );

  const [wasPregnant, setWasPregnantEver] =
    React.useState<string | undefined>(undefined);
  const WasPregnant = (
    <Question
      value={wasPregnant}
      onChange={setWasPregnantEver}
      label={"האם היית / הנך בהריון?"}
      options={YesNoNotRelevantOptions}
    />
  );

  const [isConfirmed, setIsConfirmed] = useState(false);
  const IsConfirmed = (
    <Checkbox
      label={"קראתי ומאשר/ת שכל המידע לעיל נכון"}
      isChecked={isConfirmed}
      onChange={setIsConfirmed}
    />
  );

  const isCorrectAnswers =
    hasAlreadyDonated &&
    isWeightValid &&
    isSurgeryValid === false &&
    isRightAge &&
    wasPregnant !== "yes";

  const isWrongAnswerChosen =
    hasAlreadyDonated === false ||
    isWeightValid === false ||
    isSurgeryValid ||
    isRightAge === false ||
    wasPregnant === "yes";

  const isVerified = isCorrectAnswers && isConfirmed;

  const wrongAnswerPopupTitle = "מודים לך על הכוונה הטובה!";

  const wrongAnswerPopupContent =
    "אך לצערנו נראה שאי אפשר לתרום טרומבוציטים במצב זה. לבירור נוסף ניתן ליצור קשר עם בנק מרכיבי הדם 058−7100571 או בהודעה לרכז";

  const donationDate = new Date(bookableAppointment.donationStartTimeMillis);

  return (
    <ZMScreen
      title="שאלון התאמה"
      hasBackButton
      fullWidth
      className={styles.screen}
    >
      <div className={styles.donationInfo}>
        <img
          src={Calendar}
          alt={"Appointment"}
          className={styles.illustration}
        />
        <div className={styles.donationInfoText}>
          <div className={styles.infoTitle}>פרטי התור הנבחר</div>
          <div className={styles.appointmentDetails}>
            {DateUtils.ToDateString(donationDate)},{" "}
            {DateUtils.ToWeekDayString(donationDate)},{" "}
            {DateUtils.ToTimeString(donationDate)},{" "}
            {LocaleUtils.getHospitalName(bookableAppointment.hospital)}
          </div>
        </div>
      </div>

      <div className={styles.questionnaireSection}>
        <div className={styles.questionnaireTitle}>
          שאלון התאמה לתרומת טרומבוציטים
        </div>
        <div className={styles.questionnaireText}>
          עזרו לנו לוודא התאמה ולמנוע מצב בו תגיעו ביום התור אך לא תוכלו לתרום
        </div>

        <div className={styles.question}>{WasPregnant}</div>
        <div className={styles.question}>{HaveYouAlreadyDonated}</div>
        <div className={styles.question}>{IsRightAge}</div>
        <div className={styles.question}>{IsWeightValid}</div>
        <div className={styles.question}>{IsSurgeryValid}</div>

        <div className={styles.notesTitle}>ידוע לי שאוכל לתרום רק אם:</div>

        <div className={styles.notesText}>
          <li>אין לי פצע פתוח/שריטה.</li>
          <li>לא נטלתי אטיביוטיקה ב-3 הימים שלפני התרומה.</li>
          <li>לא עברתי טיפול שיניים ב-10 ימים שלפני התרומה.</li>
        </div>

        <div className={styles.notesDetails}>
          ינתן שירות הסעה במונית / פתרון חניה למגיעים ברכב. אם חל שינוי במצבך
          ואיך יכול/ה לתרום אנא בטל/י את התור.
        </div>

        <div className={styles.confirmButtonContainer}>{IsConfirmed}</div>

        <Button
          isDisabled={!debugMode && !isVerified}
          onClick={onSuccess}
          title={"המשך"}
          isLoading={isLoading}
        />
      </div>

      <ErrorPopup errorCode={errorCode} goToHomePage={goToHomePage} />

      <Popup
        buttonApproveText="אישור"
        open={isWrongAnswerChosen}
        title={wrongAnswerPopupTitle}
        content={wrongAnswerPopupContent}
        image={WhatsappIcon}
        goBackText={"חזרה לרשימת התורים"}
        onBack={goToHomePage}
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

function Question<T>(props: {
  label?: string;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  value?: T;
}) {
  return (
    <>
      <div className={styles.questionLabel}>{props.label}</div>
      <div className={styles.questionButtons}>
        {props.options.map((option) => (
          <div className={styles.questionButton} key={option.key}>
            <Button
              title={option.label}
              onClick={() => props.onChange(option.value)}
              variant={ButtonVariant.outlined}
              color={props.value === option.value ? "primary" : "default"}
            />
          </div>
        ))}
      </div>
    </>
  );
}
