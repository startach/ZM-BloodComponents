import React, { useEffect } from "react";
import Popup from "../../../components/basic/Popup";
import { Hospital } from "@zm-blood-components/common";
import WhatsappIcon from "../../../assets/images/whatsup-color-big.svg";
import { WHATSAPP_LINK } from "../../contact/ContactScreen";
import { Question, YesNoNotRelevantOptions, YesNoOptions } from "./Question";

export interface QuestionsBeilinsonProps {
  setAreAllAnswersCorrect: (correct: boolean) => void;
  hospital: Hospital;
  goToHomePage: () => Promise<void>;
}

export default function QuestionsBeilinson({
  setAreAllAnswersCorrect,
  hospital,
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

  const wrongAnswerPopupContent =
    "אך לצערנו נראה שאי אפשר לתרום טרומבוציטים במצב זה. לבירור נוסף ניתן ליצור קשר עם בנק מרכיבי הדם 058−7100571 או בהודעה לרכז";

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
        content={wrongAnswerPopupContent}
        buttonApproveText="שלח/י ואטסאפ לרכז שלך"
        onApproved={() => {
          const whatsappLink =
            hospital === Hospital.BEILINSON
              ? "https://api.whatsapp.com/send?phone=972524214291"
              : WHATSAPP_LINK;
          window.open(whatsappLink);
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
          if (wasPregnant) {
            setWasPregnantEver(undefined);
          }
          return Promise.resolve();
        }}
      />
    </>
  );
}
