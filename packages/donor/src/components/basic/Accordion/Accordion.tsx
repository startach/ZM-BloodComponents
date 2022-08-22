import { ReactNode } from "react";
import { Container } from "@mui/material";

export interface Panel {
  title: string;
  description: string;
  link?: string;
}

interface AccordionProps {
  children: ReactNode;
}

function Accordion({ children }: AccordionProps) {
  return (
    <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
      {children}
    </Container>
  );
}

export default Accordion;
