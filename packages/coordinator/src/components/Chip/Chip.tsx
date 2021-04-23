import { Chip, makeStyles, Theme } from "@material-ui/core";

/* Standard template chips **/
export enum StandardChip {
  New,
}

const getChipColors = (
  theme: Theme,
  color?: string,
  backgroundColor?: string,
  chipType?: StandardChip
) => {
  let chipColor: string;
  let chipBackground: string;
  switch (chipType) {
    case StandardChip.New:
      chipColor = theme.palette.warning.main;
      chipBackground = theme.palette.warning.light;
      break;
    default:
      chipColor = color || "";
      chipBackground = backgroundColor || "";
      break;
  }
  return {
    chipColor,
    chipBackground,
  };
};

interface UseChipStylesProps {
  color?: string;
  backgroundColor?: string;
  chipType?: StandardChip;
  fontSize?: string;
  height?: string;
  width?: string;
}

const useChipStyles = makeStyles((theme) => ({
  root: ({
    color,
    backgroundColor,
    chipType,
    fontSize,
    height,
    width,
  }: UseChipStylesProps) => {
    const { chipColor, chipBackground } = getChipColors(
      theme,
      color,
      backgroundColor,
      chipType
    );
    return {
      borderRadius: "3px",
      color: chipColor,
      backgroundColor: chipBackground,
      fontSize: fontSize,
      height: height,
      width: width,
    };
  },
  label: ({ width }: UseChipStylesProps) => {
    return {
      ...(width && { padding: 0 }),
    };
  },
}));

type ChipProps = {
  label: string;
  /* Standard template chips **/
  chipType?: StandardChip;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  /* Applying width disables default padding on label span **/
  width?: string;
  height?: string;
};

export default function ZMChip({
  label,
  color,
  backgroundColor,
  chipType,
  fontSize = "12px",
  width,
  height,
}: ChipProps) {
  const classes = useChipStyles({
    color,
    backgroundColor,
    chipType,
    fontSize,
    width,
    height,
  });

  return <Chip label={label} classes={classes} />;
}
