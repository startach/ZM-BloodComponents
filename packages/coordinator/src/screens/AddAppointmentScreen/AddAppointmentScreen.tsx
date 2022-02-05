import { useState } from "react";
import styles from "./AddAppointmentScreen.module.scss";
import Button, { ButtonVariant } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import DatePicker from "../../components/DatePicker";
import TimePicker from "../../components/TimePicker";
import { DateUtils, Hospital } from "@zm-blood-components/common";
import _ from "lodash";
import CoordinatorScreen from "../../components/CoordinatorScreen";
import { HeaderVariant } from "../../components/CoordinatorHeader/CoordinatorHeader";
import NewSlot from "../../components/NewSlot";
import Input from "../../components/Input";

export interface AddAppointmentScreenProps {
  hospital: Hospital;
  initialDate: Date;
  onSubmit: (donationStartTimes: number[]) => void;
}

const minDate = new Date();
minDate.setHours(0, 0, 0, 0);

export default function AddAppointmentScreen(props: AddAppointmentScreenProps) {
  const [date, setDate] = useState<Date>(props.initialDate);
  const [hour, setHour] = useState<Date>(props.initialDate);
  const [slots, setSlots] = useState("1");
  const [slotsError, setSlotsError] = useState("");
  const [loading, setLoading] = useState(false);

  const [donationStartTimes, setDonationStartTimes] = useState<number[]>([]);

  const navigate = useNavigate();
  const entireDayButtonEnabled = props.hospital === Hospital.BEILINSON;

  const onAppendToList = () => {
    const parsedSlots = parseInt(slots);
    if (
      !parsedSlots ||
      isNaN(parsedSlots) ||
      parsedSlots < 1 ||
      parsedSlots > 10
    ) {
      setSlotsError("מספר עמדות אינו תקין");
      return;
    }
    const startTime = new Date(date);
    startTime.setHours(hour.getHours(), hour.getMinutes(), 0, 0);
    const startTimeMillis = startTime.getTime();
    const timesToAdd = _.range(parsedSlots).map(() => startTimeMillis);

    setDonationStartTimes((startTimes) => [...startTimes, ...timesToAdd]);
  };

  /*
   * This is a cheat added for Beilinson hospital.
   * They asked to be able to add appointments, with specific hours, to the whole day in a single click.
   */
  const onAddWholeDay = () => {
    if (!date || props.hospital !== Hospital.BEILINSON) {
      return;
    }

    setDonationStartTimes((list) => [
      ...list,
      ...getAppointmentsForEntireDay(date),
    ]);
  };

  return (
    <CoordinatorScreen
      className={styles.addAppointmentScreenContent}
      headerProps={{
        title: "הוספת תורים",
        variant: HeaderVariant.SECONDARY,
        hasBackButton: true,
      }}
    >
      <div className={styles.fieldsBox}>
        <DatePicker
          className={styles.fullRowField}
          value={date}
          onChange={(d) => d && setDate(d)}
          label={"תאריך"}
          disablePast
          minimumDate={minDate}
          disableSaturday
        />

        <TimePicker
          value={hour}
          onChange={(d) => d && setHour(d)}
          label={"שעה"}
        />

        <Input
          label={"מספר עמדות"}
          type={"number"}
          onChangeText={(newValue) => {
            setSlotsError("");
            setSlots(newValue);
          }}
          value={slots}
          errorMessage={slotsError}
        />

        {entireDayButtonEnabled && (
          <Button
            title={"יום שלם"}
            onClick={onAddWholeDay}
            variant={ButtonVariant.outlined}
          />
        )}
        <Button
          title={"הוספה"}
          onClick={onAppendToList}
          className={entireDayButtonEnabled ? "" : styles.fullRowField}
        />
      </div>

      <div className={styles.appointmentsList}>
        <div className={styles.subtitle}>
          <div className={styles.subtitleText}>רשימת תורים</div>
        </div>

        {donationStartTimes.length === 0 ? (
          <div className={styles.noAppointmentsText}>טרם נוצרו תורים חדשים</div>
        ) : (
          <div>
            {groupSlots(donationStartTimes).map((group) => (
              <div key={group.date + "." + group.slots.length}>
                <div className={styles.dateTitle}>{group.date}</div>
                {group.slots.map((slot, index) => (
                  <NewSlot
                    key={index + "." + slot.donationStartTimeMillis}
                    slot={slot}
                    onDelete={() => {
                      setDonationStartTimes((list) =>
                        list.filter((x) => x !== slot.donationStartTimeMillis)
                      );
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.actionFooter}>
        <div className={styles.actionButtons}>
          <Button
            onClick={() => navigate(-1)}
            title="ביטול"
            variant={ButtonVariant.outlined}
            isDisabled={loading}
          />
          <Button
            title="אשר והמשך"
            isDisabled={donationStartTimes.length === 0}
            onClick={() => {
              setLoading(true);
              props.onSubmit(donationStartTimes);
            }}
            isLoading={loading}
          />
        </div>
      </div>
    </CoordinatorScreen>
  );
}

function groupSlots(slotsList: number[]): {
  date: string;
  slots: { donationStartTimeMillis: number; count: number }[];
}[] {
  const res: {
    date: string;
    slots: { donationStartTimeMillis: number; count: number }[];
  }[] = [];

  const groups = _.groupBy(slotsList, DateUtils.ToShortDateString);

  for (let date in groups) {
    const timesGroups = _.countBy(groups[date], (x) => x);

    const slots: { donationStartTimeMillis: number; count: number }[] = [];
    for (let g in timesGroups) {
      slots.push({
        donationStartTimeMillis: parseInt(g),
        count: timesGroups[g],
      });
    }

    res.push({
      date,
      slots: _.sortBy(slots, (x) => x.donationStartTimeMillis),
    });
  }

  return _.sortBy(res, (x) => x.slots[0].donationStartTimeMillis);
}

function getAppointmentsForEntireDay(date: Date) {
  const weekdayHoursAndSlots = [
    [8, 1],
    [9, 1],
    [10, 1],
    [11, 1],
    [12, 1],
    [13, 1],
    [14, 1],
    [15, 2],
    [16, 2],
    [17, 2],
  ];

  const fridayHoursAndSlots = [
    [8, 2],
    [9, 2],
    [10, 2],
    [11, 2],
  ];

  const hoursAndSlots =
    date.getDay() === 5 ? fridayHoursAndSlots : weekdayHoursAndSlots;

  const res: number[] = [];
  hoursAndSlots.forEach((hourAndSlots) => {
    const donationStartTime = new Date(date);
    donationStartTime.setHours(hourAndSlots[0], 0, 0, 0);

    for (let i = 0; i < hourAndSlots[1]; i++) {
      res.push(donationStartTime.getTime());
    }
  });

  return res;
}
