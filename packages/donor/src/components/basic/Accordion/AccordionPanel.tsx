import {
  Accordion as AccordionMui,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import styles from "./Accordion.module.scss";
import { ReactComponent as MinusIcon } from "../../../assets/icons/minus.svg";
import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg";
import AnchorTag from "../AnchorTag";
import { Panel } from "./Accordion";

interface AccordionPanelProps {
  expandedPanel: string | undefined;
  panel: Panel;
  handlePanelChange: (isExpanded: boolean, panelId: string) => void;
}

function AccordionPanel({
  expandedPanel,
  panel,
  handlePanelChange,
}: AccordionPanelProps) {
  return (
    <>
      <AccordionMui
        sx={expandedPanel === panel._id ? { bgcolor: "#F0F0F0" } : {}}
        disableGutters
        elevation={0}
        expanded={expandedPanel === panel._id}
        onChange={(e, isExpanded) => handlePanelChange(isExpanded, panel._id)}
      >
        <AccordionSummary
          id={`${panel._id}-header`}
          aria-controls={`${panel._id}-content`}
          expandIcon={
            expandedPanel === panel._id ? (
              <MinusIcon className={styles.svgIcon} fill="#c7007d" />
            ) : (
              <PlusIcon />
            )
          }
        >
          <Typography
            variant="subtitle1"
            sx={expandedPanel === panel._id ? { color: "#c7007d" } : {}}
          >
            {panel.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="body2"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            {panel.description}
            {panel.link && (
              <span>
                אפשר לראות את זה&nbsp;
                <AnchorTag
                  className={styles.anchorTag}
                  href={panel.link}
                  linkName={panel.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  ממש כאן
                </AnchorTag>
              </span>
            )}
          </Typography>
        </AccordionDetails>
      </AccordionMui>
    </>
  );
}

export default AccordionPanel;
