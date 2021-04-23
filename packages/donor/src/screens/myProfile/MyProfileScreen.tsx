import { useState } from "react";
import {
  BloodType,
  BloodTypeUtils,
  Donor,
  LocaleUtils,
  SelectOption,
} from "@zm-blood-components/common";
import Text from "../../components/basic/Text";
import HeaderSection from "../../components/HeaderSection";
import styles from "./MyProfileScreen.module.scss";
import Card from "../../components/basic/Card";
import Button from "../../components/basic/Button";
import IconButton from "../../components/basic/IconButton";
import userIcon from "../../assets/icons/user.svg";
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
}

const SHOW_DONATION_COUNT = false;
const appVersion = process.env.REACT_APP_VERSION || "dev";

export default function MyProfileScreen({
  user,
  onSave,
}: MyProfileScreenProps) {
  const renderDonationCount = () => {
    if (!SHOW_DONATION_COUNT) {
      return null;
    }

    return (
      <Card className={styles.donationCountcard}>
        <Text>מספר תרומות</Text>
        <Text className={styles.donationNumber}>4</Text>
        <Button title="צפייה בהיסטוריה" onClick={() => console.log()} />
      </Card>
    );
  };

  const onFieldChange = (key: keyof Donor) => (newValue: any) => {
    const updatedUser = { ...user };
    updatedUser[key] = newValue;

    const { firstName, lastName, birthDate, phone, bloodType } = updatedUser;
    onSave(firstName, lastName, birthDate, phone, bloodType);
  };

  return (
    <ZMScreen hasBackButton className={styles.container} title="פרופיל">
      <HeaderSection className={styles.component}>
        <Text>{`${user.firstName} ${user.lastName}`}</Text>
      </HeaderSection>

      {renderDonationCount()}

      <ProfileStringField
        iconSrc={userIcon}
        value={user.firstName}
        inputLabel={"שם פרטי"}
        onChange={onFieldChange("firstName")}
      />

      <ProfileStringField
        iconSrc={userIcon}
        value={user.lastName}
        inputLabel={"שם משפחה"}
        onChange={onFieldChange("lastName")}
      />

      <ProfileSelectField
        iconSrc={bloodIcon}
        value={user.bloodType}
        onChange={onFieldChange("bloodType")}
        options={BloodTypeUtils.getBloodTypeSelectOptions()}
        selectLabel={"סוג דם"}
        toDisplayString={LocaleUtils.getBloodTypeTranslation}
      />

      <ProfileStringField
        iconSrc={phoneIcon}
        value={user.phone}
        inputLabel={"טלפון"}
        onChange={onFieldChange("phone")}
      />
      <div className={styles.footer}>
        <Text className={styles.appVersion}>{appVersion}</Text>
      </div>
    </ZMScreen>
  );
}

interface ProfileStringFieldProps {
  iconSrc: string;
  value: string;
  onChange: (newValue: string) => void;
  inputLabel: string;
}
function ProfileStringField(props: ProfileStringFieldProps) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [value, setValue] = useState(props.value);

  return (
    <>
      <ProfileFieldCard
        value={props.value}
        iconSrc={props.iconSrc}
        onEdit={() => setDrawerVisible(true)}
      />
      <MyProfileDrawer
        visible={drawerVisible}
        onCancel={() => setDrawerVisible(false)}
        onSave={() => {
          props.onChange(value);
          setDrawerVisible(false);
        }}
      >
        <Input value={value} onChangeText={setValue} label={props.inputLabel} />
      </MyProfileDrawer>
    </>
  );
}

interface ProfileSelectFieldProps<T> {
  iconSrc: string;
  value: T;
  toDisplayString: (value: T) => string;
  onChange: (newValue: T) => void;
  selectLabel: string;
  options: SelectOption<T>[];
}
function ProfileSelectField<T>(props: ProfileSelectFieldProps<T>) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [value, setValue] = useState(props.value);

  return (
    <>
      <ProfileFieldCard
        value={props.toDisplayString(props.value)}
        iconSrc={props.iconSrc}
        onEdit={() => setDrawerVisible(true)}
      />
      <MyProfileDrawer
        visible={drawerVisible}
        onCancel={() => setDrawerVisible(false)}
        onSave={() => {
          props.onChange(value);
          setDrawerVisible(false);
        }}
      >
        <Select
          value={value}
          options={props.options}
          onChange={setValue}
          label={props.selectLabel}
        />
      </MyProfileDrawer>
    </>
  );
}

interface ProfileFieldCardProps {
  iconSrc: string;
  value: string;
  onEdit: () => void;
}
function ProfileFieldCard(props: ProfileFieldCardProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.cardContentMerge}>
        <IconButton iconSrc={props.iconSrc} />
        <Text>{props.value}</Text>
      </div>
      <IconButton iconSrc={editIcon} onClick={props.onEdit} />
    </Card>
  );
}
