import React, { useState } from "react";
import RadioGroup from "../../components/basic/RadioGroup";
import { RadioOption } from "../../components/basic/RadioGroup/RadioGroup";
import DonationInfoIcons from "../../components/DonationInfoIcons";
import { AvailableAppointment } from "@zm-blood-components/common";
import Button from "../../components/basic/Button";
import styles from "./QuestionnaireScreen.module.scss";
import Text from "../../components/basic/Text";
import Checkbox from "../../components/basic/Checkbox/Checkbox";

interface QuestionnaireScreenProps {
  availableAppointment: AvailableAppointment;
  onSuccess: () => void;
}

const YesNoOptions: RadioOption[] = [
  { value: "yes", label: "כן" },
  { value: "no", label: "לא" },
];

export default function QuestionnaireScreen({
  availableAppointment,
  onSuccess,
}: QuestionnaireScreenProps) {
  const [hasAlreadyDonated, setHasAlreadyDonated] = useState("");
  const HaveYouAlreadyDonated = (
    <RadioGroup
      options={YesNoOptions}
      value={hasAlreadyDonated}
      onChange={setHasAlreadyDonated}
      label={"האם תרמת טרומבוציטים בעבר?"}
    />
  );

  const [isWeightOver55, setIsWeightOver55] = useState("");
  const IsWeightOver55 = (
    <RadioGroup
      options={YesNoOptions}
      value={isWeightOver55}
      onChange={setIsWeightOver55}
      label={"האם משקלך מעל 55 קילוגרם?"}
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
      label={"האם אתה סובל מסכרת?"}
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
      label={"האם אתה סובל ממחלה כרונית?"}
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
      label={"האם יש לך שריטה או פצע פתוח?"}
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
      label={"(לנשים) האם היית בהריון בעבר?"}
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

  const isVerified =
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
    isLastDonationMoreThanAMonthAgo === "yes" &&
    isConfirmed;

  return (
    <div>
      <div className={styles.header}>
        <Text className={styles.headerTitle}>שאלון התאמה</Text>
      </div>

      <div className={styles.donationInfo}>
        <Text className={styles.donationInfoTitle}>פרטי התור הנבחר</Text>
        <DonationInfoIcons
          hospital={availableAppointment.hospital}
          donationDate={availableAppointment.donationStartTime}
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

        <Button
          className={styles.continueButton}
          isDisabled={!isVerified}
          onClick={onSuccess}
          title={"המשך"}
        />
      </div>
    </div>
  );
}
