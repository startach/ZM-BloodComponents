import styles from "./Logo.module.scss";

interface LogoProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

const Logo: React.FunctionComponent<LogoProps> = (props) => {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logo} {...props} />
    </div>
  );
};

export default Logo;
