import { Container, Typography } from "@mui/material";
import Accordion from "../../components/basic/Accordion/Accordion";
import ZMScreen from "../../components/basic/ZMScreen";
import { faqsData } from "./questions";
import styles from "./QuestionsAndAnswersScreen.module.scss";

function QuestionsAndAnswersScreen() {
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
      <Accordion accordionPanels={faqsData} />
    </ZMScreen>
  );
}

export default QuestionsAndAnswersScreen;
