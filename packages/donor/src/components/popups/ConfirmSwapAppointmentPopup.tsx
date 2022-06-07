import Popup from "../basic/Popup";
import SwapLogo from "../../assets/images/swap_popup.svg";

interface ConfirmSwapAppointmentPopupProps {
  isOpen: boolean;
  onApproved: () => void | Promise<void>;
  onBack: () => void;
  onClose: () => void;
}

export default function ConfirmSwapAppointmentPopup({
  isOpen,
  onApproved,
  onBack,
  onClose,
}: ConfirmSwapAppointmentPopupProps) {
  return (
    <Popup
      name="ConfirmSwapAppointment"
      title={"החלפת תור"}
      buttonApproveText={"כן, אשר תור"}
      open={isOpen}
      goBackText={"התחרטתי, שמור תור מקורי"}
      onApproved={onApproved}
      onBack={onBack}
      onClose={onClose}
      image={SwapLogo}
    >
      האם ברצונך לבטל את התור הקיים ולהחליפו בתור זה?
    </Popup>
  );
}
