import AppHeader from "../../AppHeader";
import styles from "./ZMScreen.module.scss";
import classnames from "classnames";
import SafeScreen from "../SafeScreen";

interface ExtendedSignupScreenProps {
  children: React.ReactNode;
  className?: string;
  hasBackButton?: boolean;
  hasProfileButton?: boolean;
  title: string;
}

export default function ZMScreen({
  children,
  className = "",
  hasBackButton,
  hasProfileButton,
  title,
}: ExtendedSignupScreenProps) {
  return (
    <SafeScreen disableTopPadding className={styles.component}>
      <AppHeader
        className={"safe-screen-padding-top"}
        {...{ hasBackButton, hasProfileButton, title }}
      />
      <div className={classnames(className, styles.content)}>{children}</div>
    </SafeScreen>
  );
}
