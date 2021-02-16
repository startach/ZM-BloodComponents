import MaterialButton from "@material-ui/core/Button";

type ButtonVariant = "text" | "outlined" | "contained";

type ButtonProps = {
  title: string;
  onClick: () => void;
  variant?: ButtonVariant;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isDisabled?: boolean;
};

export default function Button({
  onClick,
  title,
  variant = "contained",
  className,
  startIcon,
  endIcon,
  isDisabled = false,
}: ButtonProps) {
  return (
    <MaterialButton
      onClick={onClick}
      variant={variant}
      color="primary"
      className={className}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={isDisabled}
    >
      {title}
    </MaterialButton>
  );
}
