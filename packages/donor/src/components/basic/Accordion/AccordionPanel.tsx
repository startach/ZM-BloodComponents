import { Accordion as AccordionMui, AccordionSummary, AccordionDetails, Typography, Container } from "@mui/material"
import styles from "./Accordion.module.scss";
import { ReactComponent as MinusIcon } from "../../../assets/icons/minus.svg";
import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg";
import AnchorTag from "../AnchorTag";
import { Panel } from "./Accordion";

interface AccordionPanel {
    expandedPanel: string | false
    panelData: Panel
    summaryParagraph: string
    panelTitle: string
    handlePanelChange: any
}

const AccordionPanel = ({ expandedPanel, panelData, summaryParagraph, panelTitle, handlePanelChange }: AccordionPanel) => {
    return (
        <>
            <AccordionMui
                sx={expandedPanel === panelTitle ? { bgcolor: '#F0F0F0' } : {}}
                disableGutters
                elevation={0}
                expanded={expandedPanel === panelTitle}
                onChange={(e, isExpanded) => handlePanelChange(isExpanded, panelTitle)}
            >
                <AccordionSummary
                    id={`${panelTitle}-header`}
                    aria-controls={`${panelTitle}-content`}
                    expandIcon={expandedPanel === panelTitle ? <MinusIcon className={styles.svgIcon} fill='#c7007d' /> : <PlusIcon />}
                >
                    <Typography
                        variant='subtitle1'
                        sx={expandedPanel === panelTitle ? { color: "#c7007d" } : {}}
                    >
                        {summaryParagraph}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        variant='body2'
                        sx={{ display: 'flex', flexDirection: "column" }}
                    >
                        {panelData.description}
                        {panelData.link && (
                            <span>
                                אפשר לראות את זה&nbsp;
                                <AnchorTag
                                    className={styles.anchorTag}
                                    href={panelData.link}
                                    linkName={panelData.link}
                                    target="_blank"
                                    rel="noreferrer">
                                    ממש כאן
                                </AnchorTag>
                            </span>
                        )}
                    </Typography>
                </AccordionDetails>
            </AccordionMui>
        </>
    )
}

export default AccordionPanel