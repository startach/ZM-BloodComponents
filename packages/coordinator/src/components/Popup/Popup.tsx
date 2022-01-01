import { noop } from "lodash";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
import Button, { ButtonVariant } from "../Button";

export type PopupProps = {
  open: boolean;
  title?: string;
  content?: string | React.ReactNode;
  onClose: (event: object) => void;

  // Buttons
  primaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  cancelButtonText?: string;
  onCancelButtonClick?: () => void;
};

export function Popup(props: PopupProps) {
  const {
    open,
    title,
    content,
    onClose,
    primaryButtonText,
    onPrimaryButtonClick,
    cancelButtonText,
    onCancelButtonClick,
  } = props;

  const centerStyle = makeStyles({
    root: {
      justifyContent: "center",
      textAlign: "center",
      paddingBottom: "20px",
    },
  });

  const classes = centerStyle();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent classes={classes}>{content}</DialogContent>
      <DialogActions classes={classes}>
        {primaryButtonText && (
          <Button
            title={primaryButtonText}
            onClick={onPrimaryButtonClick || noop}
            color={"secondary"}
          />
        )}
        {cancelButtonText && (
          <Button
            title={cancelButtonText}
            onClick={onCancelButtonClick || noop}
            variant={ButtonVariant.outlined}
            color={"default"}
          />
        )}
      </DialogActions>
    </Dialog>
  );
}
