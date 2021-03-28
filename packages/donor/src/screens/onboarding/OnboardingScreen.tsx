import { useState } from "react";
import Stepper from "../../components/basic/Stepper";
import Button from "../../components/basic/Button";

export default function OnboardingScreen() {
  const steps = [
    {
      image:
        "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
      title: "איזה כיף שבאת!",
      content: [
        "אפליקציה זו מיועדת עבור תורמי הטרומבוציטים של זכרון מנחם ",
        "המגיעים העוזרים להציל חיים של ילדים חולי סרטן, וחולים במחלות קשות נוספות!",
      ],
      buttonText: "אישור והמשך",
    },
    {
      image:
        "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
      title: "רגע, מה זה בכלל?",
      content: [
        "טרומבוציטים (טסיות דם) הינם מרכיב בדם המהווה חלק מרכזי במנגנון הקרישה של הדם. בשונה מתרומת דם רגילה, בתרומה זו, האורכת כשעתיים, מסננים רק את הטסיות, ושאר הדם מוחזר לגוף.",
      ],
      buttonText: "אישור והמשך",
    },
    {
      image:
        "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
      title: "רגע, מה זה בכלל? 2",
      content: [
        "מנת טרומבוציטים טובה לחמישה ימים בלבד, ולכן הצורך התמידי בתרומות שוטפות. באמצעות האפליקציה תוכלו לקבוע תורים בקלות ולפי זמינות התורים בבתי החולים",
      ],
      buttonText: "אישור והמשך",
    },
    {
      image:
        "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
      title: "מי יכולים לתרום?",
      content: [
        "כל מי שמעל גיל 17 ושעברו שאלון התאמה לתרומה בעת הרשמה לתור באפליקציה, יכולים לתרום ולהציל חיים כבר עכשיו!",
      ],
      buttonText: "בואו נתחיל",
    },
  ];

  const [activeStepIndex, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const selectedStep = steps[activeStepIndex];

  return (
    <div>
      <img src={selectedStep.image} alt="onboardingImage" />
      {selectedStep.title}
      {selectedStep.content}
      <Stepper
        step={activeStepIndex}
        numberOfSteps={maxSteps}
        handleNext={handleNext}
        handleBack={handleBack}
      />
      <Button
        onClick={handleNext}
        title={selectedStep.buttonText}
        isCentered={true}
      />
    </div>
  );
}
