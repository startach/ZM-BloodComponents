import { useState } from "react";
import styles from "./AddAppointmentScreen.module.scss";
import Button, { ButtonVariant } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import DatePicker from "../../components/DatePicker";
import TimePicker from "../../components/TimePicker";
import Select from "../../components/Select";
import { SelectOption } from "@zm-blood-components/common";
import classnames from "classnames";
import { range } from "lodash";

import CoordinatorScreen from "../../components/CoordinatorScreen";
import { HeaderVariant } from "../../components/CoordinatorHeader/CoordinatorHeader";

export interface AddAppointmentScreenProps {
  onSubmit: (date: Date, hour: Date, numberOfPlaces: number) => void;
}

const slotOptions: SelectOption<number>[] = range(10).map((n) => ({
  label: n+1 + "",
  value: n+1,
  key: n + "",
}));


export default function AddAppointmentScreen(props: AddAppointmentScreenProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [hour, setHour] = useState<Date | null>(null);

  const [slots, setSlots] = useState(0);

  const navigate = useNavigate();

  return (
    <CoordinatorScreen
      className={styles.addApointmentSceenContent}
      headerProps={{
        title: "הוספת תור יחיד",
        variant: HeaderVariant.SECONDARY,
        hasBackButton: true,
      }}>
      <div className={styles.addAppoinmentScreenCardContainer}>
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
            <div className={styles.subtitleText}>מאפייני תור</div>
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
            onClick={() => {
              if (date !== null && hour !== null) {
                props.onSubmit(date, hour, slots);
              }
            }}
            isDisabled={date === null || hour === null || slots === 0}
            title="אשר והמשך"
          />
          <Button
            className={styles.inputField}
            onClick={() => navigate(-1)}
            title="ביטול"
            variant={ButtonVariant.outlined}
          />
        </div>
      </div>
    </CoordinatorScreen>
  );
}
