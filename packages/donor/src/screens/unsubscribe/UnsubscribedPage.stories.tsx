import { UnsubscribedPage } from './UnsubscribedPage';
import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";

export default {
component: UnsubscribedPage,
title: "Screens/Unsubscribed",
parameters: { layout: "fullscreen" },
};


export const Default = () => <UnsubscribedPage />;
