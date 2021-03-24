import styles from "./Logo.module.scss";
import classnames from "classnames";
interface LogoProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  size?: "large" | "medium" | "small";
}

const Logo: React.FunctionComponent<LogoProps> = (props) => {
  const size = props.size || "medium";

  return (
    <div className={styles.logoContainer}>
      <div
        className={classnames(styles.logo, size && styles[size])}
        {...props}
      />
    </div>
  );
};

export default Logo;
