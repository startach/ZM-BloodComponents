import styles from "./Logo.module.scss";
import classnames from "classnames";
import BloodBankLogo from "../../assets/icons/blood_bank_logo.svg";

interface LogoProps {
  size?: "large" | "medium" | "small";
}

const Logo: React.FunctionComponent<LogoProps> = (props) => {
  const size = props.size || "medium";

  return (
    <div className={classnames(styles.logoContainer, size && styles[size])}>
      <img src={BloodBankLogo} alt={"בנק הדם"} />
    </div>
  );
};

export default Logo;
