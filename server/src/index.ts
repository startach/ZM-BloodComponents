import { Action, chain, MessengerContext } from "bottender";
import { payload, router, text } from "bottender/router";
import SampleHistory from "./History";
import Onboarding from "./Onboarding";
import MainFlow from "./MainFlow";

export default async function App(
  context: MessengerContext
): Promise<Action<MessengerContext> | void> {
  return chain([Onboarding, MainFlow, Unknown]);

  //
  // let count = context.state.count as number;
  // count++;
  //
  //
  //
  // await context.sendButtonTemplate('מה תרצה לעשות?', [
  //   {
  //     type: 'postback',
  //     title: 'קביעת תרומה חדשה',
  //     payload: 'NEW_DONATION',
  //   },
  //   {
  //     type: 'postback',
  //     title: 'צפייה בהיסטוריית התרומות',
  //     payload: 'GET_DONATION_HISTORY',
  //   },
  //   {
  //     type: 'postback',
  //     title: 'שליחת הודעה לזכרון מנחם',
  //     payload: 'SEND_MESSAGE',
  //   },
  // ]);

  // await context.sendText('Hi!', {
  //   quickReplies: [
  //     {
  //       contentType: 'text',
  //       title: 'red',
  //       payload: '123',
  //     },
  //     {
  //       contentType: 'text',
  //       title: 'fef',
  //       payload: '14142',
  //     },
  //   ],
  // });

  //
  // const text = context.event.text as string;
  // if (text.startsWith("my name is")){
  //   const name = text.substr("my name is ".length);
  //   return withProps(Welcome, { name });
  // }
  //
  // switch (context.event.text) {
  //   case "hi":
  //     return SayHi;
  //   case "my name is ":
  //     return SayHi;
  //
  //   default:
  //     return Echo;
  // }
}

async function SayHi(context: MessengerContext) {
  await context.sendText("Hello there!");
}

async function NewDonation(context: MessengerContext) {
  await context.sendText("בוא נקבע תרומה חדשה");
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

async function Start(context: MessengerContext) {
  if (context.state.id == 0) {
    const user = await context.getUserProfile();

    await context.setState({
      id: user?.id,
      firstName: user?.firstName,
    });

    await context.sendText(
      `שלום ${context.state.firstName}, ברוך הבא לצ׳אט בוט של זכרון מנחם`
    );
  } else {
    console.log("Handling user", context.state.firstName);
    await context.sendText(
      `שלום ${context.state.firstName}, ברוך שובך לצ׳אט בוט של זכרון מנחם`
    );
  }
}

async function Welcome(context: MessengerContext, props: { name: string }) {
  const text = context.event.text as string;
  const name = text.substr("my name is ".length);
  await context.sendText(`welcome ${name}`);
}

async function Echo(context: MessengerContext) {
  if (context.event.isText) {
    await context.sendText(context.event.text);
  }
}
async function Unknown(context: MessengerContext) {
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
      title: "שליחת הודעה לזכרון מנחם",
      payload: "SEND_MESSAGE",
    },
  ]);
}
