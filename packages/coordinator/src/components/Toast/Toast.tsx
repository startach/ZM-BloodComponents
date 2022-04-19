import Snackbar from "@mui/material/Snackbar";

export type ToastProps = {
  message: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Toast(props: ToastProps) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={props.open}
      autoHideDuration={3000}
      onClose={() => props.setOpen(false)}
      message={props.message}
    />
  );
}
