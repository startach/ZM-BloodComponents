import { MessengerContext, Props } from "bottender";
import SampleHistory from "./History";
import { payload, router, text } from "bottender/router";
import NewDonation from './NewDonation';

export default async function MainFlow(
  context: MessengerContext,
  props: Props<MessengerContext>
) {
  return router([
    payload("NEW_DONATION", NewDonation),

    payload("TALK_TO_AGENT", TalkToAgendt),
    payload("GET_DONATION_HISTORY", ShowHistory),

    text("*", StartMainFlow),
  ]);
}

async function StartMainFlow(
  context: MessengerContext
) {
  await context.sendText("איך אוכל לעזור היום?");
  await context.sendButtonTemplate("מה תרצה לעשות?", [
    {
      type: "postback",
      title: "קביעת תרומה חדשה",
      payload: "NEW_DONATION",
    },
    {
      type: "postback",
      title: "היסטוריית התרומות",
      payload: "GET_DONATION_HISTORY",
    },
    {
      type: "postback",
      title: "שיחה עם נציג",
      payload: "TALK_TO_AGENT",
    },
  ]);
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
