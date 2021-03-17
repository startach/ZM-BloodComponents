import { BookedAppointment } from "@zm-blood-components/common";
import Text from "../components/basic/Text";

interface DonationHistoryScreenProps {
  donations: BookedAppointment[];
}

export default function DonationHistoryScreen(
  props: DonationHistoryScreenProps
) {
  return (
    <div>
      <Text>{JSON.stringify(props)}</Text>
    </div>
  );
}
