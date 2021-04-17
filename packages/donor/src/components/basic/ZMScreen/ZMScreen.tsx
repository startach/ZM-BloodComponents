import AppHeader from "../../AppHeader";
import Styles from "./ZMScreen.module.scss";
import classnames from "classnames";

interface ExtendedSignupScreenProps {
  children: React.ReactNode;
  className?: string;
  hasBackButton?: boolean;
  hasBurgerMenu?: boolean;
  title: string;
}

export default function ZMScreen({
  children,
  className = "",
  hasBackButton,
  hasBurgerMenu,
  title,
}: ExtendedSignupScreenProps) {
  return (
    <>
      <AppHeader {...{ hasBurgerMenu, hasBackButton, title }} />
      <div className={classnames(className, Styles["after-header"])}>
        {children}
      </div>
    </>
  );
}
