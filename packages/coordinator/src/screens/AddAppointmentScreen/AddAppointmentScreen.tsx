import { useState } from "react";
import styles from "./AddAppointmentScreen.module.scss";
import Button, { ButtonVariant } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import DatePicker from "../../components/DatePicker";
import TimePicker from "../../components/TimePicker";
import Select from "../../components/Select";
import { SelectOption } from "@zm-blood-components/common";
import classnames from "classnames";
import _ from "lodash";

import CoordinatorScreen from "../../components/CoordinatorScreen";
import { HeaderVariant } from "../../components/CoordinatorHeader/CoordinatorHeader";

export interface AddAppointmentScreenProps {
  initialDate: Date;
  onSubmit: (donationStartTime: Date, slots: number) => void;
}

const slotOptions: SelectOption<number>[] = _.range(10).map((n) => ({
  label: n + 1 + "",
  value: n + 1,
  key: n + "",
}));

export default function AddAppointmentScreen(props: AddAppointmentScreenProps) {
  const [date, setDate] = useState<Date | null>(props.initialDate);
  const [hour, setHour] = useState<Date | null>(props.initialDate);
  const [slots, setSlots] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSave = () => {
    if (date === null || hour === null) {
      return;
    }

    setLoading(true);

    const startTime = new Date(date);
    startTime.setHours(hour.getHours(), hour.getMinutes(), 0, 0);
    props.onSubmit(startTime, slots);
  };

  return (
    <CoordinatorScreen
      className={styles.addAppointmentScreenContent}
      headerProps={{
        title: "הוספת תור",
        variant: HeaderVariant.SECONDARY,
        hasBackButton: true,
      }}
    >
      <div className={styles.addAppointmentScreenCardContainer}>
        <div className={styles.cardContainer}>
          <div className={styles.addAppointmentSubtitle}>
            <div className={styles.subtitleText}>זמני תור</div>
          </div>
          <DatePicker
            className={styles.inputField}
            value={date}
            onChange={setDate}
            label={"תאריך"}
            disablePast
          />
          <TimePicker
            className={styles.inputField}
            value={hour}
            onChange={setHour}
            label={"שעה"}
          />
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.addAppointmentSubtitle}>
            <div className={styles.subtitleText}>מאפייני תור</div>
          </div>
          <Select
            containerClassName={styles.inputField}
            label={"מספר עמדות"}
            options={slotOptions}
            onChange={setSlots}
            value={slots}
          />
        </div>
        <div
          className={classnames(
            styles.cardContainer,
            styles.appointmentsScreenButtons
          )}
        >
          <Button
            className={styles.inputField}
            onClick={onSave}
            isDisabled={date === null || hour === null || slots === 0}
            title="אשר והמשך"
            isLoading={loading}
          />
          <Button
            className={styles.inputField}
            onClick={() => navigate(-1)}
            title="ביטול"
            variant={ButtonVariant.outlined}
            isDisabled={loading}
          />
        </div>
      </div>
    </CoordinatorScreen>
  );
}
