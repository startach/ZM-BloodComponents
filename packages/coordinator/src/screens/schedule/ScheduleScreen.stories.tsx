import ScheduleScreen, {ScheduleScreenProps} from "./ScheduleScreen";

export default {
  component: ScheduleScreen,
  title: "Screens/Schedule Screen",
  parameters: { layout: "fullscreen" },
};

const props: ScheduleScreenProps = {
};

export const Default = (args: ScheduleScreenProps) => <ScheduleScreen {...args} />;
Default.args = props;
