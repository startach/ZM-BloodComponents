import Button from "@material-ui/core/Button"

type ButtonVariant = "text" | "outlined" | "contained"

type ButtonProps = {
  onClick: () => void;
  title: string;
  variant?: ButtonVariant
  className?: string;
  leftIcon?: any;
  rightIcon?: any;
};

export default function ZMButton({
  onClick,
  title,
  variant = "contained",
  className,
  leftIcon,
  rightIcon
}: ButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color="primary"
      className={className}
      startIcon={leftIcon}
      endIcon={rightIcon}
    >
      {title}
    </Button>
  );
}
