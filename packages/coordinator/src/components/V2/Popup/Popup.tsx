import React from "react";
import DialogBase from "./DialogBase";

type PopupProps = {
  buttonApproveText: string;
  open: boolean;
  titleFirst: string;
  titleSecond?: string;
  className?: string;
  isLoading?: boolean;
  onClose: () => void;
  onApproved: () => Promise<void>;
  PopupButton?: React.ReactNode;
  isNotificationPopup?: boolean;
};

export default function Popup({
  buttonApproveText,
  open,
  titleFirst,
  titleSecond,
  onClose,
  onApproved,
  PopupButton,
}: PopupProps) {
  return (
    <DialogBase
      buttonApproveText={buttonApproveText}
      open={open}
      titleFirst={titleFirst}
      titleSecond={titleSecond}
      onClose={onClose}
      onApproved={onApproved}
      PopupButton={PopupButton}
      isNotificationPopup={false}
    />
  );
}
