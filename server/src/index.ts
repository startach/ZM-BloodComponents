import { Action, MessengerContext, withProps } from "bottender";
import { payload, router, text } from "bottender/router";

export default async function App(
  context: MessengerContext
): Promise<Action<MessengerContext> | void> {
  let count = context.state.count as number;
  count++;

  context.setState({
    count,
  });

  await context.sendText("Message count: " + count);
  await context.sendText(`Platform: ${context.platform}`);
  // @ts-ignore
  await context.sendText(`Session ID: ${context.session.id}`);

  return router([
    payload("START", Start),
    text("hi", SayHi),
    text(/^(my name is).*/i, Welcome),

    text("*", Unknown),
  ]);

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
async function Start(context: MessengerContext) {
  await context.sendText("Let's start!");
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
  await context.sendText("Sorry. I do not understand what you say.");
}
