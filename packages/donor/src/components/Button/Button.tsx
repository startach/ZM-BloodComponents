import Button from "@material-ui/core/Button";

type ButtonVariant = "text" | "outlined" | "contained";

type ButtonProps = {
  onClick?: () => void;
  title: string;
  variant?: ButtonVariant;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isDisabled?: boolean;
};

export default function ZMButton({
  onClick,
  title,
  variant = "contained",
  className,
  startIcon,
  endIcon,
  isDisabled = false,
}: ButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color="primary"
      className={className}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={isDisabled}
    >
      {title}
    </Button>
  );
}
