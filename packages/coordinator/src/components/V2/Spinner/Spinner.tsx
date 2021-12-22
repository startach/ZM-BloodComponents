import { CircularProgress } from "@material-ui/core";

type SpinnerProps = {
  size?: string;
  className?: string;
};

export default function Spinner({ size, className }: SpinnerProps) {
  return <CircularProgress size={size || "1rem"} className={className} />;
}
