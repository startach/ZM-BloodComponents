import React, { useState, useEffect } from 'react'
import './Questionnaire.css'
import { useHistory } from 'react-router-dom'
import Button from '../button'
import { db } from '../firebase/firebase'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


export default function Questionnaire() {
    const { t } = useTranslation();

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

    //allow submit only when all questions have been submit TODO:
    const [complete, setComplete] = useState(false)

    const [hospital, setHospital] = useState(false)
    const [gender, setGender] = useState(false)


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

    //saves result of drop down into state by Question/ID number
    const handleResults = (e, index) => {
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


    useEffect(() => {

        setHospital(localStorage.getItem('hospital'))
        setGender(localStorage.getItem('gender'))

        console.log(hospital, gender)

    }, [])



    return (
        <div className="questionnairePage">

            <form onSubmit={handleSubmit}>
                {questionList.map((question, index) => (


                    //Questionairee Logic
                    hospital == "Ichilov" && question.id == 3 ? <div></div> :
                        hospital !== "Ichilov" && question.id == 2 ? <div></div> :
                            gender == "female" && question.id == 15 ? <div></div> :

                                <div className="questions">
                                    <div className="left">
                                        <div><b>{question.id}:</b> {question.question}</div>
                                    </div>

                                    <div className="right">
                                        <select class="dropdown" onChange={e => handleResults(e, index)}>
                                            <option disabled="disabled" selected="selected">{t('general.select')}</option>
                                            {question.options.map((option) => <option>{option}</option>)}
                                        </select>
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
