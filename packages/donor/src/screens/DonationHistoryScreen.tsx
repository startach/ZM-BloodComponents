import { BookedAppointment } from "@zm-blood-components/common";
import Text from "../components/basic/Text";
import SafeScreen from "../components/basic/SafeScreen";

interface DonationHistoryScreenProps {
  donations: BookedAppointment[];
}

export default function DonationHistoryScreen(
  props: DonationHistoryScreenProps
) {
  return (
    <SafeScreen>
      <Text>{JSON.stringify(props)}</Text>
    </SafeScreen>
  );
}
