import { useState } from "react";
import { Container, Typography } from "@mui/material";
import Accordion from "../../components/basic/Accordion/Accordion";
import ZMScreen from "../../components/basic/ZMScreen";
import styles from "./FaqScreen.module.scss";
import AccordionPanel from "../../components/basic/Accordion/AccordionPanel";
import AnchorTag from "../../components/basic/AnchorTag";

function FaqScreen() {
  const [expandedPanel, setExpandedPanel] =
    useState<string | undefined>(undefined);

  const handlePanelChange = (isExpanded: boolean, panelId: string) => {
    setExpandedPanel(isExpanded ? panelId : undefined);
  };

  return (
    <ZMScreen hasBackButton title="שאלות נפוצות">
      <div className={styles.imageContainer}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "160px",
          }}
        >
          <Typography
            variant="h5"
            sx={{ maxWidth: { xs: "250px", md: "100%" }, fontWeight: 700 }}
          >
            כל מה שרצית לדעת ולא היה לך את מי לשאול
          </Typography>
        </Container>
      </div>
      <Accordion>
        <AccordionPanel
          expandedPanel={expandedPanel}
          title={"שאלה חדשה"}
          body={
            <Typography variant="body2">
              אנו בעמותת "זכרון מנחם" עוסקים בתמיכה בילדים חולי סרטן ובני
              משפחותיהם{" "}
              <AnchorTag
                linkName="zm_faq1"
                href="https://zichron.org"
                className={styles.anchorTag}
              >
                אתרנו
              </AnchorTag>{" "}
              בדיקה בדיקה
            </Typography>
          }
          handlePanelChange={handlePanelChange}
        />
        <AccordionPanel
          expandedPanel={expandedPanel}
          title={"שאלה חדשה 2"}
          body={
            <Typography variant="body2">
              אנו בעמותת "זכרון מנחם" עוסקים ובני משפחותיהם{" "}
              <AnchorTag
                linkName="zm_website"
                href="https://zichron.org"
                className={styles.anchorTag}
              >
                אתרנו
              </AnchorTag>{" "}
              ;בדיקה כדכד
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
    </ZMScreen>
  );
}

export default FaqScreen;
