import React, { useEffect } from "react";
import Popup from "../../../components/basic/Popup";
import WhatsappIcon from "../../../assets/images/whatsup-color-big.svg";
import { Question, YesNoNotRelevantOptions, YesNoOptions } from "./Question";
import { WHATSAPP_LINK } from "../../contact/ContactScreen";

export interface QuestionsIchilovProps {
  setAreAllAnswersCorrect: (correct: boolean) => void;
  goToHomePage: () => Promise<void>;
}

export default function QuestionsIchilov({
  setAreAllAnswersCorrect,
  goToHomePage,
}: QuestionsIchilovProps) {
  const [hasAlreadyDonated, setHasAlreadyDonated] =
    React.useState<boolean | undefined>(undefined);
  const [isWeightValid, setIsWeightValid] =
    React.useState<boolean | undefined>(undefined);
  const [isSurgeryValid, setIsSurgeryValid] =
    React.useState<boolean | undefined>(undefined);
  const [isRightAge, setIsRightAge] =
    React.useState<boolean | undefined>(undefined);
  const [wasPregnant, setWasPregnantEver] =
    React.useState<string | undefined>(undefined);
  const [isTattooValid, setIsTattooValid] =
    React.useState<boolean | undefined>(undefined);

  useEffect(() => {
    const res =
      (hasAlreadyDonated &&
        isWeightValid &&
        isSurgeryValid === false &&
        isTattooValid === false &&
        isRightAge &&
        wasPregnant !== "yes") ||
      false;

    setAreAllAnswersCorrect(res);
  }, [
    hasAlreadyDonated,
    isWeightValid,
    isSurgeryValid,
    isRightAge,
    wasPregnant,
    isTattooValid,
    setAreAllAnswersCorrect,
  ]);

  const isWrongAnswerChosen =
    hasAlreadyDonated === false ||
    isWeightValid === false ||
    isSurgeryValid ||
    isTattooValid ||
    isRightAge === false ||
    wasPregnant === "yes";

  return (
    <>
      <Question
        value={wasPregnant}
        onChange={setWasPregnantEver}
        label={"האם היית / הנך בהריון?"}
        options={YesNoNotRelevantOptions}
      />
      <Question
        value={hasAlreadyDonated}
        onChange={setHasAlreadyDonated}
        label={"האם תרמת דם / טרומבוציטים בעבר?"}
        options={YesNoOptions}
      />
      <Question
        value={isRightAge}
        onChange={setIsRightAge}
        label={"האם הנך מעל גיל 18?"}
        options={YesNoOptions}
      />
      <Question
        value={isWeightValid}
        onChange={setIsWeightValid}
        label={"האם משקלך מעל 55 ק״ג?"}
        options={YesNoOptions}
      />
      <Question
        value={isSurgeryValid}
        onChange={setIsSurgeryValid}
        label={"האם עברת ניתוח כירורגי בחצי השנה האחרונה?"}
        options={YesNoOptions}
      />
      <Question
        value={isTattooValid}
        onChange={setIsTattooValid}
        label={"האם עשית קעקוע או עגילים בחצי השנה האחרונה?"}
        options={YesNoOptions}
      />

      <Popup
        open={isWrongAnswerChosen}
        title={"מודים לך על הכוונה הטובה!"}
        content={
          "לצערנו נראה שאין אפשרות לתרום טרומבוציטים במצב זה. לבירור נוסף ניתן ליצור קשר עם בנק מרכיבי הדם 058−7100571 או בהודעה לרכז"
        }
        buttonApproveText="שלח/י ואטסאפ לרכז שלך"
        onApproved={() => {
          window.open(WHATSAPP_LINK);
        }}
        image={WhatsappIcon}
        goBackText={"חזרה לרשימת התורים"}
        onBack={goToHomePage}
        onClose={() => {
          if (!hasAlreadyDonated) {
            setHasAlreadyDonated(undefined);
          }
          if (!isWeightValid) {
            setIsWeightValid(undefined);
          }
          if (isSurgeryValid) {
            setIsSurgeryValid(undefined);
          }
          if (isTattooValid) {
            setIsTattooValid(undefined);
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
    </>
  );
}
