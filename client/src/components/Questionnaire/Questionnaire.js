import React, { useState, useEffect, Fragment } from "react";
import "./Questionnaire.css";
import { useHistory } from "react-router-dom";
import Button from "../button";
import { db } from "../firebase/firebase";
import { useTranslation } from "react-i18next";
import qIcon from "./questionnaire.svg";
import {getUserById} from "../../services/userService"

export default function Questionnaire() {
  const { t } = useTranslation();
  const userId = localStorage.getItem("userid");
  let history = useHistory();
  //Set results of the questionarre into state from the drop downs
  const [result, setResults] = useState({
    Q1: `${t("questionnaire.select")}`,
    Q2: `${t("questionnaire.select")}`,
    Q3: `${t("questionnaire.select")}`,
    Q4: `${t("questionnaire.select")}`,
    Q5: `${t("questionnaire.select")}`,
    Q6: `${t("questionnaire.select")}`,
    Q7: `${t("questionnaire.select")}`,
    Q8: `${t("questionnaire.select")}`,
    Q9: `${t("questionnaire.select")}`,
    Q10: `${t("questionnaire.select")}`,
    Q11: `${t("questionnaire.select")}`,
    Q12: `${t("questionnaire.select")}`,
    Q13: `${t("questionnaire.select")}`,
    Q14: `${t("questionnaire.select")}`,
    Q15: `${t("questionnaire.select")}`,
    Q16: `${t("questionnaire.select")}`,
  });

  //allow submit only when all questions have been submit TODO:

  const [hospitalsNames, setHospitalsNames] = useState(['Ichilov', 'Tal Hashomer', 'Beilinsohn', 'Hadassah', 'Rambam', 'Soroka'])
  const [hospital, setHospital] = useState();
  const [gender, setGender] = useState();
  const [errors, setErrors] = useState([]);

  let languageSelected = localStorage.getItem("i18nextLng");

  //questionare questions and options, in english
  const questionList = [
    {
      id: 1,
      question: t('questionnaire.q_blood_or_thrombocytes'),
      options: [t('questionnaire.option_yes'), t('questionnaire.option_no')],
      condition: { hospitals: ['Beilinsohn'], invalidSelection: [t('questionnaire.option_no')], error: t("questionnaire.error_blood_or_thrombocytes") }
    },
    {
      id: 2,
      question: t(hospital != 'Ichilov' ? 'questionnaire.q_weight' : 'questionnaire.q_weight_ichilov'),
      options: [t('questionnaire.option_yes'), t('questionnaire.option_no')],
      condition: { hospitals: hospital != 'Ichilov' ? [...hospitalsNames] : ['Ichilov'], invalidSelection: [t('questionnaire.option_no')], error: t(hospital != 'Ichilov' ? 'questionnaire.error_weight' : 'questionnaire.error_weight_ichilov') }
    },
    {
      id: 3,
      question: t('questionnaire.q_tattoo_earrings_piercing'),
      options: [t('questionnaire.option_yes'), t('questionnaire.option_no')],
      condition: { hospitals: [...hospitalsNames], invalidSelection: [t('questionnaire.option_yes')], error: t("questionnaire.error_tattoo_earrings_piercing") }
    },
    {
      id: 4,
      question: t('questionnaire.q_diabetes'),
      options: [
        t('questionnaire.q_diabetes_option_yes_stable'),
        t('questionnaire.q_diabetes_option_yes_not_stable'),
        t('questionnaire.q_diabetes_option_no'),
      ],
      condition: {
        hospitals: [...hospitalsNames], invalidSelection: [t('questionnaire.q_diabetes_option_yes_not_stable')],
        error: t("questionnaire.error_diabetes")
      }
    },
    {
      id: 5, question: t('questionnaire.q_medicines'),
      options: [t('questionnaire.option_yes'), t('questionnaire.option_no')],
      condition: {
        hospitals: [...hospitalsNames], invalidSelection: [t('questionnaire.option_yes')],
        error: t("questionnaire.error_medicines")
      }
    },
    {
      id: 6,
      question: t('questionnaire.q_aboard'),
      options: [t('questionnaire.option_yes'), t('questionnaire.option_no')],
      condition: {
        hospitals: [...hospitalsNames], invalidSelection: [t('questionnaire.option_yes')],
        error: t("questionnaire.error_aboard")
      }
    },
    {
      id: 7,
      question: t('questionnaire.q_surgery'),
      options: [t('questionnaire.option_yes'), t('questionnaire.option_no')],
      condition: {
        hospitals: [...hospitalsNames], invalidSelection: [t('questionnaire.option_yes')],
        error: t("questionnaire.error_surgery")
      }
    },
    {
      id: 8,
      question: t('questionnaire.q_chronic_disease'),
      options: [t('questionnaire.option_yes'), t('questionnaire.option_no')],
      condition: {
        hospitals: [...hospitalsNames], invalidSelection: [t('questionnaire.option_yes')],
        error: t("questionnaire.error_chronic_disease")
      }
    },
    {
      id: 9,
      question: t('questionnaire.q_cancer'),
      options: [t('questionnaire.option_yes'), t('questionnaire.option_no')],
      condition: {
        hospitals: [...hospitalsNames], invalidSelection: [t('questionnaire.option_yes')],
        error: t("questionnaire.error_cancer")
      }
    },
    {
      id: 10,
      question: t('questionnaire.q_antibiotics'),
      options: [t('questionnaire.option_yes'), t('questionnaire.option_no')],
      condition: {
        hospitals: [...hospitalsNames], invalidSelection: [t('questionnaire.option_yes')],
        error: t("questionnaire.error_antibiotics")
      }
    },
    {
      id: 11,
      question: t('questionnaire.q_dentist_procedure'),
      options: [t('questionnaire.option_yes'), t('questionnaire.option_no')],
      condition: {
        hospitals: [...hospitalsNames], invalidSelection: [t('questionnaire.option_yes')],
        error: t("questionnaire.error_dentist_procedure")
      }
    },
    {
      id: 12,
      question: t('questionnaire.q_open_wound_or_scratch'),
      options: [t('questionnaire.option_yes'), t('questionnaire.option_no')],
      condition: {
        hospitals: ['Beilinsohn'], invalidSelection: [t('questionnaire.option_yes')],
        error: t("questionnaire.error_open_wound_or_scratch")
      }
    },
    {
      id: 13,
      question: t(hospital != 'Ichilov' ? 'questionnaire.q_age' : 'questionnaire.q_age_ichilov'),
      options: [t('questionnaire.option_yes'), t('questionnaire.option_no')],
      condition: {
        hospitals: hospital != 'Ichilov' ? [...hospitalsNames] : ['Ichilov'], invalidSelection: [t('questionnaire.option_no')],
        error: t(hospital != 'Ichilov' ? "questionnaire.error_age" : "questionnaire.error_age_ichilov")
      }
    },
    {
      id: 14,
      question: t(hospital != 'Beilinsohn' ? 'questionnaire.q_pregnant' : 'questionnaire.q_pregnant_beilinsohn'),
      options: [t('questionnaire.option_yes'), t('questionnaire.option_no')],
      condition: {
        hospitals: hospital != 'Beilinsohn' ? [...hospitalsNames] : ['Beilinsohn'], invalidSelection: [t('questionnaire.option_yes')],
        error: t(hospital != 'Beilinsohn' ? "questionnaire.error_pregnant" : "questionnaire.error_pregnant_beilinsohn")
      }
    },
    {
      id: 15,
      question: t('questionnaire.q_last_donation'),
      options: [
        t('questionnaire.q_last_donation_over_month'),
        t('questionnaire.q_last_donation_less_month_more_10_days'),
        t('questionnaire.q_last_donation_less_10_days'),
        t('questionnaire.q_last_donation_never')
      ],
      condition: {
        hospitals: ['Beilinsohn'], invalidSelection: [t('questionnaire.q_last_donation_never')],
        error: t("questionnaire.error_last_donation")
      }
    },
    {
      id: 16,
      question: t('questionnaire.q_confirmation'),
      options: [t('questionnaire.q_confirmation_option_confirm'), t('questionnaire.q_confirmation_option_dont')],
      condition: {
        hospitals: [...hospitalsNames], invalidSelection: [t('questionnaire.q_confirmation_option_dont')],
        error: t("questionnaire.error_confirmation")
      }
    },
  ];

  //saves result of drop down into state by Question/ID number
  const handleResults = (e, index) => {
    let thisQ = "Q" + (index + 1);
    if (questionList[index].condition.hospitals.includes(hospital) && questionList[index].condition.invalidSelection.includes(e.target.value)) {
      setErrors([...errors, thisQ])
    } else if (errors.includes(thisQ)) {
      let newErrors = errors.slice()
      newErrors.splice(errors.indexOf(thisQ), 1)
      setErrors(newErrors)
    }
    setResults({ ...result, [thisQ]: e.target.value });
  };

  const handleSubmit = (e) => {
    //change questions length depend on hospital name
    var sum = questionList.length;

    //change questions length depend on gender
    if (gender == "Male") {
      sum = sum - 1;
    }

    Object.keys(result).forEach((key) => {
      // Decrease the sum if the user answer the question
      if (result[key] !== `${t("questionnaire.select")}`) {
        sum--;
      }
    });

    if (sum === 0 && errors.length === 0) {
      var appointId = localStorage.getItem("appointmentId");
      
      db.collection("Appointments").doc(appointId).update({
        userID: userId,
      });
      // console.log(appointId, userId);
      history.push("/verfication");
      // Dont allow the user to go forward without accepting the terms
    } else if (result.Q16 !== `${t("questionnaire.confirm")}`) {
      alert("You have to confirm truth statement in order to proceed with your appointment");
    } else {
      // Validation if the user answer all of the questions
      alert("you need to answer all questions before you can submit the questionnare");
    }
    e.preventDefault();
  };

  const getInlineError = (index) => {
    if (errors.includes('Q' + (index + 1))) {
      return questionList[index].condition.error
    }
  }

  useEffect(async () => {
    const user = await getUserById(userId)
    
    setHospital(localStorage.getItem("hospital"));
    setGender(user.data().genderType);
  }, []);

  return (
    <div
      style={{ textAlign: languageSelected === "en" ? "left" : "right" }}
      className="questionnairePage"
    >
      <div className="qIcon">
        <img src={qIcon} />
        <div className="highlight pageTitle">{t("screens.questionnaire")}</div>
        <span id="questionnaireSpan">
          {t("questionnaire.questionnaireSpan")}
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        {questionList.map(
          (question, index) =>
            //Remove question about pregnancy
            gender == "Male" && question.id == 14 ? (
              <div></div>
            ) : (
                <div
                  className={`${
                    languageSelected === "en" ? "questions" : "questionsRtl"
                    }`}
                >
                  <div
                    className={`${
                      languageSelected === "en" ? "left" : "leftRtl"
                      }`}
                  >
                    <div>
                      <b>{question.question} </b>
                    </div>
                  </div>

                  <div
                    className={`${
                      languageSelected === "en" ? "right" : "rightRtl"
                      }`}
                  >
                    {question.id == 4 || question.id == 15 ? (
                      <Fragment>
                        <select
                          class="dropdown"
                          onChange={(e) => handleResults(e, index)}
                        >
                          <option disabled="disabled" selected="selected">
                            {t("questionnaire.select")}
                          </option>
                          {question.options.map((option) => (
                            <option>{option}</option>
                          ))}
                        </select>
                      </Fragment>
                    ) : (
                        <Fragment>
                          <radiogroup>
                            {question.options.map((option) => (
                              <label>
                                <input
                                  type="radio"
                                  class="options"
                                  id={index + "@" + option}
                                  value={option}
                                  name={`Question${index}`}
                                  onChange={(e) => {
                                    handleResults(e, index);
                                  }}
                                />
                                {" " + option}
                              </label>
                            ))}
                          </radiogroup>
                        </Fragment>
                      )}
                  </div>
                  <p style={{ color: 'darkred', width: '80%' }}>{getInlineError(index)}</p>
                </div>
              )
        )}
        <div className="submit">
          <Button type="submit" text={t("questionnaire.submit")}></Button>
        </div>
      </form>
    </div>
  );
}
