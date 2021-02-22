import React from "react";
import styles from "./ProfileIcon.module.scss";
import IconButton from "../basic/IconButton";
import profileIcon from "../../assets/icons/profile.svg";




const DonationInfoIcons: React.FC = ({
  
}) => {
  return (
    <div className={styles.component}>
      <IconButton
        iconSrc={profileIcon}
        iconSize={25}
        // titleClassName={styles.iconTitle}  
      />
    </div>
  );
};

export default DonationInfoIcons;
