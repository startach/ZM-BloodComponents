import React, { useEffect } from "react";
import Popup from "../../../components/basic/Popup";
import WhatsappIcon from "../../../assets/images/whatsup-color-big.svg";
import { Question, YesNoNotRelevantOptions, YesNoOptions } from "./Question";
import { LinkUtils } from "@zm-blood-components/common";
import { QuestionsProps } from "./QuestionnaireQuestions";

export default function QuestionsSoroka({
  setAreAllAnswersCorrect,
  goToHomePage,
}: QuestionsProps) {
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
      (isWeightValid &&
        isSurgeryValid === false &&
        isTattooValid === false &&
        isRightAge &&
        wasPregnant !== "yes") ||
      false;

    setAreAllAnswersCorrect(res);
  }, [
    isWeightValid,
    isSurgeryValid,
    isRightAge,
    wasPregnant,
    isTattooValid,
    setAreAllAnswersCorrect,
  ]);

  const isWrongAnswerChosen =
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
        value={isRightAge}
        onChange={setIsRightAge}
        label={"האם הנך מעל גיל 18?"}
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
      <Question
        value={isTattooValid}
        onChange={setIsTattooValid}
        label={"האם עשית קעקוע או עגילים בחצי השנה האחרונה?"}
        options={YesNoOptions}
      />

      <Popup
        open={isWrongAnswerChosen}
        title={"מודים לך על הכוונה הטובה!"}
        buttonApproveText="שלח/י ואטסאפ לרכז שלך"
        onApproved={() => {
          window.open(
            LinkUtils.getWhatsAppLinkWithText(
              "אהלן, לפי השאלון באפליקציה אין לי יכולת לתרום טרומבוציטים כרגע, כיצד אוכל לשנות זאת?"
            )
          );
        }}
        image={WhatsappIcon}
        goBackText={"חזרה לרשימת התורים"}
        onBack={goToHomePage}
        onClose={() => {
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
          if (wasPregnant === "yes") {
            setWasPregnantEver(undefined);
          }
          return Promise.resolve();
        }}
      >
        לצערנו נראה שאין אפשרות לתרום טרומבוציטים במצב זה. לבירור נוסף ניתן
        ליצור קשר עם בנק מרכיבי הדם 058−7100571 או בהודעה לרכז
      </Popup>
    </>
  );
}
