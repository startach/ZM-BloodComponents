import { Meta, Story } from "@storybook/react";
import CoordinatorScreen, { CoordinatorScreenProps } from "./CoordinatorScreen";
import { action } from "@storybook/addon-actions";
import { HeaderVariant } from "../CoordinatorHeader/CoordinatorHeader";
import styles from "./CoordinatorScreen.module.scss";
import { Hospital } from "@zm-blood-components/common";

export default {
  component: CoordinatorScreen,
  title: "Components/Coordinator Screen",
  parameters: { layout: "fullscreen" },
} as Meta;

const props: CoordinatorScreenProps = {
  headerProps: {
    title: "כותרת",
    variant: HeaderVariant.INFO,
    hasBackButton: true,
    hasBurgerMenu: false,
    hasNotificationsIcon: true,
    onBack: action("onBack"),
    onNotificationsClick: action("onNotificationsClick"),
  },
  children: null,
};

const Template: Story<CoordinatorScreenProps> = (args) => {
  return (
    <CoordinatorScreen {...args}>
      <div className={styles.storyContent}>תוכן העמוד</div>
    </CoordinatorScreen>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...props,
};

export const StickyContent = Template.bind({});
StickyContent.args = {
  ...props,
  headerProps: {
    ...props.headerProps,
    stickyComponent: <div style={{ padding: 10 }}> חלק דביק בראש העמוד</div>,
  },
};

export const Fab = Template.bind({});
Fab.args = {
  ...props,
  hospitalForAddAppointment: Hospital.TEL_HASHOMER,
};
