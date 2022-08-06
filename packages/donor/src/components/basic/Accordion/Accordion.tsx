import { useState } from "react";
import { Container } from "@mui/material";
import AccordionPanel from "./AccordionPanel";

export interface Panel {
  _id: string;
  title: string;
  description: string;
  link?: string;
}

interface AccordionProps {
  accordionPanels: Panel[];
}

function Accordion({ accordionPanels }: AccordionProps) {
  const [expandedPanel, setExpandedPanel] = useState<string | undefined>(
    undefined
  );

  const handlePanelChange = (isExpanded: boolean, panelId: string) => {
    setExpandedPanel(isExpanded ? panelId : undefined);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
      {accordionPanels.map((panel, idx) => (
        <AccordionPanel
          key={idx}
          expandedPanel={expandedPanel}
          panel={panel}
          handlePanelChange={handlePanelChange}
        />
      ))}
    </Container>
  );
}

export default Accordion;
