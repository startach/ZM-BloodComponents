
import {Button, makeStyles} from "@material-ui/core";
import classnames from "classnames"


type ButtonVariant = "text" | "outlined" | "contained";

type ButtonProps = {
  onClick: () => void;
  title: string;
  variant?: ButtonVariant;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isDisabled?: boolean;
};

const useButtonStyles = makeStyles({
  root: {
    borderRadius: 100
  },
})

export default function ZMButton({

  onClick,
  title,
  variant = "contained",
  className,
  startIcon,
  endIcon,
  isDisabled = false,
}: ButtonProps) {
  const classes = useButtonStyles()
  return (
      <Button
        onClick={onClick}
        variant={variant}
        color="primary"
        className={classnames(className, classes.root)}
        startIcon={startIcon}
        endIcon={endIcon}
        disabled={isDisabled}
      >
        {title}
      </Button>

  );
}