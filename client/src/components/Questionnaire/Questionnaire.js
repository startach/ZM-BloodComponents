import React, { useState, useEffect, Fragment } from 'react'
import './Questionnaire.css'
import { useHistory } from 'react-router-dom'
import Button from '../button'
import { db } from '../firebase/firebase'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


export default function Questionnaire() {
    const { t } = useTranslation();
    const logo="/img/questionnaire.svg"

    let history = useHistory()
    //Set results of the questionarre into state from the drop downs
    const [result, setResults] = useState({
        Q1: "select",
        Q2: "select",
        Q3: "select",
        Q4: "select",
        Q5: "select",
        Q6: "select",
        Q7: "select",
        Q8: "select",
        Q9: "select",
        Q10: "select",
        Q11: "select",
        Q12: "select",
        Q13: "select",
        Q14: "select",
        Q15: "select",
        Q16: "select",
        Q17: "select",
    })

    let checkedAnswers = [];
    //allow submit only when all questions have been submit TODO:
    const [complete, setComplete] = useState(false)

    const [hospital, setHospital] = useState(false)
    const [gender, setGender] = useState(false)



    let languageSelected = localStorage.getItem('i18nextLng');

    //questionare questions and options, in english
    const questionList = [
        { "id": 1, "question": "Have you ever donated blood or Thrombocytes?", "options": ["Yes", "No"] },
        { "id": 2, "question": "Is your weight above 55kg?", "options": ["Yes", "No"] },
        { "id": 3, "question": "Is your weight above 50kg?", "options": ["Yes", "No"] },
        { "id": 4, "question": "Did you do a tattoo/earrings/piercing in the last 6 months?", "options": ["Yes", "No"] },
        { "id": 5, "question": "Do you have diabetes", "options": ["Yes, but stable treated by medicines", "Yes, but not stable or treated with Insulin", "No"] },
        { "id": 6, "question": "Do you take medicines?", "options": ["Yes", "No"] },
        { "id": 7, "question": "Have you been abroad in the last year?", "options": ["Yes", "No"] },
        { "id": 8, "question": "Have you gone through a medical surgery in the last month?", "options": ["Yes", "No"] },
        { "id": 9, "question": "Do you suffer from a chronical disease?", "options": ["Yes", "No"] },
        { "id": 10, "question": "Have you ever suffered from cancer?", "options": ["Yes", "No"] },
        { "id": 11, "question": "Did you take antibiotics in the last 3 days?", "options": ["Yes", "No"] },
        { "id": 12, "question": "Have you gone through Dentist procedure in the last 10 days?", "options": ["Yes", "No"] },
        { "id": 13, "question": "Do you have an open wound or a scratch?", "options": ["Yes", "No"] },
        { "id": 14, "question": "Do you confirm your age is between 17 and 65?", "options": ["Yes", "No"] },
        { "id": 15, "question": "For women only: Have you been pregnant in the last 6 months?", "options": ["Yes", "No"] },
        { "id": 16, "question": "When was your last donation?", "options": ["Less than one month ago", "Less than one month, more than ten days ago", "Less than 10 days ago", "Never"] },
        { "id": 17, "question": "Reading and truth statement confirmation", "options": ["I confirm", "I do not confirm"] },
    ]

    const questionListHeb = [
        { "id": 1, "question": "?האם תרמת טרומבוציטים בעבר", "options": ["כן", "לא"] },
        { "id": 2, "question": "האם משקלך מעל 55 ק\"ג", "options": ["כן", "לא"] },
        { "id": 3, "question": "האם משקלך מעל 50 ק\"ג", "options": ["כן", "לא"] },
        { "id": 4, "question": "האם עשית קעקוע/עגיל בחצי שנה האחרונה", "options": ["כן", "לא"] },
        { "id": 5, "question": "האם יש לך סכרת", "options": ["כן, יציב, ומטופל ע\"י תרופות", "כן, לא יציב, ומטופל ע\"י סכרת", "לא"] },
        { "id": 6, "question": "האם הינך נוטל תרופות?", "options": ["כן", "לא"] },
        { "id": 7, "question": "האם היית בחו\"ל בשנה האחרונה", "options": ["כן", "לא"] },
        { "id": 8, "question": "האם עברת ניתוח בחודש האחרון?", "options": ["כן", "לא"] },
        { "id": 9, "question": "האם יש לך מחלה כרונית?", "options": ["כן", "לא"] },
        { "id": 10, "question": "האם הנך או היית בעבר חולה במחלת הסרטן", "options": ["כן", "לא"] },
        { "id": 11, "question": "האם נטלת אנטיביוטיקה בשלושת הימים האחרונים?", "options": ["כן", "לא"] },
        { "id": 12, "question": "האם עברת טיפול אצל רופא שיניים בעשרת הימים האחרונים?", "options": ["כן", "לא"] },
        { "id": 13, "question": "האם יש לך פצע פתוח או שריטה?", "options": ["כן", "לא"] },
        { "id": 14, "question": "האם אתה בטווח הגילאים 17-65?", "options": ["כן", "לא"] },
        { "id": 15, "question": "האם היית בהריון במהלך החצי שנה האחרונה?", "options": ["כן", "לא"] },
        { "id": 16, "question": "מתי בפעם האחרונה תרמת טרומבוציטים?", "options": ["לפני יותר מחודש", "בין עשרה ימים לחודש.", "פחות מעשרה ימים", "לעולם לא"] },
        { "id": 17, "question": "הצהרה שכל האמור לעיל הינו אמת", "options": ["מצהיר ומאשר", "לא מאשר"] },
    ]
    //saves result of drop down into state by Question/ID number
    const handleResults = (e, index) => {
      console.log( e.target.value)
        let thisQ = "Q" + (index + 1);
        setResults({ ...result, [thisQ]: e.target.value })
        
        
    }



    const handleSubmit = (e) => {
        var sum = questionList.length - 1;
        //changhe for question length gender/hospital

        Object.keys(result).forEach(function (key) {

            if (result[key] != 'select') {
                sum--;
            }
            console.log("sum is", sum)
            // setComplete(true)
        });
        if (sum == 0) {
            setComplete(true)
            var appointId = localStorage.getItem('appointmentId');
            var userId = localStorage.getItem('userid')
            db.collection('Appointments').doc(appointId).update({
                userID: userId
            })


            console.log(appointId, userId)

            history.push('/verfication')
        } else {

            alert("you need to answer all questions before you can submit the questionnare")
        }
        e.preventDefault();

    }

    // const handleChecked = (question, index, option) => {
    //     if (checkedAnswers.includes(`${index+'@'+option}`)) {
            
    //     }
    // }

    useEffect(() => {

        setHospital(localStorage.getItem('hospital'))
        setGender(localStorage.getItem('gender'))

        console.log(hospital, gender)

    }, [])



    return (
        <div className="questionnairePage">
          <br></br>
              <img src={logo} className="questionImg" />

            <form onSubmit={handleSubmit}>
                {(languageSelected==='en'? questionList : questionListHeb).map((question, index) => (


                    //Questionairee Logic
                    hospital == "Ichilov" && question.id == 3 ? <div></div> :
                        hospital !== "Ichilov" && question.id == 2 ? <div></div> :
                            gender == "female" && question.id == 15 ? <div></div> :

                                <div className="questions">

                                    <div className="left">
                                        <div><b>{question.id}:</b> {question.question}</div>
                                    </div>


                                    <div className="right">
                                        {(question.id == (5) || question.id == 16) ? (
                                            <Fragment>
                                                <select class="dropdown" onChange={e => handleResults(e, index)}>
                                                <option disabled="disabled" selected="selected">{t('general.select')}</option>
                                                    {question.options.map(option => (
                                                        <option>{option}</option>

                                                    ))}

                                                </select>

                                            </Fragment>


                                        ) : (
                                                <Fragment>
                                                    <radiogroup>
                                                    {question.options.map(option => (
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                class="options"
                                                                id={index+'@'+option}
                                                                value={index-option}
                                                                name={`Question${index}`}
                                                                // onClick={() => checkedAnswers.push(index+'@'+option)}
                                                                onChange={(e) => {handleResults(e, index);
                                                                    // handleChecked(question, index, option)
                                                                }}
                                                            />
                                                            {"" + option +""}
                                                        </label>

                                                    ))}
                                                    </radiogroup>
                                                </Fragment>
                                            )
                                        }
                                    </div>


                                </div>
                )

                )}
                <div className="submit">
                    <Button type="submit" text={t('questionnaire.submit')}  ></Button>
                </div>

            </form>

        </div>
    )
}