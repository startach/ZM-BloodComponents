import { MessengerContext, Props } from "bottender";
import SampleHistory from "./History";
import { payload, router, text } from "bottender/router";
import {OnboardingStep} from './Onboarding';

export enum NewDonationStep {
  START_NEW_DONATION,
  HANDLE_HOSPITAL,
  HANDLE_DONATION_SLOT,
  HANDLE_EMAIL,

  DONE,
}
export default async function NewDonation(
  context: MessengerContext,
) {
  let nextOnboardingStep = context.state.nextNewDonationStep as NewDonationStep;

  switch (nextOnboardingStep) {
    case NewDonationStep.START_NEW_DONATION:
      return StartNewDonation;
    case NewDonationStep.HANDLE_HOSPITAL:
      return ListDonationSlots;
    case NewDonationStep.HANDLE_DONATION_SLOT:
      await context.sendText("קבענו!");
      // case OnboardingStep.HANDLE_EMAIL:
    //   return CompleteOnboarding;
    // case OnboardingStep.DONE:
    default:
       return;
  }
}

async function StartNewDonation(context: MessengerContext) {
  context.setState({
    nextNewDonationStep: NewDonationStep.HANDLE_HOSPITAL,
  });
  await context.sendText(
`אנא בחר את בית החולים בו תרצה לתרום:
1. תל השומר
2. איכילוב
3. אסף הרופא
4. בילינסון`,
      {
        quickReplies:[{
          contentType: 'text',
          title: "1",
          payload: "NEW_DONATION"
        },{
          contentType: 'text',
          title: "2",
          payload: "NEW_DONATION"
        },{
          contentType: 'text',
          title: "3",
          payload: "NEW_DONATION"
        },{
          contentType: 'text',
          title: "4",
          payload: "NEW_DONATION"
        },{
          contentType: 'text',
          title: "5",
          payload: "NEW_DONATION"
        },
        ]
      }
  );
}


async function ListDonationSlots(context: MessengerContext) {
  context.setState({
    nextNewDonationStep: NewDonationStep.HANDLE_DONATION_SLOT,
  });
  await context.sendText(
`התורים הפנויים הקרובים:
1. 01/02/2021 בשעה 14:00
2. 01/02/2021 בשעה 15:00
3. 03/02/2021 בשעה 12:00
4. 03/02/2021 בשעה 13:00`,
      {
        quickReplies:[{
          contentType: 'text',
          title: "1",
          payload: "NEW_DONATION"
        },{
          contentType: 'text',
          title: "2",
          payload: "NEW_DONATION"
        },{
          contentType: 'text',
          title: "3",
          payload: "NEW_DONATION"
        },{
          contentType: 'text',
          title: "4",
          payload: "NEW_DONATION"
        }
        ]
      }
  );
}


async function ShowHistory(context: MessengerContext) {
  await context.sendText("התרומות האחרונות שלך:");
  for (const donation of SampleHistory) {
    await context.sendText(
      `תאריך: ${donation.date}
        מיקום: ${donation.location}
        `
    );
  }
}


async function TalkToAgendt(context: MessengerContext) {
  await context.sendText("פונקציה זו אינה נתמכת עדיין");
}
