import { CircularProgress, PropTypes } from "@material-ui/core";

interface SpinnerProps {
  color?: PropTypes.Color;
  size?: string;
  className?: string;
}

export default function Spinner(props: SpinnerProps) {
  const color = props.color === "default" ? "primary" : props.color;
  const size = props.size || "1rem";

  return (
    <CircularProgress size={size} color={color} className={props.className} />
  );
}
