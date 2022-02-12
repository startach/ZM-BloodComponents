import { Dialog, DialogContent, makeStyles } from "@material-ui/core";
import React from "react";

export type PopupProps = {
  open: boolean;
  children?: React.ReactNode;
  onClose: (event: object) => void;
};

export function Popup(props: PopupProps) {
  const { open, children, onClose } = props;

  const centerStyle = makeStyles({
    root: {
      justifyContent: "center",
      textAlign: "center",
      padding: "20px",
    },
  });

  const classes = centerStyle();

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true}>
      <DialogContent classes={classes}>{children}</DialogContent>
    </Dialog>
  );
}
