import FabComponent from "@material-ui/core/Fab";
import React from "react";
import { makeStyles } from "@material-ui/core";

export type FabProps = {
  onClick: () => void;
  children: NonNullable<React.ReactNode>;
};

const useStyles = makeStyles(() => ({
  fab: {
    position: "fixed",
    right: 15,
    bottom: 15,
    borderRadius: 7,
  },
}));

export default function Fab(props: FabProps) {
  const classes = useStyles();

  return (
    <FabComponent
      color="primary"
      variant="extended"
      className={classes.fab}
      onClick={props.onClick}
    >
      {props.children}
    </FabComponent>
  );
}