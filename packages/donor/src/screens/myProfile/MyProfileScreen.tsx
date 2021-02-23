import React, { useState, useMemo } from "react";
import { BloodType, Donor } from "@zm-blood-components/common";
import Text from "../../components/Text";
import HeaderSection from "../../components/HeaderSection";
import styles from "./myProfileScreen.module.scss";
import Card from "../../components/Card";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";
import phoneIcon from "../../assets/icons/phone.svg";
import editIcon from "../../assets/icons/edit.svg";
import bloodIcon from "../../assets/icons/bloodDrops.svg";
// import mailIcon from "../../assets/icons/mail.svg";
import MyProfileDrawer from "../../components/MyProfileDrawer";
import Input from "../../components/Input";
import { Select, SelectOption } from "../../components/Select";

interface MyProfileScreenProps {
  user: Donor;
  onSave: (
    firstName: string,
    lastName: string,
    birthDate: string, // YYYY-MM-DD
    phoneNumber: string,
    bloodType: BloodType
  ) => void;
}

type UserDataEntry = {
  key: keyof Donor;
  value: any;
  component: React.ReactNode;
  icon: string;
}[];

const bloodTypes: SelectOption<BloodType>[] = Object.entries(BloodType).map(
  ([key, value]) => ({
    key,
    value,
    label: key,
  })
);

export default function MyProfileScreen({
  user,
  onSave,
}: MyProfileScreenProps) {
  const [drawerVisible, setdrawerVisible] = useState(true);
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
            options={bloodTypes}
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

  const toggleDrawerVisiblity = React.useCallback(() => {
    setdrawerVisible((value) => !value);
  }, []);

  function handleOnValueChange(value: any) {
    setSelectedTempValue(value);
  }
  function handleEditClick(index: number) {
    setSelectedTempValue(userData[index].value);
    setSelectedComponent(index);
    toggleDrawerVisiblity();
  }
  function handleOnSave() {
    const { key } = userData[selectedComponent];
    const tempVal = { ...user, [key]: selectedTempValue };
    const { firstName, lastName, birthDate, phone, bloodType } = tempVal;
    onSave(firstName, lastName, birthDate, phone, bloodType);

    toggleDrawerVisiblity();
  }

  return (
    <div>
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
      <MyProfileDrawer
        visible={drawerVisible}
        onCancel={toggleDrawerVisiblity}
        onSave={handleOnSave}
      >
        {userData?.[selectedComponent]?.component}
      </MyProfileDrawer>
    </div>
  );
}
