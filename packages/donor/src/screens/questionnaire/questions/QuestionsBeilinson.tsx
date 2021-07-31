import React, { useEffect } from "react";
import Popup from "../../../components/basic/Popup";
import WhatsappIcon from "../../../assets/images/whatsup-color-big.svg";
import { Question, YesNoNotRelevantOptions, YesNoOptions } from "./Question";
import { WHATSAPP_LINK } from "../../contact/ContactScreen";

export interface QuestionsBeilinsonProps {
  setAreAllAnswersCorrect: (correct: boolean) => void;
  goToHomePage: () => Promise<void>;
}

export default function QuestionsBeilinson({
  setAreAllAnswersCorrect,
  goToHomePage,
}: QuestionsBeilinsonProps) {
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

  useEffect(() => {
    const res =
      (hasAlreadyDonated &&
        isWeightValid &&
        isSurgeryValid === false &&
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
    setAreAllAnswersCorrect,
  ]);

  const isWrongAnswerChosen =
    hasAlreadyDonated === false ||
    isWeightValid === false ||
    isSurgeryValid ||
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
        label={"האם הנך מעל גיל 17?"}
        options={YesNoOptions}
      />
      <Question
        value={isWeightValid}
        onChange={setIsWeightValid}
        label={"האם משקלך מעל 50 ק״ג?"}
        options={YesNoOptions}
      />
      <Question
        value={isSurgeryValid}
        onChange={setIsSurgeryValid}
        label={"האם עברת ניתוח כירורגי בחצי השנה האחרונה?"}
        options={YesNoOptions}
      />

      <Popup
        open={isWrongAnswerChosen}
        title={"מודים לך על הכוונה הטובה!"}
        content={
          "לצערנו נראה שאין אפשרות לתרום טרומבוציטים במצב זה. לבירור נוסף ניתן ליצור קשר עם מיכל, מתאמת התרומות בבילינסון, בטלפון 03−9376052 או עם רכז בנק הדם בהודעת וואטסאפ"
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
          if (!isRightAge) {
            setIsRightAge(undefined);
          }
          if (wasPregnant === "yes") {
            setWasPregnantEver(undefined);
          }
          return Promise.resolve();
        }}
      />
    </>
  );
}
