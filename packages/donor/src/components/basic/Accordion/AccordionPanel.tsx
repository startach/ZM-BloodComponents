import {
  Accordion as AccordionMui,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import styles from "./Accordion.module.scss";
import { ReactComponent as MinusIcon } from "../../../assets/icons/minus.svg";
import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg";
import { ReactNode } from "react";

interface AccordionPanelProps {
  expandedPanel: string | undefined;
  title: string;
  body: ReactNode;
  handlePanelChange: (isExpanded: boolean, panelId: string) => void;
}

function AccordionPanel({
  expandedPanel,
  title,
  body,
  handlePanelChange,
}: AccordionPanelProps) {
  const SELECTED_PANEL = title + body;

  return (
    <>
      <AccordionMui
        sx={expandedPanel === SELECTED_PANEL ? { bgcolor: "#F0F0F0" } : {}}
        disableGutters
        elevation={0}
        expanded={expandedPanel === SELECTED_PANEL}
        onChange={(e, isExpanded) =>
          handlePanelChange(isExpanded, SELECTED_PANEL)
        }
      >
        <AccordionSummary
          id={`${SELECTED_PANEL}-header`}
          aria-controls={`${SELECTED_PANEL}-content`}
          expandIcon={
            expandedPanel === SELECTED_PANEL ? (
              <MinusIcon className={styles.svgIcon} fill="#c7007d" />
            ) : (
              <PlusIcon />
            )
          }
        >
          <Typography
            variant="subtitle1"
            sx={expandedPanel === SELECTED_PANEL ? { color: "#c7007d" } : {}}
          >
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{body}</AccordionDetails>
      </AccordionMui>
    </>
  );
}

export default AccordionPanel;
