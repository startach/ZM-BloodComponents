import { useState } from "react";
import styles from "./AppointmentScreen.module.scss";

import Button, { ButtonVariant } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import DatePicker from "../../components/V2/DatePicker";
import TimePicker from "../../components/V2/TimePicker";
import Select from "../../components/V2/Select";
import { SelectOption } from "@zm-blood-components/common";
import classnames from "classnames";

export interface AppointmentScreenProps {}

const slotOptions: SelectOption<number>[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
].map((n) => ({
  label: n + "",
  value: n,
  key: n + "",
}));

export default function AppointmentScreen(props: AppointmentScreenProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [hour, setHour] = useState<Date | null>(null);

  const [slots, setSlots] = useState(0);

  const navigate = useNavigate();

  return (
    <div className={styles.addAppoinmentScreen}>
      <div className={styles.cardContainer}>
        <div className={styles.title}>הוספת תור יחיד</div>
        <div
          className={styles.appointmentScreenXButton}
          onClick={() => {
            navigate(-1);
          }}
        >
          X
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.addApponimentSubtitle}>
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
        <div className={styles.addApponimentSubtitle}>
          <div className={styles.subtitleText}>מספר עמדות</div>
        </div>
        <Select
          containerClassName={styles.inputField}
          id={"donations_count"}
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
          onClick={() => {}}
          title="אשר והמשך"
        />
        <Button
          className={styles.inputField}
          onClick={() => {}}
          title="ביטול"
          variant={ButtonVariant.outlined}
        />
      </div>
    </div>
  );
}
