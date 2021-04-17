import React, { useEffect } from "react";
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

interface QuestionnaireScreenProps {
  bookableAppointment: DonationSlot;
  onSuccess: () => void;
  isLoading: boolean;
  debugMode: boolean;
}

const YesNoOptions: RadioOption[] = [
  { value: "yes", label: "כן" },
  { value: "no", label: "לא" },
];

export default function QuestionnaireScreen({
  bookableAppointment,
  onSuccess,
  isLoading,
  debugMode,
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

  const [isWeightOver55, setIsWeightOver55] = useState("");
  const IsWeightOver55 = (
    <RadioGroup
      options={YesNoOptions}
      value={isWeightOver55}
      onChange={setIsWeightOver55}
      label={"האם משקלך מעל 50 ק״ג?"}
    />
  );

  const [isRecentTattoo, setIsRecentTattoo] = useState("");
  const IsRecentTattoo = (
    <RadioGroup
      options={YesNoOptions}
      value={isRecentTattoo}
      onChange={setIsRecentTattoo}
      label={"האם עשית קעקוע/עגיל בחצי השנה האחרונה?"}
    />
  );

  const [isDiabetes, setIsDiabetes] = useState("");
  const IsDiabetes = (
    <RadioGroup
      options={YesNoOptions}
      value={isDiabetes}
      onChange={setIsDiabetes}
      label={"האם יש לך סכרת שאינה יציבה ומצריכה טיפול ע״י אינסולין?"}
    />
  );

  const [isTakingMedicine, setIsTakingMedicine] = useState("");
  const IsTakingMedicine = (
    <RadioGroup
      options={YesNoOptions}
      value={isTakingMedicine}
      onChange={setIsTakingMedicine}
      label={"האם הינך נוטל תרופות?"}
    />
  );

  const [isAbroadThisYear, setIsAbroadThisYear] = useState("");
  const IsAbroadThisYear = (
    <RadioGroup
      options={YesNoOptions}
      value={isAbroadThisYear}
      onChange={setIsAbroadThisYear}
      label={"האם שהית בחו״ל בשנה האחרונה?"}
    />
  );

  const [isSurgeryLastMonth, setIsSurgeryLastMonth] = useState("");
  const IsSurgeryLastMonth = (
    <RadioGroup
      options={YesNoOptions}
      value={isSurgeryLastMonth}
      onChange={setIsSurgeryLastMonth}
      label={"האם עברת ניתוח בחודש האחרון?"}
    />
  );

  const [isChronicDisease, setIsChronicDisease] = useState("");
  const IsChronicDisease = (
    <RadioGroup
      options={YesNoOptions}
      value={isChronicDisease}
      onChange={setIsChronicDisease}
      label={"האם יש לך מחלה כרונית?"}
    />
  );

  const [isCancer, setIsCancer] = useState("");
  const IsCancer = (
    <RadioGroup
      options={YesNoOptions}
      value={isCancer}
      onChange={setIsCancer}
      label={"האם הינך או היית בעבר חולה במחלת הסרטן?"}
    />
  );

  const [isAntibioticLast3Days, setIsAntibioticLast3Days] = useState("");
  const IsAntibioticLast3Days = (
    <RadioGroup
      options={YesNoOptions}
      value={isAntibioticLast3Days}
      onChange={setIsAntibioticLast3Days}
      label={"האם נטלת אנטיביוטיקה בשלושת הימים האחרונים?"}
    />
  );

  const [isDentistLast10Days, setIsDentistLast10Days] = useState("");
  const IsDentistLast10Days = (
    <RadioGroup
      options={YesNoOptions}
      value={isDentistLast10Days}
      onChange={setIsDentistLast10Days}
      label={"האם עברת טיפול אצל רופא שיניים בעשרת הימים האחרונים?"}
    />
  );

  const [isWounded, setIsWounded] = useState("");
  const IsWounded = (
    <RadioGroup
      options={YesNoOptions}
      value={isWounded}
      onChange={setIsWounded}
      label={"האם יש לך פצע פתוח או שריטה?"}
    />
  );

  const [isRightAge, setIsRightAge] = useState("");
  const IsRightAge = (
    <RadioGroup
      options={YesNoOptions}
      value={isRightAge}
      onChange={setIsRightAge}
      label={"האם אתה בטווח הגילאים 17-65?"}
    />
  );

  const [isPregnantEver, setIsPregnantEver] = useState("");
  const IsPregnantEver = (
    <RadioGroup
      options={YesNoOptions}
      value={isPregnantEver}
      onChange={setIsPregnantEver}
      label={"האם היית בהריון במהלך חצי השנה האחרונה?"}
    />
  );

  const [
    isLastDonationMoreThanAMonthAgo,
    setIsLastDonationMoreThanAMonthAgo,
  ] = useState("");
  const IsLastDonationMoreThanAMonthAgo = (
    <RadioGroup
      options={YesNoOptions}
      value={isLastDonationMoreThanAMonthAgo}
      onChange={setIsLastDonationMoreThanAMonthAgo}
      label={"האם עבר מעל חודש מאז תרומת-הטרומבוציטים האחרונה שלך?"}
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

  // For debugging purposes,
  // upon 5 clicks on the confirmation checkbox within 5 seconds,
  // the questionnaire can be skipped
  const [debugClickPool, setDebugClickPool] = useState<number[]>([]);

  useEffect(() => {
    const nextDebugClick = Date.now();
    console.log(nextDebugClick);
    const prevDebugPool = debugClickPool.filter(
      (prevClickMillis) => nextDebugClick - prevClickMillis < 5_000
    );
    setDebugClickPool([...prevDebugPool, nextDebugClick]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed]);

  const isCorrectAnswers =
    hasAlreadyDonated === "yes" &&
    isWeightOver55 === "yes" &&
    isRecentTattoo === "no" &&
    isDiabetes === "no" &&
    isTakingMedicine === "no" &&
    isAbroadThisYear === "no" &&
    isSurgeryLastMonth === "no" &&
    isChronicDisease === "no" &&
    isCancer === "no" &&
    isAntibioticLast3Days === "no" &&
    isDentistLast10Days === "no" &&
    isWounded === "no" &&
    isRightAge === "yes" &&
    isPregnantEver === "no" &&
    isLastDonationMoreThanAMonthAgo === "yes";

  const isWrongAnswerChosen =
    hasAlreadyDonated === "no" ||
    isWeightOver55 === "no" ||
    isRecentTattoo === "yes" ||
    isDiabetes === "yes" ||
    isTakingMedicine === "yes" ||
    isAbroadThisYear === "yes" ||
    isSurgeryLastMonth === "yes" ||
    isChronicDisease === "yes" ||
    isCancer === "yes" ||
    isAntibioticLast3Days === "yes" ||
    isDentistLast10Days === "yes" ||
    isWounded === "yes" ||
    isRightAge === "no" ||
    isPregnantEver === "yes" ||
    isLastDonationMoreThanAMonthAgo === "no";

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
          if (isWeightOver55 === "no") {
            setIsWeightOver55("");
          }
          if (isRecentTattoo === "yes") {
            setIsRecentTattoo("");
          }
          if (isDiabetes === "yes") {
            setIsDiabetes("");
          }
          if (isTakingMedicine === "yes") {
            setIsTakingMedicine("");
          }
          if (isAbroadThisYear === "yes") {
            setIsAbroadThisYear("");
          }
          if (isSurgeryLastMonth === "yes") {
            setIsSurgeryLastMonth("");
          }
          if (isChronicDisease === "yes") {
            setIsChronicDisease("");
          }
          if (isCancer === "yes") {
            setIsCancer("");
          }
          if (isAntibioticLast3Days === "yes") {
            setIsAntibioticLast3Days("");
          }
          if (isDentistLast10Days === "yes") {
            setIsDentistLast10Days("");
          }
          if (isWounded === "yes") {
            setIsWounded("");
          }
          if (isRightAge === "no") {
            setIsRightAge("");
          }
          if (isPregnantEver === "yes") {
            setIsPregnantEver("");
          }
          if (isLastDonationMoreThanAMonthAgo === "no") {
            setIsLastDonationMoreThanAMonthAgo("");
          }
        }}
      ></Popup>

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

        <div className={styles.question}>{HaveYouAlreadyDonated}</div>
        <div className={styles.question}>{IsWeightOver55}</div>
        <div className={styles.question}>{IsRecentTattoo}</div>
        <div className={styles.question}>{IsDiabetes}</div>
        <div className={styles.question}>{IsTakingMedicine}</div>
        <div className={styles.question}>{IsAbroadThisYear}</div>
        <div className={styles.question}>{IsSurgeryLastMonth}</div>
        <div className={styles.question}>{IsChronicDisease}</div>
        <div className={styles.question}>{IsCancer}</div>
        <div className={styles.question}>{IsAntibioticLast3Days}</div>
        <div className={styles.question}>{IsDentistLast10Days}</div>
        <div className={styles.question}>{IsWounded}</div>
        <div className={styles.question}>{IsRightAge}</div>
        <div className={styles.question}>{IsPregnantEver}</div>
        <div className={styles.question}>{IsLastDonationMoreThanAMonthAgo}</div>

        <div className={styles.confirmButtonContainer}>{IsConfirmed}</div>
        {debugClickPool.length > 4 && (
          <div className={styles.debugBypassWarning}>נא למלא את שאר השאלון</div>
        )}
        <Button
          className={styles.continueButton}
          isDisabled={!debugMode && !isVerified && debugClickPool.length < 5}
          onClick={onSuccess}
          title={"המשך"}
          isLoading={isLoading}
        />
      </div>
    </ZMScreen>
  );
}
