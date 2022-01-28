import { noop } from "lodash";
import classNames from "classnames";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import Button, { ButtonVariant } from "../Button";
import { ButtonColor } from "../Button/Button";
import React from "react";

export type PopupProps = {
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: (event: object) => void;

  // Buttons
  primaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  primaryButtonLoading?: boolean;
  cancelButtonText?: string;
  onCancelButtonClick?: () => void;
};

export function Popup(props: PopupProps) {
  const {
    open,
    title,
    children,
    onClose,
    primaryButtonText,
    onPrimaryButtonClick,
    primaryButtonLoading,
    cancelButtonText,
    onCancelButtonClick,
  } = props;

  const centerStyle = makeStyles({
    root: {
      justifyContent: "center",
      textAlign: "center",
      paddingBottom: "10px",
    },
    bottom: {
      paddingBottom: "30px",
    },
  });

  const classes = centerStyle();

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent classes={classes}>{children}</DialogContent>
      <DialogActions className={classNames(classes.root, classes.bottom)}>
        {primaryButtonText && (
          <Button
            title={primaryButtonText}
            onClick={onPrimaryButtonClick || noop}
            color={ButtonColor.secondary}
            isLoading={primaryButtonLoading}
          />
        )}
        {cancelButtonText && (
          <Button
            title={cancelButtonText}
            onClick={onCancelButtonClick || noop}
            variant={ButtonVariant.outlined}
          />
        )}
      </DialogActions>
    </Dialog>
  );
}
