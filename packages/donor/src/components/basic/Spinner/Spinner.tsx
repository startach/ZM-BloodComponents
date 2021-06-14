import { CircularProgress, PropTypes } from "@material-ui/core";

interface SpinnerProps {
  color?: PropTypes.Color;
}

export default function Spinner(props: SpinnerProps) {
  const color = props.color === "default" ? "primary" : props.color;

  return <CircularProgress size="1rem" color={color} />;
}
