import { Divider, makeStyles } from "@material-ui/core";
import colors from "../../utils/colors";
import classnames from "classnames";

const useDividerStyles = makeStyles({
  root: {
    height: 2,
    backgroundColor: colors.colorMediumGrey,
    marginBottom: 16,
    marginTop: 8,
  },
});

export interface ZMDividerProps extends React.HTMLProps<HTMLDivElement> {}

export default function ZMDivider({ className }: ZMDividerProps) {
  const classes = useDividerStyles();

  return (
    <Divider variant="middle" className={classnames(classes.root, className)} />
  );
}
