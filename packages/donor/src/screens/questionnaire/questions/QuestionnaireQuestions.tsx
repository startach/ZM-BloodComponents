import React from "react";
import { Hospital } from "@zm-blood-components/common";
import QuestionsBeilinson from "./QuestionsBeilinson";
import QuestionsIchilov from "./QuestionsIchilov";

export interface QuestionnaireQuestionsProps {
  setAreAllAnswersCorrect: (correct: boolean) => void;
  hospital: Hospital;
  goToHomePage: () => Promise<void>;
}

export default function QuestionnaireQuestions({
  setAreAllAnswersCorrect,
  hospital,
  goToHomePage,
}: QuestionnaireQuestionsProps) {
  switch (hospital) {
    case Hospital.BEILINSON:
      return (
        <QuestionsBeilinson
          setAreAllAnswersCorrect={setAreAllAnswersCorrect}
          goToHomePage={goToHomePage}
        />
      );
    case Hospital.ICHILOV:
      return (
        <QuestionsIchilov
          setAreAllAnswersCorrect={setAreAllAnswersCorrect}
          goToHomePage={goToHomePage}
        />
      );
  }

  return (
    <QuestionsBeilinson
      setAreAllAnswersCorrect={setAreAllAnswersCorrect}
      goToHomePage={goToHomePage}
    />
  );
}
