import React, { useEffect } from "react";
import Popup from "../../../components/basic/Popup";
import WhatsappIcon from "../../../assets/images/whatsup-color-big.svg";
import { Question, YesNoNotRelevantOptions, YesNoOptions } from "./Question";
import { Hospital, LinkUtils } from "@zm-blood-components/common";
import { QuestionsProps } from "./QuestionnaireQuestions";

export default function QuestionsBeilinson({
  setAreAllAnswersCorrect,
  goToHomePage,
}: QuestionsProps) {
  const [hasAlreadyDonated, setHasAlreadyDonated] = React.useState<
    boolean | undefined
  >(undefined);
  const [isWeightValid, setIsWeightValid] = React.useState<boolean | undefined>(
    undefined
  );
  const [isSurgeryValid, setIsSurgeryValid] = React.useState<
    boolean | undefined
  >(undefined);
  const [isRightAge, setIsRightAge] = React.useState<boolean | undefined>(
    undefined
  );
  const [wasPregnant, setWasPregnantEver] = React.useState<string | undefined>(
    undefined
  );

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
        analytics={{ analyticsName: Hospital.BEILINSON + "_was_pregnant" }}
        value={wasPregnant}
        onChange={setWasPregnantEver}
        label={"האם היית / הנך בהריון?"}
        options={YesNoNotRelevantOptions}
      />
      <Question
        analytics={{
          analyticsName: Hospital.BEILINSON + "_has_already_donated",
        }}
        value={hasAlreadyDonated}
        onChange={setHasAlreadyDonated}
        label={"האם תרמת דם / טרומבוציטים בעבר?"}
        options={YesNoOptions}
      />
      <Question
        analytics={{ analyticsName: Hospital.BEILINSON + "_is_right_age" }}
        value={isRightAge}
        onChange={setIsRightAge}
        label={"האם הנך מעל גיל 17?"}
        options={YesNoOptions}
      />
      <Question
        analytics={{ analyticsName: Hospital.BEILINSON + "_is_weight_valid" }}
        value={isWeightValid}
        onChange={setIsWeightValid}
        label={"האם משקלך מעל 50 ק״ג?"}
        options={YesNoOptions}
      />
      <Question
        analytics={{ analyticsName: Hospital.BEILINSON + "_is_surgery_valid" }}
        value={isSurgeryValid}
        onChange={setIsSurgeryValid}
        label={"האם עברת ניתוח כירורגי בחצי השנה האחרונה?"}
        options={YesNoOptions}
      />

      <Popup
        analytics={{
          analyticsName: Hospital.BEILINSON + "_failed_questionnaire",
        }}
        open={isWrongAnswerChosen}
        title={"מודים לך על הכוונה הטובה!"}
        buttonApproveText="שלח/י ואטסאפ"
        onApproved={() => {
          window.open(
            LinkUtils.getWhatsAppLinkWithText(
              "אהלן, לפי השאלון באפליקציה אין לי יכולת לתרום טרומבוציטים כרגע, כיצד אוכל לשנות זאת?",
              "039376052"
            )
          );
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
      >
        לצערנו נראה שאין אפשרות לתרום טרומבוציטים במצב זה. לבירור נוסף ניתן
        ליצור קשר עם מיכל, מתאמת התרומות בבילינסון, בטלפון 03−9376052 או בהודעת
        וואטסאפ
      </Popup>
    </>
  );
}
