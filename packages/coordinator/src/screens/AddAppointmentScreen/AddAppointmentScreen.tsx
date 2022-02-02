import { useState } from "react";
import styles from "./AddAppointmentScreen.module.scss";
import Button, { ButtonVariant } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import DatePicker from "../../components/DatePicker";
import TimePicker from "../../components/TimePicker";
import { DateUtils, FunctionsApi, Hospital } from "@zm-blood-components/common";
import _ from "lodash";
import CoordinatorScreen from "../../components/CoordinatorScreen";
import { HeaderVariant } from "../../components/CoordinatorHeader/CoordinatorHeader";
import NewSlot from "../../components/NewSlot";
import Input from "../../components/Input";

export interface AddAppointmentScreenProps {
  hospital: Hospital;
  initialDate: Date;
  onSubmit: (slots: FunctionsApi.NewSlotsRequest[]) => void;
}

interface SlotToAdd extends FunctionsApi.NewSlotsRequest {
  creationTime: number;
}

export default function AddAppointmentScreen(props: AddAppointmentScreenProps) {
  const [date, setDate] = useState<Date>(props.initialDate);
  const [hour, setHour] = useState<Date>(props.initialDate);
  const [slots, setSlots] = useState("1");
  const [slotsError, setSlotsError] = useState("");
  const [loading, setLoading] = useState(false);

  const [slotsList, setSlotsList] = useState<SlotToAdd[]>([]);

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
    setSlotsList((list) => [
      ...list,
      {
        slots: parsedSlots,
        hospital: props.hospital,
        donationStartTimeMillis: startTime.getTime(),
        creationTime: new Date().getTime(),
      },
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
            onClick={() => {}}
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

        {slotsList.length === 0 ? (
          <div className={styles.noAppointmentsText}>טרם נוצרו תורים חדשים</div>
        ) : (
          <div>
            {groupSlots(slotsList).map((group) => (
              <div key={group.date + "." + group.slots.length}>
                <div className={styles.dateTitle}>{group.date}</div>
                {group.slots.map((s, index) => (
                  <NewSlot
                    key={index + "." + s.creationTime}
                    slot={s}
                    onDelete={() => {
                      setSlotsList((list) =>
                        list.filter((x) => x.creationTime !== s.creationTime)
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
            isDisabled={slotsList.length === 0}
            onClick={() => {
              setLoading(true);
              props.onSubmit(slotsList);
            }}
            isLoading={loading}
          />
        </div>
      </div>
    </CoordinatorScreen>
  );
}

function groupSlots(
  slots: SlotToAdd[]
): { date: string; slots: SlotToAdd[] }[] {
  const res: { date: string; slots: SlotToAdd[] }[] = [];

  const groups = _.groupBy(slots, (x) =>
    DateUtils.ToShortDateString(x.donationStartTimeMillis)
  );

  for (let date in groups) {
    res.push({
      date,
      slots: _.sortBy(groups[date], (x) => x.donationStartTimeMillis),
    });
  }

  return _.sortBy(res, (x) => x.slots[0].donationStartTimeMillis);
}
