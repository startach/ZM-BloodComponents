import React from "react";
import DialogBase from "./DialogBase";

type NotificationProps = {
  buttonApproveText: string;
  open: boolean;
  titleFirst: string;
  titleSecond?: string;
  className?: string;
  onClose: () => void;
  PopupButton?: React.ReactNode;
};

export function NotificationPopup({
  buttonApproveText,
  open,
  titleFirst,
  titleSecond,
  onClose,
  PopupButton,
}: NotificationProps) {
  return (
    <DialogBase
      buttonApproveText={buttonApproveText}
      open={open}
      titleFirst={titleFirst}
      titleSecond={titleSecond}
      onClose={onClose}
      PopupButton={PopupButton}
      isNotificationPopup={true}
    />
  );
}
