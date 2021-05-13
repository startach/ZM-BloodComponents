import { Chip, makeStyles, Theme } from "@material-ui/core";

/* Standard template chips **/
export enum ChipColorScheme {
  New,
}

const getChipColors = (theme: Theme, colorScheme?: ChipColorScheme) => {
  let chipColor: string;
  let chipBackground: string;
  switch (colorScheme) {
    case ChipColorScheme.New:
      chipColor = theme.palette.warning.main;
      chipBackground = theme.palette.warning.light;
      break;
    default:
      chipColor = "";
      chipBackground = "";
      break;
  }
  return {
    chipColor,
    chipBackground,
  };
};

interface UseChipStylesProps {
  colorScheme?: ChipColorScheme;
  fontSize?: string;
}

const useChipStyles = makeStyles((theme) => ({
  root: ({ colorScheme, fontSize }: UseChipStylesProps) => {
    const { chipColor, chipBackground } = getChipColors(theme, colorScheme);
    return {
      borderRadius: "3px",
      color: chipColor,
      backgroundColor: chipBackground,
      fontSize: fontSize,
      width: "39px",
      height: "22px",
    };
  },
  label: {
    padding: 0,
  },
}));

type ChipProps = {
  label: string;
  /* Standard template chips **/
  colorScheme?: ChipColorScheme;
  fontSize?: string;
};

export default function ZMChip({
  label,
  colorScheme,
  fontSize = "12px",
}: ChipProps) {
  const classes = useChipStyles({
    colorScheme,
    fontSize,
  });

  return <Chip label={label} classes={classes} />;
}
