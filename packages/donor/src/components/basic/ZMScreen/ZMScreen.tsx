import AppHeader from "../../AppHeader";
import Styles from "./ZMScreen.module.scss";
import classnames from "classnames";

interface ExtendedSignupScreenProps {
  children: React.ReactNode;
  className?: string;
  hasBackButton?: boolean;
  hasProfileButton?: boolean;
  title?: string;
}

export default function ZMScreen({
  children,
  className = "",
  hasBackButton = true,
  hasProfileButton = true,
  title = "",
}: ExtendedSignupScreenProps) {
  return (
    <>
      <AppHeader {...{ hasBackButton, hasProfileButton, title }} />
      <div className={classnames(className, Styles["after-header"])}>
        {children}
      </div>
    </>
  );
}
