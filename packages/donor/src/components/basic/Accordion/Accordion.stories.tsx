import { Typography } from "@mui/material";
import { Meta } from "@storybook/react";
import AnchorTag from "../AnchorTag";
import Accordion from "./Accordion";
import AccordionPanel from "./AccordionPanel";
import styles from "./Accordion.module.scss";
import { useState } from "react";

export default {
  component: Accordion,
  title: "Components/Accordion",
  parameters: { layout: "padded" },
} as Meta;

export const Default = () => {
  // const [checked, setChecked] = useState(false); => TODO: Analytics
  const [expandedPanel, setExpandedPanel] =
    useState<string | undefined>(undefined);

  const handlePanelChange = (isExpanded: boolean, panelId: string) => {
    setExpandedPanel(isExpanded ? panelId : undefined);
  };

  return (
    <Accordion>
      <AccordionPanel
        expandedPanel={expandedPanel}
        title={"שאלה חדשה"}
        body={
          <Typography variant="body2">
            אנו בעמותת "זכרון מנחם" עוסקים בתמיכה בילדים חולי סרטן ובני
            משפחותיהם&nbsp;
            <AnchorTag
              linkName="zm_faq1"
              href="https://zichron.org"
              className={styles.anchorTag}
            >
              אתרנו
            </AnchorTag>
            &nbsp;בדיקה בדיקה
          </Typography>
        }
        handlePanelChange={handlePanelChange}
      />
      <AccordionPanel
        expandedPanel={expandedPanel}
        title={"שאלה חדשה 2"}
        body={
          <Typography variant="body2">
            אנו בעמותת "זכרון מנחם" עוסקים ובני משפחותיהם&nbsp;
            <AnchorTag
              linkName="zm_website"
              href="https://zichron.org"
              className={styles.anchorTag}
            >
              אתרנו
            </AnchorTag>
            &nbsp;בדיקה כדכד
          </Typography>
        }
        handlePanelChange={handlePanelChange}
      />
      <AccordionPanel
        expandedPanel={expandedPanel}
        title={"לורם"}
        body={
          <Typography variant="body2">
            לורם לורם איפסום, בדיקה
            <br />
            בדיקה
          </Typography>
        }
        handlePanelChange={handlePanelChange}
      />
    </Accordion>
  );
};
