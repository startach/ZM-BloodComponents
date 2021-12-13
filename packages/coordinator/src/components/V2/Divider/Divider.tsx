import { Divider, makeStyles } from "@material-ui/core";
import classnames from "classnames";

export interface ZMDividerProps extends React.HTMLProps<HTMLDivElement> {
  isCentered?: boolean;
}

export default function ZMDivider({ className, isCentered }: ZMDividerProps) {
  const useDividerStyles = makeStyles({
    root: {
      height: 2,
      backgroundColor: "#60636A",
      margin: isCentered ? "0 auto" : "unset",
    },
  });

  const classes = useDividerStyles();

  return (
    <Divider variant="middle" className={classnames(classes.root, className)} />
  );
}
