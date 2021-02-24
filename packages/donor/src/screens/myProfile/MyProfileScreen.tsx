import React, { useMemo, useState } from "react";
import { BloodType, Donor, BloodTypeUtils } from "@zm-blood-components/common";
import Text from "../../components/basic/Text";
import HeaderSection from "../../components/HeaderSection";
import styles from "./MyProfileScreen.module.scss";
import Card from "../../components/basic/Card";
import Button from "../../components/basic/Button";
import IconButton from "../../components/basic/IconButton";
import phoneIcon from "../../assets/icons/phone.svg";
import editIcon from "../../assets/icons/edit.svg";
import bloodIcon from "../../assets/icons/bloodDrops.svg";
import MyProfileDrawer from "../../components/MyProfileDrawer";
import Input from "../../components/basic/Input";
import Select from "../../components/basic/Select";
import ZMScreen from "../../components/basic/ZMScreen/ZMScreen";

interface MyProfileScreenProps {
  user: Donor;
  onSave: (
    firstName: string,
    lastName: string,
    birthDate: string, // YYYY-MM-DD
    phoneNumber: string,
    bloodType: BloodType
  ) => void;
  onSignOut: () => void;
}

type UserDataEntry = {
  key: keyof Donor;
  value: any;
  component: React.ReactNode;
  icon: string;
}[];

export default function MyProfileScreen({
  user,
  onSave,
  onSignOut,
}: MyProfileScreenProps) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(0);
  const [selectedTempValue, setSelectedTempValue] = useState<
    string | BloodType
  >();
  const userData: UserDataEntry = useMemo(
    () => [
      {
        key: "bloodType",
        value: user?.bloodType,
        component: (
          <Select
            value={selectedTempValue}
            options={BloodTypeUtils.getBloodTypeSelectOptions()}
            onChange={handleOnValueChange}
            label="סוג דם"
          />
        ),
        icon: bloodIcon,
      },
      {
        key: "phone",
        value: user?.phone,
        component: (
          <Input
            value={selectedTempValue}
            onChangeText={handleOnValueChange}
            label="טלפון"
          />
        ),
        icon: phoneIcon,
      },
    ],
    [user, selectedTempValue]
  );

  const toggleDrawerVisibility = () => {
    setDrawerVisible((value) => !value);
  };

  function handleOnValueChange(value: any) {
    setSelectedTempValue(value);
  }
  function handleEditClick(index: number) {
    setSelectedTempValue(userData[index].value);
    setSelectedComponent(index);
    toggleDrawerVisibility();
  }
  function handleOnSave() {
    const { key } = userData[selectedComponent];
    const tempVal = { ...user, [key]: selectedTempValue };
    const { firstName, lastName, birthDate, phone, bloodType } = tempVal;
    onSave(firstName, lastName, birthDate, phone, bloodType);

    toggleDrawerVisibility();
  }

  return (
    <ZMScreen hasBackButton className={styles.container} title="פרופיל">
      <HeaderSection className={styles.component}>
        <Text>{`${user.firstName} ${user.lastName}`}</Text>
      </HeaderSection>
      <Card className={styles.donationCountcard}>
        <Text>מספר תרומות</Text>
        <Text className={styles.donationNumber}>4</Text>
        <Button title="צפייה בהיסטוריה" onClick={() => console.log()} />
      </Card>
      {userData.map(({ value, component, icon }, index) => (
        <Card key={index} className={styles.card}>
          <div className={styles.cardContentMerge}>
            <IconButton iconSrc={icon} />
            <Text>{value}</Text>
          </div>
          <IconButton
            iconSrc={editIcon}
            onClick={() => handleEditClick(index)}
          />
        </Card>
      ))}
      <Button title={"התנתק"} onClick={onSignOut} />
      <MyProfileDrawer
        visible={drawerVisible}
        onCancel={toggleDrawerVisibility}
        onSave={handleOnSave}
      >
        {userData?.[selectedComponent]?.component}
      </MyProfileDrawer>
    </ZMScreen>
  );
}
