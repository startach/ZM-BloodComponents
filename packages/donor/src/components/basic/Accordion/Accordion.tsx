import { useState } from "react";
import { Container } from "@mui/material";
import AccordionPanel from "./AccordionPanel";

export interface Panel {
  description: string;
  link?: string;
}

interface Accordion {
  accordionPanels: Panel[];
}

const Accordion = ({ accordionPanels }: Accordion) => {
  const [expandedPanel, setExpandedPanel] = useState<string | false>(false);

  const handlePanelChange = (isExpanded: boolean, panel: string) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
      {accordionPanels.map((panel, idx) => (
        <AccordionPanel
          key={idx}
          expandedPanel={expandedPanel}
          panelData={panel}
          summaryParagraph={"שאלה נפוצה"}
          handlePanelChange={handlePanelChange}
          panelTitle={`panel${idx}`}
        />
      ))}
    </Container>
  );
};

export default Accordion;
