import styles from "./AwaitingYouHeader.module.scss";
import HeaderSection from "../HeaderSection";
import Text from "../basic/Text";

export interface AwaitingYouHeaderProps {
  firstName: string;
}

function AwaitingYouHeader({ firstName }: AwaitingYouHeaderProps) {
  return (
    <HeaderSection>
      <span className={styles.welcomeText}>
        <Text>שלום</Text>
        &nbsp;
        <Text />
        <Text>{firstName}</Text>
      </span>
      <Text>
        אתה רשום לתרומה הקרובה.
        <span className={styles.awaitingYouText}> מצפים לך!</span>
      </Text>
    </HeaderSection>
  );
}

export default AwaitingYouHeader;
