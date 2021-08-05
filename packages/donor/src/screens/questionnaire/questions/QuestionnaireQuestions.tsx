import React from "react";
import { Hospital } from "@zm-blood-components/common";
import QuestionsBeilinson from "./QuestionsBeilinson";
import QuestionsIchilov from "./QuestionsIchilov";
import QuestionsSoroka from "./QuestionsSoroka";

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
    case Hospital.SOROKA:
      return (
        <QuestionsSoroka
          setAreAllAnswersCorrect={setAreAllAnswersCorrect}
          goToHomePage={goToHomePage}
        />
      );
  }

  return (
    <QuestionsIchilov
      setAreAllAnswersCorrect={setAreAllAnswersCorrect}
      goToHomePage={goToHomePage}
    />
  );
}
