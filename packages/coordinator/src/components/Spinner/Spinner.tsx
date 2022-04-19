import { CircularProgress } from "@mui/material";
import { Color } from "../../constants/colors";

interface SpinnerProps {
  color?: Color;
  size?: string;
  className?: string;
}

export default function Spinner(props: SpinnerProps) {
  const color = props.color || Color.Primary;
  const size = props.size || "1rem";

  return (
    <CircularProgress size={size} color={color} className={props.className} />
  );
}
